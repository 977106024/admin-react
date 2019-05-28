
import axios from 'axios'
import qs from 'qs'
import APIURL from '@/config/env'

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    let TOKEN = localStorage.getItem('TOKEN')
    if(TOKEN){
        config.headers["x-access-token"] = TOKEN
    }
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

/**
 * 新增游戏
 * @param gameInfo
 */
export const addGame = (param) =>(
    axios({
        method:'post',
        url:`${APIURL}/admin/AddGame`,
        data:qs.stringify(param)
    })
)

export const getGameList = (param) =>(
    axios({
        method:'get',
        url:`${APIURL}/admin/getGameList`,
        params:param
    })
)

