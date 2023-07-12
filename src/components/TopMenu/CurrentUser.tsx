import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"
import useSWR from "swr"
import { useAjax } from "../../lib/ajax"
import { comfirmable } from "../../pages/TagsEditPage"

interface Props {
  className?: string
}
const Div = styled.div `
background: linear-gradient(90deg, rgba(9,121,101,1) 0%, rgba(204,187,231,1) 0%, rgba(107,247,255,1) 94%);

`
export const CurrentUser: React.FC<Props> = ({ className }) => {
  const {get} = useAjax({showLoading:true, handleError:false})
  const {data:me,error} = useSWR('/api/v1/me',async(path)=>
  (await get<Resource<User>>(path)).data.resource
  )
  const loc = useLocation()
  const from = encodeURIComponent(`${loc.pathname}${loc.search}`)
  const name = me?.name ?? me?.email
  const logout = comfirmable('确定要退出登录吗',()=>{
    window.localStorage.removeItem('jwt')
    window.location.reload()
  })
  return (
    
 
     <Div><Link to={`/sign_in?from=${from}`} block className={className}  text-white w="100%" pt-32px pb-44px
      px-16px> 
        {error ? (
        <Link to='/sign_in'>
          <h2 text-24px>未登录用户</h2>
          <div text="purple">点击这里登录</div>
        </Link>
        )
        : (
        <div onClick={logout}>
          <h2 text-24px overflow-hidden text-ellipsis title={name}>{name}</h2>
          <div text="purple" p-t-8px>点击这里退出登录</div>
        </div>)
      }
      
     
    </Link></Div>

   

    
  )
}
