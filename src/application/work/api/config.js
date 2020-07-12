import axios from 'axios'

//创建一个axios实例
const service = axios.create({
    //请求超市时间
    timeout:3000
})

//请求拦截器
//进行添加token等等操作
service.interceptors.request.use(
    config =>{
        return config

    },
    err =>{
        console.log(err)
    }
)


//对于后端返回值的拦截处理
service.interceptors.response.use(
    response =>{
        let res= {}
        res.status = response.status
        res.data = response.data
        return res


    },
    err =>{
        console.log(err)
    }
)


export default service