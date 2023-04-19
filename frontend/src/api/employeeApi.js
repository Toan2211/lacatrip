import http from '@utils/http'

const employeeApi = {
    getEmployees(data) {
        return http.get('/employee', { params: data })
    },
    create(data, config) {
        return http.post('/employee', data, config)
    },
    update(data, config) {
        return http.put(`/employee/${data.get('id')}`, data, config)
    }
}
export default employeeApi
