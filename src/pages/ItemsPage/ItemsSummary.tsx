import React from "react";
import { Time } from "../../lib/time";
import { useAjax } from "../../lib/ajax";
import useSWR from "swr";
import { dataTool } from "echarts";
import { Money } from "../../components/Money";

type Props = {
  start:Time
  end:Time
}
export const ItemsSummary:React.FC<Props> = (props) =>{
    const {start ,end} = props
    const {get} = useAjax({showLoading:false,handleError:false})
    const {data} = useSWR(`/api/v1/items/balance?happened_after=${start.IosString}&happened_before=${end.IosString}`,async(path)=>{
        return (await get<{balance:number; expenses: number; income: number}>(path)).data
    }
        
    )
    const {balance, expenses,income} = data ?? {balance:0,expenses:0,income:0}
 return (
    <ol bg-black flex flex-row rounded-8px items-center justify-between  children-px-8px m-16px py-12px px-24px>
        <li text="#FE7275">
            <div>收入</div>
            <div><Money value={income}/></div>
            
        </li>
        <li text="#53A867">
            <div>支出</div>
            <div><Money value={expenses}/></div>
        </li>
        <li text-white>
            <div>净收入</div>
            <div><Money value={balance}/></div>
        </li>
    </ol>
    
 )
};