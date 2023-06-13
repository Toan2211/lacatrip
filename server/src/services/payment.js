const db = require('../models')

const createPayment = async paymentData => {
    try {
        const payment = await db.Payment.create(paymentData)
        return payment
    } catch (error) {
        throw new Error(error)
    }
}

const getPaymentByBookingId = async bookingId => {
    try {
        const payment = await db.Payment.findOne({
            where: { bookingId }
        })
        return payment
    } catch (error) {
        throw new Error(error)
    }
}

const updatePayment = async (bookingId, updatedData) => {
    try {
        const payment = await db.Payment.findOne({
            where: { bookingId }
        })
        if (!payment) {
            throw new Error('Payment not found')
        }

        await payment.update(updatedData)
        return payment
    } catch (error) {
        throw new Error(error)
    }
}

const deletePayment = async bookingId => {
    try {
        const payment = await db.Payment.findOne({
            where: { bookingId }
        })
        if (!payment) {
            return false
        }

        await payment.destroy()
        return true
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    createPayment,
    getPaymentByBookingId,
    updatePayment,
    deletePayment
}
