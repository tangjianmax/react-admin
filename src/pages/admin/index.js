import React,{Component} from 'react';
import { Redirect,Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon , Spin } from 'antd'
import Login from '../login'
import data from '../../judge/user'
import {reqValidateUser} from '../../api'
import logo from '../login/logo.png'
import './index.less'
import LeftNav from '../../components/left-nav'
const value1=JSON.parse(localStorage.getItem('user'));
console.log(value1);

class Admin extends Component{
    //定义初始状态,判断后面的值，因为判断直接登录在localStorage上面更改的地址也可以登录，这样就是漏洞所以判断状态，如果在localStorage上面直接更改，则出现另一个状态
    state={
        isTrue:true,
        collapsed: false,
    };
    onCollapse = (collapsed)=> {
        this.setState({
            collapsed
        });
    };

    render(){
        const IsDisplay = this.state.collapsed===true? 'none':'block';
        const { Header, Content, Footer, Sider } = Layout;
        const { SubMenu } = Menu;
        if(!data.user._id) {
            if (!value1) {
                return <Redirect to='/login'/>
            } else {
                const id = value1._id;
                reqValidateUser(id)
                    .then(() => {
                        data.user = value1;
                    })
                    .catch(() => {
                        this.setState({
                            isTrue: false
                        })
                    })
            }
        }
        const flag = this.state.isTrue;
        if(!flag){
            return <Spin tip="Loading..."/>
        }else {
            return (
                <Layout style={{minHeight: '100vh'}}>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="logo">
                            <img src={logo}/>
                            <h1 style={{display:IsDisplay}}>硅谷后台</h1>
                        </div>
                        <LeftNav/>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: 0}}/>
                        <Content style={{margin: '0 16px'}}>
                            <Breadcrumb style={{margin: '16px 0'}}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{padding: 24, background: '#fff', minHeight: 360}}>Bill is a cat.</div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            );
        }
    }
}
export default Admin;
