import React, { useEffect, useState } from 'react'
import { Card } from '../../Components'
import { Row, Col, Typography, Space } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { Search } from '../../erp-component';
import { LeftOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import API from '../../API'
const { Title, Text } = Typography;
const Index = () => {
    let { id } = useParams();
    const [store, setStore] = useState([])
    const location = useLocation();
    const GetBranchList = () => {
        API.ProductShop.list({ pag: 1, parent_id: id }).then(res => {
            const { data } = res.data;
            setStore([...data[1]])
        })
    }

    const SearchBranchs = (e) => {
        API.ProductShop.list({ pag: 1, name: e.target.value, parent_id: id }).then(res => {
            const { data } = res.data;
            setStore([...data[1]])
        })
    }
    useEffect(() => {
        GetBranchList();
    }, [id])
    return (
        <>
            <Row style={{ marginBottom: 16 }}>
                <Space>
                    <LeftOutlined style={{ color: '#23A4DD' }} />
                    <Link to={location?.pathname?.split('/')?.[1] === 'order' ? '/order/markets/' : '/return/markets/'}>Geri dön</Link>/
                    <Text>Filial adı</Text >
                </Space>
            </Row>
            <Row>
                <Col span={24}>
                    <Search onChange={SearchBranchs} width="100%" placeholder='Axtarış edin' />
                </Col>
            </Row>
            <Row gutter={24} align='center'>
                {store?.map((value, index) => (
                    <Col xs={12} sm={12} md={4} lg={4} xl={4} key={index}   >
                        <Link to={location?.pathname?.split('/')?.[1] === 'order' ? `/order/markets/branch/${id}/company/${value?.id}` : `/return/markets/branch/${id}/company/${value?.id}`}>
                            <Card
                                alt={value?.alt}
                                src={value?.logo}
                                title={value?.name}
                            />
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Index