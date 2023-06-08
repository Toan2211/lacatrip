const notificationService = require('../services/notification')

const create = async (req, res) => {
    try {
        req.body.senderId = req.user.id
        const notification = await notificationService.create(
            req.body
        )
        return res.status(200).json({
            message: 'Create Notification successful',
            data: notification
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getNotifications = async (req, res) => {
    try {
        req.query.userId = req.user.id
        const notifications =
            await notificationService.getNotifications(req.query)
        const countNotReaded = await notificationService.countNotifyNotReaded(req.user.id)
        return res.status(200).json({
            message: 'Get Notifications successful',
            data: notifications,
            countNotReaded: countNotReaded
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const readNotification = async (req, res) => {
    try {
        req.body.receiverId = req.user.id
        const result = await notificationService.readNotification(
            req.body
        )
        return res.status(200).json({
            message: 'Read successful',
            data: result
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const deleteNotify = async (req, res) => {
    try {
        const notify = await notificationService.deleteNotify(req.params.id, req.user.id)
        return res.status(200).json({
            message: 'Delete successful',
            data: notify
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = {
    create,
    getNotifications,
    readNotification,
    deleteNotify
}
