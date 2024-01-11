import styled from 'styled-components'
import { Popover } from 'antd'

const Index = styled(Popover).attrs()`

    .ant-popover {
        width: 500px;
        .ant-popover-content {
            width: 600px;
            height: 500px;
        }
    }

`
export default Index