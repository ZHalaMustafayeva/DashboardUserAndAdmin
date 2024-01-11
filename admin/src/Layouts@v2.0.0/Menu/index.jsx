import React from 'react';
import './style.scss';
import { useNavigate } from "react-router-dom";
import { Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined, ReadOutlined, PieChartOutlined, SolutionOutlined } from '@ant-design/icons';

const getItem = (label, key, url, icon, children) => ({ label, key, url, icon, children });
const items = [
   getItem('Ana səhifə', 'finance', `${process.env.REACT_APP_HOME}`, <HomeOutlined />),
   getItem('İdarə paneli', 'dashboard', `${process.env.REACT_APP_DASHBOARD}`, <AppstoreOutlined />),
   getItem('Mühasibat uçotu', 'accounting', null, <ReadOutlined />, [
      getItem('Müqavilə və əlavəsi', 'contract-and-appendix', `${process.env.REACT_APP_HOME}/accounting/contract-and-appendix`),
      getItem('Hesab və Faktura', 'account-and-invoice', `${process.env.REACT_APP_HOME}/accounting/account-and-invoice`),
      getItem('Hesablar planı', 'chart-of-accounts', `${process.env.REACT_APP_HOME}/accounting/chart-of-accounts`),
      getItem('Alt Hesablar', 'sub-accounts', `${process.env.REACT_APP_HOME}/accounting/sub-accounts`),
      getItem('Hesab Qrupları', 'account-groups', `${process.env.REACT_APP_HOME}/accounting/account-groups`),
      getItem('Öhdəlik', 'bill', `${process.env.REACT_APP_HOME}/accounting/bill`),
      getItem('Öhdəlik2', 'bill_2', `${process.env.REACT_APP_HOME}/accounting/bill_2`),
      getItem('Əməkhaqqı', 'employee-salary', `${process.env.REACT_APP_HOME}/accounting/employee-salary`),
      getItem('Nomeklatura', 'nomeclature', `${process.env.REACT_APP_HOME}/accounting/nomeclature`),
      getItem('Faktura müqaviləsi', 'invoice-contract', `${process.env.REACT_APP_HOME}/accounting/invoice-contract`),
      getItem('Faktura', 'invoice', `${process.env.REACT_APP_HOME}/accounting/invoice`),
      getItem('Müqavilə', 'contracts', `${process.env.REACT_APP_HOME}/accounting/contracts`),
      getItem('Təşkilat', 'organization', `${process.env.REACT_APP_HOME}/accounting/organization`),
   ]),
   getItem('Əməliyyatlar', 'operations', null, <PieChartOutlined />, [
      getItem('Bank Əməliyyatları', 'banking-transactions', `${process.env.REACT_APP_HOME}/operations/banking-transactions`),
      getItem('Kassa Əməliyyatlar', 'cash-transactions', `${process.env.REACT_APP_HOME}/operations/cash-transactions`),
      getItem('Hesab Əməliiyatları', 'account-transactions', `${process.env.REACT_APP_HOME}/operations/account-transactions`)
   ]),
   getItem('Qeydiyyat', 'registration', null, <SolutionOutlined />, [
      getItem('Təşkilat', 'companies', `${process.env.REACT_APP_HOME}/registration/companies`),
      getItem('Bank Qrupları', 'bank-groups', `${process.env.REACT_APP_HOME}/registration/bank-groups`)
   ])
];

const Index = ({ theme }) => {
   const Navigation = useNavigate();
   const onSelect = (event) => {
      const { keyPath } = event;
      const path = keyPath.reverse();
      const { length } = path;
      let url;
      switch (length) {
         case 1: {
            url = items.find(value => value.key === path[0]).url;
            break;
         }
         case 2: {
            const children = items.find(value => value.key === path[0]).children;
            url = children.find(value => value.key === path[1]).url;
            break;
         }
         default: url = process.env.REACT_APP_HOME;
      }
      Navigation(url);
   }
   return (
      <Menu
         theme={theme}
         className='c-menu'
         defaultSelectedKeys={['order']}
         mode='vertical'
         items={items}
         onSelect={onSelect}
      />
   )
}
export default Index;