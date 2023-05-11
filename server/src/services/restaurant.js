const { Op, where } = require('sequelize')
const db = require('../models')
const imageService = require('./image')
const create = async data => {
    try {
        const dataRestaurant = {
            name: data.name,
            description: data.description,
            phone: data.phone,
            website: data.website,
            longtitude: data.longtitude,
            latitude: data.latitude,
            address: data.address,
            provinceId: data.provinceId,
            serviceManagerId: data.serviceManagerId,
            minPrice: data.minPrice,
            maxPrice: data.maxPrice,
            cusines: data.cusines,
            specialDiets: data.specialDiets,
            limitBookPerDay: data.limitBookPerDay
        }
        const restaurant = await db.Restaurant.create(dataRestaurant)
        if (data.images) {
            for (let image of data.images) {
                await imageService.create(image.path, restaurant.id)
            }
        }
        const restaurantResult = await findOne(restaurant.id)
        return restaurantResult
    } catch (error) {
        throw new Error(error)
    }
}
const find = async params => {
    try {
        let { key, page, limit, serviceManagerId, provinceId } =
            params
        key = key ? key : ''
        page = page ? +page : 1
        limit = limit ? +limit : 10
        const includeModels = [
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
                    // required: true,
                    as: 'user',
                    attributes: {
                        exclude: ['password', 'confirmtoken']
                    }
                }
                // include: {
                //     model: db.User,
                //     required: true,
                //     as: 'user',
                //     attributes: {
                //         exclude: ['password', 'confirmtoken']
                //     }
                // }
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
        const { count, rows } = await db.Restaurant.findAndCountAll({
            offset: (page - 1) * limit,
            limit: +limit,
            include: [...includeModels],
            where: {
                name: {
                    [Op.like]: `%${key}%`
                }
            },
            distinct: true
        })
        return {
            restaurants: rows,
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
const findOne = async id => {
    try {
        const hotel = await db.Restaurant.findByPk(id, {
            include: [
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
                }
            ]
        })
        return hotel
    } catch (error) {
        throw new Error(error)
    }
}
const update = async (id, data) => {
    try {
        const restaurant = await findOne(id)
        if (!restaurant.id) return false
        if (data.images) {
            for (let image of data.images) {
                await imageService.create(image.path, restaurant.id)
            }
        }
        await db.Restaurant.update(data, {
            where: {
                id: id
            }
        })
        const rsresult = await findOne(id)
        return rsresult
    } catch (error) {
        throw new Error(error)
    }
}
const togglePublic = async restaurantId => {
    try {
        const restaurant = await db.Restaurant.findOne({
            where: { id: restaurantId }
        })
        if (restaurant) {
            await db.Restaurant.update(
                { public: !restaurant.public },
                {
                    where: {
                        id: restaurant.id
                    }
                }
            )
            restaurant.public = !restaurant.public
            return restaurant
        } else return false
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    create,
    findOne,
    update,
    find,
    togglePublic
}
