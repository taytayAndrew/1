import { FormEventHandler } from "react"
import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { Topnav } from "../components/Topnav"
import { useSignInStore } from "../stores/useSignInStore"
import { hasError, validate } from "../lib/validate"
import { ajax } from "../lib/ajax"
import { useNavigate } from "react-router-dom"
import { Input } from '../components/Input'

export const SignInPage:React.FC = () =>{
    const {data , setData ,setError,error} = useSignInStore()
    const nav = useNavigate()
    const onSubmit:FormEventHandler<HTMLFormElement> = async(e) =>{
        e.preventDefault()
            const Newerror = validate(data,[
            {key: 'email' ,type:'required', message:'请输入邮箱地址'},
            {key: 'email' ,type:'pattern',regex:/^.+@.+$/, message:'邮箱地址格式 不正确'},
            {key: 'code' ,type:'required', message:'请输入验证码'}, 
            {key: 'code' ,type:'length',min:4,max:6, message:'验证码必须6位数字'}
        ])
        setError(Newerror)
        if(!hasError(Newerror)){
          await ajax.post('/api/v1/session',data)
          nav('/home')
        }
      }
      
    
    
 return (
    <div> 
        <Gradient>
            <Topnav title='登录' icon={<Icon name='back' />}/>
        </Gradient>
        <div text-center pt-40px pb-16px>
        <Icon name="logo" className='w-64px h-68px' />
        <h1 text-32px text="#7878FF" font-bold>山竹记账</h1>
      </div>
      <form j-form onSubmit={onSubmit}>
        {/* <div b-1 b-red>{JSON.stringify(data)}</div> 
        react并不支持渲染对象 */}
          <Input type = 'text'label='邮箱地址' placeholder='请输入邮箱，然后点击发送验证码'
          value={data.email} onChange={email => setData({ email })}
          error={error.email?.[0]} />
          {/**基本上所有的input 都会有这个写法  value={data.email} 
           * onChange={e => setData({email: e.target.value}) 
           * 变得是email 类似于监听e.target.value的值*/}
        
        <div>
          <span j-form-label>验证码{error.code?.[0] && <span text-blue>{error.code[0]}</span>}</span>
          <div flex gap-x-16px >
            <input shrink-1 j-input-text w-129px type="text" placeholder='六位数字'
            value={data.code} onChange={e => setData({code: e.target.value})} />
            <button grow-1 j-btn  >发送验证码</button>
          </div>
        </div>
        <div mt-100px>
          <button j-btn type="submit">登录</button>
        </div>
      </form>
    </div>)
  
}
