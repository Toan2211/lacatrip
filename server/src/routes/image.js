const express = require('express')
const router = express.Router()
const controller = require('../controllers/image')
router.delete('/:id', controller.deleteImage)
module.exports = router
