import React, { useState } from 'react';
import style from './style.module.scss';
import {
    GlobalOutlined, SettingOutlined, PoweroffOutlined
} from '@ant-design/icons';
import { Button, theme } from 'antd';
import Header from './Header';
import Menu from './Menu';
import Container from './Container';
import { useSelector } from "react-redux";
import { selectMenu } from '../redux/features/menu';
import { Layout } from '../erp-component'
import { DataProvider } from '../context';
const { Sider } = Layout;


const Index = () => {

    const [collapsed, setCollapsed] = useState(false);
    const { isPayrollPage } = useSelector(selectMenu);
    return (

        <Layout className={isPayrollPage ? `${style.container} ${style.payrollPage}` : style.container} >
            <DataProvider>
                <Sider
                    style={{ background: '#fff', paddingTop: 24 }}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                >
                    <Menu />

                </Sider>
                <Layout>
                    <Header />
                    <Container />
                </Layout>
            </DataProvider>

        </Layout >
    );

};
export default Index;