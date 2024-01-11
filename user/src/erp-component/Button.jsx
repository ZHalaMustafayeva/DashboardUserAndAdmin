import styled from "styled-components";
import { Button } from "antd";

const Index = styled(Button).attrs({})`
  :where(.css-dev-only-do-not-override-182n8ep).ant-btn-default {
    // background-color:transparent !important;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ shadow }) => shadow || "0px 0px 0px 0px rgba(0, 0, 0, 0)"};
  background-color: ${({ bgcolor }) => bgcolor || "#23A4DD"};
  color: ${({ color }) => color || "white"};
  width: ${({ btnwidth }) => btnwidth || "176px"};
  height: ${({ btnheight }) => btnheight || "48px"};
  border-radius: ${({ radius }) => radius || "6px"};
  padding: ${({ padding }) => padding || "10px 24px 10px 24px"};
  border: ${({ border }) => border || "none"};
  border-color: ${({ bordercolor }) => bordercolor || "none"};
  font-weight: ${({ fontweight }) => fontweight || "600"};
  margin: ${({ margin }) => margin || " none"};
  font-size: ${({ fontsize }) => fontsize || "16px"};
  &:hover {
    background-color: ${({ bgcolorhover }) => bgcolorhover || "transparent"};
    box-shadow: ${({ bgcolorshadow }) => bgcolorshadow || "transparent"};
    border: ${({ borderhover }) => borderhover || "none"};
    color: ${({ colorhover }) => colorhover || "blue"};
    font-size: ${({ fontsizehover }) => fontsizehover || "16px"};
    span, img {
      transform:  ${({ tranformhover }) =>
    tranformhover || "scale(1)"}; !important;
        transition: transform 0.5s;
    }
  }
  ${({ type }) => type === 'primary' ? {
    // "color": "#4bc0eb",
    // "background-color": "#fff",
    // "outline": "1px",
    "&": "hover { background-color: #23A4DD !important; color: #4bc0eb }"
  } : {

  }}
  ${({ type }) => type === 'secondary' ? {
    "color": "#4bc0eb",
    "background-color": "#fff",
    "outline": "1px",
    "&": "hover { background-color: rgba(35, 164, 221, 0.05) !important; color: #4bc0eb }"
  } : {

  }}
  ${({ type }) => type === 'outlined' ? {
    "color": "#23A4DD",
    "background-color": "#fff !important",
    "outline": "1px",
    "border": "2px solid #23A4DD",
    "&": "hover { background-color: rgba(35, 164, 221, 0.05) !important; color: #4bc0eb; border: 2px solid #23A4DD; }"
  } : {

  }}
`;
export default Index;
