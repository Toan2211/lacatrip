const router = require('express').Router()
const auth = require('./auth')
const user = require('./user')
router.get('/status', (req, res) => {
    res.status(200).json({ status: 'Status OKE' })
})
router.use('/auth', auth)
router.use('/user', user)
module.exports = router
