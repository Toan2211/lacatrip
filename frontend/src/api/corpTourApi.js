import http from '@utils/http'

const corpTourApi = {
    getAll(data) {
        return http.get('/corp-tour', { params: data })
    },
    create(data) {
        return http.post('/corp-tour', data)
    },
    getDetail(corpTourId) {
        return http.get(`/corp-tour/${corpTourId}`)
    },
    update(data) {
        return http.put(`/corp-tour/${data.id}`, data)
    }
}
export default corpTourApi
