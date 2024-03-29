const express = require('express')
const router = express.Router()
const controller = require('../controllers/hotel')
const uploadCloud = require('../config/cloudinary.config')
const validateHotel = require('../validations/hotel')
const validate = require('../middlewares/validate')
const { verifyToken, isAdminOrEmployee, isSystemUser, verifyTokenNoLimit, isServiceManager } = require('../middlewares/auth')

router.get('/room-available', verifyTokenNoLimit, controller.getAvailableRooms)
router.get('/', verifyTokenNoLimit, controller.find)
router.get('/province/:provinceId', validateHotel.findOne(), validate, controller.findByProvince)
router.get('/:id', verifyTokenNoLimit, validateHotel.findOne(), validate, controller.findOne)
router.get('/service-manager/:serviceManagerId', verifyToken, isSystemUser, validateHotel.findOne(), validate, controller.findByServiceManager)
router.post('/', verifyToken, isServiceManager, uploadCloud.array('images'), validateHotel.create(), validate, controller.create)
router.put('/public/:id',verifyToken, isAdminOrEmployee, validateHotel.findOne(), validate, controller.togglePublic)
router.put('/:id', verifyToken, isServiceManager, uploadCloud.array('images'), validateHotel.update(), validate, controller.update)

module.exports = router
