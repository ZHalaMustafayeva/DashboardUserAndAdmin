import styled from "styled-components";
import { Input } from "antd";
const { Search } = Input;
const Index = styled(Search).attrs(({ height }) => ({
  // Define the default border color using props, you can adjust it to your preference
  // borderColorOnFocus: props.borderColorOnFocus || "#23A4DD",
  // borderColor: props.borderColor || "#0000001A",
  // width: props.width || "268px",
  // height: props.height || "44px",
}))`
  margin-bottom:16px;
  input:focus {
    border:  ;
    border:   ${({ focusBorder }) =>
    focusBorder || "1.5px solid #23A4DD !important"};
  }
  .ant-input-wrapper {
    width:${({ width }) => width || "268px !important;"};
    height: ${({ height }) => height || "44px !important;"};
    .ant-input {
      width:  100% !important;
      height: 100% !important;
      border-radius:  ${({ borderRadius }) => borderRadius || "6px 0px 0px 6px"};
      border-top:   ${({ borderTop }) => borderTop || "1px solid rgba(0, 0, 0, 0.1)"};
      border-bottom:  ${({ borderBottom }) => borderBottom || "1px solid rgba(0, 0, 0, 0.1)"};
      border-left: ${({ borderLeft }) => borderLeft || "1px solid rgba(0, 0, 0, 0.1)"};
      background:  ${({ bgColor }) => bgColor || "#fff"};
      &::placeholder {
        color: ${({ color }) => color || "#fff"};
        font-family: Montserrat;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 175%;
      }
    }
  }
  .ant-btn {
    width: 44px !important;
    height: 44px !important;
    background: #23a4dd !important;
    color: #fff;
  }
  .anticon {
    color: #fff;
    fonst-size: 16px;
  }
`;
export default Index;
