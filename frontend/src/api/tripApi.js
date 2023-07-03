import http from '@utils/http'

const tripApi = {
    getAll(data) {
        return http.get('/trip', { params: data })
    },
    create(data, config) {
        return http.post('/trip', data, config)
    },
    getDetail(tripId) {
        return http.get(`/trip/${tripId}`)
    },
    update(data, config) {
        return http.put(`/trip/${data.get('id')}`, data, config)
    },
    addInstance(data) {
        return http.post('/trip/add-instance', data)
    },
    removeInstance(data) {
        return http.post('/trip/remove-instance', data)
    },
    handleUpdateItinerary(data) {
        const { tripId, itineraries } = data
        return http.put(`/trip/${tripId}/update-itinerary`, {
            itineraries: itineraries
        })
    },
    inviteMember(data) {
        return http.post('/trip/invite-member', data)
    },
    deleteMember(data) {
        return http.post('/trip/delete-member', data)
    }
}
export default tripApi
