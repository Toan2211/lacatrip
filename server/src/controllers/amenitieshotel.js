const amenitiesHotelService = require('../services/amenitieshotel')
const find  = async (req, res) => {
    try
    {
        const data = await amenitiesHotelService.find()
        return res.status(200).json({
            message: 'Get list amenities hotel successful !',
            data: data
        })
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
module.exports = {
    find
}