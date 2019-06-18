import React from 'react'
import { Upload, Icon, message } from 'antd';


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJPG) {
        message.error('You can only upload JPG or png file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

export default class UploadCom extends React.Component {
    state = {
        loading: false,
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            //获取后端返回的图片地址
            if(parseInt(info.file.response.code) === 200){
                this.setState({
                    imageUrl:info.file.response.data,
                    loading: false,
                })
                //交给父组件
                this.props.onImgUrl(info.file.response.data)
                message.success('图片上传成功！')
            }

            // Get this url from response in real world.
            // getBase64(info.file.originFileObj, imageUrl =>
            //     this.setState({
            //         imageUrl,
            //         loading: false,
            //     }),
            // );
        }
    };


    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl ? this.state.imageUrl : this.props.img;
        return (
            <Upload
                name="game"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://api.xuewuzhijing.top/admin/Upload"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="game" /> : uploadButton}
            </Upload>
        );
    }
}
