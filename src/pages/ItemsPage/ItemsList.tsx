import React from "react";
import useSWRInfinite from "swr/infinite";
import { useAjax } from "../../lib/ajax";


interface Props {}
  const getKey = (pageIndex: number ,prev:Resources<Item>) => {
  if(prev){
      const sendCount = (prev.pager.page - 1)*prev.pager.per_page + prev.resources.length
  if(prev.pager.count <= sendCount){return null}
    }
    return `/api/v1/items?page=${pageIndex + 1}`; 
};
const {get} = useAjax()

export const ItemsList: React.FC<Props> = () => {
  const {get} = useAjax()//注意钩子要放在组件里面使用
  const { data, error, size, setSize } = useSWRInfinite(
    getKey,
    async (path) => (await get<Resources<Item>>(path)).data,
    { revalidateFirstPage : false }//SWR会自动自动更新缓存 ，会多一次请求的原因是 他需要你在请求下一页时 你的第一页是否就就还是原先的数据 如果不是 那就要把最新的数据插入到前面 要在每一次请求第一页的时候都去请求第一页 以达到更新缓存的效果 如果第一页数据变化，会继续请求下一页
  );
const loadMore = () =>{
  setSize(size + 1)
}
const isLoadingInitialData = !error && !data
const isLoadingMore = data?.[size - 1] === undefined && !error
const isLoading  = isLoadingInitialData || isLoadingMore
  if (!data) {
    return <div>
      {error && <div text-center p-16px>数据请求错误，重新刷新一下</div>}
      {isLoading && <div text-center>数据加载中...</div>}
     </div>
  } else {
    const last = data[data.length - 1]
    const {page ,per_page, count } = last.pager
    const hasMore = (page - 1)*per_page + last.resources.length < count
    return (
      <> 
      <ol>
        {data.map(({ resources }) => { //这里一共是有两层遍历 一个是对所有请求遍历 一个是所有请求中的resource遍历
          return resources.map((item) => (
            <li
            key={item.id} grid grid-cols="[auto_1fr_auto]" grid-rows-2 px-16px py-8px gap-x-12px
            border-b-1 b="#EEE"
            >
              <div
                row-start-1
                col-start-1
                row-end-3
                col-end-2
                text-24px
                w-48px
                h-48px
                bg="#D8D8D8"
                rounded="50%"
                flex
                justify-center
                items-center
              >
                😍
              </div>
              <div row-start-1 col-start-2 row-end-2 col-end-3>
                旅行
              </div>
              <div row-start-2 col-start-2 row-end-3 col-end-4 text="#999999">
                2011年1月1日
              </div>
              <div row-start-1 col-start-3 row-end-2 col-end-4 text="#53A867">
                ￥{item.amount / 1000}
              </div>
            </li>
          ));
        })}
      </ol>
      <div>
      {error && <div>数据请求错误，重新刷新一下</div>}
      {!hasMore 
      ?<div p-16px  text-center >拜托 真的是没有更多啦</div>
      :isLoading?
      <div text-center>数据加载中...</div>
      :<button text-center p-16px q-btn opacity-60 onClick={loadMore}>加载更多</button>}
  </div>
      </>
     
    );
  }
  // const items:Item[] = []
  // console.log(data,error)
  // return <div>
  
  //   </div>;
};
