const { body, param, query } = require('express-validator')
const create = () => [
    body('name').notEmpty().isString(),
    body('description').notEmpty().isString(),
    body('phone').notEmpty().isString(),
    body('provinceId').notEmpty().isInt(),
    body('serviceManagerId').notEmpty().isString(),
    body('longtitude').notEmpty().isFloat(),
    body('latitude').notEmpty().isFloat(),
    body('address').notEmpty().isString(),
    body('minPrice').notEmpty().isFloat(),
    body('cusines').notEmpty().isString(),
    body('specialDiets').notEmpty().isString(),
    body('maxPrice').notEmpty().isFloat(),
    // body('images').notEmpty()
]
const update = () => [
    body('name').optional().isString(),
    body('description').optional().isString(),
    body('phone').optional().isString(),
    body('provinceId').optional().isInt(),
    body('serviceManagerId').optional().isString(),
    body('longtitude').optional().isFloat(),
    body('latitude').optional().isFloat(),
    body('address').optional().isString(),
    body('minPrice').optional().isFloat(),
    body('cusines').optional().isString(),
    body('specialDiets').optional().isString(),
    body('maxPrice').optional().isFloat(),
    // body('images').notEmpty()
]
const findOne = () => [param('id').notEmpty().isUUID()]
module.exports = {
    create,
    update,
    findOne
}