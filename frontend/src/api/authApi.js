import http from '@utils/http'

const authApi = {
    signin(data) {
        return http.post('/auth/signin', data)
    },
    signup(data) {
        return http.post('/auth/signup', data)
    },
    forgotPassword(data) {
        return http.post('/auth/forgotpassword', data)
    }
}
export default authApi
