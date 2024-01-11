import { Table } from "antd";
import styled from "styled-components";
import { PlusIconTable } from './Icons'


const Index = styled(Table).attrs((props) => ({

}))`
   
   
    
    h4{
        font-family:Montserrat, sans-serif !important;
        font-size:16px;
        font-weight:600;
    }

    .ant-table-cell{
        font-size:16px;
        font-weight: 400;

    }

  
    
    .ant-typography{
        font-size:16px !important;
        font-weight:600 !important;
    }

    .ant-table-filter-trigger{
        
        margin-inline: 4px 4px!important
    }

    .ant-dropdown-trigger{
        margin-inline: 4px 4px!important

    }

  .ant-table-row-level-1{

    button{
        display:none !important;
    }
  }

  .ant-table-row-level-1{
    
    border-bottom: 1px solid rgba(0, 0, 0, 0.10) !important;
    background-color: #FAFAFA !important;
   
  }

  .ant-table-column-has-sorters{
    position:relative;
  }

  .bg-table-splitted{
    backgroud-color:red;
  }
 

    .ant-spin-container,
    .ant-table,
    .ant-table-header {

        tr, th {
            background-color: #FCFCFC !important;
            

    }  

    .ant-table-cell{
        padding: 10px 0px !important;
    }

    .ant-table-cell-with-append{
        padding-top: 23px!important;
        padding-bottom: 23px!important; 
        display:flex;
        gap:10px;
    }

    .ant-table-thead {
        .t-body-title {
            // display: flex;
            h4 {
                width: 100%;
            }
        }

    }

    // td{
    //     button{
    //         display:none;
    //     }
    // }

    .ant-btn{
        //display:none
    }


    .ant-table-measure-row {
        visibility: hidden !important;
        height: 36px !important;
    }

    .ant-table-body {
        table {
            margin-top: -40px;
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