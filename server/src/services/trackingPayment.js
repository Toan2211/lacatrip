const { Op } = require('sequelize')
const db = require('../models')

const create = async data => {
    try {
        const trackingPayment = await db.TrackingPayment.create(data)
        return trackingPayment
    } catch (error) {
        throw new Error(error)
    }
}

const find = async ({
    page,
    limit,
    startDate,
    endDate,
    serviceManagerId
}) => {
    try {
        page = page ? page : 1
        limit = limit ? limit : 10
        startDate = startDate ? startDate : '2000-01-01'
        endDate = endDate ? endDate : '2024-01-01'
        let whereParams = {}
        if (serviceManagerId)
            whereParams = {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                },
                serviceManagerId: serviceManagerId
            }
        else
            whereParams = {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            }
        const { count, rows } =
            await db.TrackingPayment.findAndCountAll({
                offset: (page - 1) * limit,
                limit: +limit,
                include: {
                    model: db.ServiceManager,
                    as: 'serviceManager',
                    include: {
                        model: db.User,
                        required: true,
                        as: 'user',
                        // attributes: [
                        //     'firstname, lastname',
                        //     'email',
                        //     'phone'
                        // ]
                    }
                },
                where: whereParams,
                order: [
                    ['createdAt', 'DESC']
                ]
            })
        return {
            trackingPayments: rows,
            pagination: {
                page: +page,
                totalPages: Math.ceil(count / limit),
                totalElements: count,
                size: +limit
            }
        }
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    find,
    create
}
