import styled from 'styled-components'
import { Popconfirm } from 'antd'

const Index = styled(Popconfirm).attrs((props) => ({
  // Define the default border color using props, you can adjust it to your preference
  borderColorOnFocus: props?.borderColorOnFocus || '#23A4DD',
  borderColor: props?.borderColor || '#0000001A',
  width: props?.width || '268px',
  height: props?.height || '44px'

}))`

*{
  font-family: Montserrat !important;
}


 

  // box-shadow:none!important;
  // width: ${(props) => props?.width} !important;
  // height:${(props) => props?.height} !important;
  // border-radius:6px;




`
export default Index