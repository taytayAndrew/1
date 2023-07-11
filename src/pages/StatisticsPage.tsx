import { useEffect, useRef, useState } from "react";
import { Gradient } from "../components/Gradient";
import { TimeRangePick } from "../components/TimeRangePick";
import { Topnav } from "../components/Topnav";
import type { TimeRanges } from "../components/TimeRangePick";
import { LineChart } from "../components/LineChart";
import { PieChart } from "../components/PieChart";
import { RankChart } from "../components/RankChart";
import { Input } from "../components/Input";
import { useAjax } from "../lib/ajax";
import { Time, time } from "../lib/time";
import useSWR from 'swr'
import { BackIcon } from "../components/BackIcon";

type Group = {happen_at:string ; amount: number;}[]
type Group2 ={tag_id:number;tag:Tag;amount:number}[]
const format = 'yyyy-MM-dd'
type GetKeyParams = {
  start:Time
  end:Time
  kind:Item['kind']
  group_by:'happen_at' | 'tag_id'
}
const getKey = (props:GetKeyParams) => {
  const {start, end, kind,group_by} = props
  return`/api/v1/items/summary?happened_after=${start.format(format)}
  &happened_before=${end.format(format)}&kind=${kind}
  &group_by=${group_by}`
}
export const StatisticsPage: React.FC = () => {
  const format = 'yyyy-MM-dd'
  const [timeRange, setTimeRange] = useState<TimeRanges>({
    name: 'this month',
    start: time().firstDayofMonth ,
    end: time().lastDayofMonth.add(1, 'day')
  });
  const [kind,setKind] = useState<Item['kind']>('expenses')
  const {get} = useAjax({showLoading: false , handleError:true})
 
 
    const generateDefaultItems = (time:Time) => {
      return Array.from({length: time.dayCountOfMonth}).map((_,i) => {
        const x = start.clone.add(i,'day').format(format)
        return ({x,y:0})
  
      })}
   
  const {start , end} = timeRange
  const defaultItems = generateDefaultItems(start)
  const {data} = useSWR(getKey({start,end,kind,group_by:'happen_at'}), async(path)=>
    (await get<{groups: Group ; total: number  }>(path)).data.groups.map(({happen_at,amount}) => ({x:happen_at , y: (amount/100).toFixed(2)}))
  )

 const noramlizedItems = defaultItems?.map((defaultItem ) => {
   const item = data?.find((item) => item.x === defaultItem.x)
   console.log('item'+ item)
   if(item)
   {
    return {x: defaultItem.x ,y: item.y}
   }else{
    return defaultItem
   }
  })
  const {data: items2} = useSWR(getKey({start,end,kind,group_by:'tag_id'}), async(path)=>
    (await get<{groups: Group2 ; total: number  }>(path)).data.groups.map(({tag_id,tag,amount}) => ({name:tag.name , value: (amount/100).toFixed(2),sign : tag.sign}))
  )

  return (
    <div>
      <Gradient>
        <Topnav
          title="统计图标"
          icon={<BackIcon />}
        />
        <TimeRangePick selected={timeRange} onSelected={setTimeRange}  timeRanges={[
       {
        text: '本月',
        key: { name: 'this month', start: time().firstDayofMonth, end: time().lastDayofMonth.add(1, 'day') },
      },
      {
        text: '上月',
        key: { name: 'last month', start: time().add(-1, 'month').firstDayofMonth, end: time().add(-1, 'month').lastDayofMonth.add(1, 'day') },
      },
      {
        text: '两个月前',
        key: { name: 'two months ago', start: time().add(-2, 'month').firstDayofMonth, end: time().add(-2, 'month').lastDayofMonth.add(1, 'day') },
      },
      {
        text: '三个月前',
        key: { name: 'three months ago', start: time().add(-3, 'month').firstDayofMonth, end: time().add(-3, 'month').lastDayofMonth.add(1, 'day') },
      },
        ]}/>
      </Gradient>
      <div>
        <span>类型</span>
        <div>
          <Input type='select' options = {[
            { text: '支出', value: 'expenses' },
            { text: '收入', value: 'income' },
          ]} value={kind} _onChange={value => setKind(value)  }disableError/> 
          
        </div>
      </div>
      <LineChart className="h-120px m-t-16px" items={noramlizedItems}/>
      <PieChart  className="h-260px" items={items2} />
      <RankChart  className="m-t-8px" items={items2} />
    </div>
  );
};
