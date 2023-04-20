const express = require('express')
const router = express.Router()
const controller = require('../controllers/clients')
const { verifyToken, isAdminOrEmployee } = require('../middlewares/auth')

router.get('/', verifyToken, isAdminOrEmployee, controller.find)
module.exports = router
