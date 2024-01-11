import styled from 'styled-components'
import { Input } from 'antd'

const Index = styled(Input.TextArea).attrs((props) => ({
  // Define the default border color using props, you can adjust it to your preference
  borderColorOnFocus: props.borderColorOnFocus || '#23A4DD',
  borderColor: props.borderColor || '#0000001A',
  width: props.width || '804px',
  height: props.height || '144px'

}))`

  box-shadow:none!important;
//   border:none!important;
  width: ${(props) => props.width} !important;
  height:${(props) => props.height} !important;
  border-radius:6px;
  border:1px solid ${(props) => props.borderColor} !important;


:where(.css-dev-only-do-not-override-182n8ep).ant-input-disabled, :where(.css-dev-only-do-not-override-182n8ep).ant-input[disabled]{
  background-color:#F1F1F1 !important
}
  
  &:focus{
    outline: 2px solid  ${(props) => props.borderColorOnFocus} !important;
    
  }

  &::placeholder {
    font-weight: 400 !important;
    font-family: Montserrat !important;
    font-size: 16px !important;
    color: #909090 !important
  }
`
export default Index