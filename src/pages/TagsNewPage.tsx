import { useState } from "react"
import { emojis } from "../lib/emojis"
import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { Topnav } from "../components/Topnav"
import s from "./TagsNewPage.module.scss"

export const TagsNewPage:React.FC = () =>{
    const onSubmit = () =>{}
    const [emojiKind , setEmojiKind] = useState('表情')

 return (
    <div >
      <Gradient className="grow-0 shrink-0">
        <Topnav title="新建标签" icon={<Icon name="back" />} />
      </Gradient>
      <form px-16px py-32px  onSubmit={onSubmit} flex flex-col gap-y-16px>
     
        <div gap-y-8px  flex flex-col>
          <span text-18px>标签名</span>
          <input j-input-text />
          <span  text-red text-12px>标签名太长</span>
        </div>
        <div flex flex-col gap-y-8px>
          <span text-18px>符号 <span text-24px>😀</span> </span>
          <div b-1 b="#5C33BE" rounded-8px >
            <div flex gap-x-16px overflow-auto text="#bbb9ba" >
             {emojis.map(emoji =>
                <span className={emoji.name === emojiKind?s.selectedTag:''} whitespace-nowrap key={emoji.name} onClick={() => {setEmojiKind(emoji.name)}}>{emoji.name}</span>
                )}
            </div>
            <div text-24px px-8px h-400px overflow-auto text-center>
                {emojis.map(emoji =>
                <div pt-10px pb-10px text-center style={{display:emoji.name === emojiKind ? '':'none' }} 
                grid grid-cols="[repeat(auto-fit,34px)]" grid-rows="[repeat(auto-fit,34px)]" justify-center >
                        {emoji.chars.map(char => <span text-center  w-34px>{char}</span>)}
                </div>
                )}
            </div>
          </div>
        </div>
        <p text-center py-34px >记账时长按标签，即可进行编辑</p>
        <div>
          <button j-btn>确定</button>
        </div>
      </form>
    </div>
    )
}