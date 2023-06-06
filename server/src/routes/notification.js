const express = require('express')
const router = express.Router()
const controller = require('../controllers/notification')
const { verifyToken } = require('../middlewares/auth')

router.post(
    '/',
    verifyToken,
    controller.create
)
router.get(
    '/',
    verifyToken,
    controller.getNotifications
)
router.post(
    '/read',
    verifyToken,
    controller.readNotification
)

module.exports = router