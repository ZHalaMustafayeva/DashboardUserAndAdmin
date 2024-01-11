import { Collapse } from 'antd'
import styled from 'styled-components'

const Index = styled(Collapse).attrs({
    bordered: true
})`

    border: 1px solid rgba(5, 5, 5, 0.06) !important;
    border-radius: 8px;
    margin-bottom: 2rem;

    .ant-collapse-item {
        
        .ant-collapse-content {

                .ant-collapse-content-box {
                    padding: 0 !important;
                    // margin: 16px;

                }
        }
    }

    .ant-collapse-item-active {

        .ant-collapse-content {
            // display: none !important;
        }
    }
  
`

export default Index
