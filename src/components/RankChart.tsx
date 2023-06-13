import { Money } from "./Money";

type Props = {
    className?:string
    items?: {name:string ; value:number|string;sign:string}[]
}

const colors = ['#5470c6', '#ffbab0', '#ffa750', '#8748d3', '#53a867', '#eba953', '#91cc75', '#fac858', '#ee6666', '#73c0de']
export const RankChart:React.FC<Props>= (props) =>{   
const {className , items} = props  
const total = items?.reduce((result, item) => result + parseFloat(item.value.toString()), 0) ?? 0   //得到加和值 ??后面是给total初始值  reduce函数可以使用上一次计算的结果作为参数
const max = items?.reduce((prev, item) => Math.max(prev ,parseFloat(item.value.toString())),0)?? 0
const renderItems = () => {
    return (
        items?.map((item,index) =>
        
            <div key={item.name}  grid grid-cols="[48px_1fr_1fr]" grid-rows="[repeat(2,1fr)]" text-12px items-center gap-y-6px gap-x-8px px-16px my-8px>
            <div row-start-1 col-start-1 row-end-3 col-end-2
            w-48px h-48px rounded-24px bg="#EFEFEF" flex justify-center items-center
            text-24px>{item.sign}</div>
           <div row-start-1 col-start-2 row-end-2 col-end-3 self-end>
            {item.name} - {`${( parseFloat(item.value.toString()) / total * 100).toFixed(0)}%`} 
            {/**保留0位小数 得到占多少比例*/}
          </div>
          <div row-start-1 col-start-3 row-end-2 col-end-4 text-right >
            {item.value}
          </div>
          <div row-start-2 col-start-2 row-end-3 col-end-4 h-8px self-start
            rounded-4px bg="#CCC" relative>
            <div absolute h-full rounded-4px
              style={{ background: colors[index], width: `${parseFloat(item.value.toString()) / max * 100}%` }} /> {/**若样式使用到变量那就使用style比较好 */}
          </div>
        </div>)
    )
}
 return (
    <div className={className}>{
        items
          ? renderItems()
          : <div>暂无数据</div>
      }</div>
    )
}