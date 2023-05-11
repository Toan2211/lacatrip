const router = require('express').Router()
const auth = require('./auth')
const user = require('./user')
const employee = require('./employee')
const client = require('./client')
const serviceManager = require('./serviceManager')
const province = require('./province')
const amenitiesHotel = require('./amenitiesHotel')
const hotel = require('./hotel')
const image = require('./image')
const room = require('./room')
const restaurant = require('./restaurant')

router.get('/status', (req, res) => {
    res.status(200).json({ status: 'Status OKE' })
})
router.use('/auth', auth)
router.use('/user', user)
router.use('/employee', employee)
router.use('/client', client)
router.use('/service-manager', serviceManager)
router.use('/province', province)
router.use('/amenitiesHotel', amenitiesHotel)
router.use('/hotel', hotel)
router.use('/image', image)
router.use('/room', room)
router.use('/restaurant', restaurant)

module.exports = router
