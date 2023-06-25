const { Op } = require('sequelize')
const db = require('../models')

const find = async (key, page, limit) => {
    try {
        const { count, rows } =
            await db.ServiceManager.findAndCountAll({
                offset: (page - 1) * limit,
                limit: +limit,
                include: {
                    model: db.User,
                    required: true,
                    as: 'user',
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
                        ]
                    }
                }
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
const create = async userId => {
    try {
        let serviceManager = await db.ServiceManager.create({
            userId: userId
        })
        return serviceManager
    } catch (err) {
        throw new Error(err)
    }
}
const update = async (id, data) => {
    try {
        let servicemanager = await db.ServiceManager.findByPk(id, {
            include: {
                model: db.User,
                required: true,
                as: 'user'
            }
        })
        if (!servicemanager) return false
        // delete data.email
        delete data.id
        await db.User.update(data, {
            where: {
                id: servicemanager.userId
            }
        })
        servicemanager = await db.ServiceManager.findByPk(id, {
            include: {
                model: db.User,
                required: true,
                as: 'user',
                attributes: {
                    exclude: ['password', 'confirmtoken']
                }
            }
        })
        return servicemanager
    } catch (err) {
        throw new Error(err)
    }
}
const findByUserId = async userId => {
    try {
        let [servicemanager] = await db.ServiceManager.findAll({
            where: {
                userId: userId
            }
        })
        return servicemanager
    } catch (error) {
        throw new Error(error)
    }
}
const findOne = async id => {
    try {
        const serviceManager = await db.ServiceManager.findOne({
            where: {
                id
            }
        })
        return serviceManager
    } catch (error) {
        throw new Error(error)
    }
}
const updatePaymentAccount = async (id, paymentAccount) => {
    try {
        const result = await db.ServiceManager.update({
            paymentAccount: paymentAccount
        }, {
            where: {
                id: id
            }
        })
        return result
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    find,
    create,
    update,
    findByUserId,
    findOne,
    updatePaymentAccount
}
