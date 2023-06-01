const { Op } = require('sequelize')
const db = require('../models')

// tripId
// userID
// role: true false

const addTripMember = async data => {
    try {
        const tripdate = await db.TripMember.create(data)
        return tripdate
    } catch (error) {
        throw new Error(error)
    }
}
const checkMemberInTrip = async (tripId, userId) => {
    try {
        const [member] = await db.TripMember.findAll({
            where: {
                tripId: tripId,
                userId: userId
            }
        })
        if (member) return true
        return false
    } catch (error) {
        throw new Error(error)
    }
}
const getMembersByTripId = async tripId => {
    try {
        const membersArr = await db.TripMember.findAll({
            attributes: ['userId'],
            where: {
                tripId: tripId
            }
        })
        if (!membersArr) return []
        const memberIds = membersArr.map(member => member.userId)
        const member = await db.User.findAll({
            where: {
                id: {
                    [Op.in]: memberIds
                }
            }
        })

        return member
    } catch (error) {
        throw new Error(error)
    }
}

const getTripIdsByUserId = async userId => {
    try {
        const trips = await db.TripMember.findAll({
            attributes: ['tripId'],
            where: {
                userId: userId
            }
        })
        const tripIds = trips.map(trip => trip.tripId)
        return tripIds
    } catch (error) {
        throw new Error(error)
    }
}
const checkEditable = async (tripId, userId) => {
    try {
        const [trip] = await db.TripMember.findAll({
            where: {
                userId: userId,
                tripId: tripId
            },
            raw: true
        })
        if (trip.editable) return true
        return false
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    addTripMember,
    getMembersByTripId,
    getTripIdsByUserId,
    checkEditable,
    checkMemberInTrip
}
