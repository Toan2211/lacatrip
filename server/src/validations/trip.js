const { body, param, query } = require('express-validator')
const create = () => [
    body('name').notEmpty().isString(),
    body('description').optional().isString(),
]
const update = () => [
    body('name').optional().isString(),
    body('description').optional().isString()
]
const findOne = () => [param('id').notEmpty().isUUID()]
const addInstanceToTripList = () => [
    body('tripId').notEmpty().isUUID(),
    body('instanceId').notEmpty().isUUID(),
    body('type').notEmpty().isString(),
]
module.exports = {
    create,
    update,
    findOne,
    addInstanceToTripList
}
