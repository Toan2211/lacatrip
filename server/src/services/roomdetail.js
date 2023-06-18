const db = require('../models')
const create = async data => {
    try {
        const roomDetail = await db.RoomDetail.create(data)
        return roomDetail
    } catch (error) {
        throw new Error(error)
    }
}
const getRoomDetailById = async id => {
    try {
        const roomDetail = await db.RoomDetail.findOne({
            where: { id: id }})
        return roomDetail
    } catch (error) {
        throw new Error(error)
    }
}
const toggleOpen = async id => {
    try {
        const detailRoom = await db.RoomDetail.findByPk(id)
        if (!detailRoom)
            return false
        const update = await db.RoomDetail.update(
            {
                isOpen: !detailRoom.isOpen
            },
            {
                where: {
                    id: id
                }
            }
        )
        return update
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    create,
    toggleOpen,
    getRoomDetailById
}
