import { useState } from "react"

type Props = {
    className : string
}

export const DateandAmount:React.FC <Props>= (props) =>{
 const {className} = props
 const [x , setX] = useState('')
 
 return (
    <div b-1 b-blue className = {className}> 
        <input value={x}  onChange={e => setX(e.target.value)}/>
        DateandAmount<br/>
        DateandAmount<br/>
        DateandAmount<br/>
        DateandAmount<br/>
        DateandAmount<br/>
        DateandAmount<br/>
        DateandAmount<br/>
        DateandAmount<br/>
        DateandAmount<br/>
    </div>)
}