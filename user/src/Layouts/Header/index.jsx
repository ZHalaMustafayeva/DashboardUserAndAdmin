import React, { useState, useEffect } from "react";
import style from "./style.module.scss";
import "./style.scss";
import { useLocation, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import {
  LogOutIcon,
  NotificationDot,
} from "../../erp-component/Icons";
import {
  Layout,
  theme,
  Row,
  Col,
  Typography,
  Space,
  Avatar,
  Dropdown,
  Menu,
  Button,
} from "antd";
import {
  UserOutlined,
  DownOutlined,
  EditOutlined,
  SettingOutlined,
  SaveOutlined,
  ShoppingTWoTone
} from "@ant-design/icons";
import { RiShoppingBasket2Fill } from 'react-icons/ri';
import { useData } from '../../context/index';

const { Header } = Layout;
const { Title, Text } = Typography;

const ErpHeader = styled(Header).attrs({})`
    margin: 24px;
    border-radius: 8px;
    border: 1px solid #0000001a;
    padding: 0 20px !important;
    line-height: 0;
  `;

const ErpAvatar = styled(Avatar).attrs({})`
    // margin-right: 7px;
  `;

const ErpTitle = styled(Title).attrs({})`
    font-family: Montserrat;
    font-style: normal;
    line-height: 175% !important;
    margin-bottom: 0 !important;
    margin-right: 8px;
  `;

const ErpDropdown = styled(Dropdown).attrs({})``;

const ErpMenu2 = styled(Menu).attrs({})`
    width: 200px !important;
    // height: 380px !important;
    .ant-dropdown-menu-item:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
      border-radius: 0 !important;
      background: #fff !important;
      padding: 10px 80px 10px 24px !important;
    }
    .ant-dropdown-menu-item {
      border-radius: 0 !important;
      background: #ffff !important;
      padding: 10px 80px 10px 24px !important;
      &:hover {
        background: #f7f4f4 !important;
      }
    }
    .ant-dropdown-menu-item:last-child {
      border-bottom-right-radius: 8px !important;
      border-bottom-left-radius: 8px !important;
      background: #fff !important;
      &:hover {
        background: #f7f4f4 !important;
      }
    }
    .ant-dropdown-menu-item:first-child {
      border-top-right-radius: 8px !important;
      border-top-left-radius: 8px !important;
      background: #fff !important;
      &:hover {
        background: #f7f4f4 !important;
      }
    }
  `;


const Index = () => {
  const [accordion, setAccordion] = useState([]);
  const location = useLocation();
  const { editBtn, setEditBtn } = useData();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  
  const LogOut = ()=>{
    localStorage.removeItem("access_token");
    navigate("/login")
  }

  const firstDropdownData = [
    {
      key: "3",
      icon: <LogOutIcon />,
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={LogOut}
        // href="https://www.luohanacademy.com"
        >
          Log Out
        </a>
      ),
    },
  ];
  const BasketDropdownData = [
    {
      key: "3",
      // icon: <RiShoppingBasket2Fill />,
      label: (
        <Row>
          <Col style={{ padding: "5px 10px" }}>
            <Link to="order/basket" style={{ color: "#333" }}>
              <RiShoppingBasket2Fill /> Sifariş edilənlərin siyahısı
            </Link>
          </Col>
          <Col style={{ padding: "5px 10px" }}>
            <Link to="return/basket" style={{ color: "#333" }}>
              <RiShoppingBasket2Fill /> Geri qaytarılanların siyahısı
            </Link>
          </Col>
        </Row>
      ),
    },
  ];

  const FirstDropdown = ({ data }) => {
    const firstMenu = (
      <ErpMenu2 style={{ maxWidth: "200px", minWidth: '100px', marginLeft: "60px" }}>
        {data.map((item) => (
          <Menu.Item
            style={{
              color: " #505050",
              fontFamily: "Montserrat",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "500"
            }}
            key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}
      </ErpMenu2>
    );

    return (
      <ErpDropdown
        placement="bottomRight" overlay={firstMenu}>
        <Space className={style.admin}>
          <ErpAvatar src="https://picsum.photos/200/300" />
          <ErpTitle level={5}>{JSON.parse(localStorage.getItem("access_token"))?.full_name}</ErpTitle>
          <DownOutlined />
        </Space>
      </ErpDropdown>
    );
  };
  const BasketDropdown = ({ data }) => {
    const firstMenu = (
      <ErpMenu2 open style={{ maxWidth: "400px", minWidth: '350px', marginLeft: "60px" }} >
        {data.map((item) => (
          <Menu.Item
            style={{
              color: " #505050",
              fontFamily: "Montserrat",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "500"
            }}
            key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}
      </ErpMenu2>
    );

    return (
      <ErpDropdown overlay={firstMenu} >
        <RiShoppingBasket2Fill size='24px' style={{ cursor: 'pointer' }} />
      </ErpDropdown >
    );
  };


  const GoBasket = () => {
    console.log(location.pathname.split('/')[1]);
    if (location.pathname.split('/')[1] === 'order') {
      navigate('order/basket')

    } else {
      navigate('return/basket')

    }
  }
  const ChangeToSave = () => {
    setEditBtn(!editBtn)
  }
  useEffect(() => {
    console.log(editBtn);
  }, [editBtn])

  useEffect(() => {
    let acc = location.pathname
      .split("/")
      .map((v) => ({ title: v.charAt(0).toUpperCase() + v.slice(1) })).length === 6 ? location.pathname
        .split("/")
        .map((v) => ({ title: v.charAt(0).toUpperCase() + v.slice(1) })).slice(0, -1) : location.pathname
          .split("/")
          .map((v) => ({ title: v.charAt(0).toUpperCase() + v.slice(1) }))
    setAccordion([...acc]);
  }, [location]);
  return (
    <ErpHeader
      style={{ padding: 0, background: colorBgContainer }}
      className="erpHeader"
    >
      <Row justify="space-between" align="middle" style={{ height: "100%" }}>
        <Col span={12} flex="none">
          <FirstDropdown data={firstDropdownData} />
        </Col>
        <Col span={5} flex="none">
          {/* {location?.pathname === '/order/basket' ?

            (editBtn ? < EditOutlined style={{ cursor: 'pointer', fontSize: '24px' }} onClick={ChangeToSave} /> :
              <SaveOutlined style={{ cursor: 'pointer', fontSize: '24px' }} onClick={ChangeToSave} />) :
            <RiShoppingBasket2Fill size='24px' onClick={GoBasket} style={{ cursor: 'pointer' }} />
          } */}

          <BasketDropdown data={BasketDropdownData} />
        </Col>
      </Row>
    </ErpHeader>
  );
};

export default Index;
