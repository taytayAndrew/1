import { useState } from "react"
import { emojis } from "../lib/emojis"
import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { Topnav } from "../components/Topnav"
import s from "./TagsNewPage.module.scss"
import { Input } from "../components/Input"

export const TagsNewPage:React.FC = () =>{
    const onSubmit = () =>{}
    const [emojiKind , setEmojiKind] = useState('表情')
    const [emoji , setEmoji] = useState('')

 return (
    <div >
      <Gradient className="grow-0 shrink-0">
        <Topnav title="新建标签" icon={<Icon name="back" />} />
      </Gradient>
      <form px-16px py-32px  onSubmit={onSubmit} flex flex-col gap-y-16px>
   
        <Input label='标签名' error='标签名太长'/>
        <Input type='emoji' value={emoji} label={`图标 ${emoji}`} onChange={value => setEmoji(value)}/>
        <p text-center py-34px  >记账时长按标签，即可进行编辑</p>
        <div>
          <button j-btn>确定</button>
        </div>
      </form>
    </div>
    )
}