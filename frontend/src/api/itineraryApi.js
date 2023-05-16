import http from '@utils/http'

const itineraryApi = {
    create(data, config) {
        return http.post('/itinerary', data, config)
    },
    getDetail(itineraryId) {
        return http.get(`/itinerary/${itineraryId}`)
    },
    update(data, config) {
        return http.put(`/itinerary/${data.get('id')}`, data, config)
    },
    delete(itineraryId) {
        return http.delete(`/itinerary/${itineraryId}`)
    }
}
export default itineraryApi
