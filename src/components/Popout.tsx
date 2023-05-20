import { ReactNode, useState } from "react"
import { animated, useSpring } from '@react-spring/web'


type Props = {
  visible : boolean
  onClickMask?: () => void
  children?:ReactNode
}

export const Popout:React.FC <Props> = (props) =>{
    const {visible,onClickMask,children } = props
    const [maskVisible, setMaskVisible] = useState(visible)

    const maskStyles = useSpring({
      opacity: visible ? 1 : 0,
      onStart: ({ value }) => {
        if (value.opacity < 0.1) { setMaskVisible(true) }
      },
      onRest: ({ value }) => {
        if (value.opacity < 0.1) { setMaskVisible(false) }
      },
      config:{
        duration:1000
      }
    })
    const menuStyles = useSpring({
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0%)' : 'translateY(100%)',
    })
    const maskStyles2 = {
      ...maskStyles,
      visibility: (maskVisible ? 'visible' : 'hidden') as 'visible' | 'hidden'
    } // workaround
    
 return (
    
    <div touch-none>
        <animated.div fixed top-0 h-full w-full className="bg-black:75"
        z="[calc(var(--z-popout)-1)]"  style={maskStyles2} onClick={() =>onClickMask?.()}>

        </animated.div>
        <animated.div  fixed bottom-0 left-0 w-full min-h-100px bg-white
        z="[calc(var(--z-popout))]"  style={menuStyles}>
          {children}
        </animated.div >
    </div>
    )
}