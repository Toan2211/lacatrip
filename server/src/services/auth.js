const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { secretJWT } = require('../config/auth.config')
const crypto = require('crypto')
require('dotenv').config()
const checkEmailExist = async email => {
    const user = await db.User.findOne({
        where: {
            email
        },
        raw: true
    })
    if (user) return user
    return false
}
const checkPassword = async (password, passwordHash) => {
    const isMatch = await bcrypt.compare(password, passwordHash)
    if (isMatch) return true
    return false
}
const createAccessToken = payload =>
    jwt.sign(payload, secretJWT, { expiresIn: '30d' })
const forgotPassword = async email => {
    try {
        const user = await db.User.findOne({
            where: {
                email
            },
            raw: true
        })
        const newPass = crypto.randomBytes(3).toString('hex') + '1A@'
        const newPassHash = await bcrypt.hash(newPass, 12)
        await db.User.update(
            { password: newPassHash },
            {
                where: {
                    id: user.id
                }
            }
        )
        return newPass
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    checkEmailExist,
    checkPassword,
    createAccessToken,
    forgotPassword
}
