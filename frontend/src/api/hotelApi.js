import http from '@utils/http'

const hotelApi = {
    getHotels(data) {
        return http.get('/hotel', { params: data })
    },
    create(data, config) {
        return http.post('/hotel', data, config)
    },
    getDetail(hotelId) {
        return http.get(`/hotel/${hotelId}`)
    },
    update(data, config) {
        return http.put(`/hotel/${data.get('id')}`, data, config)
    },
    togglePublic(hotelId) {
        return http.put(`/hotel/public/${hotelId}`)
    }
}
export default hotelApi
