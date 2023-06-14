const paypal = require('paypal-rest-sdk')
const bookingHotelService = require('../services/bookingHotel')
const paymentService = require('../services/payment')
const notificationService = require('../services/notification')
const serviceManagerService = require('../services/servicemanager')
require('dotenv').config()
paypal.configure({
    mode: 'sandbox', //sandbox or live
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET
})
const createPayment = async (req, res) => {}
const successPaymentPaypal = async (req, res) => {
    const payerId = req.query.PayerID
    const paymentId = req.query.paymentId
    const bookingId = req.query.bookingId

    const execute_payment_json = {
        payer_id: payerId
    }

    paypal.payment.get(paymentId, async (error, payment) => {
        if (error) {
            console.error(error)
        } else {
            const createTime = new Date(payment.create_time)
            if (
                new Date() - createTime >
                process.env.LIMITED_TIME_PAYMENT
            ) {
                await bookingHotelService.deleteBooking(bookingId)
                await paymentService.deletePayment({
                    bookingId: bookingId,
                    paymentId: paymentId
                })
                return res.json({
                    error: 'payment expired'
                })
            } else {
                paypal.payment.execute(
                    paymentId,
                    execute_payment_json,
                    async function (error, payment) {
                        if (error) {
                            console.log(error.response)
                            throw error
                        } else {
                            await paymentService.updatePayment(
                                {
                                    paymentId: paymentId,
                                    bookingId: bookingId
                                },
                                {
                                    payerId: payerId
                                }
                            )
                            const booking =
                                await bookingHotelService.getBookingById(
                                    bookingId
                                )
                            const serviceManager =
                                await serviceManagerService.findOne(
                                    booking.serviceManagerId
                                )
                            const notify =
                                await notificationService.createNotifyBooking(
                                    {
                                        senderId: booking.userId,
                                        receiverId:
                                            serviceManager.userId,
                                        tripId: null,
                                        url: `/booking-hotel/${booking.id}`,
                                        message: `${booking.user.firstname} ${booking.user.lastname} already booked rooms in ${booking.hotel.name}. Please check !`
                                    }
                                )
                            return res.json(notify)
                        }
                    }
                )
            }
        }
    })
}
module.exports = {
    createPayment,
    successPaymentPaypal
}
