import { useState } from "react"
import { time } from "../lib/time"


export const Datepicker:React.FC = () =>{
   
 return (
  <div flex>
    <Column className='grow-1'/>
    <Column className='grow-1'/>
    <Column className='grow-1'/>
  </div>
  
    )
}
 type ColumnProps = {
  className?:string
  start?:Date
  end?:Date
  value?:Date
  itemHeight?: number
}
export const Column:React.FC <ColumnProps>= (props) =>{
  const {start , end ,value , itemHeight = 36,className} = props
  const startTime = start? time(start):time().add(-10,'years')
  const endTime = start? time(end):time().add(10,'years')
  const valueTime = value ? time(value) : time()
  console.log(valueTime)
  if (endTime.timestamp <= startTime.timestamp) {//判断结束时间晚于开始时间 gettime是指从January 1, 1970开始到现在的秒数
    throw new Error('结束时间必须晚于开始时间')
  }
  const yearList = Array.from({length: endTime.year - startTime.year + 1}).map((_,index) => startTime.year + index)
  const index = yearList.indexOf(valueTime.year)
  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(-1)
  // console.log(t.add(10,'years').format('yyyy年MM月dd日 HH时'))
  const [translateY, _setTranslateY] = useState(index * - itemHeight)
  const setTranslateY = (y: number) => {
    y = Math.min(y, 0)
    y = Math.max(y, (yearList.length - 1) * -itemHeight)
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
  }}
>
  <div border-b-1 border-t-1 b="#eee" absolute top="50%"  style={{ height: itemHeight, transform: `translateY(${-itemHeight / 2}px)` }}  w-full />
  <div absolute top="50%"style={{ transform: `translateY(${-itemHeight / 2}px)` }} w-full>
    <ol style={{ transform: `translateY(${translateY}px)` }}
      children-h-36px text-center children-leading-36px>
      
      {yearList.map(year =>
         <li style={{ height: itemHeight }}>{year}</li>
        )}
     
    </ol>
  </div>
</div>)
}
