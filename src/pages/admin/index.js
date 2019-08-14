import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import Login from '../login'
import data from '../../judge/user'
// import value1 from '../../judge/json'
const value1=JSON.parse(localStorage.getItem('user'))

class Admin extends Component{
    render(){
        console.log(value1);
        if(!data.user._id){
            if(!value1){
                return <Redirect to='/login'/>
            }else{
                data.user=value1
            }
        }
        return <div>
            Admin
        </div>
    }
}

export default Admin;
