const paypal = require('paypal-rest-sdk')
const bookingHotelService = require('../services/bookingHotel')
const paymentService = require('../services/payment')
require('dotenv').config()
paypal.configure({
    mode: 'sandbox', //sandbox or live
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET
})
const createPayment = async (req, res) => {
    // return res.redirect('http://localhost:5173/')
    // const { bookingId, paymentId } = req.body
    const bookingDB = await bookingHotelService.createBooking(req.body.bookingData)
    const paymentDB = await paymentService.createPayment(req.body.paymentData)
    const payment = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        redirect_urls: {
            return_url:`${process.env.NODE_API}/api/payment-paypal/success`,
            cancel_url: `${process.env.NODE_API}/api/payement-paypal/cancel` // Replace with your cancel URL
        },
        transactions: [
            {
                amount: {
                    total: req.body.paymentData.amount, // Replace with the booking amount
                    currency: 'USD' // Replace with the currency code
                },
                description: 'Hotel booking payment' // Replace with your payment description
            }
        ]
    }

    paypal.payment.create(payment, async function (error, payment) {
        if (error) {
            return res.status(500).json({ message: error })
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    return res.json(payment)
                }
            }
        }
    })
}
const successPaymentPaypal = async (req, res) => {
    const payerId = req.query.PayerID
    const paymentId = req.query.paymentId

    const execute_payment_json = {
        payer_id: payerId
    }
    paypal.payment.execute(
        paymentId,
        execute_payment_json,
        function (error, payment) {
            if (error) {
                console.log(error.response)
                throw error
            } else {
                return res.json(payment)
            }
        }
    )
}
module.exports = {
    createPayment,
    successPaymentPaypal
}
