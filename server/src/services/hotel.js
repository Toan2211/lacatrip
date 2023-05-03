const { Op } = require('sequelize')
const db = require('../models')
const imageService = require('./image')
const create = async data => {
    try {
        const dataHotel = {
            name: data.name,
            description: data.description,
            phone: data.phone,
            website: data.website,
            hotelClass: data.hotelClass,
            hotelStyle: data.hotelStyle,
            cheapestPrice: data.cheapestPrice,
            provinceId: data.provinceId,
            serviceManagerId: data.serviceManagerId,
            longtitude: data.longtitude,
            latitude: data.latitude,
            address: data.address
        }
        const hotel = await db.Hotel.create(dataHotel)
        if (data.amenitiesIds) {
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
        const hotel = await data.Hotel.findByPk(id, {
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
                for (let element of hotel.amenitieshotel) {
                    if (!data.amenitiesIds.include(element.id)) {
                        temp = await db.AmenitiesHotel.findOne({
                            where: { id: element.id }
                        })
                        await hotel.removeAmenitieshotel(temp)
                    }
                }
                for (let id of data.amenitiesIds) {
                    if (!hotel.amenitieshotel.include(id)) {
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
            const hotel = await findOne(id)
            return hotel
        }
        return false
    } catch (error) {
        throw new Error(error)
    }
}
const find = async (key, page, limit) => {
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
                    as: 'province'
                }
            ],
            where: {
                name: {
                    [Op.like]: `%${key}%`
                }
            }
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
const findByServiceManager = async (serviceManagerId, page, limit) => {
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
            ],
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
                    as: 'serviceManager',
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
const findOne = async id => {
    try {
        const hotel = await db.Hotel.findByPk(id, {
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
                }
            ]
        })
        return hotel        
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
    findByProvince
}
