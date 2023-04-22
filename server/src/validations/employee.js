const { body, param, query } = require('express-validator')
const create = () => [
    body('email').notEmpty().isString(),
    body('firstname').notEmpty().isString(),
    body('lastname').notEmpty().isString(),
    body('gender').notEmpty().isBoolean(),
    body('phone').notEmpty().isString(),
    body('country').notEmpty().isString()
]
const update = () => [
    param('id').notEmpty().isUUID(),
    body('firstname').optional().isString(),
    body('lastname').optional().isString(),
    body('gender').optional().isBoolean(),
    body('phone').optional().isString(),
    body('country').optional().isString()
]
module.exports = {
    create,
    update
}
