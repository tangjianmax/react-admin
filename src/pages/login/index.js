import React,{Component} from 'react';
import { Form, Input, Icon, Button } from 'antd';
import logo from './logo.png';
import './index.less'
const Item = Form.Item
class Login extends Component{
    render(){
        return <div className="login">
          <header className="login-header">
              <img src={logo}/>
              <h1>React:后台项目</h1>
          </header>
            <section className="login-section">
                <div className="login-middle">
                <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            <Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="用户"/>,
                        </Item>
                        <Item>
                            <Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="密码"/>
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                        </Item>
                    </Form>
                </div>
            </section>
        </div>
    }
}
export default Login;
