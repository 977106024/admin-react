
import axios from 'axios'
import APIURL from '@/config/env'


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    console.log(config)
    let TOKEN = localStorage.getItem('TOKEN')
    if(TOKEN){
        config.headers["x-access-token"] = TOKEN
    }
    console.log(config)
    return config
})


/**
 * 获取登录二维码 get
 * @param url地址
 * @returns {AxiosPromise}
 */
export const qrLogin = (param) => (
    axios({
        method: 'get',
        url: `${APIURL}/admin/QrLogin`,
        params: param
    })
)

/**
 * 获取登录状态 是否确认登录 get
 * @param uuid
 */
export const loginStatus = (param) => (
    axios({
        method: 'get',
        url: `${APIURL}/admin/LoginStatus`,
        params: param
    })
)

/**
 * 二维码状态
 * @param uuid
 */
export const statusQr = (param) => (
    axios({
        method: 'get',
        url: `${APIURL}/admin/statusQr`,
        params: param
    })
)

/**
 * 图片上传
 * @param imgFile
 */
export const uploadImg = (param) => (
    axios({
        method: 'post',
        url:`${APIURL}/admin/Upload`,
        data:param
    })
)