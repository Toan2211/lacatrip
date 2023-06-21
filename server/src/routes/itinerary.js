const express = require('express')
const router = express.Router()
const validate = require('../middlewares/validate')
const validateItinerary = require('../validations/itinerary')
const controller = require('../controllers/itinerary')
const { verifyToken, isSystemUser, isServiceManager } = require('../middlewares/auth')
const uploadCloud = require('../config/cloudinary.config')
router.get(
    '/:id',
    validateItinerary.findOne(),
    validate,
    controller.findOne
)
router.post(
    '/',
    verifyToken,
    isServiceManager,
    uploadCloud.single('image'),
    validateItinerary.create(),
    validate,
    controller.create
)
router.put(
    '/:id',
    verifyToken,
    isServiceManager,
    uploadCloud.single('image'),
    validateItinerary.update(),
    validate,
    controller.update
)
router.delete(
    '/:id',
    isServiceManager,
    isSystemUser,
    validateItinerary.findOne(),
    validate,
    controller.destroy
)

module.exports = router
