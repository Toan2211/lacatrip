const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { secretJWT } = require('../config/auth.config')
const crypto = require('crypto')
const { avatarDefault } = require('../constants/images')
require('dotenv').config()
const checkEmailExist = async email => {
    const user = await db.User.findOne({
        include: {
            model: db.Role,
            required: true,
            as: 'role'
        },
        where: {
            email
        }
        // raw: true,
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
    jwt.sign(payload.toJSON(), secretJWT, { expiresIn: '30d' })
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
const createAccountInvite = async data => {
    try {
        const user = await db.User.findOne({
            where: {
                email: data.email
            },
            raw: true
        })
        data.password = await bcrypt.hash(data.password, 12)
        data.avatar = 'https://res.cloudinary.com/djgkj9nli/image/upload/v1681614915/lacatrip/lhwrnxjhgw5uhrvinh6r.jpg'
        data.confirm = 1
        const result = await db.User.update(data, {
            where: {
                id: user.id
            }
        })
        return result
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    checkEmailExist,
    checkPassword,
    createAccessToken,
    forgotPassword,
    createAccountInvite
}
