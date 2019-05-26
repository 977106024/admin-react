
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
        methods: 'get',
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
        methods: 'post',
        url:`${APIURL}/weChatApp/upImgFile?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2E5NDZjMDAtN2ZiYS0xMWU5LTk0ZjMtNjUxNGE3NTQ5ZTZlIiwiaWF0IjoxNTU4ODc3NTkzLCJleHAiOjE1NTg4ODExOTN9.Ip-dt4o2dZq_Zhx9N2xU2QC8gKmTdjY7BLF3_OBfThw`,
        data:param,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
)