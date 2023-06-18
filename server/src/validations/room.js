const { body, param, query } = require('express-validator')
const create = () => [
    body('title').notEmpty().isString(),
    body('description').notEmpty().isString(),
    body('price').notEmpty().isFloat(),
    body('originalPrice').notEmpty().isFloat(),
    body('adultCount').notEmpty().isInt(),
    body('childrenCount').notEmpty().isInt(),
    body('bedCount').notEmpty().isInt(),
    body('area').notEmpty().isInt(),
    body('hotelId').notEmpty().isUUID(),
    body('roomNo').notEmpty().isInt()

]
const update = () => [
    body('title').optional().isString(),
    body('description').optional().isString(),
    body('price').optional().isFloat(),
    body('originalPrice').optional().isFloat(),
    body('adultCount').optional().isInt(),
    body('childrenCount').optional().isInt(),
    body('bedCount').optional().isInt(),
    body('area').optional().isInt(),
    body('hotelId').optional().isUUID(),
    body('roomNo').optional().isInt()
]
const findOne = () => [param('id').notEmpty().isUUID()]
const findByHotelId = () => [param('hotelId').notEmpty().isUUID()]
module.exports = {
    create,
    update,
    findOne,
    findByHotelId
}
