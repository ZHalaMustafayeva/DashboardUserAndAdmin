import React from 'react';
import { memo } from 'react'
import { Card, Typography } from 'antd';
import styled from "styled-components";
import { LeftOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Text } = Typography
const Index = styled(Card).attrs({
})`
max-width:100%;
min-with:150px;
width:100% !important;
margin:16px 0 16px 0;
display:flex;
padding:16px;
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
`

export default memo(({ src, alt, title, icon }) => (
    <Index
        hoverable
        // cover={<img alt={alt} src={src} />}
        cover={!icon && <ShoppingCartOutlined style={{ fontSize: 24 }} />}
    >

        {icon && <Text >{alt}</Text>}
        <Meta title={title} style={{ marginTop: !icon ? 10 : 0 }} />
    </Index>
))
