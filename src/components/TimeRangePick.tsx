import React from "react";
import { Tabs } from "./Tab";

interface Props {
    selected: TimeRanges ,
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
 return (
  <Tabs tableItems={TimeRange} value={selected} onChange={onSelected} />
 )
}