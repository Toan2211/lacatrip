import http from '@utils/http'

const restaurantApi = {
    getAll(data) {
        return http.get('/restaurant', { params: { ...data } })
    },
    create(data, config) {
        return http.post('/restaurant', data, config)
    },
    getDetail(restaurantId) {
        return http.get(`/restaurant/${restaurantId}`)
    },
    update(data, config) {
        return http.put(`/restaurant/${data.get('id')}`, data, config)
    },
    togglePublic(restaurantId) {
        return http.put(`/restaurant/public/${restaurantId}`)
    }
}
export default restaurantApi
