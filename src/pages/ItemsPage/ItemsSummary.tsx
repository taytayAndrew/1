import React from "react";

export const ItemsSummary:React.FC = () =>{
 return (
    <ol bg-black flex flex-row rounded-8px items-center justify-between  children-px-10px m-16px py-12px px-16px>
        <li text="#FE7275">
            <div>收入</div>
            <div>1000</div>
        </li>
        <li text="#53A867">
            <div>支出</div>
            <div>1000</div>
        </li>
        <li text-white>
            <div>净收入</div>
            <div>1000</div>
        </li>
    </ol>
    
 )
};