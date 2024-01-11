import styled from 'styled-components';
import { Layout } from 'antd';

const Index = styled(Layout).attrs()`{
    .ant-layout-sider-trigger {
        background-color: #fff !important;
        border-right: 1px solid rgba(0, 0, 0, 0.10);
        span {
            color: #505050;
        }
    }
}
`
export default Index;