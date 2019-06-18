import React from 'react'
import UploadImgCom from '@/components/UpLoad/UpLoad'
import {Card,Form,Input,Rate,Button,Icon,message,Row,Col,Popconfirm } from 'antd'
import {addGame,getGameDetails,removeGame} from '@/service/getData'


class GameDetails extends React.Component {
    state = {
        list:[],
        id:''
    }

    componentWillMount() {
        let id = this.props.location.search.split('=')[1]
        if(id){
            this.setState({
                id:id
            })
            //获取游戏详情
            getGameDetails({id:id}).then(res=>{
                let $res = res.data
                if($res.code === 200){
                    this.setState({
                        list:$res.data
                    })
                }
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.game({id:this.state.id,cover:this.state.cover,...values})
            }
        });
    };

    //添加游戏 编辑游戏
    game(val){
        const data = val
        addGame(data).then(res=>{
            let $res = res.data
            if($res.code === 200){
                console.log($res.data)
                message.success('成功')
            }
        })
    }


    //删除游戏
    handleDelete(){
        console.log(`删除${this.state.id}`)
        removeGame({id:this.state.id}).then(res=>{
            let $res = res.data
            if($res.code === 200 && $res.data){
                // this.porps.history.go(-1)
                message.success('成功')
            }
        })
    }

    //游戏图片
    getUrl(url){
        console.log(url)
        this.setState({
            cover:url
        })
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <section id="GameDetails">
                <Card title="游戏详情" style={{ width: '100%' }} onSubmit={this.handleSubmit}>
                    <Form {...formItemLayout}>
                        <Form.Item label="游戏">
                            <span className="ant-form-text">新增or编辑</span>
                        </Form.Item>
                        <Form.Item label="游戏名称">
                            {getFieldDecorator('name', {
                                initialValue:this.state.list.name
                            })(<Input placeholder="请输入游戏名称"/>)}
                        </Form.Item>
                        <Form.Item label="url地址">
                            {getFieldDecorator('url', {
                                initialValue:this.state.list.url
                            })(<Input placeholder="请输入游戏url"/>)}
                        </Form.Item>
                        <Form.Item label="游戏描述">
                            {getFieldDecorator('describe', {
                                initialValue:this.state.list.describe
                            })(<Input placeholder="请输入游戏描述"/>)}
                        </Form.Item>
                        <Form.Item label="Rate">
                            {getFieldDecorator('rate', {
                                initialValue: this.state.list.reta || 5,
                            })(<Rate />)}
                        </Form.Item>
                        <Form.Item label="封面">
                            <UploadImgCom img={this.state.list.cover} onImgUrl={this.getUrl.bind(this)}/>
                        </Form.Item>
                        <Form.Item>
                            <Row>
                                <Col span={3} offset={9}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Col>
                                <Col span={2}>
                                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete()}>
                                        <a href="javascript:;">Delete</a>
                                    </Popconfirm>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Card>
            </section>
        )
    }
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const GameDetailsFrom = Form.create({ name: 'validate_other' })(GameDetails);
export default GameDetailsFrom