const jwt = require('jsonwebtoken')
const { secretJWT } = require('../config/auth.config')
const { ADMINID, EMPLOYEEID } = require('../constants/variable')
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]
    if (!token)
        return res
            .status(400)
            .json({ message: 'Invalid Authentication.' })
    const decoded = jwt.verify(token, secretJWT)
    if (!decoded)
        return res
            .status(400)
            .json({ message: 'Invalid Authentication.' })
    req.user = decoded
    next()
}
const isAuthenticatedUser = (req, res, next) => {
    if (req.user.confirm)
        return next()
    return res.status(403).json({ message: 'Account is not confirm or blocked !' })
}
const isAdmin = (req, res, next) => {
    if (req.user.roleId === ADMINID) {
        return next()
    }
    return res.status(403).json({ message: 'Forbidden: required Admin !' })
}
const isAdminOrEmployee = (req, res, next) => {
    if (req.user.roleId === ADMINID || req.user.roleId === EMPLOYEEID) {
        return next()
    }
    return res.status(403).json({ message: 'Forbidden: required Admin or Employee !' })
}
module.exports = {
    verifyToken,
    isAuthenticatedUser,
    isAdmin,
    isAdminOrEmployee
}
