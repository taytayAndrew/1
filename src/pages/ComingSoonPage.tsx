import {useNavigate } from 'react-router-dom'
import { Icon } from '../components/Icon'



export const ComingSoonPage:React.FC = () =>{
    const nav = useNavigate()

 return (
    <div flex flex-col justify-center items-center gap-y-24px h-screen px-48px>

        <Icon name ='comingsoon' className='w-128px h-128px'/>
        <div>敬请期待</div>
            <button onClick={() => nav(-1)} j-btn>返回</button>

    </div>)
}