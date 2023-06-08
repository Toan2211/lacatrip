const { Sequelize, Op } = require('sequelize')
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
            order: [['createdAt', 'DESC']],
            distinct: true
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
const getAllMessages = async query => {
    try {
        let { tripId, messageID, limit, time } = query
        limit = limit ? limit : 10
        let messages = []
        if (time)
            messages = await db.Message.findAll({
                include: [
                    {
                        model: db.User,
                        as: 'user',
                        attributes: [
                            'avatar',
                            'firstname',
                            'lastname'
                        ]
                    }
                ],
                distinct: true,
                where: {
                    createdAt: {
                        [Op.lt]: new Date(time)
                    },
                    tripId: tripId
                },
                order: [['createdAt', 'DESC']],
                limit: limit
            })
        else
            messages = await db.Message.findAll({
                where: {
                    tripId
                },
                limit: Number(limit),
                include: [
                    {
                        model: db.User,
                        as: 'user',
                        attributes: [
                            'avatar',
                            'firstname',
                            'lastname'
                        ]
                    }
                ],
                order: [['createdAt', 'DESC']],
                distinct: true
            })
        return messages
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
    create,
    getAllMessages
}
