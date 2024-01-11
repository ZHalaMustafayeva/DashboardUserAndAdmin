import { Checkbox } from 'antd'
import styled from 'styled-components'

const Index = styled(Checkbox).attrs({

})`
  .ant-checkbox {
    width: ${({ width }) => width || "18px"};
    height: ${({ height }) => height || '18px'}
  }
  .ant-checkbox .ant-checkbox-inner{
    width: ${({ widthinner }) => widthinner || "18px !important"};
    height: ${({ heightinner }) => heightinner || '18px !important'}

  }
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border: 1px solid rgba(0, 0, 0, 0.10);
  }

  .ant-checkbox-group{
    flex-wrap: none;
  }

  
`
export default Index
