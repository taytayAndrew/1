import { ReactNode, useState } from "react"
import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { Tabs } from "../components/Tab"
import { Topnav } from "../components/Topnav"
import s from "./ItemsNewPage.module.scss"

export const ItemsNewPage :React.FC = () =>{
  const tabItems:{key: 'income' | 'expenses' ; text: string; element?:ReactNode}[] = [{key: 'income', text: '收入',element:<div>收入</div> },{key: 'expenses', text: '支出',element:<div>支出</div> }];
  const [tabItem , setTabItems] = useState<'income' | 'expenses'>('expenses')
 return (
    <>
    <Gradient>
      <Topnav title='记一笔' icon={<Icon name='back'/>}/>
      </Gradient>
      <Tabs className={s.wrapper} tableItems={tabItems} value={tabItem} onChange={(item) =>{setTabItems(item)}}  classPrefix='itemsNewTabs' />
   
    </>)
  
}