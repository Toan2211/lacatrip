const router = require('express').Router()
const auth = require('./auth')
const user = require('./user')
const employee = require('./employee')
const client = require('./client')
router.get('/status', (req, res) => {
    res.status(200).json({ status: 'Status OKE' })
})
router.use('/auth', auth)
router.use('/user', user)
router.use('/employee', employee)
router.use('/client', client)
module.exports = router
