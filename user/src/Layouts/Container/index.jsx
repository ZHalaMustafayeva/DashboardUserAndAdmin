import React, { useState, useEffect } from "react";
import style from "./style.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import { Layout, theme } from "antd";
import { DataProvider } from '../../context';
const { Content } = Layout;
const Index = () => {
  // const [accordion, setAccordion] = useState([])
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();

  // useEffect(() => {
  //   setAccordion(location.pathname.split('/').map(v => ({ title: v })))
  // }, [location])

  return (
    <Content className={style.container}>
      {/* <Breadcrumb style={{ margin: '16px 0' }} items={accordion} /> */}

      <div
        className={`${style.content} contentContainer`}
      >
        {/* <DataProvider> */}
          <Outlet />
        {/* </DataProvider> */}
      </div>
    </Content>
  );
};
export default Index;
