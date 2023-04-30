const create = async (req, res) => {
    try {
        console.log(req.body)
        return res.status(200).json({ message: 'oke' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    create
}
