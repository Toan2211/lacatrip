const { body, param, query } = require('express-validator')
const create = () => [
    body('name').notEmpty().isString(),
    body('description').notEmpty().isString(),
    body('originalPrice').notEmpty().isFloat(),
    body('salePrice').notEmpty().isFloat(),
    body('maxPeople').notEmpty().isInt(),
    body('hotelId').notEmpty().isUUID()
]
const update = () => [
    body('name').optional().isString(),
    body('description').optional().isString(),
    body('originalPrice').optional().isFloat(),
    body('salePrice').optional().isFloat(),
    body('maxPeople').optional().isInt(),
]
const findOne = () => [param('id').notEmpty().isUUID()]
const findByHotelId = () => [param('hotelId').notEmpty().isUUID()]
module.exports = {
    create,
    update,
    findOne,
    findByHotelId
}
