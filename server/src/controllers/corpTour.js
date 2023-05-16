const corpTourService = require('../services/corpTour')
const find = async (req, res) => {
    try {
        const data = await corpTourService.find(req.query)
        return res.status(200).json({
            message: 'Get list corpTour successful !',
            data: data
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const create = async (req, res) => {
    try {
        const corpTour = await corpTourService.create(req.body)
        return res.status(200).json({
            message: 'Create corp tour successful',
            data: corpTour
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const update = async (req, res) => {
    try {
        const corpTour = await corpTourService.update(
            req.params.id,
            req.body
        )
        if (corpTour)
            return res.status(200).json({
                message: 'Update corp tour successful',
                data: corpTour
            })
        else
            return res.status(400).json({
                message: 'Update corp tour fail or not found'
            })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const findOne = async (req, res) => {
    try {
        const corpTour = await corpTourService.findOne(req.params.id)
        if (corpTour)
            return res.status(200).json({
                message: 'Get corp tour successful',
                data: corpTour
            })
        else
            return res.status(400).json({
                message: 'Get corp tour fail or not found'
            })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = {
    find,
    create,
    update,
    findOne
}
