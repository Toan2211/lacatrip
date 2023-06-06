const db = require('../models')

const create = async data => {
    try {
        let [notifiInDB] = await db.Notification.findAll({
            where: {
                tripId: data.tripId,
                receiverId: data.receiverId
            }
        })
        if (notifiInDB) {
            await db.Notification.update(
                {
                    message: data.message,
                    isReaded: false
                },
                {
                    where: {
                        id: notifiInDB.id
                    }
                }
            )
            notifiInDB = await findOne(notifiInDB.id)
            return notifiInDB
        } else {
            let notification = await db.Notification.create(data)
            notification = await findOne(notification.id)
            return notification
        }
    } catch (error) {
        throw new Error(error)
    }
}
const findOne = async id => {
    try {
        const notificaton = await db.Notification.findByPk(id, {
            include: [
                {
                    model: db.User,
                    as: 'sender',
                    attributes: ['avatar', 'firstname', 'lastname']
                },
                {
                    model: db.Trip,
                    as: 'trip',
                    attributes: ['id', 'name', 'image']
                }
            ]
        })
        return notificaton
    } catch (error) {
        throw new Error(error)
    }
}
const getNotifications = async query => {
    try {
        let { userId, page, limit } = query
        page = page ? page : 1
        limit = limit ? limit : 10
        const { count, rows } = await db.Notification.findAndCountAll(
            {
                offset: (page - 1) * limit,
                limit: +limit,
                where: {
                    receiverId: userId
                },
                include: [
                    {
                        model: db.User,
                        as: 'sender',
                        attributes: [
                            'avatar',
                            'firstname',
                            'lastname'
                        ]
                    },
                    {
                        model: db.Trip,
                        as: 'trip',
                        attributes: ['id', 'name', 'image']
                    }
                ],
                order: [['updatedAt', 'DESC']]
            }
        )
        return {
            notifications: rows,
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
const readNotification = async ({ receiverId, tripId }) => {
    try {
        const result = await db.Notification.update(
            {
                isReaded: true
            },
            {
                where: {
                    receiverId: receiverId,
                    tripId: tripId,
                    isReaded: false
                }
            }
        )
        if (result) {
            const [notify] = await db.Notification.findAll({
                where: {
                    receiverId: receiverId,
                    tripId: tripId
                }
            })
            return notify
        }
        return false
    } catch (error) {
        throw new Error(error)
    }
}
const countNotifyNotReaded = async receiverId => {
    try {
        const { count, rows } = await db.Notification.findAndCountAll(
            {
                where: {
                    receiverId: receiverId,
                    isReaded: false
                }
            }
        )
        return count
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    create,
    findOne,
    getNotifications,
    readNotification,
    countNotifyNotReaded
}
