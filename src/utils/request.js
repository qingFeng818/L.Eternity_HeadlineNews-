import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})

// 添加请求拦截器,在数据捕获之前通过请求拦截器对请求数据进行处理，可以给所有的请求头添加一个公共的请求数据
request.interceptors.request.use(
  function (config) {
    const token = store.state.tokenObj.token
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
/* request.interceptors.request.use(
  function (config) {
    console.log(config)
    const token = store.state.tokenObj.token
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
) */
/* request.interceptors.request.use(
  function (config) {
    console.log(config)
    const token = store.state.tokenObj.token
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
) */

export default request
