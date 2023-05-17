import { ReactNode } from 'react';
import s from './Tabs.module.scss'
import styled from 'styled-components';
import cs from 'classnames'
type Props<T> = {
    tableItems:{
        key: T;
        text: string;
        element?: ReactNode;
    }[]
    value: T
    onChange: (key: T) => void
    className?: string
    classPrefix?: string
}
const Styledol = styled.ol`
background: linear-gradient(90deg, rgba(9,121,101,1) 0%, rgba(204,187,231,1) 0%, rgba(107,247,255,1) 94%);

`
export const Tabs = <T extends string>(props:Props<T> ) => {
    const {tableItems , value , onChange, className,classPrefix} = props
  return (
    <div className={cs(className,classPrefix)} flex flex-col>
    <Styledol>
         <ol grow-0 shrink-0 flex flex-row children-px-24px children-py-16px cursor-pointer className={classPrefix ? `${classPrefix}-menu`: ''} >
      {tableItems.map( item => (
        <li
          pointer-cursor
          className={
            cs(
                item.key === value ? s.selected : "",
                classPrefix ? `${classPrefix}-menu-item`: ''
            )
            }
          onClick={() => onChange(item.key)}
          key={item.key}
        >
          {item.text}
        </li>
      ))}
      </ol>
    </Styledol>
    <div grow-1 shrink-1 overflow-auto className={classPrefix ? `${classPrefix}-panes`: ''}>
           {tableItems.filter(item => item.key === value)[0].element}
    </div>
 
    </ div>
  )
};
