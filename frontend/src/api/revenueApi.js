import http from '@utils/http'

const revenueApi = {
    getAll(data) {
        return http.get('/revenue', { params: data })
    }
}
export default revenueApi
