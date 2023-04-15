const { body, param, query } = require('express-validator')
const create = () => [
    body('email').notEmpty().isString(),
    body('password').notEmpty().isString().isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    body('firstname').notEmpty().isString(),
    body('lastname').notEmpty().isString(),
    body('gender').notEmpty().isBoolean(),
    body('phone').optional().isString(),
    body('country').notEmpty().isString()
]
const findById = () => [param('id').notEmpty().isUUID()]

const update = () => [
    param('id').notEmpty().isUUID(),
    body('password').optional.notEmpty().isString().isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    body('firstname').optional.notEmpty().isString(),
    body('lastname').optional.notEmpty().isString(),
    body('gender').optional.notEmpty().isBoolean(),
    body('phone').optional.notEmpty().isString(),
    body('country').optional.notEmpty().isString()
]
const destroy = () => [
    param('id')
        .notEmpty()
        .isUUID()
]
const changePass = () => [
    param('id')
        .notEmpty()
        .isUUID(),
    body('oldPassword').notEmpty().isString().isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    body('newPassword').notEmpty().isString().isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
]
module.exports = {
    create,
    findById,
    update,
    destroy,
    changePass
}
