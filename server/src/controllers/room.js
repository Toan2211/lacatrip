const { SERVICEMANAGERID } = require('../constants/variable')
const roomService = require('../services/room')
const roomDetailService = require('../services/roomdetail')
const create = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path
        }
        const room = await roomService.create(req.body)
        return res
            .status(200)
            .json({ message: 'Create room successful', data: room })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const update = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path
        }
        const room = await roomService.findOne(req.params.id)
        if (
            req.user.id !== room.hotel.serviceManager.userId &&
            req.user.role.id === SERVICEMANAGERID
        )
            return res.status(403).json({
                message: 'Forbidden: room is not your own'
            })
        const updateResult = await roomService.update(
            req.params.id,
            req.body
        )
        if (updateResult) {
            return res.status(200).json({
                message: 'Update room successful',
                data: updateResult
            })
        } else
            return res
                .status(400)
                .json({ message: 'Update room fail' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const findByHotelId = async (req, res) => {
    try {
        const page = req.query.page ? +req.query.page : 1
        const limit = req.query.limit ? +req.query.limit : 10
        const rooms = await roomService.findByHotelId(
            req.query.hotelId,
            page,
            limit
        )
        return res.status(200).json({
            message: 'Get list rooms successful',
            data: rooms
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const destroy = async (req, res) => {
    try {
        const room = await roomService.findOne(req.params.id)
        if (
            req.user.id !== room.hotel.serviceManager.userId &&
            req.user.role.id === SERVICEMANAGERID
        )
            return res.status(403).json({
                message: 'Forbidden: room is not your own'
            })
        const result = await roomService.destroy(req.params.id)
        if (result)
            return res
                .status(200)
                .json({ message: 'Delete room successful' })
        else
            return res.status(400).json({
                message: 'Delete room fail or room not found'
            })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const findOne = async (req, res) => {
    try {
        const room = await roomService.findOne(req.params.id)
        if (room)
            return res
                .status(200)
                .json({ message: 'Get room successful', data: room })
        else
            return res.status(400).json({ message: 'Room not found' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const addRoomDetail = async (req, res) => {
    try {
        const roomDetail = await roomDetailService.create(req.body)
        return res
            .status(200)
            .json({
                message: 'Add room successful',
                data: roomDetail
            })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = {
    create,
    findByHotelId,
    destroy,
    findOne,
    update,
    addRoomDetail
}
