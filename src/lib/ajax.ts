import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { useLoadingStore } from '../stores/useLoadingStore';
import { useNavigate } from 'react-router-dom';

export const ajax = axios.create({
  baseURL: isDev ? '/' : 'https://121.196.236.94:8080/',
    headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})
  //需要动态获取就是用拦截器  每次发送请求都要获取jwt
  //静态获取用default（默认值）配置
  ajax.interceptors.request.use((config) => {
    // Do something before request is sent
    const jwt = localStorage.getItem('jwt') || ''
    config.headers = config.headers || {}
    if(jwt){
      config.headers.Authorization = `Bearer ${jwt}`}//Bearer令牌 要tm写空格啊
    
    return config;
})


type Options = {
  showLoading?: boolean
  handleError?: boolean
}

//如若使用拦截器来得到它的error.status就不能引用hooks
export const useAjax = (options?:Options) => {
  const table: Record<string, undefined | (() => void)> = {
    401: () => {
      nav('/sign_in')
    },
    402: () => {
      window.alert('请付费后观看')
    },
    403: () => {
      window.alert('没有权限')
    },
  }
  const showLoading = options?.showLoading || false//undefined null 0 false ..都会取后面的值
  const handleError = options?.handleError ?? true//只有undefined null 会取后面的值
  const {setVisible} = useLoadingStore()
  const nav = useNavigate()
  const onError = (error: AxiosError) => {
    if (error.response) {
      if (handleError) {
        const { status } = error.response
        const fn = table[status] 
        fn?.()
      }
    }
    throw error
  }
  return {
    get: <T>(path: string, config?: AxiosRequestConfig<any>) => {
      if (showLoading) { setVisible(true) }
      return ajax.get<T>(path, config).catch(onError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
    post: <T>(path: string, data: JSONValue) => {
      if (showLoading) { setVisible(true) }
      return ajax.post<T>(path, data).catch(onError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
    patch: <T>(path: string, data: JSONValue) => {
      if (showLoading) { setVisible(true) }
      return ajax.patch<T>(path, data).catch(onError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
    destroy: <T>(path: string) => {
      if (showLoading) { setVisible(true) }
      return ajax.delete<T>(path).catch(onError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
  }
}