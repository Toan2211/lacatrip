const {
    AUTHENTICATEDID,
    SERVICEMANAGERID
} = require('../constants/variable')
const {
    checkEmailExist,
    checkPassword,
    createAccessToken
} = require('../services/auth')
const crypto = require('crypto')
const {
    sendEmailConfirm,
    sendEmailResetPassword
} = require('../services/mail')
const userService = require('../services/user')
const authService = require('../services/auth')
const { avatarDefault } = require('../constants/images')
const serviceManagerService = require('../services/servicemanager')
const signup = async (req, res) => {
    try {
        const { email, firstname, lastname } = req.body
        if (await checkEmailExist(email))
            return res
                .status(400)
                .json({ message: 'This email already exists.' })
        req.body.roleId = AUTHENTICATEDID
        req.body.confirmtoken = crypto.randomBytes(64).toString('hex')
        req.avatar = 'https://res.cloudinary.com/djgkj9nli/image/upload/v1681614915/lacatrip/lhwrnxjhgw5uhrvinh6r.jpg'
        const user = await userService.create(req.body)
        await sendEmailConfirm({
            name: `${firstname} ${lastname}`,
            receive: email,
            redirectLink: `${process.env.NODE_API}/api/user/verifyUser?confirmToken=${req.body.confirmtoken}`
        })
        return res.status(201).json({
            message: 'Create user successfuly',
            data: user
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
const createAccountInvite = async (req, res) => {
    try {
        const user = await authService.createAccountInvite(req.body)
        return res.status(201).json({
            message: 'Create account successfuly',
            data: user
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
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
            return res.status(400).json({
                message: 'Invalid email or password',
                data: {}
            })
        if (!user.confirm || user.block)
            return res.status(400).json({
                message: 'Account is not confirmed or blocked',
                data: {}
            })
        if (user.roleId === SERVICEMANAGERID) {
            const servicemanager =
                await serviceManagerService.findByUserId(user.id)
            user.dataValues.serviceManagerId = servicemanager.id
            user.dataValues.paymentAccount = servicemanager.paymentAccount
        }
        const access_token = createAccessToken(user)
        return res.status(200).json({
            message: 'Login successful',
            data: {
                access_token,
                user
            }
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await checkEmailExist(email)
        if (!user) {
            return res.status(400).json({
                message: 'Email does not exist',
                data: {}
            })
        }
        const newPass = await authService.forgotPassword(email)
        await sendEmailResetPassword({
            name: `${user.firstname} ${user.lastname}`,
            receive: email,
            redirectLink: `${process.env.REACT_API}/signin`,
            newPassword: newPass
        })
        return res.status(201).json({
            message: 'Reset password successfully'
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
module.exports = {
    signup,
    signin,
    forgotPassword,
    createAccountInvite
}
