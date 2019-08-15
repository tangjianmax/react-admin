import React,{Component} from 'react';
import { Redirect,Link,withRouter} from 'react-router-dom';
import { Layout, Menu,Icon} from 'antd'
import menuLis from '../../config'
const { SubMenu } = Menu;
 class LeftNav extends Component{
    constructor(props) {
        super(props); // 必须声明prop，否则this.props就是undefined
        this.selectedKey = this.props.location.pathname;
        this.menus = this.creatElements(this.selectedKey);
    }
    creatElement=(item)=>{
            return <Menu.Item key={item.key}>
                <Link to={item.key}>
                    <Icon type={item.icon}/>
                    <span>{item.title}</span>
                </Link>
            </Menu.Item>
    };
    creatElements=(path)=>{
     return menuLis.map((item)=>{
            if(item.children){
                return <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                    {
                        item.children.map((items)=>{
                            if (path === items.key) {
                                // 当前地址是二级菜单，展开一级菜单
                                this.openKey = item.key;
                            }
                           return this.creatElement(items)
                        })
                    }
                </SubMenu>
            }else{
                return this.creatElement(item)
            }
        })
    };

    render() {
        return  <Menu theme="dark" defaultSelectedKeys={[this.selectedKey]}  defaultOpenKeys={[this.openKey]} mode="inline">
            {this.menus}
        </Menu>
    }
}
export default withRouter(LeftNav);