const db = require('../models')
const bcrypt = require('bcrypt')
const create = async data => {
    try {
        data.password = await bcrypt.hash(data.password, 12)
        const user = db.User.create(data)
        delete user.password
        return user
    } catch (err) {
        throw new Error(err)
    }
}
const findOne = async id => {
    try {
        const user = await db.User.findByPk(id, {
            include: {
                model: db.Role,
                required: true,
                as: 'role'
            }
        })
        if (user) return user
        return false
    } catch (err) {
        throw new Error(err)
    }
}
const update = async (id, data) => {
    try {
        // delete data.email
        const [updateResult] = await db.User.update(data, {
            where: {
                id: id
            }
        })
        return updateResult
    } catch (err) {
        throw new Error(err)
    }
}
const verifyConfirmToken = async token => {
    try {
        const [user] = await db.User.findAll({
            where: {
                confirmToken: token
            }
        })

        if (!user) throw new Error('Invalid token')
        const [updateResult] = await db.User.update({ confirm: true }, {
            where: {
                id: user.id
            }
        })
        return updateResult
    } catch (err) {
        throw new Error(err)
    }
}
module.exports = {
    create,
    findOne,
    update,
    verifyConfirmToken
}