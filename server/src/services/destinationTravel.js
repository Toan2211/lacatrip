const { Op, where } = require('sequelize')
const db = require('../models')
const imageService = require('./image')
const {
    ADMINID,
    EMPLOYEEID,
    SERVICEMANAGERID
} = require('../constants/variable')
const create = async data => {
    try {
        const instance = await db.DestinationTravel.create(data)
        if (data.images) {
            for (let image of data.images) {
                await imageService.create(image.path, instance.id)
            }
        }
        const result = await findOne(instance.id)
        return result
    } catch (error) {
        throw new Error(error)
    }
}
const update = async (id, data) => {
    try {
        const result = await db.DestinationTravel.update(data, {
            where: {
                id: id
            }
        })
        if (result) {
            const destinaton = await findOne(id)
            if (data.images) {
                for (let image of data.images) {
                    await imageService.create(image.path, id)
                }
            }
            return destinaton
        } else return false
    } catch (error) {
        throw new Error(error)
    }
}
const findOne = async id => {
    try {
        const instance = await db.DestinationTravel.findByPk(id, {
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
                },
                {
                    model: db.Itinerary,
                    as: 'itineraries',
                    order: [['Itinerary.step', 'ASC']]
                }
            ],
            order: [
                [
                    { model: db.Itinerary, as: 'itineraries' },
                    'step',
                    'asc'
                ]
            ]
        })
        return instance
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
            roleId,
            minPrice,
            maxPrice
        } = params
        key = key ? key : ''
        page = page ? +page : 1
        limit = limit ? +limit : 10
        minPrice = minPrice ? +minPrice : 0
        maxPrice = maxPrice ? +maxPrice : 99999999
        const includeModels = [
            {
                model: db.Itinerary,
                as: 'itineraries'
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

        let whereParams = {
            price: {
                [Op.between]: [minPrice, maxPrice]
            }
        }
        if (
            +roleId === ADMINID ||
            +roleId === EMPLOYEEID ||
            +roleId === SERVICEMANAGERID
        )
            whereParams = {
                ...whereParams,
                name: {
                    [Op.like]: `%${key}%`
                }
            }
        else
            whereParams = {
                ...whereParams,
                name: {
                    [Op.like]: `%${key}%`
                },
                public: 1
            }
        let orderBy = [
            ['commissionPercent', 'DESC'],
            ['clickCount', 'DESC'],
            [
                { model: db.Itinerary, as: 'itineraries' },
                'step',
                'asc'
            ]
        ]
        if (roleId === ADMINID || roleId === EMPLOYEEID) {
            orderBy = [
                ['createdAt', 'DESC'],
                [
                    { model: db.Itinerary, as: 'itineraries' },
                    'step',
                    'asc'
                ]
            ]
        }
        const { count, rows } =
            await db.DestinationTravel.findAndCountAll({
                offset: (page - 1) * limit,
                limit: +limit,
                include: [...includeModels],
                where: whereParams,
                distinct: true,
                order: orderBy
            })
        return {
            destinationTravels: rows,
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
const togglePublic = async id => {
    try {
        const destination = await db.DestinationTravel.findOne({
            where: { id: id }
        })
        if (destination) {
            await db.DestinationTravel.update(
                { public: !destination.public },
                {
                    where: {
                        id: destination.id
                    }
                }
            )
            destination.public = !destination.public
            return destination
        } else return false
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    create,
    findOne,
    togglePublic,
    update,
    find
}
