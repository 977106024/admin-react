/**
 * 搜索组件
 * 接受参数：searchCriteria:{
                name:{
                        name:"游戏名称",
                        id:"游戏Id",
                        xxx:"4",
                        sss:"55",
                        sss:"8888"
                    },
                type:{
                    name:"text",
                    id:"number"
                }
         }
 */

import React from 'react'
import './Search.css'
import { Form, Row, Col, Input, Button, Icon, InputNumber } from 'antd';

class Search extends React.Component{
    state = {

    }


    // To generate mock Form.Item
    getFields() {
        const criteria = this.props.criteria
        //name
        const inputName = criteria.name
        //type
        const inputType = criteria.type

        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let key in inputName) {

            //自定义验证规则
            let rules
            if(inputType[key] === 'text' || inputType[key] === undefined || inputType[key] === ""){
                rules = ({})
            }else{
                rules = ({
                    rules:[],
                    getValueFromEvent: (event) => {
                    return event.target.value.replace(/\D/g,'')
                },
            })
            }

            // input创建
            children.push(
            <Col span={8} key={key}>
                <Form.Item label={`${inputName[key]}`}>
                    {getFieldDecorator(`${key}`, rules)(<Input placeholder={`请输入${inputName[key]}`} />)}
                </Form.Item>
            </Col>,
            );
            }
            return children;
        }

        //result
        handleSearch = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                console.log('Received values of form: ', values);
                this.props.criteriaVal(values)
        });
        };

        //claer
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