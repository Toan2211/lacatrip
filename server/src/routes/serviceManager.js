const express = require('express')
const router = express.Router()
const controller = require('../controllers/serviceManager')
const { verifyToken, isAdminOrEmployee } = require('../middlewares/auth')
const validate = require('../middlewares/validate')
const validationSystemUser = require('../validations/employee')
const uploadCloud = require('../config/cloudinary.config')

router.get('/', verifyToken, isAdminOrEmployee, controller.find)
router.post('/', verifyToken, isAdminOrEmployee, uploadCloud.single('avatar'), validationSystemUser.create(), validate, controller.create)
router.put('/:id', verifyToken, isAdminOrEmployee, uploadCloud.single('avatar'), validationSystemUser.update(), validate, controller.update)
module.exports = router
