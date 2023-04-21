const userService = require('../services/user')
const { AUTHENTICATEDID } = require('../constants/variable')
const find = async (req, res) => {
    try
    {
        const key = req.query.key ? +req.query.key : ''
        const page = req.query.page ? +req.query.page : 1
        const limit = req.query.limit ? +req.query.limit : 10
        const userData = await userService.find(key, page, limit, AUTHENTICATEDID)
        return res.status(200).json({
            message: 'Get list clients successful !',
            data: userData
        })
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
module.exports = {
    find
}
