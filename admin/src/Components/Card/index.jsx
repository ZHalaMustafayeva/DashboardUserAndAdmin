import React from 'react';
import { memo } from 'react'
import { Card } from 'antd';
import styled from "styled-components";

const { Meta } = Card;

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
`

export default memo(({ src, alt, title }) => (
    <Index
        hoverable
        cover={<img alt={alt} src={src} />}
    >
        <Meta title={title} />
    </Index>
))
