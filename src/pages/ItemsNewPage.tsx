import { ReactNode, useState } from "react";
import { Gradient } from "../components/Gradient";
import { Icon } from "../components/Icon";
import { Tabs } from "../components/Tab";
import { Topnav } from "../components/Topnav";
import s from "./ItemsNewPage.module.scss";
import { Tags } from "./ItemsNewPage/Tags";
import { useCreateItemStore } from '../stores/useCreateItemStore'
import vhCheck from 'vh-check'
import { ItemAmount } from "./ItemsNewPage/ItemAmount";
import { ItemData } from "./ItemData";
vhCheck()

export const ItemsNewPage: React.FC = () => {
  const {data , error ,setData, setError} = useCreateItemStore()

  const tabItems: {
    key: "income" | "expenses";
    text: string;
    element?: ReactNode;
  }[] = [
    { key: "income", text: "收入", element:
    <Tags kind="income" value={data.tag_ids} onChange = {(ids) => setData({tag_ids:ids})}/>  },
    { key: "expenses", text: "支出", element: 
    <Tags kind="expenses" value={data.tag_ids} onChange = {(ids) => setData({tag_ids:ids})}/>
  },
  ];
    return (
    <div className={s.wrapper} h-vhcheck flex flex-col>
      <Gradient className="grow-0 shrink-0">
        <Topnav title="记一笔" icon={<Icon name="back" />} />
      </Gradient>
      <Tabs
        className='text-center grow-1 shrink-1 overflow-hidden'
        tableItems={tabItems}
        value={data.kind!}
        onChange={(tabitem) => {
          setData({kind:tabitem});
        }}
        classPrefix="itemsNewTabs"
      />
      <div text-28px>{JSON.stringify(data)}</div>
      <ItemAmount className="grow-0 shrink-0" 
      ItemData={<ItemData value={data.happen_at}
      onChange={(happen_at) => setData({happen_at})} />} 
      value = {data.amount} onChange= {amount => setData({amount})}
      />
    </ div>
  );
};
