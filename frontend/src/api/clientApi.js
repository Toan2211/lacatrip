import http from '@utils/http'

const clientApi = {
    getClients(data) {
        return http.get('/client', { params: data })
    }
}
export default clientApi
