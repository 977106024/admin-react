import React from 'react'
import './Index.scss'
import {Link} from 'react-router-dom'
import {RouterMain} from '@/router/router'
import Home from '@/components/Breadcrumb/Breadcrumb'
import {Layout, Menu, Breadcrumb, Icon} from 'antd';


const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

export default class Index extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {openKeys:['sub1']}
    //     this.rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
    // }

    state = {
        openKeys: ['game'],
        paht:'/gameConfig'
    }
    rootSubmenuKeys = ['game', 'sub2', 'sub3'];

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys});
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    render() {
        return (
            <section id="Index">
                <Layout>
                    <Header className="header">
                        <div className="logo"/>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{lineHeight: '64px'}}
                        >
                            <Menu.Item key="1">游戏</Menu.Item>
                            <Menu.Item key="2">小程序</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>
                    <Layout>
                        <Sider width={200} style={{background: '#fff'}}>
                            <Menu
                                mode="inline"
                                openKeys={this.state.openKeys}
                                onOpenChange={this.onOpenChange}
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{height: '100%', borderRight: 0}}
                            >
                                <SubMenu
                                    key="game"
                                    title={
                                        <span>
                                        <Icon type="user"/>
                                        游戏管理
                                      </span>
                                    }
                                >
                                    <Menu.Item key="1">
                                        <Link to="/index/gameConfig">配置游戏</Link>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <Link to="/index/gameQuery">游戏查询</Link>
                                    </Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub2"
                                    title={
                                        <span>
                                        <Icon type="laptop"/>
                                        subnav 2
                                      </span>
                                    }
                                >
                                    <Menu.Item key="5">option5</Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub3"
                                    title={
                                        <span>
                                    <Icon type="notification"/>
                                    subnav 3
                                  </span>
                                    }
                                >
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout style={{padding: '0 24px 24px'}}>
                            {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                            {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                            {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
                            {/*    <Breadcrumb.Item>App</Breadcrumb.Item>*/}
                            {/*</Breadcrumb>*/}
                            <Home column={this.state.openKeys[0]}/>
                            <Content
                                style={{
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <RouterMain/>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </section>
        )
    }
}