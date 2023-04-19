import http from '@utils/http'

const userApi = {
    toggleStatus(data) {
        return http.put(`/user/status/${data}`)
    }
}
export default userApi
