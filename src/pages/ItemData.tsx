import { Datepicker } from "../components/Datepicker";
import { Icon } from "../components/Icon"
import { usePopout } from "../hooks/usePopout";
import { useState } from "react";
import { time } from "../lib/time";

export const ItemData :React.FC = () =>{
    const [date,setDate] = useState(new Date())
    const { toggle, popout, hide } = usePopout({
        children: <Datepicker 
        onConfirm={d => { setDate(d); hide() }}
          onCancel={() => hide()} />
      })
 return (
    <>
    {popout}
     <span flex gap-x-8px items-center onClick={toggle}>
      <Icon name="date" className="w-24px h-24px grow-0 shrink-0" />
        <span grow-0 shrink-0 text-12px color='#999'>
        {time(date).format()}
        </span> 
      </span>
    </>
      )
}