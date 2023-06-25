import http from '@utils/http'

const trackingPaymentApi = {
    getAll(data) {
        return http.get('/tracking-payment', { params: data })
    }
}
export default trackingPaymentApi
