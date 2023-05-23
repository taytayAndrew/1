import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

type Props = {
  className: string
  items?:{x:number|string ; y: number}[]
}
export const LineChart:React.FC<Props>= (props) =>{
  const {className , items} = props
    const div = useRef<HTMLDivElement>(null)
    const xItem = items?.map(item => item.x)
    const yItem = items?.map(item => item.y)
    useEffect(() => {
    if(!div.current){return}
    const myChart = echarts.init(div.current)
    var option;

    option = {
      xAxis: {
        type: "category",
        data: xItem
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: yItem,
          type: "line",
          smooth: true,
        },
      ],
    };

   myChart.setOption(option);
  }, [])
 return (
    <div ref={div} className={className}></div>
 )
}