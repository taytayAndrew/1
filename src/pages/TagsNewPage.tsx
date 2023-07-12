import { FormEventHandler, useEffect, useState } from "react"
import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { Topnav } from "../components/Topnav"
import { TagForm } from "./TagsNewPage/TagForm"
import { BackIcon } from "../components/BackIcon"

export const TagsNewPage:React.FC = () =>{

 return (
    <div >
      <Gradient className="grow-0 shrink-0">
        <Topnav title="新建标签" icon={<BackIcon  />} />
      </Gradient>
      <TagForm type='create'/>
    </div>
    )
}