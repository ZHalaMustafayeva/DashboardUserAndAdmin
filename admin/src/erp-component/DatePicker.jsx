import styled from 'styled-components'
import { DatePicker } from 'antd'
import { CalendarIcon } from './Icons'

const Index = styled(DatePicker).attrs((props) => ({
  borderColorOnClick: props.borderColorOnClick || '#23A4DD',
  // borderColorOnHover: props.borderColorOnHover || '#23A4DD',
  width: props.width || '268px',
  height: props.height || '44px',
  suffixIcon: <CalendarIcon />
}))`

.ant-picker-input input::placeholder{
  font-weight: 400 !important;
  font-family: Montserrat !important;
  font-size: 16px !important;
  color: #909090 !important
}


.ant-picker-focused{
  border: 2px solid #23A4DD !important;
}

:where(.css-dev-only-do-not-override-182n8ep).ant-picker.ant-picker-disabled{
  background:#F1F1F1 !important;
}
 box-shadow:none!important;
 width: ${(props) => props.width} !important;
  height:${(props) => props.height} !important;
  border-radius:6px;
  border:1px solid #0000001A !important;
  

.anticon-close-circle{
  font-size:20px !important;
}

  // :hover{
  //   border: 2px solid ${(props) => props.borderColorOnHover} !important

  // }
  // :where(.css-dev-only-do-not-override-182n8ep).ant-picker-focused {
  //   border: 2px solid ${(props) => props.borderColorOnClick} !important;
    
  // } 

  // &:focus{
  //   background:red !important;
  // }

  :where(.css-dev-only-do-not-override-182n8ep).ant-picker .ant-picker-suffix >* {
    vertical-align: top;
    color: black;
}
`
export default Index