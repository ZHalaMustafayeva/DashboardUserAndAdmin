import styled from 'styled-components'
import { Form } from 'antd'

const Index = styled(Form.Item).attrs((props) => ({

}))`
margin-top:${({ top }) => top}px !important;
margin-right:${({ right }) => right}px !important;
margin-bottom:${({ bottom }) => bottom}px !important;
margin-left:${({ left }) => left}px !important;

.ant-form-item-label {
}


.ant-form-item-label{
  padding: ${({ formItemLabelPadding }) => formItemLabelPadding && formItemLabelPadding};
  
  label {
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 500 !important;
    font-size: 14px!important;
    width: 100%;
    margin: ${({ labelMargin }) => labelMargin && labelMargin};
    
   
  }
   display:${({ label }) => !label && 'none !important'};
  font-family: 'Montserrat', sans-serif !important;
}

.ant-form-item-required{ 

    color: #505050 !important;
    font-weight: 500 !important;
    font-size: 14px !important;

}


.ant-form-item-explain-error{
  font-size: 14px!important;
}
}
`
export default Index