import styled from 'styled-components'
import { Tabs } from 'antd'

const Index = styled(Tabs).attrs((props) => ({
  colorOnHover: props.colorOnHover || '#23A4DD',
  colorOnClick: props.colorOnClick || '#23A4DD',
  colorOnDeactive: props.colorOnDeactive || '#C5C5C5',
  fontSizeActive: props.fontSizeActive || "16px",
  marginRight: props.marginRight || "4px",
  marginLeft: props.marginLeft || "4px"
}))`

.ant-tabs-tab-btn:hover{
  color: ${(props) => props.colorOnHover} !important;
}





:where(.css-dev-only-do-not-override-182n8ep).ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
  color: ${(props) => props.colorOnClick} !important;   
  font-weight:500;
  font-size: ${(props) => props.fontSizeActive};
  font-family: 'Montserrat', sans-serif;
}

.ant-tabs-tab{
  color: ${(props) => props.colorOnDeactive}!important;
  font-weight:500;
  font-size:16px;
  font-family: 'Montserrat', sans-serif !important;
}

.ant-tabs-tab-btn{
    font-family: 'Montserrat', sans-serif !important;
}

:where(.css-dev-only-do-not-override-182n8ep).ant-tabs-card >.ant-tabs-nav .ant-tabs-tab, :where(.css-dev-only-do-not-override-182n8ep).ant-tabs-card >div>.ant-tabs-nav .ant-tabs-tab {
  padding: 8px 49px;

  background: rgba(80, 80, 80, 0.02);
  border: 1px solid #f0f0f0;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

// :where(.css-dev-only-do-not-override-182n8ep).ant-tabs-card >.ant-tabs-nav .ant-tabs-tab{
//   margin-right: ${(props) => props.marginRight};
//   margin-left: ${(props) => props.marginLeft};
// }

.ant-tabs-nav-wrap {
  margin-right: ${(props) => props.marginRight};
  margin-left: ${(props) => props.marginLeft};
}

.ant-tabs-tab{
  background-color: white!important;
  padding: 8px 46px!important;

}

:where(.css-dev-only-do-not-override-xj1xdx).ant-tabs .ant-tabs-tab:hover {

}

.ant-tabs-tab-active{
  border-bottom:1px solid white!important
}

:where(.css-dev-only-do-not-override-xj1xdx).ant-tabs-card >.ant-tabs-nav .ant-tabs-tab, :where(.css-dev-only-do-not-override-xj1xdx).ant-tabs-card >div>.ant-tabs-nav .ant-tabs-tab {
  margin-right: 4px;
  padding: 8px 46px!important;
  height:36px;
  background: rgba(63, 66, 84, 0.02);
  border: 1px solid #f0f0f0;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

`
export default Index