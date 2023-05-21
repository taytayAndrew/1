import { useState } from "react"
import { emojis } from "../lib/emojis"

export const TagsNewPage:React.FC = () =>{
    const onSubmit = () =>{}
    const [emojiKind , setEmojiKind] = useState('表情')
 return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <span>标签名</span>
          <input j-input-text />
          <span text-red>标签名太长</span>
        </div>
        <div>
          <span>符号 😀</span>
          <div b-1 >
            <div flex>
             {emojis.map(emoji =>
                <span key={emoji.name} onClick={() => setEmojiKind(emoji.name)}>{emoji.name}</span>
                )}
            </div>
            <div>
                {emojis.map(emoji =>
                    <span style={{display:emoji.name === emojiKind ? '':'none' }}>{emoji.chars}</span>
                )}
            </div>
          </div>
        </div>
        <p>记账时长按标签，即可进行编辑</p>
        <div>
          <button j-btn>确定</button>
        </div>
      </form>
    </div>
    )
}