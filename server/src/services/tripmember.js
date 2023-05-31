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

const getMemberIdsByTripId = async tripId => {
    try {
        const membersArr = await db.TripMember.findAll({
            attributes: ['userId'],
            where: {
                tripId: tripId
            }
        })
        const memberIds = membersArr.map(member => member.userId)
        return memberIds
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
            attributes: ['tripId'],
            where: {
                userId: userId,
                tripId: tripId
            }
        })
        if (trip.editable)
            return true
        return false
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    addTripMember,
    getMemberIdsByTripId,
    getTripIdsByUserId,
    checkEditable
}
