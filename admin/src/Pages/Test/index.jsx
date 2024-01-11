import React, { useEffect, useState, useRef } from 'react';
import { Tabs, ConfigProvider, Button, Form, Row, Col, Input } from 'antd';
import API from '../../API'

const Index = () => {

    const tabItems = [
        {
            key: 'income',
            label: 'Mədaxil',
            children: <>
                <Row style={{ paddingLeft: '1.5rem' }}>
                    <Col span={24} style={{ marginBottom: '1rem' }}>
                        <Form.Item rules={[{ required: true, message: 'Seçim edin' }]} label='hey' name='income-input'>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </>
        },
        {
            key: 'expense',
            label: 'Məxaric',
            children: <>
                <Row style={{ paddingLeft: '1.5rem' }}>
                    <Col span={24} style={{ marginBottom: '1rem' }}>
                        <Form.Item rules={[{ required: true, message: 'Seçim edin' }]} label='hey' name='expense-input'>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row >
            </>
        }
    ]

    const onFinish = (values) => {
        console.log('values-', values);
    }


    const onFinishFailed = (errors) => {
        console.log("errors", errors);
    }

    return (
        <ConfigProvider
        // theme={{
        //     token: {
        //         colorBgContainer: "red"
        //     },
        //     components: {
        //         Button: {
        //             colorBgContainer: "blue",
        //             colorBgTextHover: "pink"
        //         }
        //     }
        // }}
        >
            <Button>Click me</Button>
            <Row>
                <Col span={24}>
                    <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Tabs defaultActiveKey={'1'} items={tabItems} type='card' marginLeft="1.5rem" />
                        <Form.Item>
                            <Button htmlType='submit'>click me</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </ConfigProvider>
    )

};
export default Index;