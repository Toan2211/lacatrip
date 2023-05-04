import http from '@utils/http'

const provinceApi = {
    getAllProvince() {
        return http.get('/province')
    }
}
export default provinceApi
