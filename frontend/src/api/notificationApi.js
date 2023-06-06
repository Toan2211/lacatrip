import http from '@utils/http'

const notificationApi = {
    create(data) {
        return http.post('/notification', data)
    },
    getAllNotifications(data) {
        return http.get('/notification', { params: data })
    },
    readedNotifi(data) {
        return http.post('/notification/read', data)
    }
}
export default notificationApi
