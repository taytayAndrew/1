import useSWR from 'swr'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useTitle } from '../hooks/useTitle'
import { Loading } from '../components/Loading'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import { useAjax } from '../lib/ajax'
import { AxiosError } from 'axios'
import { Icon } from '../components/Icon'
import { lazy } from 'react'



//不要使用默认header来设置 authorazation
export const Home: React.FC = (props) => {

  const {get} = useAjax({ showLoading: true, handleError: false })
  const nav = useNavigate()
  const onHttpError = (error: AxiosError) => {
    //返回状态码403就跳转
    if(error.response){
      if(error.response?.status === 403) {//根据请求给的状态码跳转页面
      nav('/sign_in')
    }
    }
    throw(error)
  }
  const { data: meData, error: meError } = useSWR('/api/v1/me', async path =>
  {
   const response = await get<Resource<User>>(path).catch(onHttpError)
   return response.data.resource}
  )
  const { data: itemsData, error: itemsError } = useSWR(meData ? '/api/v1/items' : null, async path =>
    (await get<Resources<Item>>(path)).data
  )

  const isLoadingMe = !meData && !meError
  const isLoadingItems = meData && !itemsData && !itemsError

  if (isLoadingMe || isLoadingItems) {
    return <div text-center p-16px>加载中...</div>
  }

  if (itemsData?.resources[0]) {
    return <Navigate to="/items" />
  }

  return <div>
    <div flex justify-center items-center>
      <Icon className='mt-20vh mb-20vh w-128px h-128px' name='kitty'/>
    </div>
    <div px-16px>
      <Link to="/items">
       <button q-btn
      >开始记账</button>
      </Link>
     
    </div>
    <AddItemFloatButton />
  </div >
}
