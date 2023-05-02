const imageService = require('../services/image')
const deleteImage = async (req, res) => {
    try {
        const image = await imageService.findOne(req.params.id)
        if (image) {
            await imageService.deleteImage(req.params.id)
            return res
                .status(200)
                .json({ message: 'Delete image successful' })
        } else {
            return res
                .status(400)
                .json({ message: 'Image not found' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = {
    deleteImage
}
