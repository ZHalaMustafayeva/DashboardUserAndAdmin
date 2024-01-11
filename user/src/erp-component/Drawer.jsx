import { Drawer } from 'antd'
import styled from 'styled-components'

const Index = styled(Drawer).attrs({

})`

.ant-drawer-title{
    color:${({ color }) => color || "#23A4DD"};
    font-weight:600px;
    font-size: 20px;
}
.ant-drawer.ant-drawer-content{
    width:${({ widthdrawer }) => widthdrawer || "80%"};

}

.ant-drawer-close{
  color: #505050;
  &:hover{
    color: #505050;
  }
}
.ant-drawer-body{
  padding-left:${({ paddingleft }) => paddingleft || "0"};
  padding-right:${({ paddingright }) => paddingright || "0"};
}

`

export default Index
