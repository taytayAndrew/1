import type { ReactNode } from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { Popout } from '../components/Popout'
import { rootDiv } from '../main'
type Options = {
  initVisible?: boolean
  children: ReactNode
  position?: 'bottom' | 'center'
}
export const usePopout = (props:Options) => {
  const { initVisible = false, children, position } = props
  const [visible, setVisible] = useState(initVisible)
  const popout = ReactDOM.createPortal(<Popout position = {position} visible={visible} onClickMask={() => setVisible(false)} >
    {children}
  </Popout>, rootDiv)
  return {
    popout,
    show() {
      setVisible(true)
    },
    hide() {
      setVisible(false)
    },
    toggle() {
      setVisible(!visible)
    }
  }
}