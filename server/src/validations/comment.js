const { body, param, query } = require('express-validator')
const create = () => [
    body('instanceId').notEmpty().isUUID(),
    body('userId').notEmpty().isUUID(),
    body('title').notEmpty().isString(),
    body('content').notEmpty().isString(),
    body('rating').notEmpty().isInt()
]
const find = () => [query('instanceId').notEmpty().isUUID()]
module.exports = {
    create,
    find
}
