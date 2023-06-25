const { QueryTypes } = require('sequelize')
const db = require('../models')

const getAllRevenue = async ({
    startDate,
    endDate,
    serviceManagerId
}) => {
    try {
        let dataReturn = []
        if (!startDate) startDate = '1970-01-01'
        if (!endDate) endDate = '2024-01-01'
        if (serviceManagerId)
            dataReturn = await db.sequelize.query(
                `
                    SELECT 
                    payments.serviceManagerId,
                    users.firstname,
                    users.lastname,
                    users.email,
                    users.phone,
                    SUM(payments.amount) AS totalAmount,
                    SUM(payments.commissionAmount) AS totalCommissionAmount,
                    SUM(CASE WHEN payments.isPayedForServiceManager = false THEN (payments.amount - payments.commissionAmount) ELSE 0 END) AS totalCommissionAmountNotYet,
                    DATE_FORMAT(payments.createdAt, '%Y-%m') AS month
                FROM 
                    payments
                JOIN 
                    servicemanagers ON payments.serviceManagerId = servicemanagers.id
                JOIN
                    users ON servicemanagers.userId = users.id
                WHERE 
                    payments.payerId IS NOT NULL
                    AND payments.createdAt >= :startDate
                    AND payments.createdAt < :endDate
                    AND payments.serviceManagerId = :serviceManagerId
                GROUP BY 
                    payments.serviceManagerId,
                    DATE_FORMAT(payments.createdAt, '%Y-%m');
                `,
                {
                    replacements: {
                        startDate: new Date(startDate),
                        endDate: new Date(endDate),
                        serviceManagerId: serviceManagerId
                    },
                    type: QueryTypes.SELECT
                }
            )
        else
            dataReturn = await db.sequelize.query(
                `
                    SELECT 
                    payments.serviceManagerId,
                    users.firstname,
                    users.lastname,
                    users.email,
                    users.phone,
                    SUM(payments.amount) AS totalAmount,
                    SUM(payments.commissionAmount) AS totalCommissionAmount,
                    SUM(CASE WHEN payments.isPayedForServiceManager = false THEN (payments.amount - payments.commissionAmount) ELSE 0 END) AS totalCommissionAmountNotYet
                FROM 
                    payments
                JOIN 
                    servicemanagers ON payments.serviceManagerId = servicemanagers.id
                JOIN
                    users ON servicemanagers.userId = users.id
                WHERE 
                    payments.payerId IS NOT NULL
                    AND payments.createdAt >= :startDate
                    AND payments.createdAt < :endDate
                GROUP BY 
                    payments.serviceManagerId                
                `,
                {
                    replacements: {
                        startDate: new Date(startDate),
                        endDate: new Date(endDate)
                    },
                    type: QueryTypes.SELECT
                }
            )
        return dataReturn
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    getAllRevenue
}
