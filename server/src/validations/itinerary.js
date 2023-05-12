const { body, param, query } = require('express-validator')
const create = () => [
    body('title').notEmpty().isString(),
    body('description').notEmpty().isString(),
    body('address').notEmpty().isString(),
    body('longtitude').notEmpty().isFloat(),
    body('latitude').notEmpty().isFloat(),
    body('image').notEmpty().isString(),
    body('step').notEmpty().isInt(),
    body('destinationTravelId').notEmpty().isUUID()
]
const update = () => [
    body('title').optional().isString(),
    body('description').optional().isString(),
    body('address').optional().isString(),
    body('longtitude').optional().isFloat(),
    body('latitude').optional().isFloat(),
    body('image').optional().isString(),
    body('step').optional().isInt(),
    body('destinationTravelId').optional().isUUID()
]
const findOne = () => [param('id').notEmpty().isUUID()]
module.exports = {
    create,
    findOne,
    update
}
