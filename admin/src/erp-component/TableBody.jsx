import { Table } from "antd";
import styled from "styled-components";

const Index = styled(Table).attrs()`
    .ant-spin-container,
    .ant-table,
    .ant-table-header {
        tr, th {
            background-color: #FCFCFC !important;
        }
        th[aria-sort="ascending"] {
            // display: none;
        }
    }

    .ant-table-thead {
        .t-body-title {
            // display: flex;
            h4 {
                width: 100%;
            }
        }

    }

    .ant-table-measure-row {
        visibility: hidden !important;
        height: 36px !important;
    }

    .ant-table-body {
        table {
            margin-top: -2rem;
            tr,td {
                // height: 60px !important;
            }
        }
    }
   
`

export default ((props) => {
    return <Index {...props} />
})
// export default memo()

// export default Index;