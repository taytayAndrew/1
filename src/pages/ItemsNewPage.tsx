import { ReactNode, useState } from "react";
import { Gradient } from "../components/Gradient";
import { Icon } from "../components/Icon";
import { Tabs } from "../components/Tab";
import { Topnav } from "../components/Topnav";
import s from "./ItemsNewPage.module.scss";
import { Tags } from "./ItemsNewPage/Tags";


export const ItemsNewPage: React.FC = () => {
  const tabItems: {
    key: "income" | "expenses";
    text: string;
    element?: ReactNode;
  }[] = [
    { key: "income", text: "收入", element:
    <Tags kind="expenses" />  },
    { key: "expenses", text: "支出", element: 
    <Tags kind="income" />
  },
  ];
  const [tabItem, setTabItems] = useState<Item['kind']>("expenses");
  return (
    <div className={s.wrapper}>
      <Gradient>
        <Topnav title="记一笔" icon={<Icon name="back" />} />
      </Gradient>
      <Tabs
        className='text-center'
        tableItems={tabItems}
        value={tabItem}
        onChange={(tabitem) => {
          setTabItems(tabitem);
        }}
        classPrefix="itemsNewTabs"
      />
    </ div>
  );
};
