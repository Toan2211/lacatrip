const { QueryTypes } = require('sequelize')
const db = require('../models')
const moment = require('moment')

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

const getAmountToPayServiceManager = async () => {
    try {
        const now = moment().startOf('day').format('YYYY-MM-DD')
        let [dataAmount, _] = await db.sequelize.query(`
                SELECT 
                payments.serviceManagerId,
                servicemanagers.paymentAccount as email,
                SUM(CASE WHEN payments.isPayedForServiceManager = false THEN (payments.amount - payments.commissionAmount) ELSE 0 END) AS amount
                FROM
                    payments
                JOIN
                    servicemanagers ON payments.serviceManagerId = servicemanagers.id
                JOIN
                    users ON servicemanagers.userId = users.id
                WHERE
                    payments.payerId IS NOT NULL
                GROUP BY
                    payments.serviceManagerId
                HAVING amount > 100
        `)
        return {
            dataAmount: dataAmount,
            now: now
        }
    } catch (error) {
        throw new Error(error)
    }
}
const updateIsPayedForServiceManager = async (
    serviceManagerId,
    now
) => {
    try {
        await db.sequelize.query(
            `
            UPDATE payments SET isPayedForServiceManager = 1
            WHERE 
            payerId is not null
            and isPayedForServiceManager = 0
            and serviceManagerId = :serviceManagerId
            and createdAt <= :now
        `,
            {
                replacements: {
                    serviceManagerId: serviceManagerId,
                    now: now
                }
            }
        )
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    createPayment,
    getPaymentByBookingId,
    updatePayment,
    deletePayment,
    findPaymentByAttribute,
    getAmountToPayServiceManager,
    updateIsPayedForServiceManager
}
