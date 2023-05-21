import http from '@utils/http'

const commentApi = {
    getCommendByInstanceId(data) {
        return http.get('/comment', { params: data })
    },
    create(data, config) {
        return http.post('/comment', data, config)
    }
}
export default commentApi
