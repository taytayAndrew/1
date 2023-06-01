
import { usePopout } from "../../hooks/usePopout";
import { Datepicker } from "../../components/Datepicker";
import { ReactNode, useState } from "react";
import { ItemData } from "../ItemData";

type Props = {
  className?: string;
  ItemData: ReactNode
  value?: number
  onChange?:(value:number) => void
};

export const ItemAmount: React.FC<Props> = (props) => {
  const {value , onChange} = props
  const [date,setDate] = useState(new Date())
  const [output,_setOutput] = useState(() => {return (value?.toString() ?? '0')} )
  // 拦截器
  const setOutput = (str: string) => {
    const dotIndex = str.indexOf('.')
    if (dotIndex >= 0 && str.length - dotIndex > 3) { return }
    if (str.length > 16) { return }
    _setOutput(str)
    onChange?.(parseFloat(str))
  }
  const { className } = props;
  const { toggle, popout, hide } = usePopout({
    children: <Datepicker 
    onConfirm={d => { setDate(d); hide() }}
      onCancel={() => hide()} />
  })
    const append = (char: string) => {
      switch (char) {
        case '0':
          if (output !== '0') { setOutput(output + char) }
          break
        case '.':
          if (!output.includes('.')) { setOutput(output + char) }
          break
        default:
          if (output === '0') { setOutput(char) }
          else { setOutput(output + char) }
          break
      }
    }
    const clear = () => {
      setOutput('0')
    }
  return (
    <>
      <div className={className}>
        {props.ItemData}
        <div
          flex
          p-16px
          border-t-1px
          border-t="#ddd"
          gap-x-8px
          items-center
          color="#999"
        >
          <span grow-1 shrink-1 text-right color="#53A867">
            {output}
          </span>
        </div>
        <div
          py-1px
          className={className}
          grid
          grid-cols="[repeat(4,1fr)]"
          grid-rows="[repeat(4,48px)]"
          children-b-none
          children-bg-white
          bg="#ddd"
          gap-2px
        >
          <button type='button'row-start-1 col-start-1 row-end-2 col-end-2 onClick={() => append('1')}>
            1
          </button>
          <button type='button'row-start-1 col-start-2 row-end-2 col-end-3 onClick={() => append('2')}>
            2
          </button>
          <button type='button'row-start-1 col-start-3 row-end-2 col-end-4 onClick={() => append('3')}>
            3
          </button>
          <button type='button'row-start-2 col-start-1 row-end-3 col-end-2 onClick={() => append('4')}>
            4
          </button>
          <button type='button'row-start-2 col-start-2 row-end-3 col-end-3 onClick={() => append('5')}>
            5
          </button>
          <button type='button'row-start-2 col-start-3 row-end-3 col-end-4 onClick={() => append('6')}>
            6
          </button>
          <button type='button'row-start-3 col-start-1 row-end-4 col-end-2 onClick={() => append('7')}>
            7
          </button>
          <button type='button'row-start-3 col-start-2 row-end-4 col-end-3 onClick={() => append('8')}>
            8
          </button>
          <button type='button'row-start-3 col-start-3 row-end-4 col-end-4 onClick={() => append('9')}>
            9
          </button>
          <button type='button'row-start-4 col-start-1 row-end-5 col-end-3 onClick={() => append('0')}>
            0
          </button>
          <button type='button'row-start-4 col-start-3 row-end-5 col-end-4 onClick={() => append('.')}>
            .
          </button>
          <button row-start-1 col-start-4 row-end-3 col-end-5 onClick={clear}>
            清空
          </button>
          <button bg="#7aedfb" text-white row-start-3 col-start-4 row-end-5 type='submit' col-end-5 onClick={()=>{}}>
            提交
          </button>
          {/* <input value={x}  onChange={e => setX(e.target.value)}/> */}
        </div>
      </div>
      {popout}
    </>
  );
};
