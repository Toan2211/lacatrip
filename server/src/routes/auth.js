const express = require('express')
const router = express.Router()

const controller = require('../controllers/auth')
const validate = require('../middlewares/validate')
const validationUser = require('../validations/user')
const validateAuth = require('../validations/auth')
router.post('/signup', validationUser.create(), validate, controller.signup)
router.post('/signin', validateAuth.signin(), validate, controller.signin)
module.exports = router
