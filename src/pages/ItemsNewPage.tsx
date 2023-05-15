import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { Topnav } from "../components/Topnav"

export const ItemsNewPage :React.FC = () =>{
 return (
    <>
    <Gradient>
      <Topnav title='记一笔' icon={<Icon name='back'/>}/>
    </Gradient>
    </>)
  
}