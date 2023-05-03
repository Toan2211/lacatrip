const db = require('../models')
const create = async data => {
    try {
        const room = await db.Room.create(data)
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
        if(result)
            room = await findOne(id)
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
const findByHotelId = async (hoteId, page, limit) => {
    try {
        const { count, rows } = await db.Room.findAndCountAll({
            offset: (page - 1) * limit,
            limit: +limit,
            include: {
                model: db.Hotel,
                as: 'hotel'
            },
            where: {
                hoteId: hoteId
            }

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
        const result = await db.Room.destroy(id)
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
