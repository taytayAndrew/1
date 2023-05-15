import { useState } from "react"
import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { Tabs } from "../components/Tab"
import { Topnav } from "../components/Topnav"

export const ItemsNewPage :React.FC = () =>{
  const tabItems:{key: 'income' | 'expenses' ; text: string}[] = [{key: 'income', text: '收入' },{key: 'expenses', text: '支出' }];
  const [tabItem , setTabItems] = useState<'income' | 'expenses'>('expenses')
 return (
    <>
    <Gradient>
      <Topnav title='记一笔' icon={<Icon name='back'/>}/>
      <Tabs className='children-flex-1 text-center' tableItems={tabItems} value={tabItem} onChange={(item) =>{setTabItems(item)}} />
    </Gradient>
    </>)
  
}