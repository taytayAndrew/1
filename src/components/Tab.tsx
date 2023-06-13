import { ReactNode } from 'react';
import s from './Tabs.module.scss'
import styled from 'styled-components';
import cs from 'classnames'
import { compare } from 'swr/_internal';
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
  const compareKey = <T extends (string | { name: string })>(a: T, c: T) => {
    if (typeof a === 'string' && typeof c === 'string') {
      return a === c
    } else if (a instanceof Object && c instanceof Object) {
      return a.name === c.name
    } else {
      return false
    }
  }
  export const Tabs = <T extends string| { name: string }>(props:Props<T> ) => {

      const {tableItems , value , onChange, className,classPrefix} = props
  return (
    <div className={cs(className,classPrefix)} flex flex-col>
    <Styledol>
         <ol grow-0 shrink-0 flex flex-row children-px-24px children-py-16px cursor-pointer className={classPrefix ? `${classPrefix}-menu`: ''} >
      {tableItems.map( item => (
        <li key={typeof item.key === 'string' ? item.key : item.key.name}
          className={
            cs(
              compareKey(item.key, value) ? s.selected : '',
              classPrefix ? `${classPrefix}-menu-item`: ''
            )
            }
          onClick={() => onChange(item.key)}
          
        >
          {item.text}
        </li>
      ))}
      </ol>
    </Styledol>
    <div grow-1 shrink-1 overflow-auto className={classPrefix ? `${classPrefix}-panes`: ''}>
           {tableItems.filter(item => compareKey(item.key , value))[0]?.element}
    </div>
   </ div>
  )
};
