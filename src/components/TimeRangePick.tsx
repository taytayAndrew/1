import React from "react";
import { Tabs } from "./Tab";
export type TimeRanges = 
'this month' 
| 'last month' 
|'two months ago'
|'three months ago'
|'custom'
|'this year'


const defaultTimeRange :{key: TimeRanges ,text:string}[]  = [
    {key: 'this month' , text: '本月'},
    {key: 'last month' , text: '上月'}
]
type Props =  {
    selected: TimeRanges ,
    onSelected: (selected : TimeRanges) => void 
    timeRanges?: {key: TimeRanges ,text:string}[]
}
export const TimeRangePick:React.FC<Props> = (props) =>{
    const {selected , onSelected , timeRanges=defaultTimeRange} = props


 return (
  <Tabs tableItems={timeRanges} value={selected} onChange={onSelected}  />
 )
}