import React from 'react'
import axios from 'axios'
import qs from 'qs'
import APIURL from '@/config/env'
import { message} from 'antd';

//组件外跳转方法
import {createHashHistory} from 'history';
const history = createHashHistory();

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    let TOKEN = localStorage.getItem('TOKEN')
    if(TOKEN){
        config.headers["x-access-token"] = TOKEN
    }
    return config
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data = response.data
    if(data.code === 200 && data.data){
        // message.success('成功')
    }else if(data.code === -200){
        message.warning(`${data.data}!`);
    }else if(data.code === 300){
        message.error('服务器错误!');
    }else if(data.code === 400){
        message.warning(`请重新登陆！`)
        history.push("/login")
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


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

/**
 * 游戏列表
 * @param name id
 */
export const getGameList = (param) =>(
    axios({
        method:'get',
        url:`${APIURL}/admin/GetGameList`,
        params:param
    })
)

/**
 * 游戏详情
 * @param id
 */
export const getGameDetails = (param) =>(
    axios({
        method:'get',
        url:`${APIURL}/admin/GetGameDetails`,
        params:param
    })
)

/**
 * 删除游戏
 * @param id
 */
export const removeGame = (param) =>(
    axios({
        method:'post',
        url:`${APIURL}/admin/RemoveGame`,
        params:param
    })
)




