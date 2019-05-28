import React from 'react'
import './Index.scss'
import { Card, Table, Divider, Tag } from 'antd';
import SearchFrom from '@/components/Search/Search'
import { Link } from 'react-router-dom'
import {getGameList} from '@/service/getData'

const columns = [
    {
        title: 'cover',
        dataIndex: 'cover',
        key: 'cover',
},
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
},
{
    title: 'id',
    dataIndex: '_id',
    key: '_id',
},
{
    title: 'url',
        dataIndex: 'url',
    key: 'url',
},
// {
//     title: 'Tags',
//         key: 'tags',
//     dataIndex: 'tags',
//     render: tags => (
// <span>
// {tags.map(tag => {
//         let color = tag.length > 5 ? 'geekblue' : 'green';
//     if (tag === 'loser') {
//         color = 'volcano';
//     }
//     return (
//         <Tag color={color} key={tag}>
//     {tag.toUpperCase()}
//     </Tag>
// );
// })}
// </span>
// ),
// },
    {
        title: 'reta',
        dataIndex: 'reta',
        key: 'reta',
    },
// {
//     title: 'Action',
//         key: 'action',
//     render: (text, record) => (
// <span>
// <a href="javascript:;">Invite {record.name}</a>
// <Divider type="vertical" />
//     <a href="javascript:;">Delete</a>
//     </span>
// ),
// },
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
        },
        list:[]
    }

    componentWillMount() {
        const data = {
            name:'',
            id:''
        }
        getGameList(data).then(res=>{
            let $res = res.data
            if($res.code === 200){
                this.setState({
                    list:$res.data
                })
            }

        })
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
                    <Table rowKey="_id" columns={columns} dataSource={this.state.list} />
                </Card>
            </section>
        )
    }
}
