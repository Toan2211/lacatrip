const { checkEmailExist } = require('../services/auth')
const crypto = require('crypto')
const userService = require('../services/user')
const { avatarDefault } = require('../constants/images')
const { sendEmailConfirmServiceManager } = require('../services/mail')
const servicemanager = require('../services/servicemanager')
const create = async (req, res) => {
    try {
        const { email } = req.body
        if (await checkEmailExist(email))
            return res
                .status(400)
                .json({ message: 'This email already exists.' })
        const newPass = crypto.randomBytes(3).toString('hex') + '1A@'

        req.body.password = newPass
        req.body.roleId = 3
        if (req.file) req.body.avatar = req.file.path
        else req.body.avatar = avatarDefault
        const user = await userService.create(req.body)
        const serviceManager = await servicemanager.create(user.id)
        await sendEmailConfirmServiceManager({
            receive: email,
            name: `${user.firstname} ${user.lastname}`,
            password: newPass,
            redirectLink: `${process.env.NODE_API}/api/user/verifyUser?confirmToken=${user.confirmtoken}`
        })
        return res.status(200).json({
            message: 'Create service Manager successful !',
            data: { serviceManager }
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
const find = async (req, res) => {
    try {
        const key = req.query.key ? +req.query.key : ''
        const page = req.query.page ? +req.query.page : 1
        const limit = req.query.limit ? +req.query.limit : 10
        const userData = await servicemanager.find(key, page, limit)
        return res.status(200).json({
            message: 'Get list service manager successful !',
            data: userData
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
const update = async (req, res) => {
    try {
        if (req.file) req.body.avatar = req.file.path

        const user = await servicemanager.update(
            req.params.id,
            req.body
        )
        if (user)
            return res.status(200).json({
                message: 'Update service manager successful !',
                data: {
                    user
                }
            })
        else
            return res.status(400).json({
                message:
                    'Can not update service manager. Maybe user does not exit or data is empty !'
            })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
const updatePaymentAccount = async (req, res) => {
    try {
        const result = await servicemanager.updatePaymentAccount(
            req.params.id,
            req.body.paymentAccount
        )
        if (!result)
            return res.status(400).json({
                message:
                    'Can not update service manager. Maybe service manager does not exit or data is empty !'
            })
        return res.status(201).json({
            message: 'Update payment Account service manager successful !',
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = {
    find,
    create,
    update,
    updatePaymentAccount
}
