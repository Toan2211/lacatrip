const db = require('../models')
const create = async data => {
    try {
        const roomArr = []
        for (const roomNo of data.roomNo) {
            if (roomNo) {
                const room = await db.Room.create({
                    roomNo: roomNo,
                    hotelId: data.hotelId,
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    originalPrice: data.originalPrice,
                    maxPeople: data.maxPeople
                })
                roomArr.push(room)
            }
        }
        return roomArr
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
            include: {
                model: db.Hotel,
                as: 'hotel',
                include: {
                    model: db.ServiceManager,
                    as: 'serviceManager'
                }
            }
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
            include: {
                model: db.Hotel,
                as: 'hotel'
            },
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
