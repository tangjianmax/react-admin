import axios from 'axios'
const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:5000';
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 3000,
});
// Interceptors拦截器
axiosInstance.interceptors.response.use(
    // 响应成功的回调
    (response) => {
        const result = response.data;
        if (result.status === 0) {
            return result.data
        } else {
            return Promise.reject(result.msg );
        }
    },
    (error) => {
        return Promise.reject('网络出现故障，请刷新试试');
    }
);
export default axiosInstance