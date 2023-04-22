const express = require('express')
const router = express.Router()

const controller = require('../controllers/user')
const { verifyToken, isAdmin, isYourSelf } = require('../middlewares/auth')
const validate = require('../middlewares/validate')
const validationUser = require('../validations/user')
const uploadCloud = require('../config/cloudinary.config')
router.get('/verifyUser', controller.verifyConfirmTokenUser)
router.put('/changepass/:id', verifyToken, isYourSelf, validationUser.changePass(), validate, controller.changePassword)
router.put('/status/:id',verifyToken, isAdmin, controller.toggleBlock)
router.put('/:id', verifyToken, isYourSelf, uploadCloud.single('avatar'), validationUser.update(), validate, controller.update)
module.exports = router
