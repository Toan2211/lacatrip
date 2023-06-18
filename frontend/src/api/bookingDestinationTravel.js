import http from '@utils/http'

const bookingDestinationTravelApi = {
    create(data) {
        return http.post('/booking-destination-travel', data)
    },
    getAllByMe(data) {
        return http.get('/booking-destination-travel/me', { params: data } )
    },
    getAll(data) {
        return http.get('/booking-destination-travel', { params: data } )
    }
}
export default bookingDestinationTravelApi
