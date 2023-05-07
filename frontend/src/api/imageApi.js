import http from '@utils/http'

const imageApi = {
    delete(imgId) {
        return http.delete(`/image/${imgId}`)
    }
}
export default imageApi
