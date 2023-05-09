import http from '@utils/http'

const roomApi = {
    getAll(data) {
        return http.get('/room/hotel', { params: data })
    },
    create(data) {
        return http.post('/room', data)
    },
    getDetail(roomId) {
        return http.get(`/room/${roomId}`)
    },
    update(data) {
        return http.put(`/room/${data.id}`, data)
    }
}
export default roomApi
