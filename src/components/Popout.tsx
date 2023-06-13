import { ReactNode, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

type Props = {
  visible: boolean;
  onClickMask?: () => void;
  children?: ReactNode;
  position?: 'bottom' | 'center'
};

export const Popout: React.FC<Props> = (props) => {
  const { visible, onClickMask, children,position='bottom' } = props;
  const [maskVisible, setMaskVisible] = useState(visible);

  const maskStyles = useSpring({
    visibility: maskVisible ? 'visible' : 'hidden' as 'visible' | 'hidden',
    opacity: visible ? 1 : 0,
    onStart: ({ value }) => {
      if (value.opacity < 0.1) {
        setMaskVisible(true);
      }
    },
    onRest: ({ value }) => {
      if (value.opacity < 0.1) {
        setMaskVisible(false);
      }
    },
    config: {
      duration: 1000,
    },
  });
  const wrapperStyles = useSpring({
    visibility: visible ? 'visible' : 'hidden' as 'visible' | 'hidden',
    opacity: visible ? 1 : 0,
    
    transform: position === 'bottom' ?(visible ?"translateY(0%)" : "translateY(100%)"):''  ,
  });

  return (
    <div touch-none>
      
      <animated.div
        fixed
        top-0
        h-full
        w-full
        className="bg-black:75"
        z="[calc(var(--z-popout)-1)]"
        style={maskStyles}
        onClick={() => onClickMask?.()}
      ></animated.div>
      {position === 'bottom' ? (
      <animated.div
        fixed
        bottom-0
        left-0
        w-full
        min-h-100px
        bg-white
        z="[calc(var(--z-popout))]"
        style={wrapperStyles}
        rounded-t-8px
        overflow-hidden
      >
        
        {children}
      </animated.div>
   ) : (<animated.div
       fixed
       left="[50%]"
       top="[50%]"
       translate-x="-50%" translate-y="-50%"//让其居中
     bg-white
       z="[calc(var(--z-popout))]"
       style={wrapperStyles}
       rounded-8px
       overflow-hidden
  >
    
    {children}
  </animated.div>)}
       </div>
  );
};
