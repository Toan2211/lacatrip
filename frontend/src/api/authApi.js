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
    },
    createAccountInvite(data) {
        return http.post('/auth/create/account-invite', data)
    }
}
export default authApi
