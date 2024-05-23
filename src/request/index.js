import {
    log,
} from '@/util/common.js'
import axios from "axios"

class HttpRequest {
    constructor(baseUrl = "") {
        this.baseURL = baseUrl
    }

    getBasicConfig() {
        let res = {
            timeout: 10000,
            baseURL: this.baseURL,
            // withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        return res
    }

    interceptors(instance) {
        instance.interceptors.request.use(
            (config) => {
                if (config.params && config.params.showLoading) {
                    // Toast.loading({
                    //     message: '加载中...',
                    //     forbidClick: true,
                    // })
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )
        instance.interceptors.response.use(
            (res) => {
                if ((res.status >= 200 && res.status < 300) || res.status === 304) {
                    return Promise.resolve(res.data)
                } else {
                    // if (process.env.NODE_ENV !== 'production') {
                    //     Toast({
                    //         duration: 2000,
                    //         message: `error: ${JSON.stringify(error)}`,
                    //     })
                    // }
                    return Promise.reject(res.data)
                }
            },
            (error) => {
                // Toast.clear()
                // if (process.env.NODE_ENV !== 'production') {
                //     Toast({
                //         duration: 2000,
                //         message: `error: ${JSON.stringify(error)}`,
                //     })
                // }
                return Promise.reject(error)
            }
        )
    }

    getInstance() {
        this.instance = axios.create()
        return this.instance
    }

    getRequest({ url, params }, config = {}) {
        const instance = this.getInstance()
        const options = Object.assign({}, this.getBasicConfig(), {
            params,
            ...config,
        })
        this.interceptors(instance)

        return instance.get(url, options)
    }

    postRequest({ url, params }, config = {}) {
        const instance = this.getInstance()
        const options = Object.assign({}, this.getBasicConfig(), config)
        this.interceptors(instance)
        return instance.post(url, params, options)
    }
}

export default HttpRequest

