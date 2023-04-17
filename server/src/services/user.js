const db = require('../models')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { Op } = require('sequelize')
const create = async data => {
    try {
        data.password = await bcrypt.hash(data.password, 12)
        data.confirmtoken = crypto.randomBytes(64).toString('hex')
        let user = await db.User.create(data)
        user = user.get({ plain: true })
        delete user.password
        return user
    } catch (err) {
        throw new Error(err)
    }
}
const find = async (key, page, limit, roleId) => {
    try {
        const { count, rows } = await db.User.findAndCountAll({
            offset: (page - 1) * limit,
            limit: +limit,
            include: {
                model: db.Role,
                required: true,
                as: 'role'
            },
            attributes: {
                exclude: ['password', 'confirmtoken']
            },
            where: {
                [Op.or]: [
                    {
                        firstname: {
                            [Op.like]: `%${key}%`
                        }
                    },
                    {
                        lastname: {
                            [Op.like]: `%${key}%`
                        }
                    }
                ],
                roleId: roleId
            },
        })
        return {
            users: rows,
            pagination: {
                page: page,
                totalPages: Math.ceil(count / limit),
                totalElements: count,
                size: limit
            }
        }
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
        await db.User.update(data, {
            where: {
                id: id
            }
        })
        const user = await db.User.findByPk(id, {
            attributes: {
                exclude: ['password', 'confirmtoken']
            },
            include: {
                model: db.Role,
                required: true,
                as: 'role'
            }
        })
        return user
    } catch (err) {
        throw new Error(err)
    }
}
const toggleBlock = async id => {
    try {
        // delete data.email
        const user = await db.User.findByPk(id, {
            include: {
                model: db.Role,
                required: true,
                as: 'role'
            }
        })
        let data
        if (user.block) data = { block: false }
        else data = { block: true }
        await db.User.update(data, {
            where: {
                id: id
            }
        })
        const newUser = await db.User.findByPk(id, {
            attributes: {
                exclude: ['password', 'confirmtoken']
            },
            include: {
                model: db.Role,
                required: true,
                as: 'role'
            }
        })
        return newUser
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
        const [updateResult] = await db.User.update(
            { confirm: true },
            {
                where: {
                    id: user.id
                }
            }
        )
        return updateResult
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = {
    create,
    findOne,
    update,
    verifyConfirmToken,
    toggleBlock,
    find
}
