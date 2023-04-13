const express = require('express')
const router = express.Router()

const controller = require('../controllers/user')
const { verifyToken, isAuthenticatedUser } = require('../middlewares/auth')
const validate = require('../middlewares/validate')
const validationUser = require('../validations/user')
router.get('/verifyUser', controller.verifyConfirmTokenUser)
router.put('/changepass/:id', verifyToken, validationUser.changePass(), validate, controller.changePassword)
module.exports = router
