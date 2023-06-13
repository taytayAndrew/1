import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

type Props = {
  className: string
  items?:{x:number|string ; y: number|string}[]
}
export const LineChart:React.FC<Props>= (props) =>{
  const {className , items} = props
    const div = useRef<HTMLDivElement>(null)
    const myChart = useRef<echarts.ECharts>()
    const xItem = items?.map(item => item.x)
    const yItem = items?.map(item => item.y)//将x,y分成两个数组
    const initialized = useRef(false)
    useEffect(() => {
    if(!div.current){return}
    if (initialized.current) { return }
    myChart.current = echarts.init(div.current)//表单初始化
    initialized.current = true
    const option:echarts.EChartsOption  = {
      tooltip: {
        trigger: 'axis',//可以点击原点显示竖线
        show: true,
        formatter: ([{ axisValue, data }]: any) => {//设置显示的内容
          const parts = axisValue.split('-')
          console.log(parts)
          const label = `${parts[0]}年${parts[1]}月${parts[2]}日`
          const value = data === null ? '无数据' : `${data}元`
          return `${label}<br/><div style="text-align: right;">${value}</div>`
        }
      },
      axisLabel: {
        formatter: (label: string) => label.slice(label.indexOf('-') + 1)
        //slice用法
        //const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
        //console.log(animals.slice(2));
        // Expected output: Array ["camel", "duck", "elephant"]
      },
      xAxis: {
        type: "category",
        data: xItem
      },
      grid: {
        left: 16,
        top: 8,
        bottom: 24,
        right: 16
      },
      yAxis: {
        type: "value",
        axisLabel: {
          show: false
        },
      },
      series: [
        {
          data: yItem,
          type: 'line',
          itemStyle: {
          },
          emphasis: {
            itemStyle: {
              color: 'green'
            }
          },
          smooth: true,
        },
      ],
    };

   myChart.current.setOption(option);
  }, [])
  useEffect(() => {
    const option: echarts.EChartsOption = {
      xAxis: { data: xItem, },
      series: [{ data: yItem, }]
    }
    myChart.current?.setOption(option)
  }, [items])
 return (
    <div ref={div} className={className}></div>
 )
}