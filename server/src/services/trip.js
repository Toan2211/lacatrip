const { Op } = require('sequelize')
const db = require('../models')
const {
    HOTELTYPE,
    RESTAURANTTYPE,
    DESTINATIONTYPE
} = require('../constants/variable')
const tripDateService = require('./tripdate')
const find = async query => {
    try {
        let { key, page, limit, createdby } = query
        key = key ? key : ''
        page = page ? +page : 1
        limit = limit ? +limit : 10
        const { count, rows } = await db.Trip.findAndCountAll({
            offset: (page - 1) * limit,
            limit: +limit,
            include: [
                {
                    model: db.User,
                    required: true,
                    as: 'user',
                    attributes: {
                        exclude: ['password', 'confirmtoken']
                    }
                },
                {
                    model: db.Hotel,
                    as: 'hotels',
                    include: [{ model: db.Image, as: 'images' }]
                },
                {
                    model: db.Restaurant,
                    as: 'restaurants',
                    include: [{ model: db.Image, as: 'images' }]
                },
                {
                    model: db.DestinationTravel,
                    as: 'destinationTravels',
                    include: [{ model: db.Image, as: 'images' }]
                }
            ],
            where: {
                createdby
            },
            distinct: true
        })
        return {
            trips: rows,
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
        let trip = await db.Trip.create(data)
        trip = await findOne(trip.id)
        return trip
    } catch (error) {
        throw new Error(error)
    }
}
const update = async (id, data) => {
    try {
        const update = await db.Trip.update(data, {
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
        const trip = await db.Trip.findByPk(id, {
            include: [
                {
                    model: db.User,
                    as: 'user'
                },
                {
                    model: db.Hotel,
                    as: 'hotels',
                    include: [{ model: db.Image, as: 'images' }]
                },
                {
                    model: db.Restaurant,
                    as: 'restaurants',
                    include: [{ model: db.Image, as: 'images' }]
                },
                {
                    model: db.DestinationTravel,
                    as: 'destinationTravels',
                    include: [{ model: db.Image, as: 'images' }]
                }
            ]
        })
        return trip
    } catch (error) {
        throw new Error(error)
    }
}

const addInstanceToTripList = async ({
    tripId,
    instanceId,
    type,
    userId
}) => {
    try {
        const trip = await db.Trip.findOne({
            where: { id: tripId, createdby: userId }
        })
        if (!trip) return false
        if (type === HOTELTYPE) {
            const hotel = await db.Hotel.findOne({
                where: { id: instanceId }
            })
            await trip.addHotel(hotel)
            return { data: hotel, type: HOTELTYPE, tripId: tripId }
        } else if (type === RESTAURANTTYPE) {
            const restaurant = await db.Restaurant.findOne({
                where: { id: instanceId }
            })
            await trip.addRestaurant(restaurant)
            return {
                data: restaurant,
                type: RESTAURANTTYPE,
                tripId: tripId
            }
        } else if (type === DESTINATIONTYPE) {
            const destination = await db.DestinationTravel.findOne({
                where: { id: instanceId }
            })
            await trip.addDestinationTravel(destination)
            return {
                data: destination,
                type: DESTINATIONTYPE,
                tripId: tripId
            }
        }
    } catch (error) {
        throw new Error(error)
    }
}
const removeInstanceFromTripList = async ({
    tripId,
    instanceId,
    type,
    userId
}) => {
    try {
        const trip = await db.Trip.findOne({
            where: { id: tripId, createdby: userId }
        })
        if (!trip) return false
        if (type === HOTELTYPE) {
            const hotel = await db.Hotel.findOne({
                where: { id: instanceId }
            })
            await trip.removeHotel(hotel)
            return { data: hotel, type: HOTELTYPE, tripId: tripId }
        } else if (type === RESTAURANTTYPE) {
            const restaurant = await db.Restaurant.findOne({
                where: { id: instanceId }
            })
            await trip.removeRestaurant(restaurant)
            return {
                data: restaurant,
                type: RESTAURANTTYPE,
                tripId: tripId
            }
        } else if (type === DESTINATIONTYPE) {
            const destination = await db.DestinationTravel.findOne({
                where: { id: instanceId }
            })
            await trip.removeDestinationTravel(destination)
            return {
                data: destination,
                type: DESTINATIONTYPE,
                tripId: tripId
            }
        }
        return true
    } catch (error) {
        throw new Error(error)
    }
}
/* ** data
    {}
        tripId => UUID
        [] itineraries => {}
            date => datetime
            [] instances: {
                instanceId => UUID
                type => enum ...[hotel,res,des]
            }


*/
const handleUpdateTripDate = async data => {
    try {
        const { tripId, itineraries } = data
        const trip = await db.Trip.findByPk(tripId, {
            include: [
                {
                    model: db.TripDate,
                    as: 'tripDates',
                    attributes: ['id']
                }
            ]
        })
        for (const tripDate of trip.tripDates) {
            await tripDateService.destroy(tripDate.id)
        }
        for (const itinerary of itineraries) {
            const tripdate = await tripDateService.create({
                tripId: tripId,
                date: itinerary.date
            })
            for (const instance of itinerary.instances) {
                await tripDateService.addInstanceToTripDate({
                    tripDateId: tripdate.id,
                    instanceId: instance.id,
                    type: instance.type
                })
            }
        }
        return true
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    create,
    update,
    findOne,
    find,
    addInstanceToTripList,
    removeInstanceFromTripList,
    handleUpdateTripDate
}
