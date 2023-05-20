
import { Icon } from "../../components/Icon";
import { usePopout } from "../../hooks/usePopout";
import { Datepicker } from "../../components/Datepicker";

type Props = {
  className: string;
};

export const DateandAmount: React.FC<Props> = (props) => {
  const { className } = props;
  const { toggle, popout } = usePopout(true, <Datepicker onChange= {d =>console.log(d.toLocaleString())} />)
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
          <span grow-0 shrink-0>
            2001-02-03
          </span>
          <span grow-1 shrink-1 text-right color="#53A867">
            金额
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
          <button row-start-1 col-start-1 row-end-2 col-end-2>
            1
          </button>
          <button row-start-1 col-start-2 row-end-2 col-end-3>
            2
          </button>
          <button row-start-1 col-start-3 row-end-2 col-end-4>
            3
          </button>
          <button row-start-2 col-start-1 row-end-3 col-end-2>
            4
          </button>
          <button row-start-2 col-start-2 row-end-3 col-end-3>
            5
          </button>
          <button row-start-2 col-start-3 row-end-3 col-end-4>
            6
          </button>
          <button row-start-3 col-start-1 row-end-4 col-end-2>
            7
          </button>
          <button row-start-3 col-start-2 row-end-4 col-end-3>
            8
          </button>
          <button row-start-3 col-start-3 row-end-4 col-end-4>
            9
          </button>
          <button row-start-4 col-start-1 row-end-5 col-end-3>
            0
          </button>
          <button row-start-4 col-start-3 row-end-5 col-end-4>
            .
          </button>
          <button row-start-1 col-start-4 row-end-3 col-end-5>
            清空
          </button>
          <button row-start-3 col-start-4 row-end-5 col-end-5>
            提交
          </button>
          {/* <input value={x}  onChange={e => setX(e.target.value)}/> */}
        </div>
      </div>
      {popout}
    </>
  );
};
