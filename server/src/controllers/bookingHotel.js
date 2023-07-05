const bookingHotelService = require('../services/bookingHotel')
const paymentService = require('../services/payment')
const paypal = require('paypal-rest-sdk')
require('dotenv').config()
paypal.configure({
    mode: 'sandbox', //sandbox or live
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET
})
const create = async (req, res) => {
    try {
        req.body.userId = req.user.id
        const booking = await bookingHotelService.createBooking(
            req.body
        )
        if (!booking)
            return res.status(402).json({ message: 'Booking Failed. The Room Of Hotel Is Full' })
        // return res.status(200).json({
        //     message: 'Booking successful - Please payment !'
        //     data: booking
        // })
        const description = `Payment ${booking.countRooms} ${booking?.roomType?.title} in ${booking.hotel.name}`
        const payment = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url: `${process.env.NODE_API}/api/payment-paypal/success?bookingId=${booking.id}`,
                cancel_url: `${process.env.NODE_API}/api/payment-paypal/cancel?bookingId=${booking.id}`
            },
            transactions: [
                {
                    amount: {
                        total: booking.amount.toString(),
                        currency: 'USD'
                    },
                    description: description
                }
            ]
        }

        paypal.payment.create(
            payment,
            async function (error, payment) {
                if (error) {
                    return res.status(500).json({ message: error })
                } else {
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            await paymentService.createPayment({
                                bookingId: booking.id,
                                paymentId: payment.id,
                                amount: booking.amount,
                                serviceManagerId: booking.serviceManagerId,
                                commissionAmount: Math.ceil((booking.amount*booking.hotel.commissionPercent)/100)
                            })
                            return res.json({
                                linkPayment: payment.links[i].href
                            })
                        }
                    }
                }
            }
        )
        // return res.status(200).json({
        //     message: 'Booking successful - Please payment !',
        //     data: booking
        // })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const getAllBookingsByUser = async (req, res) => {
    try {
        req.query.userId = req.user.id
        const bookings =
            await bookingHotelService.getAllBookingsByUser(req.query)
        return res.status(200).json({
            message: 'Get all booking by user!',
            data: bookings
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const getBookingById = async (req, res) => {
    try {
        const booking = await bookingHotelService.getBookingById(
            req.params.id
        )
        return res.status(200).json({
            message: 'Get booking successful!',
            data: booking
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const getAllBookings = async (req, res) => {
    try {
        // req.query.userId = req.user.id
        const bookings =
            await bookingHotelService.getAllBookings(req.query)
        return res.status(200).json({
            message: 'Get all booking !',
            data: bookings
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = {
    create,
    getAllBookingsByUser,
    getBookingById,
    getAllBookings
}
