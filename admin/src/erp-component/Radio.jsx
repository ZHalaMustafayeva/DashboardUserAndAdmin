import { Radio } from 'antd'
import styled from 'styled-components'

const Index = styled(Radio).attrs({

})`

  .ant-radio-inner{
    border-color: ${({ bordercolor }) => bordercolor || "#23A4DD"};
    background-color: ${({ bgcolor }) => bgcolor || "white !important"};
    &:after{
        background-color: ${({ bgcolorafter }) => bgcolorafter || "#23A4DD"};
        width: ${({ radiowidthafter }) => radiowidthafter || "32px"};
        height: ${({ radioheightafter }) => radioheightafter || "32px"};
        margin-block-start: ${({ marginblockstartafter }) => marginblockstartafter || "-16px"};
        margin-inline-start: ${({ margininlinestartafter }) => margininlinestartafter || "-16px"};
    }
  }
  
  }
  
  
  
`
Index.Group = styled(Radio.Group).attrs()`
  .ant-radio-button-wrapper {
    border-color: #C5C5C5 !important;
  }
`
export default Index
