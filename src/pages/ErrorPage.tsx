import { Navigate, useLocation, useRouteError } from "react-router-dom"

export const ErrorPage :React.FC = () =>{
    const error = useRouteError() as Error
    const loc = useLocation()
    const from = encodeURIComponent(`${loc.pathname}${loc.search}`)
    if(error.message === 'unauthorized'){
     
            return <Navigate replace to={`/sign_in?from=${from}`} /> 
    }
    else{
        return <div>未知错误</div>
    }
    
}