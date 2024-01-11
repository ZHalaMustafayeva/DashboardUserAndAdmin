import { Transfer } from "antd";
import styled from "styled-components";
import { LeftArrow } from "./Icons";
import { RightArrow } from "./Icons";

const Index = styled(Transfer).attrs()`
    .ant-transfer-operation {
        // border: 1px solid black;
        button {
            border: none;
            background-color: transparent;
            span {
                display: none;
            }

        }
    
    }
`

export default Index;