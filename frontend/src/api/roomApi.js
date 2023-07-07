import http from '@utils/http'

const roomApi = {
    getAll(data) {
        return http.get('/room/hotel', { params: data })
    },
    create(data, config) {
        return http.post('/room', data, config)
    },
    getDetail(roomId) {
        return http.get(`/room/${roomId}`)
    },
    update(data, config) {
        return http.put(`/room/${data.get('id')}`, data, config)
    },
    addRoomDetail(data) {
        return http.post('/room/room-detail', data)
    }
}
export default roomApi
