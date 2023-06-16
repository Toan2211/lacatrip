import http from '@utils/http'

const bookingHotelApi = {
    create(data) {
        return http.post('/booking-hotel', data)
    },
    getAllByMe(data) {
        return http.get('/booking-hotel/me', { params: data } )
    },
    getAll(data) {
        return http.get('/booking-hotel', { params: data } )
    }
}
export default bookingHotelApi
