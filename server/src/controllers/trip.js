const tripservice = require('../services/trip')
const tripMemberService = require('../services/tripmember')
const create = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path
        } else
            req.body.image =
                'https://res.cloudinary.com/djgkj9nli/image/upload/v1685185583/Best-Time-to-Travel-Vietnam-1170x680_etmtzu.jpg'
        if (req.user) req.body.createdby = req.user.id
        const trip = await tripservice.create(req.body)
        return res
            .status(200)
            .json({ message: 'Create trip successful', data: trip })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const update = async (req, res) => {
    try {
        req.body.userId = req.user.id
        const isEditable = await tripMemberService.checkEditable(
            req.params.id,
            req.body.userId
        )
        if (!isEditable)
            return res.status(403).json({
                message: 'You can not update Trip'
            })
        if (req.file) {
            req.body.image = req.file.path
        }
        const updateResult = await tripservice.update(
            req.params.id,
            req.body
        )
        if (updateResult) {
            return res.status(200).json({
                message: 'Update Trip successful',
                data: updateResult
            })
        } else
            return res
                .status(400)
                .json({ message: 'Update Trip fail' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const findOne = async (req, res) => {
    try {
        const trip = await tripservice.findOne(req.params.id)
        if (trip)
            return res
                .status(200)
                .json({ message: 'Get trip successful', data: trip })
        else
            return res.status(404).json({ message: 'Trip not found' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const find = async (req, res) => {
    try {
        if (req.user) req.query.createdby = req.user.id
        const trips = await tripservice.find(req.query)
        return res.status(200).json({
            message: 'Get list trips successful !',
            data: trips
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const addInstanceToTripList = async (req, res) => {
    try {
        req.body.userId = req.user.id
        const isEditable = await tripMemberService.checkEditable(
            req.body.tripId,
            req.body.userId
        )
        if (!isEditable)
            return res.status(403).json({
                message: 'You can not update Trip'
            })
        const instance = await tripservice.addInstanceToTripList(
            req.body
        )
        if (!instance)
            return res.status(401).json({
                message: 'Trip not found or Trip not own of you'
            })
        return res.status(200).json({
            message: 'Add data to trip successful !',
            data: instance
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const removeInstanceFromTripList = async (req, res) => {
    try {
        req.body.userId = req.user.id
        const isEditable = tripMemberService.checkEditable(
            req.body.tripId,
            req.body.userId
        )
        if (!isEditable)
            return res.status(403).json({
                message: 'You can not update Trip'
            })
        const instance = await tripservice.removeInstanceFromTripList(
            req.body
        )
        if (!instance)
            return res.status(401).json({
                message: 'Trip not found or Trip not own of you'
            })
        return res.status(200).json({
            message: 'Remove data to trip successful !',
            data: instance
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const handleUpdateTripDate = async (req, res) => {
    try {
        req.body.userId = req.user.id
        const isEditable = await tripMemberService.checkEditable(
            req.params.id,
            req.body.userId
        )
        if (!isEditable)
            return res.status(403).json({
                message: 'You can not update Trip'
            })
        const result = await tripservice.handleUpdateTripDate(
            req.params.id,
            req.body
        )
        if (!result)
            return res.status(401).json({
                message: 'Update Itineray Fail'
            })
        return res.status(200).json({
            message: 'Update Itineray successful !',
            data: result
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const inviteToTrip = async (req, res) => {
    try {
        req.body.userId = req.user.id
        const isEditable = await tripMemberService.checkEditable(
            req.body.tripId,
            req.body.userId
        )
        if (!isEditable)
            return res.status(403).json({
                message: 'You can not invite member Trip'
            })
        const result = await tripservice.inviteMember(
            req.body.email,
            req.body.tripId,
            req.body.editable
        )
        if (!result)
            return res.status(401).json({
                message: 'Invite member fail'
            })
        return res.status(200).json({
            message: 'Invite member successful'
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = {
    create,
    update,
    findOne,
    find,
    addInstanceToTripList,
    removeInstanceFromTripList,
    handleUpdateTripDate,
    inviteToTrip
}
