import React, { useEffect, useState } from 'react'
import { Card } from '../../Components'
import { Row, Col, Typography, Space } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { Search } from '../../erp-component';
import { LeftOutlined } from '@ant-design/icons';
import API from '../../API';

const { Text } = Typography;
const Index = () => {
    const [store, setStore] = useState([]);
    const location = useLocation()
    const currentUrl = window.location.pathname;
    const urlParts = currentUrl.split('/');

    const branchIndex = urlParts.indexOf('branch');
    const companyIndex = urlParts.indexOf('company');
    const plateNumberIndex = urlParts.indexOf('plate-number');

    const branchId = urlParts[branchIndex + 1];
    const companyId = urlParts[companyIndex + 1];
    const plateNumberId = urlParts[plateNumberIndex + 1];
    console.log(plateNumberId);
    const GetCompanyList = () => {
        API.PlateNumber.list().then(res => {
            const { data } = res.data
            console.log(data)
            setStore([...data[1]])
        })
    }

    useEffect(() => {
        GetCompanyList()
    }, [branchId])

    return (
        <>
            <Row style={{ marginBottom: 16 }}>
                <Space>
                    <LeftOutlined style={{ color: '#23A4DD' }} />
                    <Link to={location?.pathname?.split('/')?.[1] === 'order' ? `/order/markets/branch/${branchId}/company/${companyId}` : `/return/markets/branch/${branchId}/company/${companyId}`}>Geri dön</Link>/
                    <Text>Firma adı</Text >
                </Space>
            </Row>
            <Row>
                <Col span={24}>
                    <Search width="100%" placeholder='Axtarış edin' />
                </Col>
            </Row>
            <Row gutter={24} align='center'>
                {store?.map((value, index) => (
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                        <Link to={location?.pathname?.split('/')?.[1] === 'order' ?
                            `/order/markets/branch/${branchId}/company/${companyId}/plate-number/${plateNumberId}/product/${value.id}` :
                            `/return/markets/branch/${branchId}/company/${companyId}/plate-number/${plateNumberId}/product/${value.id}`
                        }>
                            <Card
                                key={index}
                                alt={value?.driver_info}
                                src={null}
                                title={value?.number_plate}
                                icon={true}
                            />
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Index