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



export const ItemsPage:React.FC = () =>{
    const [timeRange ,setTimeRange] = useState<TimeRanges>('this month')
    const {visible,setVisible} = useMenuStore()
 return <div>
    <Gradient>
        
        <Topnav title="账目列表" icon={
          <Icon name="menu" className="w-24px h-24px"
            onClick={() => { setVisible(!visible) }} />
        } />
        <TimeRangePick selected={timeRange} onSelected ={setTimeRange} 
       />
    </Gradient>
        <ItemsSummary />
        <ItemsList  opacity-50/>
        <AddItemFloatButton/>
        <TopMenu visible={visible} onClickMask={() =>{setVisible(false)}} /> 
 </div>;
};
