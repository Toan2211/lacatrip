import http from '@utils/http'

const employeeApi = {
    getEmployees(data) {
        return http.get('/employee', data)
    },
    create(data) {
        return http.post('/employee', data)
    }
}
export default employeeApi
