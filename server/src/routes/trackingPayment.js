const express = require('express')
const router = express.Router()
const controller = require('../controllers/trackingPayment')
const { verifyToken, isAdmin } = require('../middlewares/auth')
router.get('/', verifyToken, isAdmin, controller.find)
module.exports = router
