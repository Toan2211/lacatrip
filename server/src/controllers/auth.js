const { AUTHENTICATEDID } = require('../constants/variable')
const { checkEmailExist, checkPassword, createAccessToken } = require('../services/auth')
const crypto = require('crypto')
const { sendEmailConfirm } = require('../services/mail')
const userService = require('../services/user')
const signup = async (req, res) => {
    try {
        const { email, firstname, lastname } = req.body
        if (await checkEmailExist(email))
            return res
                .status(400)
                .json({ msg: 'This email already exists.' })
        req.body.roleId = AUTHENTICATEDID
        req.body.confirmtoken = crypto.randomBytes(64).toString('hex')
        const user = await userService.create(req.body)
        await sendEmailConfirm({
            name: `${firstname} ${lastname}`,
            receive: email,
            redirectLink: `${process.env.NODE_API}/api/user/verifyUser?confirmToken=${req.body.confirmtoken}`
        })
        res.status(201).json({
            msg: 'Create user successfuly',
            data: user
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
const signin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await checkEmailExist(email)
        let passwordIsMatch = false
        if (user)
            passwordIsMatch = await checkPassword(
                password,
                user.password
            )
        if (!user || !passwordIsMatch)
            res.status(400).json({
                msg: 'Invalid email or password',
                data: {}
            })
        if (!user.confirm)
            res.status(400).json({
                msg: 'Account is not confirmed or blocked',
                data: {}
            })
        delete user.password
        const access_token = createAccessToken(user)
        return res.status(200).json({
            msg: 'Login successful',
            data:{
                access_token,
                user
            }
        })
        
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
module.exports = {
    signup,
    signin
}
