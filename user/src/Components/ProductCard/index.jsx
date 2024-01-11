import React from 'react';
import { memo } from 'react'
import { Card, Button, Row, Col, Typography, Input } from 'antd';
import styled from "styled-components";
import Form from 'antd/es/form/Form';

const { Meta } = Card;
const { Text, Title } = Typography
const Index = styled(Card).attrs({
})`
max-width:100%;
min-with:150px;
width:100% !important;
margin-bottom:16px;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
img{
    max-width:187px !important;
    width: 100% !important;
    max-height:187px !important;
    height: 100%;
    object-fit: contain;
    padding:10px
}
.ant-card-body{
    text-align:center
}
.ant-card-actions{
    padding:10px;
}
`

export default memo(({ imageSrc, salePercentage, productName, price, measure,dicounted_price, index }) => (
    <Index
        cover={<>
            <div
                style={{
                    position: 'absolute',
                    width:'80px',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(255, 0, 0, 0.7)',
                    color: 'white',
                    padding: '5px',
                    borderRadius: '5px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                }}
            >
                {salePercentage}% off
            </div>
        </>}
        actions={[
            <Row justify='space-between' align='middle' gutter={16}>
                <Col span={12}>
                    <Form.Item name={["order_items", index, "amount"]} style={{ marginBottom: 0 }}>
                        <Input placeholder='Daxil edin' />
                    </Form.Item>
                </Col>
                <Col span={12} flex='none'>
                    <Title span={5} style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: 0 }}>{measure}</Title>
                    {/* <Button type="primary" htmlType="submit" style={{ marginLeft: 'auto' }}>Add to Cart</Button> */}
                </Col>
            </Row>
        ]}
    >
        <Row style={{ marginBottom: '10px' }} justify='center'>
            <Title span={5} style={{ fontSize: '16px', fontWeight: 'bold' }}>{productName}</Title>
        </Row>
        <Row justify='center'>
            <Col style={{ fontSize: '20px', fontWeight: 'bold', color: 'green' }}>${price}</Col>
            <Col style={{ marginLeft: '5px', textDecoration: 'line-through', color: 'gray' }}>
                {/* ${(price / (1 - Number(salePercentage) / 100)).toFixed(1)} */}
                {dicounted_price}
            </Col>
        </Row>

    </Index>
))
