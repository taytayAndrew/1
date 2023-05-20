import { useEffect, useRef, useState } from 'react'
import { time } from "../lib/time"
type Props = {
  start?: Date
  end?: Date
  value?: Date
  onChange?: (value:Date) => void
}
export const Datepicker:React.FC<Props> = (props) =>{
  const {start , end ,value, onChange} = props
  const startTime = start? time(start):time().add(-10,'years')
  const endTime = start? time(end):time().add(10,'years')
  const [, update] = useState({})
  const valueTime = useRef(value ? time(value) : time())
  const yearList = Array.from({length: endTime.year - startTime.year + 1}).map((_,index) => startTime.year + index)
  const monthList = Array.from({ length: 12 }).map((_, index) => index + 1)
  const dayList = Array.from({length:valueTime. current.lastDayofMonth.day}).map((_,index)=> index+1)
  if (endTime.timestamp <= startTime.timestamp) {//判断结束时间晚于开始时间 gettime是指从January 1, 1970开始到现在的秒数
    throw new Error('结束时间必须晚于开始时间')
  }
 return (
  <div flex>
    <Column className="grow-1" items={yearList} value={valueTime.current.year} onChange={year => {valueTime.current.year = year ; update({}); onChange?.(valueTime.current.date)}}/>
    <Column className="grow-1" items={monthList} value={valueTime.current.month} onChange={month => {valueTime.current.month=month ; update({}); onChange?.(valueTime.current.date)}}/> 
    <Column className="grow-1" items={dayList} value={valueTime.current.day} onChange={day => {valueTime.current.day=day ; update({}); onChange?.(valueTime.current.date)}}/> 
  </div>
  //这里使用useRef是为了避免更新后导致valueTime重新声明 导致日期改变 
  //使用强制更新ForceUpdate const [, update] = useState({})可以强制React更新组件

  //注意一下  这里Column组件 第一个onChange是Column自己组件中的用来事件监听的 在onTouchEnd用到了 作用是将最后停下来的月份/日期/年份的选项传给valueTime.current.xxx 
  //在onChange 中的onChange是Datepicker组件的 作用是直接打印当前的已更新的valueTime.current.xxx 
  
    )
}
 type ColumnProps = {
  itemHeight?: number
  className?: string
  items:number[]
  value:number
  onChange: (value:number) => void
}
export const Column:React.FC <ColumnProps>= (props) =>{
  const {items,itemHeight = 36,value, className,onChange} = props
  useEffect(()=>{
    const index = items.indexOf(value)
    setTranslateY(index*  -itemHeight)
  },[value])
  const index = items.indexOf(value)
  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(-1)
  // console.log(t.add(10,'years').format('yyyy年MM月dd日 HH时'))
  const [translateY, _setTranslateY] = useState(index * - itemHeight)
  const setTranslateY = (y: number) => {
    y = Math.min(y, 0)
    y = Math.max(y, (items.length - 1) * -itemHeight)
    _setTranslateY(y)
  }
 return (
  <div className={className} h="50vh" overflow-hidden relative
  onTouchStart={(e) => {
    setIsTouching(true)
    setLastY(e.touches[0].clientY)
  }}
  onTouchMove={(e) => {
    if (isTouching) {
      const y = e.touches[0].clientY
      const dy = y - lastY
      setTranslateY(translateY + dy)
      setLastY(y)
    }
  }}
  onTouchEnd={() => {
    const remainder = translateY % itemHeight
    let y = translateY - remainder
    if (Math.abs(remainder) > 18) {
      y += itemHeight * (remainder > 0 ? 1 : -1)
    }
    setTranslateY(y)
    setIsTouching(false)
    onChange(items[Math.abs(y/itemHeight)])
  }}
>
<div className={className} border-b-1 border-t-1 b="#eee" absolute top="50%" w-full
        style={{ height: itemHeight, transform: `translateY(${-itemHeight / 2}px)` }} />
      <div absolute top="50%" w-full style={{ transform: `translateY(${-itemHeight / 2}px)` }}>
        <ol style={{ transform: `translateY(${translateY}px)` }} text-center children-flex children-items-center children-justify-center>
      {items.map(item =>
         <li style={{ height: itemHeight }}>{item}</li>
        )}
     
    </ol>
  </div>
</div>)
}
