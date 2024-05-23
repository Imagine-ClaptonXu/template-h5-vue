import {
    log,
} from '@/util/common.js'
import HttpRequest from "../index.js"


const base = import.meta.env.VITE_BASE_API
const http = new HttpRequest(base)


const get = (params) => {
    let url = `${base}get`
    return http.getRequest({
        url: url,
        params: {
            "string": "string",
        },
    })
}

const post = (params) => {
    let url = `${base}post`
    return http.postRequest({
        url: url,
        params: {
            "string": "string",
        },
    })
}

export {
    get,
    post,
}
