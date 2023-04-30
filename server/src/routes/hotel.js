const express = require('express')
const router = express.Router()
const controller = require('../controllers/hotel')
const uploadCloud = require('../config/cloudinary.config')
const validateHotel = require('../validations/hotel')
const validate = require('../middlewares/validate')
router.post('/', uploadCloud.array('images') , validateHotel.create(), validate, controller.create)
module.exports = router
