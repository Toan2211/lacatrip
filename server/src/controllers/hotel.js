const hotelService = require('../services/hotel')
const create = async (req, res) => {
    try {
        if (req.files) {
            req.body.images = req.files
        }
        const hotel = await hotelService.create(req.body)
        return res
            .status(200)
            .json({ message: 'Create hotel successful', data: hotel })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const update = async (req, res) => {
    try {
        if (req.files) {
            req.body.images = req.files
        }
        const hotel = await hotelService.update(req.body)
        return res
            .status(200)
            .json({ message: 'Update hotel successful', data: hotel })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const findOne = async (req, res) => {
    try {
        const hotel = await hotelService.findOne(req.params.id)
        return res
            .status(200)
            .json({ message: 'Get hotel successful', data: hotel })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const togglePublic = async (req, res) => {
    try {
        const hotel = await hotelService.togglePublic(req.params.id)
        if (hotel)
            return res.status(200).json({
                message: 'Toggle status public hotel successful!',
                data: hotel
            })
        else
            return res.status(400).json({
                message: 'Hotel not found'
            })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = {
    create,
    findOne,
    togglePublic,
    update
}
