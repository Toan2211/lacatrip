const { QueryTypes } = require('sequelize')
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

const getAmountToPayServiceManager = async () => {
    try {
        const now = new Date()
            .toISOString()
            .replace('T', ' ')
            .substring(0, 19)
        let [dataAmount, _] = await db.sequelize.query(`
                SELECT 
                Payments.serviceManagerId,
                Servicemanagers.paymentAccount as email,
                SUM(CASE WHEN Payments.isPayedForServiceManager = false THEN (Payments.amount - Payments.commissionAmount) ELSE 0 END) AS amount
                FROM
                    Payments
                JOIN
                    Servicemanagers ON Payments.serviceManagerId = Servicemanagers.id
                JOIN
                    Users ON Servicemanagers.userId = Users.id
                WHERE
                    Payments.payerId IS NOT NULL
                GROUP BY
                    Payments.serviceManagerId
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
    console.log(now)
    try {
        await db.sequelize.query(
            `
            UPDATE Payments SET isPayedForServiceManager = 1
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
