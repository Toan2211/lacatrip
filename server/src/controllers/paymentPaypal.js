const paypal = require('paypal-rest-sdk')
const bookingHotelService = require('../services/bookingHotel')
const paymentService = require('../services/payment')
const notificationService = require('../services/notification')
const serviceManagerService = require('../services/servicemanager')
const bookingDestinationTravelService = require('../services/bookingDestinationTravel')
const trackingPayment = require('../services/trackingPayment')
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
    const bookingDestinationId = req.query.bookingDestinationId
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
                const bookingIdFinal = bookingId
                    ? bookingId
                    : bookingDestinationId
                await bookingHotelService.deleteBooking(
                    bookingIdFinal
                )
                await paymentService.deletePayment({
                    bookingId: bookingIdFinal,
                    paymentId: paymentId
                })
                return res.redirect(
                    `${process.env.REACT_API}/payment/fail?content=expiredTime`
                )
            } else {
                paypal.payment.execute(
                    paymentId,
                    execute_payment_json,
                    async function (error, payment) {
                        if (error) {
                            return res.redirect(
                                `${process.env.REACT_API}/payment/fail?content=${error.response}`
                            )
                        } else {
                            let booking = null
                            let url = null
                            let message = null
                            if (bookingId) {
                                booking =
                                    await bookingHotelService.getBookingById(
                                        bookingId
                                    )
                                url = `system/booking-hotel/?keyword=${booking.id}`
                                message = `${booking.user.firstname} ${booking.user.lastname} already booked rooms in ${booking.hotel.name}. Please check !`
                            } else {
                                booking =
                                    await bookingDestinationTravelService.getBookingById(
                                        bookingDestinationId
                                    )
                                url = `system/booking-destination-travel/?keyword=${booking.id}`
                                message = `${booking.user.firstname} ${booking.user.lastname} already booked ${booking.countPeople} ticket ${booking.destinationTravel.name}. Please check !`
                            }
                            await paymentService.updatePayment(
                                {
                                    paymentId: paymentId,
                                    bookingId: booking.id
                                },
                                {
                                    payerId: payerId
                                }
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
                                        url: url,
                                        message: message
                                    }
                                )
                            return res.redirect(
                                `${process.env.REACT_API}/payment/success?notificationId=${notify.id}`
                            )
                        }
                    }
                )
            }
        }
    })
}
const payOutToServiceManager = async (req, res) => {
    try {
        const { dataAmount, now } =
            await paymentService.getAmountToPayServiceManager()
        if (dataAmount.length > 0) {
            dataAmount.forEach(payment => {
                console.log(payment)
                const payout = {
                    sender_batch_header: {
                        sender_batch_id:
                            'batch_' +
                            Math.random().toString(36).substring(9),
                        email_subject: 'You have received a payment'
                    },
                    items: [
                        {
                            recipient_type: 'EMAIL',
                            amount: {
                                value: payment.amount,
                                currency: 'USD'
                            },
                            receiver: payment.email,
                            note: 'Payment money of booking.'
                        }
                    ]
                }
                paypal.payout.create(
                    payout,
                    async function (error, payout) {
                        if (error) {
                            console.error(error.response)
                        } else {
                            await paymentService.updateIsPayedForServiceManager(
                                payment.serviceManagerId,
                                now
                            )
                            await trackingPayment.create({
                                serviceManagerId:
                                    payment.serviceManagerId,
                                paymentAccount: payment.email,
                                amount: payment.amount
                            })
                            console.log(
                                'update success',
                                payment.serviceManagerId
                            )
                        }
                    }
                )
            })
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    createPayment,
    successPaymentPaypal,
    payOutToServiceManager
}
