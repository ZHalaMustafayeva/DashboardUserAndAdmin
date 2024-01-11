import styled from "styled-components";
import { Modal } from "antd";
import { CloseIconModal } from './Icons'



const Index = styled(Modal).attrs(() => ({
    closeIcon: <CloseIconModal />,
}))`

.fixed-submit-buttons{
    border-bottom-right-radius: 8px;

}


    .ant-modal-content{
        padding:0;
    }
    .ant-modal-header {
        padding: 20px 24px 0 24px;
        border-bottom:1px solid rgba(0, 0, 0, 0.10);
        .ant-modal-title {
            color: var(--primary-color, #23A4DD);
    
            /* H5/SemiBold */
            font-family: Montserrat;
            font-size: 20px;
            font-style: normal;
            font-weight: 600;
            line-height: 175%; /* 35px */
        }
    }

    .ant-modal-title{
       padding-bottom: 12px !important;
       margin-top: -8px !important; 
    }

    .ant-modal-body {
        height:700px;
        overflow:scroll !important;

        // .fixed-submit-buttons{
        //     border-bottom-left-radius: 8px;
        //     border-bottom-right-radius: 8px;
        // }
        


        padding: 20px 24px 0 24px;
       
        .ant-form-item-control-input {
            padding-bottom: 5px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.10);
            color: #505050;
    
            /* Body/Medium */
            font-family: Montserrat;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 175%; /* 28px */
        }
    }
   
`

export default Index;