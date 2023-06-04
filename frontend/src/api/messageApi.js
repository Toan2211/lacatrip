import http from '@utils/http'

const messageApi = {
    create(data, config) {
        return http.post('/message', data, config)
    },
    getConversationByTripId(data) {
        return http.get(`/message/conversation/${data.tripId}`, { params: data.params })
    }
}
export default messageApi
