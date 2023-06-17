const db = require('../models')

const createPayment = async paymentData => {
    try {
        const payment = await db.Payment.create(paymentData)
        return payment
    } catch (error) {
        throw new Error(error)
    }
}

const findPaymentByAttribute = async params => {
    try {
        const payment = await db.Payment.findOne({
            where: params
        })
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

const updatePayment = async (params, updatedData) => {
    try {
        const payment = await db.Payment.findOne({
            where: params
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

const deletePayment = async params => {
    try {
        const payment = await db.Payment.findOne({
            where: params
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
    deletePayment,
    findPaymentByAttribute
}
