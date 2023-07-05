const { Sequelize, Op, QueryTypes } = require('sequelize')
const db = require('../models')
const paymentService = require('./payment')
const roomDetailService = require('./roomdetail')
const notificationService = require('./notification')
const roomService = require('./room')
const getAllBookings = async ({
    userId,
    checkIn,
    checkOut,
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
                    '$hotel.name$': {
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
                    id: {
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
        if (!checkIn) checkIn = '1970-01-01'
        if (!checkOut) checkOut = '2100-01-01'
        if (checkIn && checkOut)
            whereParams = {
                ...whereParams,
                checkIn: {
                    [Sequelize.Op.gte]: new Date(checkIn)
                },
                checkOut: {
                    [Sequelize.Op.lte]: new Date(checkOut)
                }
            }
        if (serviceManagerId)
            whereParams = {
                ...whereParams,
                serviceManagerId: serviceManagerId
            }
        const rows = await db.BookingHotel.findAll({
            offset: (page - 1) * limit,
            limit: +limit,
            include: [
                {
                    model: db.Hotel,
                    as: 'hotel'
                },
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
                {
                    model: db.User,
                    as: 'user'
                },
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
            where: whereParams,
            order: [['checkIn', 'DESC']],
            distinct: true,
            subQuery: false
        })
        return {
            bookingHotels: rows,
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

const createBooking = async bookingData => {
    try {
        const RoomDetailList = await db.sequelize.query(
            `SELECT BookingHotel_RoomDetail.RoomDetailId FROM BookingHotels
            left join BookingHotel_RoomDetail on BookingHotels.id=BookingHotel_RoomDetail.BookingHotelId
            left join RoomDetails on RoomDetails.id=BookingHotel_RoomDetail.RoomDetailId
            where BookingHotels.hotelId=:hotelId
            and checkIn>=:checkIn
            and checkOut<=:checkOut
            and BookingHotels.roomTypeId=:roomTypeId
            and BookingHotel_RoomDetail.RoomDetailId is not null
            `,
            {
                replacements: {
                    hotelId: bookingData.hotelId,
                    checkIn: bookingData.checkIn,
                    checkOut: bookingData.checkOut,
                    roomTypeId: bookingData.roomTypeId
                },
                type: QueryTypes.SELECT
            }
        )
        const roomDetailIdBusy = RoomDetailList.map(
            item => item.RoomDetailId
        )
        let roomType = await roomService.findOne(
            bookingData.roomTypeId
        )
        roomType = roomType.toJSON()
        const roomAvailable = roomType.roomDetails
            .map(room => room.id)
            .filter(id => !roomDetailIdBusy.includes(id))

        if (roomAvailable.length < bookingData.countRooms)
            return false
        bookingData.amount = roomType.price * Number(bookingData.lengthDay) *Number(bookingData.countRooms)
        let booking = await db.BookingHotel.create(bookingData)
        for(let i = 0; i < bookingData.countRooms; i++) {
            const roomDetail =
                await roomDetailService.getRoomDetailById(
                    roomAvailable[i]
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
