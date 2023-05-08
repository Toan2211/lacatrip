const { SERVICEMANAGERID } = require('../constants/variable')
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
        const hotel = await hotelService.update(req.params.id, req.body)
        return res
            .status(200)
            .json({ message: 'Update hotel successful', data: hotel })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const find = async (req, res) => {
    try {
        const hotels = await hotelService.find(req.query)
        return res.status(200).json({
            message: 'Get list hotel successful !',
            data: hotels
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const findByServiceManager = async (req, res) => {
    try {
        const page = req.query.page ? +req.query.page : 1
        const limit = req.query.limit ? +req.query.limit : 10
        const hotels = await hotelService.findByServiceManager(
            req.params.serviceManagerId,
            page,
            limit
        )
        return res.status(200).json({
            message: 'Get list hotel successful !',
            data: hotels
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const findOne = async (req, res) => {
    try {
        const hotel = await hotelService.findOne(req.params.id)
        if (hotel) {
            return res.status(200).json({
                message: 'Get hotel successful',
                data: hotel
            })
        }
        else
        {
            return res.status(400).json({
                message: 'Hotel Not found',
                data: hotel
            })
        }
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
const findByProvince = async (req, res) => {
    try {
        const page = req.query.page ? +req.query.page : 1
        const limit = req.query.limit ? +req.query.limit : 10
        const hotels = await hotelService.findByProvince(
            req.params.provinceId,
            page,
            limit
        )
        return res.status(200).json({
            message: 'Get list hotel successful !',
            data: hotels
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = {
    create,
    findOne,
    togglePublic,
    update,
    find,
    findByServiceManager,
    findByProvince
}
