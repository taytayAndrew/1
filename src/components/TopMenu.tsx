import { animated, useSpring } from '@react-spring/web'
import React, { useState } from 'react'
import { CurrentUser } from './TopMenu/CurrentUser'
import { Menu } from './TopMenu/Menu'

interface Props {
  onClickMask?: () => void
  visible?: boolean
}
export const TopMenu: React.FC<Props> = (props) => {
  const { onClickMask, visible } = props
  const [maskVisible, setMaskVisible] = useState(visible)
  const maskStyles = useSpring({
    opacity: visible ? 1 : 0,
    onStart: ({ value }) => {
      if (value.opacity < 0.1) { setMaskVisible(true) }
    },
    onRest: ({ value }) => {
      if (value.opacity < 0.1) { setMaskVisible(false) }
    }
  })
  const menuStyles = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0%)' : 'translateX(-100%)',
  })
  const maskStyles2 = {
    ...maskStyles,
    visibility: (maskVisible ? 'visible' : 'hidden') as 'visible' | 'hidden'
  } // workaround
  return (
    <>
    <animated.div fixed top-0 left-0 w='100%' h="100%" bg="[rgba(0,0,0,.75)]" z="[calc(var(--z-menu)-1)]"
     onClick={onClickMask} style={maskStyles2}/> 
    <animated.div fixed top-0 left-0 w="70vw" max-w-20em h-screen flex flex-col b-3px
     b-red z="[var(--z-menu)]" style={menuStyles}>
      <CurrentUser className="grow-0 shrink-0" />
      <Menu className="grow-1 shrink-1" />
    </animated.div>
    </>
    
  )
  }

