const { Op } = require('sequelize')
const db = require('../models')
const create = async data => {
    try {
        const itinerary = await db.Itinerary.create(data)
        return itinerary
    } catch (error) {
        throw new Error(error)
    }
}
const update = async (id, data) => {
    try {
        const update = await db.Itinerary.update(data, {
            where: {
                id: id
            }
        })
        if (update) {
            const dataUpdate = await findOne(id)
            return dataUpdate
        }
        return update
    } catch (error) {
        throw new Error(error)
    }
}
const findOne = async id => {
    try {
        const itinerary = await db.Itinerary.findByPk(id)
        return itinerary
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    create,
    update,
    findOne
}