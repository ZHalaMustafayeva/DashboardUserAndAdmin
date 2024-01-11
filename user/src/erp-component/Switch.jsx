import styled from 'styled-components'
import { Switch } from 'antd'

const Index = styled(Switch).attrs((props) => ({
  colorOnActive: props.colorOnActive || '#23A4DD',
}))`

  width:44px;
  height: 24px ;
  background-color: #23A4DD!important

  .ant-switch-handle{
    color:red
  }
  
  :where(.css-dev-only-do-not-override-xj1xdx).ant-switch.ant-switch-checked{
    background-color:${(props) => props.colorOnActive} !important
  }

  :where(.css-dev-only-do-not-override-xj1xdx).ant-switch .ant-switch-handle::before {
    position: absolute;
    top: 1px !important;
    inset-inline-end: 0;
    bottom: 0;
    inset-inline-start: 0;
    background-color: #fff;
    border-radius: 9px;
    box-shadow: 0 2px 4px 0 rgba(0, 35, 11, 0.2);
    transition: all 0.2s ease-in-out;
    content: "";
  }

  .ant-switch-handle{
    top:3px!important;
  }


`
export default Index