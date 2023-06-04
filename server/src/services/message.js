const db = require('../models')
const getConversationsByTripID = async query => {
    try {
        let { tripId, page, limit } = query
        page = page ? page : 1
        limit = limit ? limit : 10
        const { count, rows } = await db.Message.findAndCountAll({
            offset: (page - 1) * limit,
            limit: +limit,
            where: {
                tripId: tripId
            },
            include: [
                {
                    model: db.User,
                    as: 'user',
                    attributes: ['avatar', 'firstname', 'lastname']
                }
            ],
            order: [['createdAt', 'DESC']]
        })
        return {
            messages: rows,
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
const create = async data => {
    try {
        let message = await db.Message.create(data)
        message = await findOne(message.id)
        return message
    } catch (error) {
        throw new Error(error)
    }
}
const findOne = async id => {
    try {
        let message = await db.Message.findByPk(id, {
            include: [
                {
                    model: db.User,
                    as: 'user',
                    attributes: ['avatar', 'firstname', 'lastname']
                },
                {
                    model: db.Trip,
                    as: 'trip',
                    attributes: ['id', 'name', 'image']
                }
            ]
        })
        return message
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    getConversationsByTripID,
    create
}
