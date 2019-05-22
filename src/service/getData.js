import React from 'react'
import axios from 'axios'
import qs from 'qs'
import APIURL from '@/config/env'

/**
 * 获取登录二维码 get
 * @param url地址
 * @returns {AxiosPromise}
 */
export const qrLogin = (param) => (
    axios({
        method:'get',
        url:`${APIURL}/admin/QrLogin`,
        params:param
    })
)

/**
 * 获取登录状态 是否确认登录 get
 * @param uuid
 */
export const loginStatus = (param) => (
    axios({
        method:'get',
        url:`${APIURL}/admin/LoginStatus`,
        params:param
    })
)