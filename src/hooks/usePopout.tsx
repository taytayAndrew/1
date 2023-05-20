import type { ReactNode } from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { Popout } from '../components/Popout'
import { rootDiv } from '../main'

export const usePopout = (initVisible = false, children: ReactNode) => {
  const [visible, setVisible] = useState(initVisible)
  const popout = ReactDOM.createPortal(<Popout visible={visible} onClickMask={() => setVisible(false)} >
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