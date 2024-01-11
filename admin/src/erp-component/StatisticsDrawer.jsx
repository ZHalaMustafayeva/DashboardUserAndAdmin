import { Drawer } from "antd";
import styled from "styled-components";


const Index = styled(Drawer).attrs(() => ({
}))`
    border-radius: 12px;

    .ant-drawer-header {
        padding: 12px 0;
    }

    .ant-drawer-title {
        color: var(--primary-color, #23A4DD);

        font-family: Montserrat;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: 175%; /* 35px */
    }
    
`

// style = {{ fontSize: "20px", fontWeight: "600", fontFamily: "Montserrat", color: "#23A4DD" }}
export default Index;