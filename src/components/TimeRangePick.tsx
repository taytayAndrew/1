import React from "react";
import s from './TimeRangePicker.module.scss'

interface Props {
    selected: string ,
    onSelected: (selected : TimeRanges) => void 
}
export type TimeRanges = 'this month' | 'last month' |'last year'|'diy time';
export const TimeRangePick:React.FC<Props> = ({ selected , onSelected }) =>{

const TimeRange :{key: TimeRanges ,text:string}[]  = [
    {key: 'this month' , text: '本月'},
    {key: 'last month' , text: '上月'},
    {key: 'last year' , text: '去年'},
    {key: 'diy time' , text: '自定义事件'}
]
 return <ol flex flex-row children-px-24px children-py-16px cursor-pointer> 
   {TimeRange.map(tr => <li  pointer-cursor className={tr.key === selected ? s.selected : '' } onClick={() => onSelected(tr.key)} key={tr.key}>{tr.text}</li>)}
 </ol>
}