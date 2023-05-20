
import { Icon } from "../../components/Icon";
import { usePopout } from "../../hooks/usePopout";
import { Datepicker } from "../../components/Datepicker";
import { useState } from "react";
import { time } from "../../lib/time";

type Props = {
  className: string;
};

export const DateandAmount: React.FC<Props> = (props) => {
  const [date,setDate] = useState(new Date())
  const [output, _setOutput] = useState('0')
  // 拦截器
  const setOutput = (str: string) => {
    const dotIndex = str.indexOf('.')
    if (dotIndex >= 0 && str.length - dotIndex > 3) { return }
    if (str.length > 16) { return }
    _setOutput(str)
  }
  const { className } = props;
  const { toggle, popout, hide } = usePopout(false, <Datepicker
    onConfirm={d => { setDate(d); hide() }}
    onCancel={() => hide()} />)
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
        <div
          flex
          p-16px
          border-t-1px
          border-t="#ddd"
          gap-x-8px
          items-center
          color="#999"
        >
          <span flex gap-x-8px items-center onClick={toggle}>
            <Icon name="date" className="w-24px h-24px grow-0 shrink-0" />
          </span>
          <span grow-0 shrink-0 text-12px color='#999'>
            {time(date).format()}
          </span>
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
          <button row-start-1 col-start-1 row-end-2 col-end-2onClick={() => append('1')}>
            1
          </button>
          <button row-start-1 col-start-2 row-end-2 col-end-3onClick={() => append('2')}>
            2
          </button>
          <button row-start-1 col-start-3 row-end-2 col-end-4onClick={() => append('3')}>
            3
          </button>
          <button row-start-2 col-start-1 row-end-3 col-end-2onClick={() => append('4')}>
            4
          </button>
          <button row-start-2 col-start-2 row-end-3 col-end-3onClick={() => append('5')}>
            5
          </button>
          <button row-start-2 col-start-3 row-end-3 col-end-4onClick={() => append('6')}>
            6
          </button>
          <button row-start-3 col-start-1 row-end-4 col-end-2onClick={() => append('7')}>
            7
          </button>
          <button row-start-3 col-start-2 row-end-4 col-end-3onClick={() => append('8')}>
            8
          </button>
          <button row-start-3 col-start-3 row-end-4 col-end-4onClick={() => append('9')}>
            9
          </button>
          <button row-start-4 col-start-1 row-end-5 col-end-3onClick={() => append('0')}>
            0
          </button>
          <button row-start-4 col-start-3 row-end-5 col-end-4onClick={clear}>
            .
          </button>
          <button row-start-1 col-start-4 row-end-3 col-end-5onClick={}>
            清空
          </button>
          <button row-start-3 col-start-4 row-end-5 col-end-5onClick={() => append('1')}>
            提交
          </button>
          {/* <input value={x}  onChange={e => setX(e.target.value)}/> */}
        </div>
      </div>
      {popout}
    </>
  );
};
