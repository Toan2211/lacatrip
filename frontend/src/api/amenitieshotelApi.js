import http from '@utils/http'

const amenitieshotelApi = {
    getAll() {
        return http.get('/amenitiesHotel')
    }
}
export default amenitieshotelApi
