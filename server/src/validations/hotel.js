const { body, param, query } = require('express-validator')
const create = () => [
    body('name').notEmpty().isString(),
    body('description').notEmpty().isString(),
    body('phone').notEmpty().isString(),
    body('website').notEmpty().isString(),
    body('hotelClass').notEmpty().isInt(),
    body('hotelStyle').notEmpty().isString(),
    body('cheapestPrice').notEmpty().isFloat(),
    body('provinceId').notEmpty().isInt(),
    body('seriveManagerId').notEmpty().isString(),
    body('amenities').notEmpty().isArray(),
    body('longtitude').notEmpty().isFloat(),
    body('latitude').notEmpty().isFloat(),
]

module.exports = {
    create
}
