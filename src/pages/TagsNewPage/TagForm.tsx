import { FormEventHandler, useEffect } from "react"
import { useCreateTagStore } from "../../stores/useCreateTagStore"
import { useParams, useSearchParams } from "react-router-dom"
import { Input } from "../../components/Input"
import { validate, hasError } from "../../lib/validate"

type Props = {
  type:'create' | 'edit'
}
export const TagForm:React.FC<Props> = (props) =>{
  const {type} = props
  const {data , error ,setData,setError } = useCreateTagStore()
  const [searchParams] = useSearchParams()//用来搜索参数
  useEffect(() => {
    if(type !== 'create'){return}
      const kind = searchParams.get('kind')//用来得到参数kind
      if (!kind) {
        throw new Error('kind 必填')
      }
      if (kind !== 'expenses' && kind !== 'income') {
        throw new Error('kind 必须是 expenses 或 income')
      }
      setData({ kind })
  }, [searchParams])
  const params = useParams()
  useEffect(() => {
    if(type !== 'edit'){return}
      const id = params.id
      if (!id) {
        throw new Error('id必填')
      }
      console.log(id)
  }, [])
  const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
    e.preventDefault()//onSubmit需要取消默认行为
    const newError = validate(data,[
    {key:'kind' , type:'required' , message:'标签类型必填'},
    {key:'name' , type:'required' , message:'标签名必填'},
    {key:'name' , type:'length',max:4 , message:'标签名最多四个字符'},
    {key:'sign' , type:'required' , message:'符号必填'}])
    setError(newError)
    if(!hasError(newError)){
      console.log('五表单错误')
      console.log(data)
      
    }
  }
 return (
    <form p-16px p-t-32px onSubmit={onSubmit} flex flex-col gap-y-16px>
   
        <Input label='标签名' error={error.name?.[0]} value={data.name}
        onChange={name => setData({name})} />
        <Input type='emoji' 
        label={<span>图标<span text-28px>{data.sign}</span></span>} 
        value={data.sign} onChange={sign => setData({sign})}
        error={error.sign?.[0]} />
        <p text-center p-b-8px>记账时长按标签，即可进行编辑</p>
        <div>
          <button j-btn>确定</button>
        </div>
      </form>)
}