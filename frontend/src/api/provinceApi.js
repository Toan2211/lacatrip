import http from '@utils/http'

const provinceApi = {
    getAllProvince() {
        return http.get('/province')
    },
    getTopPopular() {
        return http.get('/province/popular')
    }
}
export default provinceApi
