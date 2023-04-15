const userService = require('../services/user')
const bcrypt = require('bcrypt')
const authService = require('../services/auth')
const verifyConfirmTokenUser = async (req, res) => {
    const { confirmToken } = req.query
    try {
        const result = await userService.verifyConfirmToken(
            confirmToken
        )
        if (result)
            return res.redirect(`${process.env.REACT_API}/signin`)
        else
            return res.status(400).json({
                message: 'Verify error !'
            })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
const changePassword = async (req, res) => {
    try {
        const user = await userService.findOne(req.params.id)
        if (!user)
            return res.status(400).json({
                message: 'User is not found!'
            })
        if (!await authService.checkPassword(req.body.oldPassword, user.password))
            return res.status(400).json({
                message: 'Password is not match !'
            })
        const password = await bcrypt.hash(
            req.body.newPassword,
            12
        )
        const updateResult = await userService.update(
            req.params.id,
            { password }
        )
        if (updateResult)
            return res.status(200).json({
                message: 'Change password successful !'
            })
        else
            return res.status(400).json({
                message: 'Can not update password. Maybe password does not exit or data is empty !'
            })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
module.exports = {
    verifyConfirmTokenUser,
    changePassword
}
