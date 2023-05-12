const { Op } = require('sequelize')
const db = require('../models')
const create = async data => {
    try {
        const corpTour = await db.CorpTour.create(data)
        return corpTour
    } catch (error) {
        throw new Error(error)
    }
}
const findOne = async id => {
    try {
        const corpTour = await db.CorpTour.findByPk(id)
        return corpTour
    } catch (error) {
        throw new Error(error)
    }
}
const update = async (id, data) => {
    try {
        const update = await db.CorpTour.update(data, {
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
const find = async params => {
    try {
        let { key, page, limit } = params
        key = key ? key : ''
        page = page ? +page : 1
        limit = limit ? +limit : 10
        const { count, rows } = await db.CorpTour.findAndCountAll({
            offset: (page - 1) * limit,
            limit: +limit,
            where: {
                name: {
                    [Op.like]: `%${key}%`
                }
            },
            distinct: true
        })
        return {
            corpTours: rows,
            pagination: {
                page: page,
                totalPages: Math.ceil(count / limit),
                totalElements: count,
                size: limit
            }
        }
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    create,
    findOne,
    update,
    find
}
