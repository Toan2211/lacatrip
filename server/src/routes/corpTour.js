const express = require('express')
const router = express.Router()
const validate = require('../middlewares/validate')
const validateCorpTour = require('../validations/corpTour')
const controller = require('../controllers/corpTour')
const { verifyToken, isSystemUser } = require('../middlewares/auth')

router.get('/', controller.find)
router.get('/:id', validateCorpTour.findOne(), validate, controller.findOne)
router.post('/', verifyToken, isSystemUser, validateCorpTour.create(), validate, controller.create)
router.put('/:id', verifyToken, isSystemUser, validateCorpTour.update(), validate, controller.update)

module.exports = router
