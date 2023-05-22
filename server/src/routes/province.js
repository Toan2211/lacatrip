const express = require('express')
const router = express.Router()

const controller = require('../controllers/provinces')
router.get('/', controller.find)
router.get('/popular', controller.getTopPopular)
module.exports = router
