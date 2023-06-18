const db = require('../models')
const create = async data => {
    try {
        let room = await db.Room.create({
            hotelId: data.hotelId,
            title: data.title,
            description: data.description,
            price: data.price,
            originalPrice: data.originalPrice,
            childrenCount: data.childrenCount,
            adultCount: data.adultCount,
            bedCount: data.bedCount,
            area: data.area,
            image: data.image
        })
        if (typeof data.roomNo === 'object') {
            for (const roomNo of data.roomNo) {
                if (roomNo) {
                    await db.RoomDetail.create({
                        roomNo: roomNo,
                        hotelId: data.hotelId,
                        roomTypeId: room.id
                    })
                }
            }
        } else {
            await db.RoomDetail.create({
                roomNo: data.roomNo,
                hotelId: data.hotelId,
                roomTypeId: room.id
            })
        }
        room = await findOne(room.id)
        return room
    } catch (error) {
        throw new Error(error)
    }
}
const update = async (id, data) => {
    try {
        const result = await db.Room.update(data, {
            where: {
                id: id
            }
        })
        let room = false
        if (result) room = await findOne(id)
        return room
    } catch (error) {
        throw new Error(error)
    }
}
const findOne = async id => {
    try {
        const room = await db.Room.findByPk(id, {
            include: [
                {
                    model: db.Hotel,
                    as: 'hotel',
                    include: {
                        model: db.ServiceManager,
                        as: 'serviceManager'
                    }
                },
                {
                    model: db.RoomDetail,
                    as: 'roomDetails'
                }
            ]
        })
        return room
    } catch (error) {
        throw new Error(error)
    }
}
const findByHotelId = async (hotelId, page, limit) => {
    try {
        const { count, rows } = await db.Room.findAndCountAll({
            offset: (page - 1) * limit,
            limit: +limit,
            include: [
                {
                    model: db.Hotel,
                    as: 'hotel'
                },
                {
                    model: db.RoomDetail,
                    as: 'roomDetails'
                }
            ],
            where: {
                hotelId: hotelId
            },
            distinct: true
        })
        return {
            rooms: rows,
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
const destroy = async id => {
    try {
        const result = await db.Room.destroy({
            where: {
                id: id
            }
        })
        return result
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    create,
    findOne,
    destroy,
    findByHotelId,
    update
}
