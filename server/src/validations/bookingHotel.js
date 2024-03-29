const { body, param, query } = require('express-validator')
const create = () => [
    body('hotelId').notEmpty().isUUID(),
    body('roomTypeId').notEmpty().isUUID(),
    body('serviceManagerId').notEmpty().isUUID(),
    body('checkIn').notEmpty().isString(),
    body('checkOut').notEmpty().isString(),
    body('countAdults').notEmpty().isInt(),
    body('countChildrens').notEmpty().isInt(),
    body('countRooms').notEmpty().isInt(),
    body('roomDetailIds').notEmpty().isArray(),
    body('amount').notEmpty().isInt()
]
module.exports = {
    create
}