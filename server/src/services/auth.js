const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { secretJWT } = require('../config/auth.config')
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

module.exports = {
    checkEmailExist,
    checkPassword,
    createAccessToken
}