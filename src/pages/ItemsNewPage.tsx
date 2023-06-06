import { FormEventHandler, ReactNode, useState } from "react";
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
import { hasError, validate } from "../lib/validate";
import { useAjax } from "../lib/ajax";
import { BackIcon } from "../components/BackIcon";
vhCheck()

export const ItemsNewPage: React.FC = () => {
  const {data , setData, setError} = useCreateItemStore()

  const tabItems: {
    key: "income" | "expenses";
    text: string;
    element?: ReactNode;
  }[] = [
    { key: 'expenses', text: '支出', element:
    <Tags kind="expenses" value={data.tag_ids} onChange={(ids) => setData({ tag_ids: ids })} />
},
{
  key: 'income', text: '收入', element:
    <Tags kind="income" value={data.tag_ids} onChange={(ids) => setData({ tag_ids: ids })} />
}
] // React DOM diff 的优化
  const {post} = useAjax({showLoading:true , handleError: true})
  const onSubmit = async() => {
    const error = validate(data,[
      {key:'kind' , type:'required' , message:'请选择类型：收入或支出'},
      {key:'tag_ids' , type:'required' , message:'请选择一个标签'},
      {key:'happen_at' , type:'required' , message:'请选择一个时间'},
      {key:'amount' , type:'required' , message:'请输入金额'},
      {key:'amount' , type:'notEqual' ,value:0, message:'金额不能为0'},  
    ])
    setError(error)
    if(hasError(error)){
      const message = Object.values(error).flat().join('\n')  //Object.values可以返回一个包含对象自身的所有可枚举属性值的数组。
      console.log(Object.values(error))
      alert(message)
    }else{
      const response = await post<Resource<Item>>('/api/v1/items' , data)
      console.log(response.data.resource)

    }

  }
    return (
    <form className={s.wrapper} h-vhcheck flex flex-col onSubmit={onSubmit}>
      <Gradient className="grow-0 shrink-0">
        <Topnav title="记一笔" icon={<BackIcon />} />
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
      <ItemAmount className="grow-0 shrink-0" 
      ItemData={<ItemData value={data.happen_at}
      onChange={(happen_at) => setData({happen_at})} />} 
      value = {data.amount} onChange= {amount => setData({amount}) } onSubmit={onSubmit}
      />
    </ form>
  );
};
