import http from '@utils/http'

const destinationApi = {
    getAll(data) {
        return http.get('/destination-travel', { params: data })
    },
    create(data, config) {
        return http.post('/destination-travel', data, config)
    },
    getDetail(destinationtravelId) {
        return http.get(`/destination-travel/${destinationtravelId}`)
    },
    update(data, config) {
        return http.put(`/destination-travel/${data.get('id')}`, data, config)
    },
    togglePublic(destinationtravelId) {
        return http.put(`/destination-travel/public/${destinationtravelId}`)
    }
}
export default destinationApi
