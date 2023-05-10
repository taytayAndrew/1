import { Link } from "react-router-dom"
import styled from "styled-components"

interface Props {
  className?: string
}
const Div = styled.div `
background: linear-gradient(90deg, rgba(9,121,101,1) 0%, rgba(204,187,231,1) 0%, rgba(107,247,255,1) 94%);

`
export const CurrentUser: React.FC<Props> = ({ className }) => {
  return (
    
 
     <Div><Link to='/sign_in' block className={className}  text-white w="100%" pt-32px pb-44px
      px-16px>
      <h2 text-24px>未登录用户</h2>
      <div text="#CEA1FF">点击这里登录</div>
    </Link></Div>

   

    
  )
}
