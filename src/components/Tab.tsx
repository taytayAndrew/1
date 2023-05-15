import s from './Tabs.module.scss'
type Props<T> = {
    tableItems:{
        key: T;
        text: string;
    }[]
    value: T
    onChange: (key: T) => void
}

export const Tabs = <T extends string>(props:Props<T> ) => {
    const {tableItems , value , onChange} = props
  return (
    <ol flex flex-row children-px-24px children-py-16px cursor-pointer>
      {tableItems.map( item => (
        <li
          pointer-cursor
          className={item.key === value ? s.selected : ""}
          onClick={() => onChange(item.key)}
          key={item.key}
        >
          {item.text}
        </li>
      ))}
    </ol>
  );
};
