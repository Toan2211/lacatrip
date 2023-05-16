const { body, param, query } = require('express-validator')
const create = () => [
    body('name').notEmpty().isString(),
    body('phone').notEmpty().isString(),
    body('website').notEmpty().isString(),
    body('address').notEmpty().isString()
]
const update = () => [
    body('name').optional().isString(),
    body('phone').optional().isString(),
    body('website').optional().isString(),
    body('address').optional().isString()
]
const findOne = () => [param('id').notEmpty().isUUID()]
module.exports = {
    create,
    findOne,
    update
}
