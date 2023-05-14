const express = require('express')
const router = express.Router()
const controller = require('../controllers/destinationTravel')
const uploadCloud = require('../config/cloudinary.config')
const validateDestinationTravel = require('../validations/destinationTravel')
const validate = require('../middlewares/validate')
const { verifyToken, isAdminOrEmployee } = require('../middlewares/auth')

router.get('/', controller.find)
router.get('/:id', validateDestinationTravel.findOne(), validate, controller.findOne)
router.post('/', verifyToken, isAdminOrEmployee, uploadCloud.array('images'), validateDestinationTravel.create(), validate, controller.create)
router.put('/public/:id',verifyToken, isAdminOrEmployee, validateDestinationTravel.findOne(), validate, controller.togglePublic)
router.put('/:id', verifyToken, isAdminOrEmployee, uploadCloud.array('images'), validateDestinationTravel.update(), validate, controller.update)

module.exports = router
