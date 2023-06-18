const { body, param, query } = require('express-validator')
const create = () => [
    body('serviceManagerId').notEmpty().isUUID(),
    body('destinationTravelId').notEmpty().isUUID(),
    body('date').notEmpty().isString(),
    body('countPeople').notEmpty().isInt(),
    body('amount').notEmpty().isInt()
]
module.exports = {
    create
}