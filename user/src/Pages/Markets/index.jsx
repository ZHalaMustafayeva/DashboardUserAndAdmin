import React, { useEffect, useState } from 'react'
import { Card } from '../../Components'
import { Row, Col, Space, } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { Search } from '../../erp-component';
import { LeftOutlined } from '@ant-design/icons';
import API from '../../API'
const Index = () => {
    const [store, setStore] = useState([])
    const location = useLocation()
    const GetMarketsList = () => {
        API.ProductShop.list({ pag: 1, only_parent: 'only_parent' }).then(res => {
            const { data } = res.data;
            setStore([...data[1]])
        })
    }

    const SearchMarkets = (e) => {
        API.ProductShop.list({ pag: 1, name: e.target.value }).then(res => {
            const { data } = res.data;
            setStore([...data[1]])
        })
    }

    useEffect(() => {
        GetMarketsList()
    }, [])
    return (
        <>
            <Row style={{ marginBottom: 16 }}>
                <Space>
                    <LeftOutlined style={{ color: '#23A4DD' }} />
                    <Link to={location?.pathname?.split('/')?.[1] === 'order' ? '/order' : '/return'}>Geri dön</Link>
                </Space>
            </Row>
            <Row>
                <Col span={24}>
                    <Search onChange={SearchMarkets} width="100%" placeholder='Axtarış edin' />
                </Col>
            </Row>
            <Row gutter={24} align='center'>
                {store?.map((value, index) => (
                    <Col xs={12} sm={12} md={4} lg={4} xl={4} key={index}>
                        <Link to={location?.pathname?.split('/')?.[1] === 'order' ? `/order/markets/branch/${value?.id}` : `/return/markets/branch/${value?.id}`} >
                            <Card
                                alt={value?.alt}
                                src={value?.img}
                                title={value?.name}
                            />
                        </Link>
                    </Col>
                ))}
            </Row >
        </>
    )
}

export default Index