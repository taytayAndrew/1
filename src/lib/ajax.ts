import axios, { AxiosRequestConfig } from 'axios'
import { useLoadingStore } from '../stores/useLoadingStore';

axios.defaults.baseURL = isDev ? '/' : 'http://121.196.236.94:8080/api/v1'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000
//需要动态获取就是用拦截器  每次发送请求都要获取jwt
//静态获取用default（默认值）配置
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const jwt = localStorage.getItem('jwt')
  config.headers = config.headers || {}
  if(jwt){
    config.headers.Authorization = `Bearer${jwt}`//Bearer令牌
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


type Options = {
  showLoading?: boolean
}

export const useAjax = (options?:Options) => {
  const showLoading = options?.showLoading || false
  const {setVisible} = useLoadingStore()
  const ajax = {
    get: <T>(path: string , config?:AxiosRequestConfig<any> ) => {
      return axios.get<T>(path , config)
    },
    post: <T>(path:string, data:JSONValue) => { 
      if(showLoading){setVisible(true)}
      return axios.post<T>(path, data).finally(() =>{
         if(showLoading){setVisible(false)}
      })
     
    },
    patch: () => { },
    delete: () => { },
  }
  return ajax
}