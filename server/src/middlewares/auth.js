const jwt = require('jsonwebtoken')
const { secretJWT } = require('../config/auth.config')
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]
    if (!token)
        return res
            .status(400)
            .json({ msg: 'Invalid Authentication.' })
    const decoded = jwt.verify(token, secretJWT)
    if (!decoded)
        return res
            .status(400)
            .json({ msg: 'Invalid Authentication.' })
    req.user = decoded
    next()
}
const isAuthenticatedUser = (req, res, next) => {
    if (req.user.confirm)
        next()
    return res.status(403).json({ msg: 'Account is not confirm or blocked !' })
}
module.exports = {
    verifyToken,
    isAuthenticatedUser
}
