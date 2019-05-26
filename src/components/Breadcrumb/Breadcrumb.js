import React from 'react'
import './Breadcrumb.css'
import { Router as HashRouter, Route, Switch, Link, withRouter } from 'react-router-dom'
import { Breadcrumb, Alert } from 'antd';


const breadcrumbNameMap = {
    '/index/gameConfig': '游戏配置',
    '/index/gameQuery': '游戏查询'
};
const columnName = {
    'game':'游戏管理'
}
const Home = withRouter(props => {

    const { location } = props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });
    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link to="/">{columnName[props.column]}</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);
    return (
        <div className="brea">
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        </div>
    );
});

export default Home
