const { body, param, query } = require('express-validator')
const create = () => [
    body('tripId').notEmpty().isUUID(),
    body('content').optional().isString()
]
module.exports = {
    create
}