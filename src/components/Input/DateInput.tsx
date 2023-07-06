import { usePopout } from "../../hooks/usePopout"
import { time } from "../../lib/time"
import { Datepicker } from "../Datepicker"

type Props = {
    value?: string
    onChange?:(v:string) => void
    className?:string
    placeholder?:string
}

export const DateInput:React.FC<Props> = (props) =>{
    const {value, onChange , className , placeholder} = props
    const { toggle, popout, hide } = usePopout({
        children: <Datepicker 
        onConfirm={d => { onChange?.(time(d).format()); hide() }}
          onCancel={() => hide()} />
      })
 return (
    <>
    {popout}
    <input className={className} j-input-text type="text" readOnly data-xxx 
    placeholder={placeholder} value={value} />
    </>

    )
}