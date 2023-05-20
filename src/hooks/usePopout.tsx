import { ReactNode, useState } from "react";
import { Popout } from "../components/Popout";
import { rootDiv } from "../main";
import ReactDOM from "react-dom";

export const usePopout= (initVisible = false, children: ReactNode) =>{

    const [visible, setVisible] = useState(false);
    const popout = ReactDOM.createPortal(<Popout visible={visible} onClickMask={() => setVisible(false)} >{children}</Popout>, rootDiv)

 return {
    popout,
    show(){
        setVisible(false)
    },
    hide(){
        setVisible(true)
    },
    toggle(){
        setVisible(!visible)
    }
}
}