import React from 'react'
import UploadImg from '@/components/UpLoad/UpLoad'
import {Card,Form,Input,Rate,Upload,Button,Icon,message } from 'antd'

class GameDetails extends React.Component {
    state = {
        imageUrl:"",
        loading: false,
    }

    beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const imageUrl = this.state.imageUrl;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <section id="GameDetails">
                <Card title="游戏详情" style={{ width: '100%' }}>
                    <Form {...formItemLayout}>
                        <Form.Item label="游戏">
                            <span className="ant-form-text">新增or编辑</span>
                        </Form.Item>
                        <Form.Item label="游戏名称">
                            <Input placeholder="请输入游戏名称"/>
                        </Form.Item>
                        <Form.Item label="url地址">
                            <Input placeholder="请输入游戏url"/>
                        </Form.Item>
                        <Form.Item label="Rate">
                            {getFieldDecorator('rate', {
                                initialValue: 5,
                            })(<Rate />)}
                        </Form.Item>
                        <Form.Item label="封面">
                            <UploadImg/>
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