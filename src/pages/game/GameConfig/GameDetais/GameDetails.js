import React from 'react'
import UploadImgCom from '@/components/UpLoad/UpLoad'
import {Card,Form,Input,Rate,Button,Icon,message } from 'antd'
import {addGame,getGameDetails} from '@/service/getData'


class GameDetails extends React.Component {
    state = {
        list:''
    }

    componentWillMount() {
        let id = this.props.location.search.split('=')[1]
        getGameDetails({id:id}).then(res=>{
            let $res = res.data
            if($res.code === 200){
                this.setState({
                    list:$res.data
                })
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.game(values)
            }
        });
    };

    game(val){
        const data = val
        addGame(data).then(res=>{
            let $res = res.data
            if($res.code === 200){
                console.log($res.data)
            }
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

                            })(<Input placeholder="请输入游戏url"/>)}
                        </Form.Item>
                        <Form.Item label="Rate">
                            {getFieldDecorator('rate', {
                                initialValue: 5,
                            })(<Rate />)}
                        </Form.Item>
                        <Form.Item label="封面">
                            <UploadImgCom/>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
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