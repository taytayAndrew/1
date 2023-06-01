import { Navigate, useRouteError } from "react-router-dom"

export const ItemPageError :React.FC = () =>{
    const error = useRouteError()
    const e = error as Error
    if(e.message === 'unauthorized'){
        return <Navigate to='/sign_in' />
    }
    else if(e.message === 'empty_data'){
        return <Navigate replace to='/home' />
    }else{
        return <div>出错了 </div>
    }

    
}