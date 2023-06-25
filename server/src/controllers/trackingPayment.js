const trackingPaymentService = require('../services/trackingPayment')

const find = async (req, res) => {
    try {
        const trackingPayments = await trackingPaymentService.find(
            req.query
        )
        return res.status(200).json({
            message: 'Get list Tracking Payment successful !',
            data: trackingPayments
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = {
    find
}
