import { useState } from "react";
import { Popout } from "../components/Popout";
import { rootDiv } from "../main";
import ReactDOM from "react-dom";

export const usePopout= () =>{

    const [visible, setVisible] = useState(false);
    const popout = ReactDOM.createPortal(<Popout visible={visible} onClickMask={() => setVisible(false)} /> , rootDiv)

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