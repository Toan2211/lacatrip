import axios from 'axios'
import LocalStorage from '@constants/localStorage'
import { toast } from 'react-toastify'

class Http {
    constructor() {
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_BASE_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        this.instance.interceptors.response.use(
            response => {
                const result = {
                    ...response.data,
                    status: response.status
                }
                return result
            },
            ({ response }) => {
                if (response.status === 401) {
                    toast.error(response.data.message, {
                        position: 'bottom-center',
                        autoClose: 1000,
                        hideProgressBar: true
                    })
                }
                const result = {
                    ...response.data,
                    status: response.status
                }
                return Promise.reject(result)
            }
        )
        this.instance.interceptors.request.use(
            config => {
                const accessToken = localStorage.getItem(
                    LocalStorage.ACCESS_TOKEN
                )
                if (accessToken) {
                    config.headers.authorization = accessToken
                }
                return config
            },
            error => {
                return Promise.reject(error.response)
            }
        )
    }
    get(url, config = null) {
        return this.instance.get(url, config)
    }
    post(url, data, config = null) {
        return this.instance.post(url, data, config)
    }
    put(url, data, config = null) {
        return this.instance.put(url, data, config)
    }
    delete(url, data, config = null) {
        return this.instance.delete(url, {
            data,
            ...config
        })
    }
}

const http = new Http()
export default http
