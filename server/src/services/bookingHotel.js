const { Sequelize, Op } = require('sequelize')
const db = require('../models')
const paymentService = require('./payment')
const roomDetailService = require('./roomdetail')
const notificationService = require('./notification')

const getAllBookings = async ({
    userId,
    checkInDate,
    checkOutDate,
    page,
    limit,
    serviceManagerId
}) => {
    try {
        page = page ? page : 1
        limit = limit ? limit : 10
        let whereParams = {}
        if (userId)
            whereParams = {
                ...whereParams,
                userId: userId
            }
        if (!checkInDate) checkInDate = '1970-01-01'
        if (!checkOutDate) checkOutDate = '2100-01-01'
        if (checkInDate && checkOutDate)
            whereParams = {
                ...whereParams,
                checkIn: {
                    [Sequelize.Op.gte]: new Date(checkInDate)
                },
                checkOut: {
                    [Sequelize.Op.lte]: new Date(checkOutDate)
                }
            }
        if (serviceManagerId)
            whereParams = {
                ...whereParams,
                serviceManagerId: serviceManagerId
            }
        const { count, rows } = await db.BookingHotel.findAndCountAll(
            {
                offset: (page - 1) * limit,
                limit: +limit,
                where: whereParams,
                include: [
                    { model: db.Hotel, as: 'hotel' },
                    { model: db.Room, as: 'roomType' },
                    {
                        model: db.Payment,
                        as: 'payment',
                        where: {
                            payerId: {
                                [Op.not]: null
                            }
                        }
                    },
                    { model: db.User, as: 'user' },
                    { model: db.RoomDetail, as: 'roomDetails' },
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
                order: [['checkIn', 'DESC']],
                distinct: true
            }
        )
        return {
            bookingHotels: rows,
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

const createBooking = async bookingData => {
    try {
        let booking = await db.BookingHotel.create(bookingData)
        for (const roomDetailId of bookingData.roomDetailIds) {
            const roomDetail =
                await roomDetailService.getRoomDetailById(
                    roomDetailId
                )
            await booking.addRoomDetail(roomDetail)
        }
        booking = await db.BookingHotel.findOne({
            where: { id: booking.id },
            include: [
                { model: db.Hotel, as: 'hotel' },
                { model: db.Room, as: 'roomType' },
                { model: db.RoomDetail, as: 'roomDetails' }
            ]
        })
        // const notify = await notificationService.createNotifyBooking({
        //     senderId: booking.userId,
        //     receiverId: booking.serviceManagerId,
        //     tripId: null,
        //     url: `/booking-hotel/${booking.id}`,
        //     message: `${booking.user.firstname} ${booking.user.lastname} already booked rooms in ${booking.hotel.name}. Please check !`
        // })
        return booking
    } catch (error) {
        throw new Error(error)
    }
}
const getAllBookingsByUser = async ({
    userId,
    checkInDate,
    checkOutDate,
    page,
    limit
}) => {
    try {
        page = page ? page : 1
        limit = limit ? limit : 10
        let whereParams = {
            userId: userId
        }
        if (!checkInDate) checkInDate = '1970-01-01'
        if (!checkOutDate) checkOutDate = '2100-01-01'
        if (checkInDate && checkOutDate)
            whereParams = {
                ...whereParams,
                checkIn: {
                    [Sequelize.Op.gte]: new Date(checkInDate)
                },
                checkOut: {
                    [Sequelize.Op.lte]: new Date(checkOutDate)
                }
            }
        const { count, rows } = await db.BookingHotel.findAndCountAll(
            {
                offset: (page - 1) * limit,
                limit: +limit,
                where: whereParams,
                include: [
                    { model: db.Hotel, as: 'hotel' },
                    { model: db.Room, as: 'roomType' },
                    {
                        model: db.Payment,
                        as: 'payment',
                        where: {
                            payerId: {
                                [Op.not]: null
                            }
                        }
                    },
                    { model: db.User, as: 'user' },
                    { model: db.RoomDetail, as: 'roomDetails' }
                ],
                order: [['checkIn', 'DESC']],
                distinct: true
            }
        )
        return {
            bookingHotels: rows,
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
const getBookingById = async bookingId => {
    try {
        const booking = await db.BookingHotel.findOne({
            where: { id: bookingId },
            include: [
                { model: db.Hotel, as: 'hotel' },
                { model: db.Room, as: 'roomType' },
                // { model: db.Payment, as: 'payment' },
                { model: db.User, as: 'user' },
                { model: db.RoomDetail, as: 'roomDetails' }
            ]
        })
        return booking
    } catch (error) {
        throw new Error(error)
    }
}

const updateBooking = async (bookingId, updatedData) => {
    try {
        const booking = await db.BookingHotel.findByPk(bookingId)
        if (!booking) {
            throw new Error('Booking not found')
        }
        await booking.update(updatedData)
        return booking
    } catch (error) {
        throw new Error(error)
    }
}

const deleteBooking = async bookingId => {
    try {
        const booking = await db.BookingHotel.findByPk(bookingId)
        if (!booking) {
            return false
        }

        await booking.destroy()
        return true
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    createBooking,
    getBookingById,
    updateBooking,
    deleteBooking,
    getAllBookingsByUser,
    getAllBookings
}
