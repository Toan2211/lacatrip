import http from '@utils/http'

const serviceManagerApi = {
    getServiceManagers(data) {
        return http.get('/service-manager', { params: data })
    },
    create(data, config) {
        return http.post('/service-manager', data, config)
    },
    update(data, config) {
        return http.put(
            `/service-manager/${data.get('id')}`,
            data,
            config
        )
    },
    updatePaymentAccount(data) {
        return http.put(
            `/service-manager/update-payment-account/${data.id}`,
            {
                paymentAccount: data.paymentAccount
            }
        )
    }
}
export default serviceManagerApi
