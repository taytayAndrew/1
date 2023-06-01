import { FormEventHandler } from "react"
import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { Topnav } from "../components/Topnav"
import { useSignInStore } from "../stores/useSignInStore"
import { FormError, hasError, validate } from "../lib/validate"
import { useAjax } from "../lib/ajax"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Input } from '../components/Input'
import { AxiosError } from "axios"

export const SignInPage:React.FC = () =>{
  
    const {data , setData ,setError,error} = useSignInStore()
    const nav = useNavigate()
    const [search] = useSearchParams()
    const onSubmitError = (err:AxiosError<{errors : FormError<typeof data>}>) =>{
        setError(err.response?.data?.errors ?? {})
        throw error
    }
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
          //发送请求
          const response = await post<{jwt : string}>('http://121.196.236.94:8080/api/v1/session',data)
          .catch(onSubmitError)
          //获取jwt
          const jwt = response.data.jwt
          console.log('jwt',jwt)
          localStorage.setItem('jwt',jwt)
          //jwt存入localstorage
          const from = search.get('from') || '/items'
          nav(from)
          //回到登陆前的页面
        }
      }
      const {post} = useAjax({showLoading: true});

      //要让所有组件都可以使用到loading 就最好用全局状态管理器 也就是zustand
    // const {setVisible} = useLoadingStore()//注意要写在普通函数外面 不然就是一个invalid hook call
    const onClickCode = async () => {
      
      const NewError = validate({email: data.email},[
        {key:'email' , type:'pattern' , regex:/^.+@.+$/, message:'邮箱地址格式 不正确'}
      ])
      if(hasError(NewError)){
        throw new Error('表单出错')
      }
      // setVisible(true)
        const response = await post('http://121.196.236.94:8080/api/v1/validation_codes',{
           email:data.email 
        })
        // .finally(() => {setVisible(false)})
       return(response)
      
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
          <Input type="text" label='邮箱地址' placeholder='请输入邮箱，然后点击发送验证码'
          value={data.email} onChange={email => setData({ email })}
          error={error.email?.[0]}  />
          {/**基本上所有的input 都会有这个写法  value={data.email} 
           * onChange={e => setData({email: e.target.value}) 
           * 变得是email 类似于监听e.target.value的值*/}
        <Input label='邮箱地址' type="sms_code" placeholder='六位数字'
          value={data.code} onChange={code => setData({code })}
          error={error.email?.[0]}  request={onClickCode}/>
      
        <div mt-100px>
          <button j-btn type="submit">登录</button>
        </div>
      </form>
    </div>)
  
}
