const itineraryService = require('../services/itinerary')
const create = async (req, res) => {
    try {
        if(req.file) {
            req.body.image = req.file.path
        }
        const itinerary = await itineraryService.create(req.body)
        return res
            .status(200)
            .json({ message: 'Create itinerary successful', data: itinerary })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const update = async (req, res) => {
    try {
        const updateResult = await itineraryService.update(
            req.params.id,
            req.body
        )
        if (updateResult) {
            return res.status(200).json({
                message: 'Update Itinerary successful',
                data: updateResult
            })
        } else
            return res
                .status(400)
                .json({ message: 'Update Itinerary fail' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const destroy = async (req, res) => {
    try {
        const result = await itineraryService.destroy(req.params.id)
        if (result)
            return res
                .status(200)
                .json({ message: 'Delete Itinerary successful' })
        else
            return res.status(400).json({
                message: 'Delete Itinerary fail or Itinerary not found'
            })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const findOne = async (req, res) => {
    try {
        const itinerary = await itineraryService.findOne(req.params.id)
        if (itinerary)
            return res
                .status(200)
                .json({ message: 'Get Itinerary successful', data: itinerary })
        else
            return res.status(404).json({ message: 'Itinerary not found' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = {
    create,
    destroy,
    findOne,
    update
}
