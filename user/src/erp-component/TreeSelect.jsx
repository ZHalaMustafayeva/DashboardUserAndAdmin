import { TreeSelect } from "antd";
import styled from "styled-components";

const Index = styled(TreeSelect).attrs(({ placeholder }) => ({
  placeholder: placeholder || 'Seçim edin'
}))`
    display: flex;
    justify-content: center;
    align-items: center;
    .ant-select-selector {
        .ant-select-selection-search {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        border: 1px solid rgba(0, 0, 0, 0.10) !important;
        height:44px  !important;
        background-color:${({ bgcolorselect }) => bgcolorselect || "transparent"};
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

`

export default Index;