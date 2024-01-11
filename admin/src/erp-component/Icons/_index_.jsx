/* 

bu fayili isletmeyin

*/

import React from 'react'
import BillIcon from './svg/bill.svg';
import LogOutIcon from './svg/log-out.svg'
import Circle from "./svg/circle.svg"
import Calendar from "./svg/calendar.svg"
import ControlPanel from "./svg/control-panel.svg"
import Accounting from "./svg/accounting.svg"
import Registr from "./svg/registr.svg"
import NotificationDot from "./svg/notification-dot.svg";
import ClearFilterIcon from './svg/clear-filter-icon.svg'
import { TbPhotoOff, TbCertificate } from "react-icons/tb";

const index = (props) => {
  const { name, color = "transparent", size = "30px", iconColor = "black" } = props;
  switch (name) {
    // case "ImUsers": return <ImUsers color={color} size={size} />;
    case "bill": return <img src={BillIcon} style={{ backgroundColor: color, width: size.width, height: size.height }} alt="" />;
    case "log-out": return <img src={LogOutIcon} style={{ backgroundColor: color, width: size.width, height: size.height }} alt="" />;
    case "circle": return <img src={Circle} style={{ width: size.width, height: size.height, margin: size.margin }} alt="" />;
    // case "circle": return <div style={{ backgroundImage: `url(${Circle})`, backgroundSize: 'cover', width: size.width, height: size.height, margin: size.margin }}></div>;
    case "control-panel": return <img src={ControlPanel} style={{ backgroundColor: color, width: size.width, height: size.height, margin: size.margin }} alt="" />;
    case "accounting": return <img src={Accounting} style={{ backgroundColor: color, width: size.width, height: size.height, margin: size.margin }} alt="" />;
    // case "calendar": return <img src={Calendar} style={{ color: iconColor, backgroundColor: color, width: size.width, height: size.height }} alt="" />;
    case "registr": return <img src={Registr} style={{ backgroundColor: color, width: size.width, height: size.height, margin: size.margin }} alt="" />;
    case "clear-filter": return <img src={ClearFilterIcon} style={{ backgroundColor: color, width: size.width, height: size.height, margin: size.margin }} alt="" />;
    case "notification-dot":
      return (
        <img
          src={NotificationDot}
          style={{
            backgroundColor: color,
            width: size.width,
            height: size.height,
          }}
          alt=""
        />
      );
    default:
      return <TbPhotoOff color={"red"} size={size} />;
  }
};
export default index;
