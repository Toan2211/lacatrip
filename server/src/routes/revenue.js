const revenueController = require('../controllers/revenue')
const express = require('express')
const router = express.Router()

router.get('/', revenueController.getAllRevenue)

module.exports = router