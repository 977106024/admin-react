import React from 'react'
import './Index.scss'
import {qrLogin, loginStatus, statusQr} from '@/service/getData'
import {withRouter} from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            qrImg: "",
            url: "https://xuewuzhijing.top/hall/#/LoginPcQr",
            uuid: "",
            isLogin: "",
            isScanningQr: "",
            tips: "" //显示已扫码 请确认登陆

        }
    }

    componentWillMount() {
        //生成二维码
        const data = {url: this.state.url}
        qrLogin(data).then(res => {
            let $res = res.data
            if ($res.code === 200) {
                this.setState({
                    qrImg: $res.data.qrImg,
                    uuid: $res.data.uuid
                })

                //是否扫码
                this.isScanningQr = setInterval(() => {
                    this.scanningQr(this.state.uuid)
                }, 2000)
            }
        })
    }

    //手机端是否扫码
    scanningQr() {
        const data = {
            uuid: this.state.uuid
        }
        statusQr(data).then(res => {
            let $res = res.data
            if ($res.code === 200 && $res.data) {
                clearInterval(this.isScanningQr)

                this.setState({
                    tips: $res.data
                })

                //是否确认登陆
                this.isLogin = setInterval(() => {
                    this.login(this.state.uuid)
                }, 2000)
            }
        })
    }

    //手机端是否确认登陆
    login(uuid) {
        const data = {
            uuid: uuid
        }
        loginStatus(data).then(res => {
            let $res = res.data
            if ($res.code === 200 && $res.data.status) {
                clearInterval(this.isLogin)
                localStorage.setItem('TOKEN',$res.data.token)

                //进入后台 跳转首页
                this.props.history.push('/index/gameConfig')
            }
        })
    }

    render() {
        return (
            <section id="Login">
                <div className="content">
                    <img src={this.state.qrImg} alt="二维码"/>
                    {
                        this.state.tips ?
                            (<p>
                                <svg className="icon svg-success" aria-hidden="true">
                                    <use xlinkHref="#icon-Success"></use>
                                </svg>
                                已扫码，请确认登陆
                            </p>) : (<p>扫码登陆</p>)
                    }

                </div>
            </section>
        )
    }
}

export default withRouter(Login)