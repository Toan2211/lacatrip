const { Op, where, sequelize, QueryTypes } = require('sequelize')
const db = require('../models')
const imageService = require('./image')
const {
    ADMINID,
    EMPLOYEEID,
    SERVICEMANAGERID
} = require('../constants/variable')
const create = async data => {
    try {
        const dataHotel = {
            name: data.name,
            description: data.description,
            descriptionVN: data.descriptionVN,
            phone: data.phone,
            hotelClass: data.hotelClass,
            hotelStyle: data.hotelStyle,
            cheapestPrice: data.cheapestPrice,
            provinceId: data.provinceId,
            serviceManagerId: data.serviceManagerId,
            longtitude: data.longtitude,
            latitude: data.latitude,
            address: data.address,
            commissionPercent:
                data.commissionPercent >= 10
                    ? data.commissionPercent
                    : 10
        }
        const hotel = await db.Hotel.create(dataHotel)
        if (data.amenitiesIds) {
            if (typeof data.amenitiesIds !== 'object')
                data.amenitiesIds = [data.amenitiesIds]
            await addAmenitiesOfHotel(hotel.id, data.amenitiesIds)
        }
        if (data.images) {
            for (let image of data.images) {
                await imageService.create(image.path, hotel.id)
            }
        }
        const hotelWithAllData = await findOne(hotel.id)
        return hotelWithAllData
    } catch (error) {
        throw new Error(error)
    }
}
const update = async (id, data) => {
    try {
        let temp
        const hotel = await db.Hotel.findByPk(id, {
            include: [
                {
                    model: db.AmenitiesHotel,
                    as: 'amenitieshotel'
                }
            ]
        })
        if (hotel) {
            if (data.images) {
                for (let image of data.images) {
                    await imageService.create(image.path, hotel.id)
                }
            }
            if (data.amenitiesIds) {
                if (typeof data.amenitiesIds !== 'object')
                    data.amenitiesIds = [data.amenitiesIds]
                for (let element of hotel.amenitieshotel) {
                    if (!data.amenitiesIds.includes(element.id)) {
                        temp = await db.AmenitiesHotel.findOne({
                            where: { id: element.id }
                        })
                        await hotel.removeAmenitieshotel(temp)
                    }
                }
                for (let id of data.amenitiesIds) {
                    if (!hotel.amenitieshotel.includes(id)) {
                        temp = await db.AmenitiesHotel.findOne({
                            where: { id: id }
                        })
                        await hotel.addAmenitieshotel(temp)
                    }
                }
            }
            await db.Hotel.update(data, {
                where: {
                    id: id
                }
            })
            const hotelUpdated = await findOne(id)
            return hotelUpdated
        }
        return false
    } catch (error) {
        throw new Error(error)
    }
}
const find = async params => {
    try {
        let {
            key,
            page,
            limit,
            serviceManagerId,
            provinceId,
            roleId
        } = params
        key = key ? key : ''
        page = page ? +page : 1
        limit = limit ? +limit : 10
        const includeModels = [
            {
                model: db.AmenitiesHotel,
                as: 'amenitieshotel'
            },
            {
                model: db.Image,
                as: 'images'
            }
        ]
        if (serviceManagerId)
            includeModels.push({
                model: db.ServiceManager,
                as: 'serviceManager',
                include: {
                    model: db.User,
                    required: true,
                    as: 'user',
                    attributes: {
                        exclude: ['password', 'confirmtoken']
                    }
                },
                where: {
                    id: serviceManagerId
                }
            })
        else
            includeModels.push({
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
            })
        if (provinceId)
            includeModels.push({
                model: db.Province,
                as: 'province',
                where: {
                    id: provinceId
                }
            })
        else
            includeModels.push({
                model: db.Province,
                as: 'province'
            })
        let whereParams
        if (
            +roleId === ADMINID ||
            +roleId === EMPLOYEEID ||
            +roleId === SERVICEMANAGERID
        )
            whereParams = {
                name: {
                    [Op.like]: `%${key}%`
                }
            }
        else
            whereParams = {
                name: {
                    [Op.like]: `%${key}%`
                },
                public: 1
            }

        const { count, rows } = await db.Hotel.findAndCountAll({
            offset: (page - 1) * limit,
            limit: +limit,
            include: [...includeModels],
            where: whereParams,
            distinct: true,
            order: [
                ['commissionPercent', 'DESC'],
            ]
        })
        return {
            hotels: rows,
            pagination: {
                page: page,
                totalPages: Math.ceil(count / limit),
                totalElements: count,
                size: limit
            }
        }
    } catch (error) {
        throw new Error(error)
    }
}
const findByServiceManager = async (
    serviceManagerId,
    page,
    limit
) => {
    try {
        const { count, rows } = await db.Hotel.findAndCountAll({
            offset: (page - 1) * limit,
            limit: +limit,
            include: [
                {
                    model: db.AmenitiesHotel,
                    as: 'amenitieshotel'
                },
                {
                    model: db.ServiceManager,
                    as: 'serviceManager',
                    where: {
                        id: serviceManagerId
                    }
                },
                {
                    model: db.Image,
                    as: 'images'
                },
                {
                    model: db.Province,
                    as: 'province'
                }
            ]
        })
        return {
            hotels: rows,
            pagination: {
                page: page,
                totalPages: Math.ceil(count / limit),
                totalElements: count,
                size: limit
            }
        }
    } catch (error) {
        throw new Error(error)
    }
}
const findByProvince = async (provinceId, page, limit) => {
    try {
        const { count, rows } = await db.Hotel.findAndCountAll({
            offset: (page - 1) * limit,
            limit: +limit,
            include: [
                {
                    model: db.AmenitiesHotel,
                    as: 'amenitieshotel'
                },
                {
                    model: db.ServiceManager,
                    as: 'serviceManager'
                },
                {
                    model: db.Image,
                    as: 'images'
                },
                {
                    model: db.Province,
                    as: 'province',
                    where: {
                        id: provinceId
                    }
                }
            ],
            order: [
                ['commissionPercent', 'DESC'],
            ]
        })
        return {
            hotels: rows,
            pagination: {
                page: page,
                totalPages: Math.ceil(count / limit),
                totalElements: count,
                size: limit
            }
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getAvailableRooms = async query => {
    //Rooms DB
    //childrenCount
    //adultCount

    //query: countAdults, countChildrens, countRooms, hotelId

    try {
        const {
            checkIn,
            checkOut,
            countAdults,
            countChildrens,
            countRooms,
            hotelId
        } = query
        const includeParams = []
        if (query.checkIn) {
            const RoomDetailList = await db.sequelize.query(
                `SELECT BookingHotel_RoomDetail.RoomDetailId FROM BookingHotels
                left join BookingHotel_RoomDetail on BookingHotels.id=BookingHotel_RoomDetail.BookingHotelId
                left join RoomDetails on RoomDetails.id=BookingHotel_RoomDetail.RoomDetailId
                where BookingHotels.hotelId=:hotelId
                and checkIn>=:checkIn
                and checkOut<=:checkOut
                `,
                {
                    replacements: {
                        hotelId: hotelId,
                        checkIn,
                        checkOut
                    },
                    type: QueryTypes.SELECT
                }
            )
            const roomDetailIdBusy = RoomDetailList.map(
                item => item.RoomDetailId
            )
            includeParams.push({
                model: db.Room,
                as: 'rooms',
                include: {
                    model: db.RoomDetail,
                    as: 'roomDetails',
                    where: {
                        id: {
                            [Op.notIn]: roomDetailIdBusy
                        }
                    }
                }
            })
        } else {
            includeParams.push({
                model: db.Room,
                as: 'rooms',
                include: {
                    model: db.RoomDetail,
                    as: 'roomDetails'
                }
            })
        }

        let hotel = await db.Hotel.findByPk(hotelId, {
            include: includeParams
        })
        hotel = hotel.toJSON()
        if (countRooms) {
            let countAdultsQuery = 0
            let countChildrensQuery = 0
            let countRoomDetailQuery = 0
            for (const room of hotel.rooms) {
                countAdultsQuery +=
                    room.roomDetails.length * room.adultCount
                countChildrensQuery +=
                    room.roomDetails.length * room.childrenCount
                countRoomDetailQuery += room.roomDetails.length
            }
            if (
                !(
                    countAdultsQuery + countChildrensQuery >=
                        +countAdults + +countChildrens &&
                    countAdultsQuery >= +countAdults &&
                    countRoomDetailQuery >= +countRooms
                )
            ) {
                for (const room of hotel.rooms) {
                    room.roomDetails = []
                }
            }
        }

        return hotel.rooms
    } catch (error) {
        throw new Error(error)
    }
}

const findOne = async id => {
    try {
        const [hotel] = await db.Hotel.findAll({
            where: {
                id: id
            },
            include: [
                {
                    model: db.AmenitiesHotel,
                    as: 'amenitieshotel'
                },
                {
                    model: db.ServiceManager,
                    as: 'serviceManager'
                },
                {
                    model: db.Image,
                    as: 'images'
                },
                {
                    model: db.Province,
                    as: 'province'
                },
                {
                    model: db.Room,
                    as: 'rooms',
                    include: {
                        model: db.RoomDetail,
                        as: 'roomDetails'
                    }
                }
            ]
        })
        return hotel.toJSON()
    } catch (error) {
        throw new Error(error)
    }
}
const addAmenitiesOfHotel = async (hotelId, amenitiesIds) => {
    try {
        const hotel = await db.Hotel.findOne({
            where: { id: hotelId }
        })
        if (hotel) {
            for (let amenityId of amenitiesIds) {
                const amenity = await db.AmenitiesHotel.findOne({
                    where: { id: amenityId }
                })
                await hotel.addAmenitieshotel(amenity)
            }
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error(error)
    }
}
const removeAmenitiesOfHotel = async (hotelId, amenitiesIds) => {
    try {
        const hotel = await db.Hotel.findOne({
            where: { id: hotelId }
        })
        if (hotel) {
            for (let amenityId of amenitiesIds) {
                const amenity = await db.AmenitiesHotel.findOne({
                    where: { id: amenityId }
                })
                await hotel.removeAmenitieshotel(amenity)
            }
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error(error)
    }
}
const togglePublic = async hotelId => {
    try {
        const hotel = await db.Hotel.findOne({
            where: { id: hotelId }
        })
        if (hotel) {
            await db.Hotel.update(
                { public: !hotel.public },
                {
                    where: {
                        id: hotel.id
                    }
                }
            )
            hotel.public = !hotel.public
            return hotel
        } else return false
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    create,
    addAmenitiesOfHotel,
    removeAmenitiesOfHotel,
    findOne,
    togglePublic,
    update,
    find,
    findByServiceManager,
    findByProvince,
    getAvailableRooms
}
