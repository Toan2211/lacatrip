const { body, param, query } = require('express-validator')
const create = () => [
    body('name').notEmpty().isString(),
    body('description').notEmpty().isString(),
    body('phone').notEmpty().isString(),
    body('hotelClass').notEmpty().isInt(),
    body('hotelStyle').notEmpty().isString(),
    body('cheapestPrice').notEmpty().isFloat(),
    body('provinceId').notEmpty().isInt(),
    body('serviceManagerId').notEmpty().isString(),
    body('amenitiesIds').notEmpty(),
    body('longtitude').notEmpty().isFloat(),
    body('latitude').notEmpty().isFloat(),
    body('address').notEmpty().isString()
    // body('images').notEmpty()
]
const update = () => [
    body('name').optional().isString(),
    body('description').optional().isString(),
    body('phone').optional().isString(),
    body('hotelClass').optional().isInt(),
    body('hotelStyle').optional().isString(),
    body('cheapestPrice').optional().isFloat(),
    body('provinceId').optional().isInt(),
    body('serviceManagerId').optional().isString(),
    // body('amenitiesIds').optional().isArray(),
    body('longtitude').optional().isFloat(),
    body('latitude').optional().isFloat(),
    body('address').optional().isString()
    // body('images').notEmpty()
]
const findOne = () => [param('id').notEmpty().isUUID()]
module.exports = {
    create,
    findOne,
    update
}
