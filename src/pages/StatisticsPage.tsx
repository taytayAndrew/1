import { useEffect, useRef, useState } from "react";
import { Gradient } from "../components/Gradient";
import { Icon } from "../components/Icon";
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

type Group = {happen_at:string ; amount: number;}[]
type Group2 ={tag_id:number;tag:Tag;amount:number}[]
export const StatisticsPage: React.FC = () => {
  const format = 'yyyy-MM-dd'
  const [timeRange, setTimeRange] = useState<TimeRanges>("this month");
  const [kind,setKind] = useState('expenses')
  const {get} = useAjax({showLoading: false , handleError:true})

  const generateStartEnd = () =>{
    if (timeRange === 'this month') {
    const start = time().firstDayofMonth
    const end = time().lastDayofMonth.add(1, 'day')
    return {start , end}
    }else{
      return {start:time() , end:time()}
    }
  }
    const generateDefaultItems = (time:Time) => {
      return Array.from({length: time.dayCountOfMonth}).map((_,i) => {
        const x = start.clone.add(i,'day').format(format)
        return ({x,y:0})
  
      })}
   
  const {start , end} = generateStartEnd()
  const defaultItems = generateDefaultItems(start)
  const {data: items} = useSWR(`/api/v1/items/summary?happened_after=${start}
  &happened_before=${end}&kind=${kind}
  &group_by=happen_at`, async(path)=>
    (await get<{groups: Group ; total: number  }>(path)).data.groups.map(({happen_at,amount}) => ({x:happen_at , y: (amount/100).toFixed(2)}))
  )
 const noramlizedItems = defaultItems?.map((defaultItem ) => {
   const item = items?.find((item) => item.x === defaultItem.x)
   console.log('item'+ item)
   if(item)
   {
    return {x: defaultItem.x ,y: item.y}
   }else{
    return defaultItem
   }
  })
  const {data: items2} = useSWR(`/api/v1/items/summary?happened_after=${start}
  &happened_before=${end}&kind=${kind}
  &group_by=tag_id`, async(path)=>
    (await get<{groups: Group2 ; total: number  }>(path)).data.groups.map(({tag_id,tag,amount}) => ({name:tag.name , value: (amount/100).toFixed(2),sign : tag.sign}))
  )
  const items3 = [
    { tag: { name: '吃吃吃', sign: '😨' }, amount: 10000 },
    { tag: { name: '看电影', sign: '🥱' }, amount: 20000 },
    { tag: { name: '充值游戏', sign: '😶‍🌫️' }, amount: 64800 }
  ].map(item => ({name: item.tag.name,value:item.amount,sign:item.tag.sign}))
  return (
    <div>
      <Gradient>
        <Topnav
          title="统计图标"
          icon={<Icon name="back" className="w-24px h-24px" />}
        />
        <TimeRangePick selected={timeRange} onSelected={setTimeRange}  timeRanges={[
        {key: 'this month' , text: '本月'},
        {key: 'last month' , text: '上月'},
        {key: 'two months ago' , text: '两个月前'},
        {key: 'three months ago' , text: '三个月前'},
        ]}/>
      </Gradient>
      <div>
        <span>类型</span>
        <div>
          <Input type='select' options = {[
            { text: '支出', value: 'expenses' },
            { text: '收入', value: 'income' },
          ]} value={kind} onChange={value => setKind(value)  }disableError/> 
          
        </div>
      </div>
      <LineChart className="h-120px m-t-16px" items={noramlizedItems}/>
      <PieChart  className="h-260px" items={items2} />
      <RankChart  className="m-t-8px" items={items3} />
    </div>
  );
};
