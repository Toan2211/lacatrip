const db = require('../models')
const imageService = require('./image')
const find = async params => {
    try {
        let { key, page, limit, instanceId } = params
        key = key ? key : ''
        page = page ? +page : 1
        limit = limit ? +limit : 10
        const includeModels = [
            {
                model: db.Image,
                as: 'images'
            },
            {
                model: db.User,
                as: 'user'
            },
            {
                model: db.Restaurant,
                as: 'restaurant'
            },
            {
                model: db.DestinationTravel,
                as: 'destinationTravel'
            },
            {
                model: db.Hotel,
                as: 'hotel'
            }
        ]
        const { count, rows } =
            await db.Comment.findAndCountAll({
                offset: (page - 1) * limit,
                limit: +limit,
                include: [...includeModels],
                where: {
                    instanceId: instanceId
                },
                distinct: true,
                order: [['createdAt', 'DESC']]
            })
        return {
            comments: rows,
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
const create = async data => {
    try {
        const { count, rows } =
        await db.Comment.findAndCountAll({
            where: {
                instanceId: data.instanceId,
                userId: data.userId
            }
        })
        if (count)
            return false
        let comment = await db.Comment.create(data)
        if (data.images) {
            for (let image of data.images) {
                await imageService.create(image.path, comment.id)
            }
        }
        comment = await findOne(comment.id)
        if (comment.restaurant) {
            const restaurant = await db.Restaurant.findByPk(data.instanceId)
            await db.Restaurant.update({
                rating: restaurant.rating ? (restaurant.rating + Number(data.rating)) / 2 : Number(data.rating) ,
                totalRating: restaurant.totalRating + 1
            }, {
                where: {
                    id: data.instanceId
                }
            })
        }
        else if (comment.destinationTravel) {
            const destinationTravel = await db.DestinationTravel.findByPk(data.instanceId)
            await db.DestinationTravel.update({
                rating: destinationTravel.rating ? (destinationTravel.rating + Number(data.rating)) / 2 : Number(data.rating),
                totalRating: destinationTravel.totalRating + 1
            }, {
                where: {
                    id: data.instanceId
                }
            })
        }
        else if (comment.hotel) {
            const hotel = await db.Hotel.findByPk(data.instanceId)
            await db.Hotel.update({
                rating: hotel.rating ? (hotel.rating + Number(data.rating)) / 2 : Number(data.rating),
                totalRating: hotel.totalRating + 1
            }, {
                where: {
                    id: data.instanceId
                }
            })
        }
        return comment
    } catch (error) {
        throw new Error(error)
    }
}
const update = async (id, data) => {
    try {
        const update = await db.Comment.update(data, {
            where: {
                id: id
            }
        })
        if (update) {
            const dataUpdate = await findOne(id)
            return dataUpdate
        }
        return update
    } catch (error) {
        throw new Error(error)
    }
}
const findOne = async id => {
    try {
        const comment = await db.Comment.findByPk(id, {
            include: [
                {
                    model: db.Image,
                    as: 'images'
                },
                {
                    model: db.User,
                    as: 'user'
                },
                {
                    model: db.Restaurant,
                    as: 'restaurant'
                },
                {
                    model: db.DestinationTravel,
                    as: 'destinationTravel'
                },
                {
                    model: db.Hotel,
                    as: 'hotel'
                }
            ]
        })
        return comment
    } catch (error) {
        throw new Error(error)
    }
}
const destroy = async id => {
    try {
        const comment = await db.Comment.destroy({
            where: {
                id: id
            }
        })
        return comment
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    find,
    create,
    update,
    findOne,
    destroy
}
