const { body, param, query } = require('express-validator')
const create = () => [
    body('name').notEmpty().isString(),
    body('description').notEmpty().isString(),
    body('address').notEmpty().isString(),
    body('longtitude').notEmpty().isFloat(),
    body('latitude').notEmpty().isFloat(),
    body('price').notEmpty().isFloat(),
    body('originalPrice').notEmpty().isFloat(),
    body('provinceId').notEmpty().isInt(),
    body('serviceManagerId').notEmpty().isUUID(),
]
const update = () => [
    body('name').optional().isString(),
    body('description').optional().isString(),
    body('address').optional().isString(),
    body('longtitude').optional().isFloat(),
    body('latitude').optional().isFloat(),
    body('price').optional().isFloat(),
    body('originalPrice').optional().isFloat(),
    body('provinceId').optional().isInt(),
    body('serviceManagerId').optional().isUUID(),
]
const findOne = () => [param('id').notEmpty().isUUID()]
module.exports = {
    create,
    findOne,
    update
}
