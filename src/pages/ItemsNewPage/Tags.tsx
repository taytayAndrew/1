import { Icon } from "../../components/Icon";

type Props= {
  kind: Item['kind']
}
export const Tags: React.FC<Props> = (props) => {
  const {kind} =  props
  const tags = Array.from({ length: 19 });
  return (
    <div>
      <ol grid grid-cols="[repeat(auto-fit,48px)]" justify-center gap-x-32px gap-y-16px py-16px px-16px>
        <li>
          <span  block w-48px h-48px rounded= "24px" bg='#EFEFEF' flex justify-center items-center text-24px><Icon name='add'/></span>
        </li>
        {tags.map(tag =>
        <li w-48px  flex flex-col justify-center items-center>
          <span block w-48px h-48px rounded= "24px" bg='#EFEFEF' flex justify-center items-center text-24px b-1 b="lightblue">🥵</span>
          <span text-12px>打车</span>
        </li>)

        }
      </ol>
    </div>
  );
};
