const express = require('express')
const router = express.Router()
const validate = require('../middlewares/validate')
const validateMessage = require('../validations/message')
const controller = require('../controllers/message')
const { verifyToken } = require('../middlewares/auth')
const uploadCloud = require('../config/cloudinary.config')

router.post(
    '/',
    verifyToken,
    uploadCloud.single('image'),
    validateMessage.create(),
    validate,
    controller.create
)
router.get(
    '/conversation/:id',
    verifyToken,
    controller.getAllMessages
)

module.exports = router