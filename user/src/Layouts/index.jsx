import React, { useState } from 'react';
import style from './style.module.scss';
import Header from './Header';
import Container from './Container';
import { useSelector } from "react-redux";
import { selectMenu } from '../redux/features/menu';
import { Layout } from '../erp-component'
import { DataProvider } from '../context';


const Index = () => {

    const [collapsed, setCollapsed] = useState(false);
    const { isPayrollPage } = useSelector(selectMenu);
    console.log('isPayrollPage', isPayrollPage);
    return (

        <Layout className={isPayrollPage ? `${style.container} ${style.payrollPage}` : style.container} >
            <DataProvider>
                <Layout>
                    <Header />
                    <Container />
                </Layout>
            </DataProvider>

        </Layout >
    );

};
export default Index;