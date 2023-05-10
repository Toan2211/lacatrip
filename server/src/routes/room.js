const express = require('express')
const router = express.Router()
const validate = require('../middlewares/validate')
const validateRoom = require('../validations/room')
const controller = require('../controllers/room')
const { verifyToken, isSystemUser } = require('../middlewares/auth')
router.get('/hotel', controller.findByHotelId)
router.get('/:id', validateRoom.findOne(), validate, controller.findOne)
router.post('/', verifyToken, isSystemUser, validateRoom.create(), validate, controller.create)
router.put('/:id', verifyToken, isSystemUser, validateRoom.update(), validate, controller.update)
router.delete('/:id', verifyToken, isSystemUser,validateRoom.findOne(), validate, controller.destroy)

module.exports = router
