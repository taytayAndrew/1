import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router"
import React, { useEffect } from 'react'
import './global.scss'
import 'virtual:uno.css'
import './app.scss'
import 'virtual:svgsprites'
import { useLoadingStore } from "./stores/useLoadingStore"
import styled from "styled-components"
import { Icon } from "./components/Icon"
import { usePopout } from "./hooks/usePopout"

export const App :React.FC = () =>{
    const Spin = styled(Icon)`
      animation: spin 1s linear infinite;
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `
    const {popout, hide ,show } = usePopout({children: <div p-32px   ><Spin name = 'loading' className="w-32px h-32px"/></div>,
     position: 'center' })
    const {visible} = useLoadingStore()
    useEffect(() =>{
        if(visible){
           show()
        }else{
            hide()
        }
    } ,[visible])
    
 return (
    <div>
         <RouterProvider router={router} />
         {popout}
    </div>
   )
}