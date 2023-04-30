const db = require('../models')
const find = async () => {
    try {
        const data = await db.Province.findAll()
        return data
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    find
}
