import { Table } from "antd";
import styled from "styled-components";

const Index = styled(Table).attrs()`
    .ant-spin-container,
    .ant-table,
    .ant-table-header {

        tr, th {
            background-color: #FCFCFC !important;
            
         

    }

    th {
        
        &:nth-child(3){
            background-color: red;
            display: flex;
            justify-content: start !important;
            align-items: center !important;
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
    }

    .ant-table-body {
        table {
            // margin-top: -2rem;
            tr,td {
                // height: 60px !important;
            }
        }
    }
    .ant-table-wrapper {
         margin-left: 50px; 
      }


        td > div > div > div > div > div > div > table tr th,
        td > div > div > div > div > div > div > table tr td{
        background-color: #FAFAFA !important;
        padding-top: 0 !important;
        padding-bottom: 0  !important;
       }
 div.ant-table-body > table > tbody > tr.ant-table-expanded-row.ant-table-expanded-row-level-1 > td > div > div > div{
    padding: 0;
 }


 div.ant-table-body > table > tbody > tr.ant-table-expanded-row.ant-table-expanded-row-level-1 > td{
    background-color:#FAFAFA !important;
    box-shadow: 0px -4px 8px 0px rgba(22, 22, 22, 0.10) ;
 }

 div.ant-table-body > table > tbody > tr.ant-table-expanded-row.ant-table-expanded-row-level-1 > td > div > div > div{
    // background-color: red !important;
    width: 90% !important;
    float: right !important;
    margin-right: 89px !important ;

    // & *{
    //     border-radius: none !important;
    //     border-start-start-radius:0 !important;
    // }
 }
 tr.ant-table-expanded-row.ant-table-expanded-row-level-1 > td > div > div > div > div{
    border: none !important;
 }

 td > div > div > div > div > div > div > table > tbody > tr > td.ant-table-cell{
    height: 50px;
 }



`

export default ((props) => {
    return <Index {...props} />
})
// export default memo()

// export default Index;


