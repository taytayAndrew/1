import { useState } from "react"
import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { TimeRangePick } from "../components/TimeRangePick"
import { Topnav } from "../components/Topnav"
import type { TimeRanges } from '../components/TimeRangePick';

export const StatisticsPage:React.FC = () =>{
    const [timeRange ,setTimeRange] = useState<TimeRanges>('this month')
 return (
    <div>
    <Gradient>
        
        <Topnav title="统计图标" icon={
          <Icon name="back" className="w-24px h-24px"
             />
        } />
        <TimeRangePick selected={timeRange} onSelected ={setTimeRange}/>
    </Gradient> </div>)
}