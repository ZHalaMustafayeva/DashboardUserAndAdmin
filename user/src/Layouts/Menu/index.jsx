import React from "react";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import { HomeOutlined, BarChartOutlined, ReadOutlined, PieChartOutlined, UserOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Icons } from "../../erp-component";
import styled from 'styled-components'
import { Circle, ArrowDown, ArrowUp } from '../../erp-component/Icons'
import { Menu } from '../../erp-component'
import { ConfigProvider } from "antd";
const style = {
    menu: {
        // height: "calc(100vh - 145px)",
        // overflow: "auto",
        // width: '315px'
    },
};

const getItem = (label, key, url, icon, children) => ({ label, key, url, icon, children });
const items = [
    getItem('Ana səhifə', 'finance', `${process.env.REACT_APP_HOME}`, <HomeOutlined />),
    getItem('İdarə paneli', 'dashboard', `${process.env.REACT_APP_DASHBOARD}`, <MenuUnfoldOutlined />),
    getItem('Mühasibat uçotu', 'accounting', null, <BarChartOutlined />, [
        // getItem('Müqavilə və əlavəsi', 'contract-and-appendix', `${process.env.REACT_APP_HOME}/accounting/contract-and-appendix`),
        // getItem('Hesab və Faktura', 'account-and-invoice', `${process.env.REACT_APP_HOME}/accounting/account-and-invoice`),

        // getItem('Hesablar planı', 'chart-of-accounts', `${process.env.REACT_APP_HOME}/accounting/chart-of-accounts`, <Icons size={{ width: '12px', height: '12px', margin: '0px 8px  0px 0px' }} name="circle" />),
        getItem('Hesablar planı', 'chart-of-accounts', `${process.env.REACT_APP_HOME}/accounting/chart-of-accounts`, <Circle fill='#fff' />),
        getItem('Hesablar planı copy', 'chart-of-accounts-copy', `${process.env.REACT_APP_HOME}/accounting/chart-of-accounts-copy`, <Circle fill='#fff' />),
        getItem('Alt Hesablar', 'sub-accounts', `${process.env.REACT_APP_HOME}/accounting/sub-accounts`, <Circle fill='#fff' />),
        getItem('Alt Hesablar Copy', 'sub-accounts-copy', `${process.env.REACT_APP_HOME}/accounting/sub-accounts-copy`, <Circle fill='#fff' />),
        getItem('Hesab Qrupları', 'account-groups', `${process.env.REACT_APP_HOME}/accounting/account-groups`, <Circle fill='#fff' />),
        getItem('Hesab QruplarıCopy', 'account-groups-copy', `${process.env.REACT_APP_HOME}/accounting/account-groups-copy`, <Circle fill='#fff' />),
        getItem('Öhdəlik', 'bill', `${process.env.REACT_APP_HOME}/accounting/bill`, <Circle fill='#fff' />),
        getItem('Öhdəlik redesign', 'bill-redesign', `${process.env.REACT_APP_HOME}/accounting/bill-redesign`, <Circle fill='#fff' />),
        getItem('ÖhdəlikCopy', 'bill-copy', `${process.env.REACT_APP_HOME}/accounting/bill-copy`, <Circle fill='#fff' />),
        getItem('Əməkhaqqı', 'employee-salary', `${process.env.REACT_APP_HOME}/accounting/employee-salary`, <Circle fill='#fff' />),
        getItem('Nomeklatura', 'nomeclature', `${process.env.REACT_APP_HOME}/accounting/nomeclature`, <Circle fill='#fff' />),
        getItem('NomeklaturaCopy', 'nomeclature-copy', `${process.env.REACT_APP_HOME}/accounting/nomeclature-copy`, <Circle fill='#fff' />),
        getItem('TestComponents', 'test_components', `${process.env.REACT_APP_HOME}/accounting/test_components`, <Circle fill='#fff' />),
        getItem('Satış müqaviləsi', 'invoice-contract', `${process.env.REACT_APP_HOME}/accounting/invoice-contract`, <Circle fill='#fff' />),
        getItem('Satış müqaviləsi Copy', 'invoice-contract-copy', `${process.env.REACT_APP_HOME}/accounting/invoice-contract-copy`, <Circle fill='#fff' />),
        getItem('Hesab və Faktura', 'invoice', `${process.env.REACT_APP_HOME}/accounting/invoice`, <Circle fill='#fff' />),
        getItem('Hesab və FakturaCopy', 'invoice-copy', `${process.env.REACT_APP_HOME}/accounting/invoice-copy`, <Circle fill='#fff' />),
        getItem('Müqavilə', 'contracts', `${process.env.REACT_APP_HOME}/accounting/contracts`, <Circle fill='#fff' />),
        getItem('Müqavilə Copy', 'contracts-copy', `${process.env.REACT_APP_HOME}/accounting/contracts-copy`, <Circle fill='#fff' />),
        getItem('Təşkilat', 'organization', `${process.env.REACT_APP_HOME}/accounting/organization`, <Circle fill='#fff' />),
        getItem('Təşkilat Copy', 'organization-copy', `${process.env.REACT_APP_HOME}/accounting/organization-copy`, <Circle fill='#fff' />),
        getItem('Kontragent', 'supplier', `${process.env.REACT_APP_HOME}/accounting/supplier`, <Circle fill='#fff' />),
        getItem('PRF UI', 'prf', `${process.env.REACT_APP_HOME}/accounting/prf`, <Circle fill='#fff' />),
        getItem('PRF UI Copy', 'prf-copy', `${process.env.REACT_APP_HOME}/accounting/prf-copy`, <Circle fill='#fff' />),
        getItem(<a href='http://frontrp.erp-intel.com/prf' target='_blank'>PRF</a>, 'prf blank', `${process.env.REACT_APP_HOME}/accounting/prf`, <Circle fill='#fff' />),
    ]),
    getItem('Əməliiyatlar', 'operations', null, <PieChartOutlined />, [
        getItem('Bank Əməliyyatları', 'banking-transactions', `${process.env.REACT_APP_HOME}/operations/banking-transactions`, <Circle fill='#fff' />),
        getItem('Bank Əməliyyatları redesign', 'banking-transactions-redesign', `${process.env.REACT_APP_HOME}/operations/banking-transactions-redesign`, <Circle fill='#fff' />),
        getItem('Kassa Əməliyyatlar', 'cash-transactions', `${process.env.REACT_APP_HOME}/operations/cash-transactions`, <Circle fill='#fff' />),
        getItem('Hesab Əməliiyatları', 'account-transactions', `${process.env.REACT_APP_HOME}/operations/account-transactions`, <Circle fill='#fff' />),
        getItem('Hesab Əməliiyatları Copy', 'account-transactions-copy', `${process.env.REACT_APP_HOME}/operations/account-transactions-copy`, <Circle fill='#fff' />)
    ]),
    getItem('Qeydiyyat', 'registration', null, <UserOutlined />, [
        getItem('Təşkilat', 'companies', `${process.env.REACT_APP_HOME}/registration/companies`, <Circle fill='#fff' />),
        getItem('Bank Qrupları', 'bank-groups', `${process.env.REACT_APP_HOME}/registration/bank-groups-copy`, <Circle fill='#fff' />),
        getItem('Bank QruplarıCopy', 'bank-groups-copy', `${process.env.REACT_APP_HOME}/registration/bank-groups-copy`, <Circle fill='#fff' />)
    ]),
    getItem('Hesablar jurnalı', 'errer', null, <PieChartOutlined />, [
        getItem('Jurnal', 'banking', `${process.env.REACT_APP_HOME}/journal/banking`, <Circle fill='#fff' />),
        getItem('JurnalCopy', 'banking-copy', `${process.env.REACT_APP_HOME}/journal/banking-copy`, <Circle fill='#fff' />),
        getItem('Sınaq Balansı', 'trial-balance', `${process.env.REACT_APP_HOME}/journal/trial-balance`, <Circle fill='#fff' />),
    ]),
];

const Index = () => {
    const Navigation = useNavigate();
    // const params = useParams()
    // console.clear()
    // console.log(params);
    // console.log(window.location.href.split('/').reverse().slice(0, 3).reverse());

    const onSelect = (event) => {
        const { keyPath } = event;
        const path = keyPath.reverse();
        const { length } = path;
        let url;
        switch (length) {
            case 1: {
                url = items.find((value) => value.key === path[0]).url;
                break;
            }
            case 2: {
                const children = items.find((value) => value.key === path[0]).children;
                url = children.find((value) => value.key === path[1]).url;
                break;
            }
            default:
                url = process.env.REACT_APP_HOME;
        }
        Navigation(url);
    };
    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemMarginInline: 0
                    }
                }
            }}
        >
            <Menu
                // theme='dark'
                expandIcon={(child) => child?.isOpen ? <ArrowUp style={{ width: '20px', height: '20px' }} /> : <ArrowDown style={{ width: '20px', height: '20px' }} />}
                // expandIcon={<ArrowDown style={{ width: '20px', height: '20px' }} />}
                style={style.menu}
                defaultSelectedKeys={["finance"]}
                mode="inline"
                items={items}
                onSelect={onSelect}
            />
        </ConfigProvider>
    );
};
export default Index;
