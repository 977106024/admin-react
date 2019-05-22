import React from 'react'
import './Index.scss'
import Button from 'antd/lib/button';
import loginImg from '@/assets/images/login.png'
import { qrLogin, loginStatus } from '@/service/getData'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            qrImg: "",
            url: "https://mp.weixin.qq.com/s/q9yB3MxcJgfXVECBRQu7nQ",
            isLogin:""
        }
    }

    componentWillMount() {
        const data = { url: this.state.url }
        qrLogin(data).then(res => {
            let $res = res.data
            if ($res.code === 200) {
                this.setState({
                    qrImg: $res.data.qrImg
                })

                //uuid
                let uuid = $res.data.uuid
                this.isLogin = setInterval(() => {
                    this.login(uuid)
                },2000)
            }
        })
    }

    //是否登录成功
    login(uuid) {
        const data = {
            uuid: uuid
        }
        loginStatus(data).then(res => {
            let $res = res.data
            if ($res.code === 200 && $res.data) {
                clearInterval(this.isLogin)
                console.log($res.data)
            }
        })
    }

    render() {
        return (
            <section id="Login">
                <div className="content">
                    <img src={this.state.qrImg} alt="二维码" />
                    <p>扫码进入</p>
                </div>
            </section>
        )
    }
}