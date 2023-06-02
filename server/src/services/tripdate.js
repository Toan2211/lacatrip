const db = require('../models')
const {
    HOTELTYPE,
    RESTAURANTTYPE,
    DESTINATIONTYPE
} = require('../constants/variable')
const create = async data => {
    try {
        const tripdate = await db.TripDate.create(data)
        return tripdate
    } catch (error) {
        throw new Error(error)
    }
}
const destroy = async id => {
    try {
        const result = await db.TripDate.destroy({
            where: {
                id: id
            }
        })
        return result
    } catch (error) {
        throw new Error(error)
    }
}
const find = async query => {
    try {
        let { tripId, date } = query
        date = new Date(date)
        const { count, rows }  = await db.TripDate.findAndCountAll({
            where: {
                tripId: tripId,
                date: date
            },
            include: [
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
        return rows
    } catch (error) {
        throw new Error(error)
    }
}
const findOne = async id => {
    try {
        const tripdate = await db.TripDate.findByPk(id, {
            include: [
                {
                    model: db.Trip,
                    as: 'trip',
                    attributes: ['id']
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
        return tripdate
    } catch (error) {
        throw new Error(error)
    }
}
const addInstanceToTripDate = async ({
    tripDateId,
    instanceId,
    type
}) => {
    try {
        const tripDate = await db.TripDate.findOne({
            where: { id: tripDateId }
        })
        if (!tripDate) return false
        if (type === HOTELTYPE) {
            const hotel = await db.Hotel.findOne({
                where: { id: instanceId }
            })
            await tripDate.addHotel(hotel)
            return {
                data: hotel,
                type: HOTELTYPE,
                tripDateId: tripDateId
            }
        } else if (type === RESTAURANTTYPE) {
            const restaurant = await db.Restaurant.findOne({
                where: { id: instanceId }
            })
            await tripDate.addRestaurant(restaurant)
            return {
                data: restaurant,
                type: RESTAURANTTYPE,
                tripDateId: tripDateId
            }
        } else if (type === DESTINATIONTYPE) {
            const destination = await db.DestinationTravel.findOne({
                where: { id: instanceId }
            })
            await tripDate.addDestinationTravel(destination)
            return {
                data: destination,
                type: DESTINATIONTYPE,
                tripDateId: tripDateId
            }
        }
    } catch (error) {
        throw new Error(error)
    }
}
const removeInstanceFromTripDate = async ({
    tripDateId,
    instanceId,
    type
}) => {
    try {
        const tripDate = await db.TripDate.findOne({
            where: { id: tripDateId }
        })
        if (!tripDate) return false
        if (type === HOTELTYPE) {
            const hotel = await db.Hotel.findOne({
                where: { id: instanceId }
            })
            await tripDate.removeHotel(hotel)
            return {
                data: hotel,
                type: HOTELTYPE,
                tripDateId: tripDateId
            }
        } else if (type === RESTAURANTTYPE) {
            const restaurant = await db.Restaurant.findOne({
                where: { id: instanceId }
            })
            await tripDate.removeRestaurant(restaurant)
            return {
                data: restaurant,
                type: RESTAURANTTYPE,
                tripDateId: tripDateId
            }
        } else if (type === DESTINATIONTYPE) {
            const destination = await db.DestinationTravel.findOne({
                where: { id: instanceId }
            })
            await tripDate.removeDestinationTravel(destination)
            return {
                data: destination,
                type: DESTINATIONTYPE,
                tripDateId: tripDateId
            }
        }
        return true
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    create,
    findOne,
    destroy,
    addInstanceToTripDate,
    removeInstanceFromTripDate,
    find
}
