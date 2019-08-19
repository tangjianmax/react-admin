import React,{Component,Fragment} from 'react';
import { Card, Button, Icon, Table, message, Modal } from 'antd';
import Froms from './from'
import {regGetData} from '../../api'
import {regAddData} from '../../api'
import UpdateFrom from  './updatefrom'
import {regUpdate} from '../../api'
import './index.less'
import {logicalExpression} from "@babel/types";
class Category extends Component {
    state = {
        categories: [],
        isShowAddCategory: false,
        isUpdateCategory:false,
        category:{},
        isOnclick:false,
        Subcategories:[],
        subCategory:{}
    };
    xys = React.createRef();
    xys1=React.createRef();
    //点击更新修改名称的展示对话框的函数
    UpdateShowName=(category)=>{
        //点击展现对话框
    return ()=>{
        const key = category.parentId === 0 ? 'category' : 'subCategory';
        // if(category.parentId===0){
            this.setState({
                [key]:category,
                isUpdateCategory:true
            })
        }
    };

    columns = [
        {
            title: '品类名称',
            dataIndex: 'name',
        },
        {
            title: '操作', // 列的标题
            className: 'column-operation',  // 列的类名
            // dataIndex: '_id', // 要显示数据的属性名相关
            render: (category) => {
               // categor 就是对应当前列表对象
               //  console.log(category);
                // 如果点击状态为true，则说明要去掉里面的一项
                console.log(category.name);
                if(this.state.isOnclick){
                    return <Fragment>
                        <Button type="link" onClick={this.UpdateShowName(category)}>修改名称</Button>
                    </Fragment>
                }
                else{
                    return <Fragment>
                        <Button type="link" onClick={this.UpdateShowName(category)}>修改名称</Button>
                        <Button type="link" onClick={this.SubclassShow(category)}>查看其子品类</Button>
                    </Fragment>
                }

            }

        }
    ];

    //展示查看其子品类对话框,传入当前对应的一级分类列表的_id值
        SubclassShow = (category) => {
        return () => {
            const id = category._id;
            // console.log(category);
            regGetData(id)
                .then((res) => {
                    // console.log(res);
                    this.setState({
                       Subcategories: res,
                       isOnclick: true,
                        category
                    })
                })
                .catch((err) => {
                    message.error('err', 1)
                });
            //代表点击查看子代品类的对话框后，状态的改变，
            // this.setState({
            //     isOnclick: true,
            //     //category传进来，后面定义的要传入对应的category.name要用
            //     category,
            // })
        }
    };
//展示对话框
    showAddCategory = () => {
        this.setState({
            isShowAddCategory: true,
        })
    };
//取消对话框
    cancel = () => {
        this.setState({
            isShowAddCategory: false,
            isUpdateCategory:false
        })
    };
    //接收请求的分类响应数据
    componentDidMount() {
        regGetData(0)
            .then((res)=>{
                console.log(res);
                this.setState({
                    categories: res,
                })
            })
            .catch((err)=>{
                message.error('err',1)
            })

    }
    //添加分类的方法,判断添加分类表单里面的验证规则如果正确则发送请求响应成功后立即更新页面状态变化，
    addCategory=()=>{
        this.xys.current.validateFields((err, values) => {
            // console.log(values);
            if(!err){
                regAddData(values.parentId,values.categoryName)
                    .then((res)=>{
                        console.log(res);
                        this.setState({
                                categories: [...this.state.categories,res],
                                Subcategories: [...this.state.Subcategories,res]
                            })
                    })

                    .catch((err)=> {
                        message.error('请求失败', 1)
                    })
                    .finally(()=>{
                        this.setState({
                            isShowAddCategory: false,
                        });
                        //from表单清空数据当前值,清除默认值
                     this.xys.current.resetFields()
                    })
            }else{
                message.error("请检查你输入的不能正确性",1)
            }
        });
        console.log(this.state.Subcategories)
    };
    //点击确定对话框发送请求更换名称
    UpdateCategory=()=>{
        this.xys1.current.validateFields((error,value)=>{
        if(!error){
            const id =this.state.category._id;
            regUpdate(id,value.categoryName)
               .then((res)=>{
                   message.success('更新分类名称成功~', 3);
                   this.state.category.name=value.categoryName;
                })
                .catch(()=>{
                    message.error('error',2)
                })
                .finally(()=>{
                    this.setState({
                        isUpdateCategory:false
                    });
                    this.xys1.current.resetFields()
                })
        }

    })
    };
    goBack = () => {
        this.setState({
            isOnclick:false
        })
    };
    render() {
        const { categories, isShowAddCategory,isUpdateCategory,category,isOnclick,Subcategories,subCategory} = this.state;
        // if(isOnclick&&category.parentId==='0'){
        //     this.state.category=category
        // }
        return <Card title={
            isOnclick? <Fragment><Button type="link" className="category-btn" onClick={this.goBack}>一级分类</Button><Icon type="arrow-right"/><span className="category-text">{category.name}</span></Fragment> : "一级分类列表"
        } extra={<Button type="primary" onClick={this.showAddCategory}><Icon type="plus"/>添加品类</Button>}>
                    <Table
                        columns={this.columns}
                        dataSource={isOnclick?Subcategories:categories}
                        bordered
                        pagination={{
                            showQuickJumper: true, // 显示快速跳转
                            showSizeChanger: true, // 显示修改每页显示数量
                            pageSizeOptions: ['3', '6', '9', '12'], // 修改每页显示数量
                            defaultPageSize: 3 // 默认显示数量
                        }}
                        rowKey="_id"
                    />

                    <Modal
                        title="添加分类"
                        visible={isShowAddCategory}
                        onOk={this.addCategory}
                        onCancel={this.cancel}
                        okText="确认"
                        cancelText="取消"
                    >
                        <Froms  categories={categories} ref={this.xys}/>
                    </Modal>

                    <Modal
                        title="更新分类"
                        visible={isUpdateCategory}
                        onOk={this.UpdateCategory}
                        onCancel={this.cancel}
                        okText="确认"
                        cancelText="取消"
                        width={300}
                    >
                        <UpdateFrom category={isOnclick? subCategory :category} ref={this.xys1}/>
                    </Modal>

                </Card>;
            }
}
export default Category;
