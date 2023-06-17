const express = require('express')
const router = express.Router()
const controller = require('../controllers/paymentPaypal')
const { verifyToken } = require('../middlewares/auth')

router.get(
    '/',
    // verifyToken,
    controller.createPayment
)
router.get(
    '/success',
    controller.successPaymentPaypal
)

module.exports = router