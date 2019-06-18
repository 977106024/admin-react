import React from 'react'
import { Upload, Icon, message } from 'antd';
import {uploadImg} from '@/service/getData'


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
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
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    uploadFile(val){
        return
        const {filename,file} = val
        console.log(val)
        // let file = e.target.files[0]
        const formData = new FormData()
        formData.append('imgfile',file,file.name)
        uploadImg(formData).then(res=>{
            let $res = res.data
            if($res.code === 200) {
                console.log('上传成功！')
            }
        })

    }

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <Upload
                name="game"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://localhost:2333/admin/Upload"
                beforeUpload={beforeUpload}
                onChange={this.uploadFile.bind(this)}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
            // <input type="file" onChange={this.uploadFile.bind(this)}/>
        );
    }
}
