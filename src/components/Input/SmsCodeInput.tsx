import { time } from "echarts"
import { useEffect, useRef, useState } from "react"
import { useFetcher } from "react-router-dom"

type Props = {
    value?: string
    placeholder?: string
    onChange?:(value: string) => void
    request?: () => Promise<unknown>
}

const maxCount =60;
export const SmsCodeInput :React.FC<Props> = (props) =>{
    const {value , placeholder , onChange , request} = props
    const [started , setStarted] = useState<Date>()
    const [count , setCounted] = useState(maxCount)
    const timer = useRef<number>()

    const onClick = async () =>{
       if(!request){return }
       await request()
       setStarted(new Date())
    }
    // useEffect(() => {
    //   if(!started){ return }
    //   if(count === -1 ){
    //     setStarted(false)
    //     setCounted(5)
        
    //   }
    //    const timer =   setTimeout(() => {
    //     setCounted(count - 1)
    //   }, 1000);
     
    //    return() => {
    //   clearTimeout(timer)//清理操作 
    // }
    // },[started,count])
    //嵌套使用setTimeout 会导致倒计时出现bug

    const clearTimer = () => {
      if(timer.current){
        window.clearInterval(timer.current)
      timer.current = undefined 
      }
      
    }
    useEffect(() => {
      if (!started) {
        clearTimer()
        return
      }
      timer.current = window.setInterval(() => {
        const seconds = Math.round((new Date().getTime() - started.getTime()) / 1000)
        const count = maxCount - seconds
        if (count < 0) { setStarted(undefined) }
        setCounted(count)
      }, 1000)
      return clearTimer
    }, [started])
      ///这样就可以解决倒数秒数错误的问题
 return (
    <div flex gap-x-16px>
              <input shrink-1 j-input-text type="text" placeholder={placeholder} max-w="[calc(40%-8px)]"
                value={value} onChange={e => onChange?.(e.target.value)} />

                    {started?
                    <button max-w="[calc(60%-8px)]" shrink-0 j-btn onClick = {onClick} color="grey">正在倒计时 还剩下{count}秒 </button>:
                    <button  max-w="[calc(60%-8px)]" shrink-0 j-btn onClick = {onClick} >发送验证码</button>
            
                    }
                    </div>
 )
}