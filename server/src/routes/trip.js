const express = require('express')
const router = express.Router()
const validate = require('../middlewares/validate')
const validateTrip = require('../validations/trip')
const controller = require('../controllers/trip')
const { verifyToken } = require('../middlewares/auth')
const uploadCloud = require('../config/cloudinary.config')
router.get(
    '/',
    verifyToken,
    controller.find
)
router.get(
    '/:id',
    verifyToken,
    validateTrip.findOne(),
    validate,
    controller.findOne
)
router.post(
    '/',
    verifyToken,
    uploadCloud.single('image'),
    validateTrip.create(),
    validate,
    controller.create
)
router.put(
    '/:id',
    verifyToken,
    uploadCloud.single('image'),
    validateTrip.update(),
    validate,
    controller.update
)
router.post(
    '/add-instance',
    verifyToken,
    validateTrip.addInstanceToTripList(),
    validate,
    controller.addInstanceToTripList
)
router.post(
    '/remove-instance',
    verifyToken,
    validateTrip.addInstanceToTripList(),
    validate,
    controller.removeInstanceFromTripList
)
router.post(
    '/update-itinerary',
    verifyToken,
    // validateTrip.addInstanceToTripList(),
    // validate,
    controller.handleUpdateTripDate
)
// router.delete(
//     '/:id',
//     verifyToken,
//     isSystemUser,
//     validateItinerary.findOne(),
//     validate,
//     controller.destroy
// )

module.exports = router
