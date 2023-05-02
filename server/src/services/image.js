const db = require('../models')
const create = async (url, instanceId) => {
    try {
        const image = await db.Image.create({
            url: url,
            instanceId: instanceId
        })
        return image
    } catch (error) {
        throw new Error(error)
    }
}
const deleteImage = async id => {
    try {
        await db.Image.destroy({
            where: {
                id: id
            }
        })
        return true
    } catch (error) {
        throw new Error(error)
    }
}
const findOne = async id => {
    try {
        const img = await db.Image.findOne({
            where: {
                id: id
            }
        })
        if (img)
            return img
        else
            return false
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    create,
    deleteImage,
    findOne
}
