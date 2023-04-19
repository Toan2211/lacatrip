const express = require('express')
const router = express.Router()

const controller = require('../controllers/user')
const { verifyToken, isAdmin } = require('../middlewares/auth')
const validate = require('../middlewares/validate')
const validationUser = require('../validations/user')
router.get('/verifyUser', controller.verifyConfirmTokenUser)
router.put('/changepass/:id', verifyToken, validationUser.changePass(), validate, controller.changePassword)
router.put('/status/:id',verifyToken, isAdmin, controller.toggleBlock)
module.exports = router
