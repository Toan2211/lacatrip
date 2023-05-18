const db = require('../models')
const find = async () => {
    try {
        const data = await db.Province.findAll()
        return data
    } catch (error) {
        throw new Error(error)
    }
}
const getTopPopular = async () => {
    try {
        const provinces = await db.Province.findAll({
            include: [
                {
                    model: db.Hotel,
                    as: 'hotels'
                },
                {
                    model: db.Restaurant,
                    as: 'restaurants'
                },
                {
                    model: db.DestinationTravel,
                    as: 'destinationTravels'
                }
            ]
        })
        const result = []
        for (const province of provinces) {
            let clickCount = 0
            let countDestination = 0
            let countRestaurant = 0
            let countHotel = 0
            for (const destinationTravel of province.destinationTravels) {
                if (destinationTravel.get({ plain: true }).public) {
                    clickCount += destinationTravel.get({
                        plain: true
                    }).clickCount
                    countDestination += 1
                }
            }
            for (const restaurant of province.restaurants) {
                if (restaurant.get({ plain: true }).public) {
                    clickCount += restaurant.get({
                        plain: true
                    }).clickCount
                    countRestaurant += 1
                }
            }
            for (const hotel of province.hotels) {
                if (hotel.get({ plain: true }).public) {
                    clickCount += hotel.get({
                        plain: true
                    }).clickCount
                    countHotel += 1
                }
            }
            const provinceObj = province.get({ plain: true })
            const provinceData = {
                id: provinceObj.id,
                name: provinceObj.name,
                longtitude: provinceObj.longtitude,
                latitude: provinceObj.latitude,
                image: provinceObj.image,
                clickCount,
                countDestination,
                countHotel,
                countRestaurant
            }
            result.push(provinceData)
        }
        result.sort((a, b) => b.clickCount - a.clickCount)
        return result
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    find,
    getTopPopular
}
