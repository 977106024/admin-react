import React from 'react'
import './Index.scss'
import { Card } from 'antd';
import SearchFrom from '@/components/Search/Search'


export default class GameConfig extends React.Component{

    state = {
        searchCriteria:['游戏名称','游戏id']
    }

    criteriaVal(val){
        console.log(val)
    }

    render(){
        return (
            <section id="GameConfig">
                <Card title="游戏配置" extra={<a href="#">添加游戏</a>} style={{ width: '100%' }}>
                    <SearchFrom criteria={this.state.searchCriteria} criteriaVal={this.criteriaVal.bind(this)}/>
                </Card>
                <Card className="card-table" size="small" title="Small size card" extra={<a href="#">More</a>} style={{ width: '100%' }}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </section>
        )
    }
}
