import React,{Component} from 'react';
import { Form, Input, Icon, Button , message} from 'antd';
import {reqLogin} from '../../api/index'
import logo from './logo.png';
import data from '../../judge/user'
import value1 from '../../judge/json'
import axios from 'axios';
import './index.less'
const Item = Form.Item;

class Login extends Component{
    validator = (rule, value, callback) => {
        const name = rule.field ==='username'? '用户名':'密码';
        const passwordReg = /^\w+$/;
        if(!value){
        callback(`${name}不能为空`)
        }else if (value.length > 10) {
            callback(`${name}最大长度为10`)
        }else if(value.length<5){
            callback(`${name}最小长度为5`)
        }else if(!passwordReg.test(value)){
            callback(`${name}只能包含英文、数字、下划线`);
        }
        callback()
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const {username,password}= values;
                 reqLogin(username,password)
                .then((response)=>{
                    message.success('登录成功',5);
                    data.user=response;
                      const value = data.user;
                    localStorage.setItem('user',JSON.stringify(value))
                    this.props.history.replace('/');
                })
                .catch((err)=>{
                    message.error('用户或密码错误',3)
                })
        });

    }
    render() {
        const {getFieldDecorator} = this.props.form;
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
                            {getFieldDecorator('username', {
                                rules: [
                                    // {required: true, message: '请输入用户名'},
                                    // {min: 5, message: '请输入有效范围'},
                                    {validator:this.validator}
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="Username"
                                />,
                            )}
                        </Item>
                        <Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {validator: this.validator}
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
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
export default Form.create()(Login);

