const messageService = require('../services/message')
const getConversationsByTripID = async (req, res) => {
    try {
        req.query.tripId = req.params.id
        const result = await messageService.getConversationsByTripID(req.query)
        return res.status(200).json({
            message: 'Get list messages successful !',
            data: result
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const getAllMessages = async (req, res) => {
    try {
        req.query.tripId = req.params.id
        const result = await messageService.getAllMessages(req.query)
        return res.status(200).json({
            message: 'Get list messages successful !',
            data: result
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const create = async (req, res) => {
    try {

        if(req.file) {
            req.body.image = req.file.path
        }
        req.body.senderId = req.user.id
        const message = await messageService.create(req.body)
        return res
            .status(200)
            .json({ message: 'Create message successful', data: message })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = {
    create,
    getConversationsByTripID,
    getAllMessages
}
