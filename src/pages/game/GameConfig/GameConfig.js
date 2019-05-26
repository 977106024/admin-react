import React from 'react'
import './Index.scss'
import { Card, Table, Divider, Tag } from 'antd';
import SearchFrom from '@/components/Search/Search'
import { Link } from 'react-router-dom'

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
},
{
    title: 'Age',
        dataIndex: 'age',
    key: 'age',
},
{
    title: 'Address',
        dataIndex: 'address',
    key: 'address',
},
{
    title: 'Tags',
        key: 'tags',
    dataIndex: 'tags',
    render: tags => (
<span>
{tags.map(tag => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
    if (tag === 'loser') {
        color = 'volcano';
    }
    return (
        <Tag color={color} key={tag}>
    {tag.toUpperCase()}
    </Tag>
);
})}
</span>
),
},
{
    title: 'Action',
        key: 'action',
    render: (text, record) => (
<span>
<a href="javascript:;">Invite {record.name}</a>
<Divider type="vertical" />
    <a href="javascript:;">Delete</a>
    </span>
),
},
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

export default class GameConfig extends React.Component{

    state = {
        searchCriteria:{
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
    }

    //search
    criteriaVal(val){
        console.log(val)
    }

    render(){
        return (
            <section id="GameConfig">
                <Card title="游戏配置" extra={<Link to="/index/gameConfig/gameDetails">添加游戏</Link>} style={{ width: '100%' }}>
                    <SearchFrom criteria={this.state.searchCriteria} criteriaVal={this.criteriaVal.bind(this)}/>
                </Card>
                <Card className="card-table" size="small" style={{ width: '100%' }}>
                    <Table columns={columns} dataSource={data} />
                </Card>
            </section>
        )
    }
}
