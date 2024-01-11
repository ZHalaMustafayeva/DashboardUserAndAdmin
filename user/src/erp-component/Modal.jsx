import { Modal } from 'antd'
import styled from 'styled-components'
import { CloseIconModal } from './Icons'

const Index = styled(Modal).attrs((props) => ({
  closeIcon: <CloseIconModal />,
  footer: props.footer || false,


}))`
.ant-modal-title{
  //border-bottom: 1px solid black !important;
}
.ant-modal-header{
  .ant-modal-title{
    .ant-row{
      padding-top:5px;
      margin-inline:28px;   
      ${({ paymentBank }) => paymentBank && { marginRight: '4rem !important', paddingTop: '.6rem', }}
     }
  }
}

.ant-modal-close{
  inset-inline-end: 30px !important;
}

.ant-modal-close{
  ${({ paymentBank }) => paymentBank && { paddingTop: '.6rem' }}
}



.fixed-submit-buttons-small{
  justify-content:center!important;
  gap:16px !important;
}

.ant-modal-body{
  height: ${({ height }) => height || "auto"} !important;
  min-height:${({ minHeight }) => minHeight || "300px"};
  max-height: ${({ maxHeight }) => maxHeight && "80vh"};

  overflow-y:scroll !important;
  overflow-x:hidden !important;
 .fixed-submit-buttons{
    margin-top: 20px;
    position: absolute;
    bottom: 0px;
    background: rgb(255, 255, 255) !important;
    width: 100%;
    right: 0px;
    border-bottom-right-radius: 8px;
    padding-bottom: 24px;
    border-bottom-left-radius: 8px;
 }
}

.ant-divider{
  margin-top:8px;
}

.ant-modal-content{
  .ant-modal-close{
    // top:9px !important;
  }
  padding 0;
}
.modal-container {
  border: 1px solid black !important;

  .ant-modal-content {
    height: ${({ height }) => height};
    padding: 0, 0 !important;
  }
  
  
  div:nth-child(2){
    padding: 0px 0px;
  }
  
  .ant-divider{
    margin-top: 28px!important;
    margin-bottom: 0px !important
  }
  
  .ant-row{
      background-color: transparent !important;
      border: none
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 95%;
  }
  
  .ant-modal-footer{
    display:none!important;
  }
  
}
}

// .ant-modal-header{
//   margin-bottom:10px;
// }

// .ant-drawer-title{
//     color:${({ color }) => color || "#23A4DD"};
//     font-weight:600px;
// }
// .ant-drawer.ant-drawer-content{
//     width:${({ widthdrawer }) => widthdrawer || "80%"};

// }

// .ant-drawer-close{
//   color: #505050;
//   &:hover{
//     color: #505050;
//   }
// }
// .ant-drawer-body{
//   padding-left:${({ paddingleft }) => paddingleft || "0"};
//   padding-right:${({ paddingright }) => paddingright || "0"};
// }
`

export default Index
