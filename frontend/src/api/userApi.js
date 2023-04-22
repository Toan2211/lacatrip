import http from '@utils/http'

const userApi = {
    toggleStatus(data) {
        return http.put(`/user/status/${data}`)
    },
    update(data) {
        return http.put(`/user/${data.get('id')}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    changePassword(data) {
        return http.put(`/user/changepass/${data.id}`, data)
    }
}
export default userApi
