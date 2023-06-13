import React from "react";
import { Tabs } from "./Tab";
import { usePopout } from "../hooks/usePopout";
import { Time, time } from "../lib/time";
export type TimeRanges = 
{
    start: Time
    end: Time
    name:'this month' 
    | 'last month' 
    |'two months ago'
    |'three months ago'
    |'custom'
    |'this year'
}



const defaultTimeRange :{key: TimeRanges ,text:string}[]  = [
      {
        text: '本月',
        key: { name: 'this month', start: time().firstDayofMonth, end: time().lastDayofMonth.add(1, 'day') },
      },
      {
        text: '上月',
        key: { name: 'last month', start: time().add(-1, 'month').firstDayofMonth, end: time().add(-1, 'month').lastDayofMonth.add(1, 'day') },
      },
      {
        text: '今年',
        key: { name: 'this year', start: time().set({ month: 1 }).firstDayofMonth, end: time().set({ month: 12 }).lastDayofMonth.add(1, 'day') },
      },
      {
        text: '自定义时间',
        key: { name: 'custom', start: time(), end: time() },
      },
    
]
type Props =  {
    selected: TimeRanges ,
    onSelected: (selected : TimeRanges) => void 
    timeRanges?: {key: TimeRanges ,text:string}[]
}
export const TimeRangePick:React.FC<Props> = (props) =>{
    const {selected , onSelected : _onSelect , timeRanges=defaultTimeRange} = props
    const onConfirm = () => {
        _onSelect({
            name: 'custom',
            start: time(),
            end: time()
          })
    }
    const {popout ,show} = usePopout({
        children: <div onClick={onConfirm}>弹框</div>,
        position: 'center'
    })
   
    const onSelected = (timeRange:TimeRanges) =>{
        if(timeRange.name === 'custom') {
            show()
        }else{
            _onSelect(timeRange)
        }

    }
 return (
    <>
    {popout}
    <Tabs tableItems={timeRanges} value={selected} onChange={onSelected}  />
    </>
  
 )
}