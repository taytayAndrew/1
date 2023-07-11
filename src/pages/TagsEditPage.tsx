import { BackIcon } from "../components/BackIcon"
import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { Topnav } from "../components/Topnav"
import { useAjax } from "../lib/ajax"
import { TagForm } from "./TagsNewPage/TagForm"
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

export const comfirmable = (tips:string,fn:() => void) =>() => {
  const result = window.confirm(tips)
  if(result){fn()}
}
export const TagsEditPage:React.FC = () =>{
  const { destroy } = useAjax({ showLoading: true, handleError: true })
  const nav = useNavigate()

  const {id} = useParams()
  const onDelete = comfirmable('确定要删除吗',async() => {
    if(!id){throw new Error('id不能为空')}
    await destroy(`/api/v1/tags/${id}`).catch((error) =>{window.alert('删除失败');throw error})
    window.alert('删除成功')
    nav('/items/new')
    
  })
 return (
    <div >
    <Gradient className="grow-0 shrink-0">
      <Topnav title="查看标签" icon={<BackIcon />} />
    </Gradient>
    <TagForm type='edit'/>
    <div px-16px p-b-32px>
        <button onClick={onDelete} j-btn bg="#E10505">删除</button>
    </div>
    
  </div>)
}