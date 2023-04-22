const { body } = require('express-validator')
const signin = () => [
    body('email').notEmpty().isString(),
    body('password').notEmpty().isString().isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
]
const forgotPass = () => [
    body('email').notEmpty().isString(),
]
module.exports = {
    signin,
    forgotPass
}
