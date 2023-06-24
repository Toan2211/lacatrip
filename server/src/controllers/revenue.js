const revenueService = require('../services/revenue')
const getAllRevenue = async (req, res) => {
    try {
        const data = await revenueService.getAllRevenue(req.query)
        return res.status(200).json({
            message: 'Get list revenue successful !',
            data: data
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllRevenue
}
