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
                    Payments.serviceManagerId,
                    Users.firstname,
                    Users.lastname,
                    Users.email,
                    Users.phone,
                    SUM(Payments.amount) AS totalAmount,
                    SUM(Payments.commissionAmount) AS totalCommissionAmount,
                    SUM(CASE WHEN Payments.isPayedForServiceManager = false THEN (Payments.amount - Payments.commissionAmount) ELSE 0 END) AS totalCommissionAmountNotYet,
                    DATE_FORMAT(Payments.createdAt, '%Y-%m') AS month
                FROM 
                    Payments
                JOIN 
                    ServiceManagers ON Payments.serviceManagerId = ServiceManagers.id
                JOIN
                    Users ON ServiceManagers.userId = Users.id
                WHERE 
                    Payments.payerId IS NOT NULL
                    AND Payments.createdAt >= :startDate
                    AND Payments.createdAt < :endDate
                    AND Payments.serviceManagerId = :serviceManagerId
                GROUP BY 
                    Payments.serviceManagerId,
                    DATE_FORMAT(Payments.createdAt, '%Y-%m');
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
                    Payments.serviceManagerId,
                    Users.firstname,
                    Users.lastname,
                    Users.email,
                    Users.phone,
                    SUM(Payments.amount) AS totalAmount,
                    SUM(Payments.commissionAmount) AS totalCommissionAmount,
                    SUM(CASE WHEN Payments.isPayedForServiceManager = false THEN (Payments.amount - Payments.commissionAmount) ELSE 0 END) AS totalCommissionAmountNotYet
                FROM 
                Payments
                JOIN 
                    ServiceManagers ON Payments.serviceManagerId = ServiceManagers.id
                JOIN
                    Users ON ServiceManagers.userId = Users.id
                WHERE 
                    Payments.payerId IS NOT NULL
                    AND Payments.createdAt >= :startDate
                    AND Payments.createdAt < :endDate
                GROUP BY 
                    Payments.serviceManagerId                
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
