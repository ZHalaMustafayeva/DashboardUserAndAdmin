import { Select } from 'antd'
import styled, { css } from 'styled-components';
import { ArrowDown } from './Icons'

const Index = styled(Select).attrs(({ placeholder }) => ({
  // mode: mode || 'default',
  placeholder: placeholder || 'Seçim edin'
}))`

  * {
    font-family: Verdana,Geneva,Tahoma,sans-serif !important;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  
  .ant-select-selector{
      border: 1px solid rgba(0, 0, 0, 0.10) !important;
      height:44px  !important;
      background-color:${({ bgcolorselect }) => bgcolorselect || "transparent"};
      background-color: ${({ disabled }) => disabled && '#F1F1F1 !important'};
  }
  
  .ant-select-show-search:where(.css-dev-only-do-not-override-182n8ep).ant-select:not(.ant-select-customize-input) .ant-select-selector input{
    height:100% !important;
  }
  
  input{
    height:100% !important;
  }
  
  .ant-select-selection-placeholder {
    position: absolute;
    top: 50%; 
    transform: translateY(-50%);
    left: 10px; 
    color: #909090 !important;
    font-weight: 400 !important;
    font-family: Montserrat !important;
    font-size: 16px !important;
  }
  
  .ant-select-selection-item{
  
    position: absolute;
    top: 62%; 
    transform: translateY(-50%);
  }
  

  
  .ant-select-selector{
    width:100%;
  }
  
  .ant-select-arrow{
    color:#505050;
    font-size:13px;
  }
  
  .ant-select-clear{
    color:#505050;
    font-size:13px;
    &:hover{
      color:#505050;
      font-size:13px;
    }
  }

  
  ${({ mode }) =>
    mode === 'multiple' &&
    css`
    .ant-select-selection-item {
      position: relative;
      margin-top:20px;
    }

    .ant-select-selection-overflow-item.ant-select-selection-overflow-item-suffix{
      // margin-left: -10px;
      margin-bottom:4px;
    }

  `}

`
Index.Option = styled(Select.Option).attrs({

})`
 :where(.css-dev-only-do-not-override-182n8ep).ant-select-dropdown.ant-select-item{
  border: 1px solid red !important;
}

`
export default Index
