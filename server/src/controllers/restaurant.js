const restaurantService = require('../services/restaurant')
const create = async (req, res) => {
    try {
        if (req.files) {
            req.body.images = req.files
        }
        const restaurant = await restaurantService.create(req.body)
        return res
            .status(200)
            .json({
                message: 'Create restaurant successful',
                data: restaurant
            })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const findOne = async (req, res) => {
    try {
        const restaurant = await restaurantService.findOne(req.params.id)
        if (restaurant) {
            return res.status(200).json({
                message: 'Get restaurant successful',
                data: restaurant
            })
        } else {
            return res.status(400).json({
                message: 'Restaurant Not found',
                data: restaurant
            })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const update = async (req, res) => {
    try {
        if (req.files) {
            req.body.images = req.files
        }
        const restaurant = await restaurantService.update(
            req.params.id,
            req.body
        )
        return res
            .status(200)
            .json({ message: 'Update restaurant successful', data: restaurant })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const find = async (req, res) => {
    try {
        const result = await restaurantService.find(req.query)
        return res.status(200).json({
            message: 'Get list restaurants successful !',
            data: result
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const togglePublic = async (req, res) => {
    try {
        const restaurant = await restaurantService.togglePublic(req.params.id)
        if (restaurant)
            return res.status(200).json({
                message: 'Toggle status public restaurant successful!',
                data: restaurant
            })
        else
            return res.status(400).json({
                message: 'Restaurant not found'
            })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = {
    create,
    findOne,
    update,
    find,
    togglePublic
}
