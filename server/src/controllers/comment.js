const commentService = require('../services/comment')
const find = async (req, res) => {
    try {
        const comments = await commentService.find(req.query)
        return res.status(200).json({
            message: 'Get list comments successful !',
            data: comments
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const create = async (req, res) => {
    try {
        if (req.files) {
            req.body.images = req.files
        }
        const comment = await commentService.create(req.body)
        if (!comment)
            return res.status(400).json({
                message: 'Bạn đã đánh giá dịch vụ này !'
            })
        return res
            .status(200)
            .json({ message: 'Comment successful', data: comment })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const update = async (req, res) => {
    try {
        const updateResult = await commentService.update(
            req.params.id,
            req.body
        )
        if (updateResult) {
            return res.status(200).json({
                message: 'Update comment successful',
                data: updateResult
            })
        } else
            return res
                .status(400)
                .json({ message: 'Update comment fail' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const findOne = async (req, res) => {
    try {
        const comment = await commentService.findOne(req.params.id)
        if (comment)
            return res
                .status(200)
                .json({
                    message: 'Get comment successful',
                    data: comment
                })
        else
            return res
                .status(400)
                .json({ message: 'Comment not found' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const destroy = async (req, res) => {
    try {
        const result = await commentService.destroy(req.params.id)
        if (result)
            return res
                .status(200)
                .json({ message: 'Delete Comment successful' })
        else
            return res.status(400).json({
                message: 'Delete Comment fail or Itinerary not found'
            })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    find,
    create,
    update,
    findOne,
    destroy
}
