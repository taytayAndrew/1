import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { Topnav } from "../components/Topnav"
import { TagForm } from "./TagsNewPage/TagForm"

export const TagsEditPage:React.FC = () =>{
 return (
    <div >
    <Gradient className="grow-0 shrink-0">
      <Topnav title="查看标签" icon={<Icon name="back" />} />
    </Gradient>
    <TagForm type='edit'/>
    <div px-16px p-b-32px>
        <button j-btn bg="#E10505">删除</button>
    </div>
    
  </div>)
}