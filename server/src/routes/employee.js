const express = require('express')
const router = express.Router()
const controller = require('../controllers/employee')
const controllerUser = require('../controllers/user')
const { verifyToken, isAdmin } = require('../middlewares/auth')
const validate = require('../middlewares/validate')
const validationEmployee = require('../validations/employee')
const uploadCloud = require('../config/cloudinary.config')

router.get('/', verifyToken, isAdmin, controller.find)
router.post('/', verifyToken, isAdmin, uploadCloud.single('avatar'), validationEmployee.create(), validate, controller.create)
router.put('/:id', verifyToken, isAdmin, uploadCloud.single('avatar'), validationEmployee.update(), validate, controllerUser.update)
module.exports = router
