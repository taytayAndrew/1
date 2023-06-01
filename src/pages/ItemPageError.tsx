import { Navigate, useLocation, useRouteError } from "react-router-dom"

export const ItemPageError :React.FC = () =>{
    const error = useRouteError()
    const e = error as Error
    const loc = useLocation()
   
    if(e.message === 'unauthorized'){
        const from = encodeURIComponent(`${loc.pathname}${loc.search}`)
        return <Navigate to={`/sign_in?from=${from}`} /> 
    }
    else if(e.message === 'empty_data'){
        return <Navigate replace  to='/home' />  //push模式（默认模式，可以记录浏览记录，回退到上一次操作页面记录  replace模式 会替换掉当前路由，回不到上一级路由


    }else{
        return <div>出错了 </div>
    }

    
}