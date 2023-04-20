const { checkEmailExist } = require('../services/auth')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const userService = require('../services/user')
const { avatarDefault } = require('../constants/images')
const { sendEmailConfirmEmployee } = require('../services/mail')
const { EMPLOYEEID } = require('../constants/variable')
const create = async (req, res) => {
    try {
        const { email } = req.body
        if (await checkEmailExist(email))
            return res
                .status(400)
                .json({ message: 'This email already exists.' })
        const newPass = crypto.randomBytes(3).toString('hex') + '1A@'

        req.body.password = newPass
        req.body.roleId = 2
        if (req.file) req.body.avatar = req.file.path
        else req.body.avatar = avatarDefault
        const user = await userService.create(req.body)
        await sendEmailConfirmEmployee({
            receive: email,
            name: `${user.firstname} ${user.lastname}`,
            password: newPass,
            redirectLink: `${process.env.NODE_API}/api/user/verifyUser?confirmToken=${user.confirmtoken}`
        })
        return res.status(200).json({
            msg: 'Create emoloyee successful !',
            data: { user }
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
const find = async (req, res) => {
    try
    {
        const key = req.query.key ? req.query.key : ''
        const page = req.query.page ? req.query.page : 1
        const limit = req.query.limit ? req.query.limit : 10
        const userData = await userService.find(key, page, limit, EMPLOYEEID)
        return res.status(200).json({
            message: 'Get list employees successful !',
            data: userData
        })
    }
    catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
module.exports = {
    create,
    find
}
