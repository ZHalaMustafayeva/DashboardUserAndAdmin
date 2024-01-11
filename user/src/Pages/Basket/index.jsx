import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Typography, Space, Form, Modal } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { Search } from '../../erp-component';
import { LeftOutlined, DeleteOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { Image } from 'antd';
import { Collapse, Input, Button } from '../../erp-component'
import { useData } from '../../context/index';
import API from '../../API';
import marketIcon from './862819.png'
const { Text, Title } = Typography;
const { Panel } = Collapse;
const { confirm } = Modal;

const Index = () => {
    const { editBtn } = useData();
    const [store, setStore] = useState([])
    const [product, setProduct] = useState([])
    const navigate = useNavigate();
    const orderIdRef = useRef();

    const CustomHeader = ({ imageSrc, title }) => (
        <div className="custom-collapse-header">
            <Image
                width={50}
                src={marketIcon} alt="Header Image" />
            <span
                style={{ marginLeft: '16px' }}

            >{title}</span>
        </div>
    );

    const GetAllBasketData = () => {
        API.Order.list({ inserted_user_id: JSON.parse(localStorage.getItem('access_token'))?.id, pag: 1, status: 1, type: 1 }).then(res => {
            const { data } = res.data;
            setStore([...data?.[1]])
        })
    }

    const GetProductForOrder = (order_id, index) => {
        orderIdRef.current = order_id;
        API.OrderItem.list({ order_id }).then(res => {
            const { data } = res.data;
            product[index] = data?.[1];
            let temp = [...product]
            setProduct(temp)
        })
    }
    const DeleteProduct = (id, index) => {
        API.Order.delete({ id }).then(res => {
            if (res.status === 200) showConfirm_2()
        })
    }
    const onFinish = (value) => {
        value.data = value?.data?.filter(val => val)
        value.data[0].order_id = orderIdRef.current
        API.Order.update(value?.data?.[0]).then(res => {
            if (res.status === 200) showConfirm()
        })
    }

    const ChangeStatus = (e, id) => {
        e.stopPropagation();
        API.Order.update({
            "order_id": id,
            "order_status": 2
        }).then(res => {
            if (res.status === 200) {
                GetAllBasketData()
            }
        })
    }

    const showConfirm = () => {
        confirm({
            title: 'Sifarişiniz yeniləndi.',
            icon: <CheckCircleTwoTone />,
            content: "Digər sifarişlərdə dəyişiklik etmək istəyirsiniz?",
            onOk() {
                GetAllBasketData()
            },
            okText: "Bəli",
            cancelText: "Xeyr",
            onCancel() {
                navigate('/order/')
            }

        });
    };

    const showConfirm_2 = () => {
        confirm({
            title: 'Informasiya uğurla silindi.',
            icon: <CheckCircleTwoTone />,
            footer: false,
            closable: true,
            afterClose() {
                GetAllBasketData();
            }
        });
    };

    const ApproveConfirm = (e, id) => {
        confirm({
            title: 'Təsdiq etməyə əminsinizmi?',
            icon: <CheckCircleTwoTone />,
            onOk() {
                ChangeStatus(e, id)
            },
            onCancel() { },
            okText: "Bəli",
            cancelText: "Xeyr",
            closable: true,
            afterClose() {
                GetAllBasketData();
            }
        });
    }
    useEffect(() => {
        GetAllBasketData()
    }, [])

    return (
        <>
            <Row style={{ marginBottom: 16 }}>
                <Space>
                    <LeftOutlined style={{ color: '#23A4DD' }} />
                    <Link to='/order/markets'>Geri dön</Link>/
                    <Text>Səbət</Text >
                </Space>
            </Row>
            <Row>
                <Col span={24}>
                    <Search width="100%" placeholder='Axtarış edin' />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    {store?.length ?
                        <Title level={3}>Sifarişlərin siyahısı</Title>
                        :
                        <Title level={3}>Gözləmədə olan sifarişiniz yoxdur</Title>
                    }
                </Col>
            </Row>
            <Form disabled={editBtn} onFinish={onFinish}>
                {
                    store?.map((value, index) => (
                        <Row gutter={24} align='center' justify='start'>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Collapse accordion >
                                    <Panel style={{ border: '1px solid #b4abab', marginBottom: 16 }} header={<CustomHeader imageSrc="your-image-url.jpg" title={value?.shop_name} />} key="1">
                                        <Collapse onChange={() => GetProductForOrder(value?.id, index)} >
                                            <Panel style={{ background: '#a6a5a54a' }} header={<>
                                                <Row justify='space-between' align="middle" className="fixed-submit-buttons">
                                                    <Col>{value?.company_name}</Col>
                                                    <Col>
                                                        <Row gutter={16}>
                                                            <Col>
                                                                <Button
                                                                    btnwidth="max-content"
                                                                    btnheight="36px"
                                                                    fontsize="14px"
                                                                    bgcolorhover="#23A4DD"
                                                                    fontsizehover="14px !important"
                                                                    colorhover="#fff !important"
                                                                    htmlType='submit'>Yadda saxla</Button>
                                                            </Col>
                                                            <Col>
                                                                <Button
                                                                    btnwidth="max-content"
                                                                    btnheight="36px"
                                                                    fontsize="14px"
                                                                    bgcolor="#6BCB77"
                                                                    fontsizehover="14px !important"
                                                                    bgcolorhover="#6BCB77 !important"
                                                                    colorhover="#fff !important"
                                                                    // icon={<CheckCircleTwoTone />}
                                                                    onClick={(e) => ApproveConfirm(e, value?.id, index)}
                                                                >Təsdiq et</Button>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </>} key="2">
                                                <Row gutter={[16, 16]}>
                                                    {product?.[index]?.map((val, ind) => (
                                                        <Col span={24} >
                                                            <Row justify='space-between' align='middle'>
                                                                <Col span={8} flex='none'>{val?.product_name}</Col>
                                                                <Col span={8} flex='none'>
                                                                    <Form.Item name={["data", index, 'order_items', ind, "amount"]} initialValue={val?.amount} style={{ marginBottom: 0 }}>
                                                                        <Input placeholder='Daxil edin' type='number' width='100%' />
                                                                    </Form.Item>
                                                                    <Form.Item hidden name={["data", index, 'order_items', ind, "product_id"]} initialValue={val?.product_id} >
                                                                        <Input />
                                                                    </Form.Item>
                                                                    <Form.Item hidden name={["data", index, 'order_items', ind, "price"]} initialValue={val?.price}>
                                                                        <Input />
                                                                    </Form.Item>
                                                                    <Form.Item hidden name={["data", index, 'order_items', ind, "discount"]} initialValue={val?.discount}>
                                                                        <Input />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={4} flex='none'><DeleteOutlined onClick={() => DeleteProduct(val?.id, index)} /></Col>
                                                            </Row>
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </Panel>
                                        </Collapse>
                                    </Panel>
                                </Collapse>
                            </Col>
                        </Row >
                    ))
                }
                {/* <Row justify='end' style={{
                    marginTop: 24,
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    height: 70,
                    background: '#fff',
                    boxShadow: '0px 0px 2px 1px #a8a0a0',
                    width: '100%',
                    paddingRight: 24
                }} align="end" className="fixed-submit-buttons">
                    <Col>
                        <Button htmlType='submit'>Göndər</Button>
                    </Col>
                </Row> */}
            </Form >

        </>
    )
}

export default Index