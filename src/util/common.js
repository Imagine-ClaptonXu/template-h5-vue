import { showToast } from 'vant'


const log = (import.meta.env.MODE !== 'production') ? console.log.bind(console) : () => {}

// eslint-disable-next-line no-undef
const versionString = `__version: ${import.meta.env.MODE}_${new Date(__TIMESTAMP__).toLocaleString('zh-CN')}`
const logVersion = () => {
    console.log(versionString)
}


// 获取url参数
function getUrlVars(name) {
    let vars = {}
    let location = window.location.href
    let b = new URL(location)
    let url = b.origin + b.pathname + b.hash + b.search
    let parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value
    })
    return vars[name]
}


export {
    getUrlVars,
    log,
    logVersion,
}