const express = require('express')
const router = express.Router()

const controller = require('../controllers/amenitieshotel')
router.get('/', controller.find)
module.exports = router
