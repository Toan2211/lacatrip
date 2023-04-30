const db = require('../models')
const create = async data => {
    try {
        const hotel = await db.Hotel.create(data)
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
            for(let amenityId of amenitiesIds) {
                const amenity = await db.AmenitiesHotel.findOne({
                    where: { id: amenityId }
                })
                await hotel.addAmenitieshotel(amenity)
            }
            return true
        }
        else {
            return false
        }
    }
    catch (error) {
        throw new Error(error)
    }
}
const removeAmenitiesOfHotel = async (hotelId, amenitiesIds) => {
    try {
        const hotel = await db.Hotel.findOne({
            where: { id: hotelId }
        })
        if (hotel) {
            for(let amenityId of amenitiesIds) {
                const amenity = await db.AmenitiesHotel.findOne({
                    where: { id: amenityId }
                })
                await hotel.removeAmenitieshotel(amenity)
            }
            return true
        }
        else {
            return false
        }
    }
    catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    create,
    addAmenitiesOfHotel,
    removeAmenitiesOfHotel
}
