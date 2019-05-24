import React from 'react'
import './Search.css'
import { Form, Row, Col, Input, Button, Icon } from 'antd';

class Search extends React.Component{
    state = {
        expand: false,
    }

    // To generate mock Form.Item
    getFields() {
        const searchCriteria = this.props.searchCriteria
        const count = this.state.expand ? 10 : searchCriteria.length;
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < searchCriteria.length; i++) {
            children.push(
                <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
                    <Form.Item label={`${searchCriteria[i]}`}>
                        {getFieldDecorator(`${searchCriteria[i]}`, {
                            rules: [
                                {
                                    required: true,
                                    message: 'Input something!',
                                },
                            ],
                        })(<Input placeholder={`请输入${searchCriteria[i]}`} />)}
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