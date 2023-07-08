import React, { useState } from "react";
import { Topnav } from "../components/Topnav";
import { ItemsList } from "./ItemsPage/ItemsList";
import { ItemsSummary } from "./ItemsPage/ItemsSummary";
import { TimeRangePick } from "../components/TimeRangePick"
import { AddItemFloatButton } from "../components/AddItemFloatButton"
import { useMenuStore } from '../stores/useMenuStore'
import { TopMenu } from "../components/TopMenu";
import { Gradient } from '../components/Gradient';
import { Icon } from '../components/Icon';
import type { TimeRanges } from '../components/TimeRangePick';
import { Time, time } from "../lib/time";



export const ItemsPage:React.FC = () =>{
    const [outofRange , setOutofRange] = useState(false)
    const [timeRange ,_setTimeRange] = useState<TimeRanges>({
      name: 'this month',
      start: time().firstDayofMonth,
      end: time().lastDayofMonth.add(1, 'day')
    })
    const setTimeRange =(t:TimeRanges) => {
      if(t.start.timestamp > t.end.timestamp){
        [t.start , t.end] = [t.end, t.start]
      }
      if(t.end.timestamp-t.start.timestamp > Time.DAY*365 ){
        setOutofRange(true)
      }
      _setTimeRange(t)

    }
    const {visible,setVisible} = useMenuStore()
    const { start, end } = timeRange

 return <div>
    <Gradient>
        
        <Topnav title="账目列表" icon={
          <Icon name="menu" className="w-24px h-24px"
            onClick={() => { setVisible(!visible) }} />
        } />
        <TimeRangePick selected={timeRange} onSelected ={setTimeRange} 
       />
    </Gradient>
        {outofRange
        ?<div text-center p-15px>  自定义时间不能超过 365 天</div> 
        :<>
        <ItemsSummary />
        <ItemsList start={start} end={end} opacity-50/>
        </>
      }
        
        <AddItemFloatButton/>
        <TopMenu visible={visible} onClickMask={() =>{setVisible(false)}} /> 
 </div>;
};
