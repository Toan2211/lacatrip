const provinceService = require('../services/province')
const find  = async (req, res) => {
    try
    {
        const provinces = await provinceService.find()
        return res.status(200).json({
            message: 'Get list provinces successful !',
            data: provinces
        })
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
module.exports = {
    find
}