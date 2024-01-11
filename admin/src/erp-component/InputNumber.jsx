import styled from 'styled-components'
import { InputNumber } from 'antd'

const Index = styled(InputNumber).attrs((props) => ({
  // Define the default border color using props, you can adjust it to your preference
  borderColorOnFocus: props.borderColorOnFocus || '#23A4DD',
  borderColor: props.borderColor || 'rgba(0, 0, 0, 0.1) 0000001A',
  width: props.width || '268px',
  height: props.height || '44px',
  display: props.display || 'none',
  addonPadding: props.addonPadding || "0px",
  borderColorAddon: props.borderColorAddon || "1px solid rgba(0, 0, 0, 0.10)"
}))`



  box-shadow:none!important;
  width: 100% !important;
  width: ${(props) => props.width} !important;
  height:${(props) => props.height} !important;
  border-radius:6px;
  border:${(props) => props.borderColor} !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  background-color: ${({ disabled }) => disabled && '#F1F1F1 !important'};
  // padding:0 !important;

  .ant-input-number-disabled{
    background:#fff !important;
  }
  
  .ant-input-number-focused{
  outline: 1px solid  ${(props) => props.borderColorOnFocus};
  }
  .ant-input-number{
    border:1px solid rgba(0, 0, 0, 0.1) !important;
  }
  .ant-input-number-handler-wrap{
   display:${(props) => props.display}
  }

  .ant-input-number-input{
    color:#505050 !important;
    padding:0 7px;
    
  }
 .ant-input-number-group-addon{
  padding:${(props) => props.addonPadding} !important;
  border: ${(props) => props.borderColorAddon} !important;
  // padding:0px !important;
  // width:65px !important;
  input{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .ant-input-disabled{
    background-color: #fff !important;
  }
 }

 .ant-input-number-group-addon{
  color: #23A4DD !important;
 }

 .ant-input-number-input-wrap{
  padding-top:5px !important
 }
 .ant-input-number-input{
  font-weight: 400 !important;
  font-family: Montserrat, sans-serif !important;
  font-size: 16px !important;
  color: black !important
  }

  & .ant-input-number-input::-webkit-input-placeholder {
  color: #909090 !important
  }

  .ant-input-number-group-addon {

   
  }
  .ant-input-number-input {

      ${({ bill }) => bill && {
    textAlign: 'center'
  }}   
  }
  
`
export default Index
/*
 ${({ bill }) => bill && {
    width: '60%'
  }} 
*/