const destinationTravelService = require('../services/destinationTravel')
const create = async (req, res) => {
    try {
        if (req.files) {
            req.body.images = req.files
        }
        const destinationTravel =
            await destinationTravelService.create(req.body)
        return res.status(200).json({
            message: 'Create destination travel successful',
            data: destinationTravel
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const update = async (req, res) => {
    try {
        if (req.files) {
            req.body.images = req.files
        }
        const destinationTravel =
            await destinationTravelService.update(
                req.params.id,
                req.body
            )
        if (!destinationTravel)
            return res.status(400).json({
                message: 'Destination Travel Not Found OR UPDATE FAIL'
            })
        else
            return res.status(200).json({
                message: 'Update destination travel successful',
                data: destinationTravel
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}
const find = async (req, res) => {
    try {
        if (req.user)
            req.query.roleId = req.user.roleId
        const destinationTravel = await destinationTravelService.find(
            req.query
        )
        return res.status(200).json({
            message: 'Get list Destination Travel successful !',
            data: destinationTravel
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const findOne = async (req, res) => {
    try {
        const destinationTravel =
            await destinationTravelService.findOne(req.params.id)
        if (destinationTravel) {
            if(!req.user)
                await destinationTravelService.update(req.params.id, {
                    clickCount: destinationTravel.get({ plain: true }).clickCount + 1
                })
            return res.status(200).json({
                message: 'Get destinationTravel successful',
                data: destinationTravel
            })
        } else {
            return res.status(400).json({
                message: 'destinationTravel Not found',
                data: destinationTravel
            })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const togglePublic = async (req, res) => {
    try {
        const destinationTravel =
            await destinationTravelService.togglePublic(req.params.id)
        if (destinationTravel)
            return res.status(200).json({
                message:
                    'Toggle status public Destination Travel successful!',
                data: destinationTravel
            })
        else
            return res.status(400).json({
                message: 'Destination Travel not found'
            })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    find,
    update,
    togglePublic,
    findOne,
    create
}
