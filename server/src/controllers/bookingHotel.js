const bookingHotelService = require('../services/bookingHotel')

const create = async (req, res) => {
    try {
        req.body.userId = req.user.id
        const booking = await bookingHotelService.createBooking(req.body)
        return res.status(200).json({
            message: 'Booking successful - Please payment !',
            data: booking
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const getAllBookingsByUser = async (req, res) => {
    try {
        const bookings = await bookingHotelService.getAllBookingsByUser(req.query)
        return res.status(200).json({
            message: 'Get all booking by user!',
            data: bookings
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const getBookingById= async (req, res) => {
    try {
        const booking = await bookingHotelService.getBookingById(req.params.id)
        return res.status(200).json({
            message: 'Get booking successful!',
            data: booking
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = {
    create,
    getAllBookingsByUser,
    getBookingById
}