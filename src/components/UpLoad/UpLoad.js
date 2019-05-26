import React from 'react'
import { Upload, Icon, message } from 'antd';
import {uploadImg} from '@/service/getData'
import axios from 'axios'


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

    uploadFile(e){
        // const {filename,file} = val
        let file = e.target.files[0]

        const formData = new FormData();
        formData.append("imgFile", file, file.name);
        uploadImg(formData).then(res=>{
            console.log(res)
        })

        // let config = {
        //     headers:{'Content-Type':'multipart/form-data'}
        // };  //添加请求头
        // axios.get('https://api.xuewuzhijing.top/admin/Upload?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiNDJlYjVhMTAtN2ZiMS0xMWU5LWI5ZGItMTNkYWFjZWNmNTFmIiwiaWF0IjoxNTU4ODczNTA0LCJleHAiOjE1NTg4NzcxMDR9.Xesg2OHpSTIaLdcDCNwfMw6sQMZwtsYxj3QFdEZXkN4',{
        //     params:formData,
        //     config
        // }).then(res=>{
        //     console.log(res)
        // })
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
            <input type="file" onChange={this.uploadFile.bind(this)}/>
        );
    }
}
