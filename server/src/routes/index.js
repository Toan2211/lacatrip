const router = require('express').Router()

router.get('/status', (req, res) => {
    res.status(200).json({ status: 'Status OKE' })
})

module.exports = router
