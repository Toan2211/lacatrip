const express = require('express')
const router = express.Router()

const controller = require('../controllers/room')
const { verifyToken, isSystemUser } = require('../middlewares/auth')
router.get('/:id', controller.findOne)
router.get('/hotel/:hotelId', controller.findByHotelId)
router.post('/', verifyToken, isSystemUser, controller.create)
router.put('/:id', verifyToken, isSystemUser, controller.update)
router.delete('/:id', verifyToken, isSystemUser, controller.destroy)

module.exports = router
