const { Op } = require('sequelize')
const db = require('../models')
const {
    HOTELTYPE,
    RESTAURANTTYPE,
    DESTINATIONTYPE,
    EDITABLE
} = require('../constants/variable')
const tripDateService = require('./tripdate')
const tripMemberService = require('./tripmember')
const userService = require('./user')
const mailService = require('./mail')
const find = async query => {
    try {
        let { key, page, limit, createdby } = query
        key = key ? key : ''
        page = page ? +page : 1
        limit = limit ? +limit : 10
        const tripIds = await tripMemberService.getTripIdsByUserId(createdby)
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
                [Op.or]: [
                    {createdby: createdby},
                    {
                        id: {
                            [Op.in]: tripIds
                        }
                    }
                ]
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
        await tripMemberService.addTripMember({
            tripId: trip.id,
            userId: data.createdby,
            editable: true
        })
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
        const members = await tripMemberService.getMembersByTripId(id)
        const trip =  await db.Trip.findByPk(id, {
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
                },
                {
                    model: db.TripDate,
                    as: 'tripDates',
                    include: [
                        {
                            model: db.Hotel,
                            as: 'hotels',
                            include: [
                                { model: db.Image, as: 'images' }
                            ]
                        },
                        {
                            model: db.Restaurant,
                            as: 'restaurants',
                            include: [
                                { model: db.Image, as: 'images' }
                            ]
                        },
                        {
                            model: db.DestinationTravel,
                            as: 'destinationTravels',
                            include: [
                                { model: db.Image, as: 'images' }
                            ]
                        }
                    ]
                }
            ]
        })
        if (!trip)
            return false
        const result = {
            ...trip.toJSON(),
            members: [...members]
        }
        return result
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
            where: { id: tripId }
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
            where: { id: tripId }
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
const handleUpdateTripDate = async (tripId, data) => {
    try {
        const { itineraries } = data
        let trip = await db.Trip.findByPk(tripId, {
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
                    instanceId: instance.instanceId,
                    type: instance.type
                })
            }
        }
        trip = await findOne(tripId)
        return trip
    } catch (error) {
        throw new Error(error)
    }
}
const inviteMember = async (email, tripId, editable) => {
    try {
        const user = await userService.findAuthenUserByEmail(email)
        const trip = await findOne(tripId)
        if (user) {
            const check = tripMemberService.checkMemberInTrip(tripId, user.id)
            if (check)
                return true
            await tripMemberService.addTripMember({
                tripId: tripId,
                userId: user.id,
                editable: editable
            })
            return true
        }
        else
        {
            const result = await mailService.sendMailInviteToTrip({
                email: email,
                redirectLink: `${process.env.REACT_API}/create/user-invite?email=${email}`,
                trip: trip
            })
            if (!result)
                return false
            const user = await db.User.create({
                email: email,
                password: '',
                roleId: 4,
                firstname: '',
                lastname: '',
                gender: 0,
                country: '',
                avatar: 'https://res.cloudinary.com/djgkj9nli/image/upload/v1681614915/lacatrip/lhwrnxjhgw5uhrvinh6r.jpg'
            })
            await tripMemberService.addTripMember({
                tripId: tripId,
                userId: user.id,
                editable: editable
            })
            return true
        }
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
    handleUpdateTripDate,
    inviteMember
}
