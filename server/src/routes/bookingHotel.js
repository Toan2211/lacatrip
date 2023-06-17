const express = require('express')
const router = express.Router()
const validate = require('../middlewares/validate')
const validateBooking = require('../validations/bookingHotel')
const controller = require('../controllers/bookingHotel')
const { verifyToken, isSystemUser } = require('../middlewares/auth')
router.get(
    '/',
    verifyToken,
    isSystemUser,
    controller.getAllBookings
)
router.get('/me', verifyToken, controller.getAllBookingsByUser)
router.get('/:id', verifyToken, controller.getBookingById)
router.post(
    '/',
    validateBooking.create(),
    validate,
    verifyToken,
    controller.create
)

module.exports = router
