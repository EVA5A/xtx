// axios的基础封装
import axios from 'axios'
//引入element做统一错误提示
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/use'
import router from '@/router'   //此处@/router 与Layout组件跳转页面不同
//创建这个实例
const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    // timeout:5000
})

//拦截器
//axios请求拦截器
httpInstance.interceptors.request.use(config => {
    //1.从pinia获取token数据
    const userStore = useUserStore()   //通过这个实例对象，能拿到token数据
    //2.按照后端要求拼接token数据
    const token = userStore.useInfo.token  //1.获取token数据
    if (token) {               //若token存在，进行拼接
        config.headers.Authorization = `Bearer ${token}`    //因为很多接口都需要token进行鉴权，所以要请求要携带token
    }
    return config
}, e => Promise.reject(e))





//axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    const userStore = useUserStore()   //通过这个实例对象，能拿到token数据
    //统一错误提示
    ElMessage({
        type: 'warning',
        message: e.response.data.message
    })
    //401token失效处理
    if (e.response.status === 401) {
        //1.清除本地用户数据
        userStore.clearUserInfo()
        //2.跳转到登录页
        router.push('/Login')
    }

    return Promise.reject(e)
})

export default httpInstance