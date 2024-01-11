import React, { useState } from 'react'
import { Card } from '../../Components'
import { Row, Col, Typography, Space } from 'antd';
import { Link } from "react-router-dom";
import style from './style.module.scss'
const { Title, Text } = Typography
const Index = () => {

    return (
        <Row gutter={16} justify='space-between' align='center' >
            <Col span={12} >
                <Link to="/order/markets">
                    <Space className={style.orderCol}>
                        <Title level={4}>
                            Yeni sifariş
                        </Title>
                    </Space>
                </Link>
            </Col>
            <Col span={12}>
                <Link to="/return/markets">
                    <Space className={style.orderCol}>
                        <Title level={4}>
                            Geri qaytar
                        </Title>
                    </Space>
                </Link>
            </Col>
        </Row>
    )
}

export default Index