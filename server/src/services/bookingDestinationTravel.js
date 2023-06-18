const { Sequelize, Op } = require('sequelize')
const db = require('../models')

const createBooking = async dataBooking => {
    try {
        let booking = await db.BookingDestinationTravel.create(
            dataBooking
        )
        booking = await db.BookingDestinationTravel.findOne({
            where: { id: booking.id },
            include: [
                {
                    model: db.DestinationTravel,
                    as: 'destinationTravel'
                }
            ]
        })
        return booking
    } catch (error) {
        throw new Error(error)
    }
}

const getBookingById = async bookingId => {
    try {
        const booking = await db.BookingDestinationTravel.findOne({
            where: { id: bookingId },
            include: [
                {
                    model: db.DestinationTravel,
                    as: 'destinationTravel'
                },
                { model: db.User, as: 'user' },
                {
                    model: db.ServiceManager,
                    as: 'serviceManager',
                    include: {
                        model: db.User,
                        required: true,
                        as: 'user',
                        attributes: {
                            exclude: ['password', 'confirmtoken']
                        }
                    }
                }
            ]
        })
        return booking
    } catch (error) {
        throw new Error(error)
    }
}

const getAllBookingsByUser = async ({
    userId,
    date,
    page,
    limit
}) => {
    try {
        page = page ? page : 1
        limit = limit ? limit : 10
        let whereParams = {
            userId: userId
        }
        if (date)
            whereParams = {
                ...whereParams,
                date: {
                    [Sequelize.Op.eq]: new Date(date)
                }
            }
        const { count, rows } = await db.BookingDestinationTravel.findAndCountAll(
            {
                offset: (page - 1) * limit,
                limit: +limit,
                where: whereParams,
                include: [
                    { model: db.DestinationTravel, as: 'destinationTravel' },
                    {
                        model: db.Payment,
                        as: 'payment',
                        where: {
                            payerId: {
                                [Op.not]: null
                            }
                        }
                    },
                    { model: db.User, as: 'user' }
                ],
                order: [['date', 'DESC']],
                distinct: true
            }
        )
        return {
            bookingDestinationTravels: rows,
            pagination: {
                page: +page,
                totalPages: Math.ceil(count / limit),
                totalElements: count,
                size: +limit
            }
        }
    } catch (error) {
        throw new Error('Error retrieving bookings: ' + error.message)
    }
}

const getAllBookings = async ({
    userId,
    date,
    page,
    limit,
    serviceManagerId,
    keyword
}) => {
    try {
        page = page ? page : 1
        limit = limit ? limit : 10
        let whereParams = {
            [Op.or]: [
                {
                    '$destinationTravel.name$': {
                        [Op.like]: `%${keyword}%`
                    }
                },
                {
                    '$user.firstname$': {
                        [Op.like]: `%${keyword}%`
                    }
                },
                {
                    '$user.lastname$': {
                        [Op.like]: `%${keyword}%`
                    }
                },
                {
                    'id': {
                        [Op.like]: `%${keyword}%`
                    }
                }
            ]
        }
        if (userId)
            whereParams = {
                ...whereParams,
                userId: userId
            }
        if (date)
            whereParams = {
                ...whereParams,
                date: {
                    [Sequelize.Op.eq]: new Date(date)
                }
            }
        if (serviceManagerId)
            whereParams = {
                ...whereParams,
                serviceManagerId: serviceManagerId
            }
        const rows = await db.BookingDestinationTravel.findAll(
            {
                offset: (page - 1) * limit,
                limit: +limit,
                include: [
                    { model: db.DestinationTravel, as: 'destinationTravel' },
                    {
                        model: db.Payment,
                        as: 'payment',
                        where: {
                            payerId: {
                                [Op.not]: null
                            }
                        }
                    },
                    {
                        model: db.User,
                        as: 'user'
                    },
                    {
                        model: db.ServiceManager,
                        as: 'serviceManager',
                        include: {
                            model: db.User,
                            required: true,
                            as: 'user',
                            attributes: {
                                exclude: ['password', 'confirmtoken']
                            }
                        }
                    }
                ],
                where: whereParams,
                order: [['date', 'DESC']],
                distinct: true,
                subQuery: false,
            }
        )
        return {
            bookingDestinationTravels: rows,
            pagination: {
                page: +page,
                totalPages: Math.ceil(rows.length / limit),
                totalElements: rows.length,
                size: +limit
            }
        }
    } catch (error) {
        throw new Error('Error retrieving bookings: ' + error.message)
    }
}

module.exports = {
    createBooking,
    getBookingById,
    getAllBookingsByUser,
    getAllBookings
}
