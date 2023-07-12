import { Icon } from "./Icon";
import { ReactNode } from "react";

interface Props {
 title?: string
 icon: ReactNode
}

export const Topnav:React.FC<Props> = ({title = '猫尾记账', icon}) =>{
 return (
 <div pt-24px  pb-12px px-24px className="text-white" flex flex-row items-center>
   <span w-24px h-24px mr-16px flex justify-center items-center
        children-max-w="100%" children-max-h="100%">
    {icon}
   </span>
    <p text-22px  >{title}</p>
     </div>
     )
};