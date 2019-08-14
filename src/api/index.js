import axiosInstance from './ajax'
const Relogin = (username,password)=>{
    return axiosInstance.post('/login',{username,password})
}
export default Relogin