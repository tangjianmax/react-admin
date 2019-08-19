import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import ProtoTypes from 'prop-types'
const { Option } = Select;
const { Item } = Form;
class UpdateFrom extends Component {
    static protoTypes ={
        category:ProtoTypes.object.isRequired
    };
    render() {
        // const categories =this.props.categories;
        const {getFieldDecorator} =this.props.form;
        const name = this.props.category.name;
        console.log(name);
        return <Form>
            <Item >
                {
                    getFieldDecorator( 'categoryName', {
                        initialValue: name,
                            rules: [
                                {required:true,message:'请输入分类名称'}
                            ]
                        }
                    )(
                        <Input  placeholder=""/>
                    )
                }
            </Item>
        </Form>
    }
}
            export default Form.create()(UpdateFrom)