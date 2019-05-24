import React from 'react'
import './Search.css'
import { Form, Row, Col, Input, Button, Icon } from 'antd';

class Search extends React.Component{
    state = {
        expand: false,
    }

    aaa(rule, value, callback){
        let reg = /^[\d]+$/;
        if(!reg.test(value)){
            callback('只能输入数字！')
            return
        }
        callback()
    }

    // To generate mock Form.Item
    getFields() {
        const criteria = this.props.criteria
        const count = this.state.expand ? 10 : criteria.length;
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < criteria.length; i++) {
            children.push(
            <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
        <Form.Item label={`${criteria[i]}`}>
            {getFieldDecorator(`${criteria[i]}`, {
                rules: [{

                },
                    {
                        validator:this.aaa.bind(this)
                    }
                ],
            })(<Input placeholder={`请输入${criteria[i]}`} />)}
            </Form.Item>
            </Col>,
            );
            }
            return children;
        }

        handleSearch = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                console.log('Received values of form: ', values);
        });
        };

        handleReset = () => {
            this.props.form.resetFields();
        };


        render(){
            return (
                <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                <Row gutter={24}>{this.getFields()}</Row>
                <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
        <Button type="primary" htmlType="submit">
                Search
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                Clear
                </Button>
                </Col>
                </Row>
                </Form>
        )
        }
    }

    const SearchForm = Form.create({ name: 'advanced_search' })(Search);

    export default SearchForm