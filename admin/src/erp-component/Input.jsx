import styled from 'styled-components'
import { Input } from 'antd'

const Index = styled(Input).attrs((props) => ({
  // Define the default border color using props, you can adjust it to your preference
  borderColorOnFocus: props.borderColorOnFocus || '#23A4DD',
  borderColor: props.borderColor || '#0000001A',
  width: props.width || '268px',
  height: props.height || '44px'

}))`

*{
  font-family: Montserrat !important;
}

&::placeholder {
  font-weight: 400 !important;
  font-family: Montserrat !important;
  font-size: 16px !important;
  color: #909090 !important
}

box-shadow:none!important;
width: ${(props) => props.width} !important;
height:${(props) => props.height} !important;
border-radius:6px;
border:${(props) => props.borderColor} !important || 1px solid rgba(0, 0, 0, 0.10) !important ;
border-color: rgba(0, 0, 0, 0.10) !important ;
background-color:#fff;
background-color: ${({ disabled }) => disabled && '#F1F1F1 !important'};

.ant-input-disabled{
  background-color:#F1F1F1 !important
}
.ant-input[disabled]{
  border-color: rgba(0, 0, 0, 0.10);
}

box-shadow:none!important;
width: ${(props) => props.width} !important;
height:${(props) => props.height} !important;
border-radius:6px;
border:${(props) => props.borderColor} !important || 1px solid rgba(0, 0, 0, 0.10) !important ;
border-color: rgba(0, 0, 0, 0.10) !important ;
background-color:#fff;

  &:focus{
    outline: 2px solid  ${(props) => props.borderColorOnFocus} !important;
    //border:none !important;
    background-color:transparent !important;
    color:black !important;
    
  }

  .ant-input.ant-input-status-success{
    color:black
  }

  .ant-input{
    font-weight: 400 !important;
    font-family: Montserrat !important;
    font-size: 16px !important;
    color:black !important;
    box-shadow:none!important;
    width: ${(props) => props.width} !important;
    height:${(props) => props.height} !important;
    border-radius:6px;
    border:${(props) => props.borderColor} !important || 1px solid rgba(0, 0, 0, 0.10) !important ;
    border-color: rgba(0, 0, 0, 0.10) !important ;
    background-color:#fff;
    &:focus{
      outline: 2px solid  ${(props) => props.borderColorOnFocus} !important;
      border:none !important;
      background-color:transparent !important;
      color:black !important;
      
    }
  }
  .ant-input-group-addon{
    border: 1px solid rgba(0, 0, 0, 0.10) !important;
    background:#fff;
  }
  .ant-input-number-group-addon{
    .ant-select-selector{
      border: 1px solid rgba(0, 0, 0, 0.10) !important;
      height:44px  !important;
      border:none !important;

      background-color:${({ bgcolorselect }) => bgcolorselect || "transparent"};
      ant-select-selector{
        border:none !important;
      }
  }
  }
  ant-input-number-group-addon{
    border:none;
    padding:0px !important;
    // width:65px !important;
    input{
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    .ant-input-disabled{
      background-color: #C5C5C5 !important;
    }
   }
`

Index.TextArea = styled(Input.TextArea).attrs()`
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.10);
  background: #FFF;
`
export default Index