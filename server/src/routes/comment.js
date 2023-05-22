const express = require('express')
const router = express.Router()
const controller = require('../controllers/comment')
const uploadCloud = require('../config/cloudinary.config')
const { verifyToken } = require('../middlewares/auth')
const validate = require('../validations/comment')
router.get('/', validate.find(), controller.find)
router.get('/:id', controller.findOne)
router.post(
    '/',
    verifyToken,
    validate.create(),
    uploadCloud.array('images'),
    controller.create
)
module.exports = router
