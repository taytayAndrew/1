import { useEffect, useRef, useState } from "react";
import { Gradient } from "../components/Gradient";
import { Icon } from "../components/Icon";
import { TimeRangePick } from "../components/TimeRangePick";
import { Topnav } from "../components/Topnav";
import type { TimeRanges } from "../components/TimeRangePick";
import * as echarts from "echarts";
import { LineChart } from "../components/LineChart";

export const StatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRanges>("this month");
  const div = useRef<HTMLDivElement>(null)
  const items = [ 
    { date: '2000-01-01', value: 15000 },
    { date: '2000-01-02', value: 25000 },
    { date: '2000-01-03', value: 25000 },
    { date: '2000-01-04', value: 35000 },
    { date: '2000-01-05', value: 35000 },
    { date: '2000-01-06', value: 45000 },
    { date: '2000-01-07', value: 45000 },
    { date: '2000-01-08', value: 55000 },
    { date: '2000-01-09', value: 55000 },
    { date: '2000-01-10', value: 65000 },
    { date: '2000-01-11', value: 65000 },
    { date: '2000-01-12', value: 75000 },
    { date: '2000-01-13', value: 75000 },
    { date: '2000-01-14', value: 85000 },
    { date: '2000-01-15', value: 85000 },
    { date: '2000-01-16', value: 95000 },
    { date: '2000-01-17', value: 95000 },
    { date: '2000-01-18', value: 105000 },
    { date: '2000-01-19', value: 105000 },
    { date: '2000-01-20', value: 115000 },
    { date: '2000-01-21', value: 115000 },
    { date: '2000-01-22', value: 125000 },
    { date: '2000-01-23', value: 125000 },
    { date: '2000-01-24', value: 135000 },
    { date: '2000-01-25', value: 135000 },
    { date: '2000-01-26', value: 145000 },
    { date: '2000-01-27', value: 145000 },
    { date: '2000-01-28', value: 155000 },
    { date: '2000-01-29', value: 155000 },
    { date: '2000-01-31', value: 10000 }
  ].map(item => ({x:item.date , y:item.value}))
  return (
    <div>
      <Gradient>
        <Topnav
          title="统计图标"
          icon={<Icon name="back" className="w-24px h-24px" />}
        />
        <TimeRangePick selected={timeRange} onSelected={setTimeRange} />
      </Gradient>{" "}
      <LineChart className="h-400px" items={items}/>
    </div>
  );
};
