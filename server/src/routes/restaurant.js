const express = require('express')
const router = express.Router()
const controller = require('../controllers/restaurant')
const uploadCloud = require('../config/cloudinary.config')
const validateRestaurant = require('../validations/restaurant')
const validate = require('../middlewares/validate')
const { verifyToken, isAdminOrEmployee, verifyTokenNoLimit } = require('../middlewares/auth')

router.get('/', controller.find)
router.post('/', verifyToken, isAdminOrEmployee, uploadCloud.array('images'), validateRestaurant.create(), validate, controller.create)
router.get('/:id', verifyTokenNoLimit, validateRestaurant.findOne(), validate, controller.findOne)
router.put('/:id', verifyToken, isAdminOrEmployee, uploadCloud.array('images'), validateRestaurant.update(), validate, controller.update)
router.put('/public/:id',verifyToken, isAdminOrEmployee, validateRestaurant.findOne(), validate, controller.togglePublic)
module.exports = router

