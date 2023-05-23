import { FormEventHandler, useEffect, useState } from "react"
import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { Topnav } from "../components/Topnav"
import { Input } from "../components/Input"
import { useCreateTagStore } from "../stores/useCreateTagStore"
import { useSearchParams } from "react-router-dom"
import { hasError, validate } from "../lib/validate"

export const TagsNewPage:React.FC = () =>{
  const {data , error ,setData,setError } = useCreateTagStore()
  const [searchParams] = useSearchParams()//用来搜索参数
  useEffect(() => {
    const kind = searchParams.get('kind')//用来得到参数kind
    if (!kind) {
      throw new Error('kind 必填')
    }
    if (kind !== 'expenses' && kind !== 'income') {
      throw new Error('kind 必须是 expenses 或 income')
    }
    setData({ kind })
  }, [searchParams])
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
      }
    }

 return (
    <div >
      <Gradient className="grow-0 shrink-0">
        <Topnav title="新建标签" icon={<Icon name="back" />} />
      </Gradient>
      <form px-16px py-32px  onSubmit={onSubmit} flex flex-col gap-y-16px>
   
        <Input label='标签名' error={error.name?.[0]} value={data.name}
        onChange={name => setData({name})} />
        <Input type='emoji' 
        label={<span>图标<span text-28px>{data.sign}</span></span>} 
        value={data.sign} onChange={sign => setData({sign})}
        error={error.sign?.[0]} />
        <p text-center py-34px  >记账时长按标签，即可进行编辑</p>
        <div>
          <button j-btn>确定</button>
        </div>
      </form>
    </div>
    )
}