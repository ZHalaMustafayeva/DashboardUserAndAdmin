import React, { useEffect, useState, useRef } from 'react'
import { ProductCard } from '../../Components'
import {
    Row, Col, Typography,
    Space, Form, Input,
    Modal
} from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Button } from '../../erp-component';
import API from '../../API'
import { LeftOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const { Title, Text } = Typography;
const { confirm } = Modal;
const Index = () => {
    const [store, setStore] = useState([])
    const [discount, setDiscount] = useState([])
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location?.pathname?.split('/')?.[1]);
    const currentUrl = window.location.pathname;
    const urlParts = currentUrl.split('/');

    const branchIndex = urlParts.indexOf('branch');
    const companyIndex = urlParts.indexOf('company');
    const plateIndex = urlParts.indexOf('plate-number');
    const productIndex = urlParts.indexOf('product')

    const branchId = urlParts[branchIndex + 1];
    const companyId = urlParts[companyIndex + 1];
    const productId = urlParts[productIndex + 1];
    const plateId = urlParts[plateIndex + 1];

    let { id } = useParams();

    const GetProductList = () => {
        // console.log('dfsd 2324')
        API.Products.list({ pag: 1, company_id: plateId, shop_id: getBranchIdFromUrl() }).then(res => {
            const { data } = res.data
            setStore([...data?.[1]])

        })
    }

    const getBranchIdFromUrl = () => {
        let pathNames = window.location.pathname.split("/")
        return parseInt(pathNames[6]);
    }

    const SearchProductList = (e) => {
        API.Products.list({ company_id: id, name: e.target.value, pag: 1 }).then(res => {
            const { data } = res.data
            setStore([...data?.[1]])
        })
    }
    const GetDiscount = () => {
        API.Products.list({ common_discount: "common_discount", company_id: plateId, shop_id: getBranchIdFromUrl() }).then(res => {
            const { data } = res.data
            setDiscount([...data?.[1]])
        })
    }
    const onFinish = (value, index) => {
        value.type = location?.pathname?.split('/')?.[1] === 'order' ? 1 : 2
        value.order_items = value?.order_items?.filter((val, ind) => val?.amount)
        value.delivery_truck_id = id
        API.Order.store(value).then(res => {
            if (res.status === 200) showConfirm();
        })
    }
    const showConfirm = () => {
        confirm({
            title: location?.pathname?.split('/')?.[1] === 'order' ? 'Sifarişləriniz səbətə əlavə olundu.' : 'Sifarişləriniz geri qaytarılma səbətinə əlavə olundu.',
            icon: <ExclamationCircleFilled />,
            footer: false,
            closable: true,
            afterClose() {
                location?.pathname?.split('/')?.[1] === 'order' ?
                    navigate('/order/') : navigate('/return/')
            }
        });
    };
    useEffect(() => {
        GetProductList()
        GetDiscount()
    }, [])
    return (
        <>
            <Row style={{ marginBottom: 16 }}>
                <Space>
                    <LeftOutlined style={{ color: '#23A4DD' }} />
                    <Link to={location?.pathname?.split('/')?.[1] === 'order' ? `/order/markets/branch/${branchId}/company/${companyId}/plate-number/${plateId}` : `/return/markets/branch/${branchId}/company/${companyId}/plate-number/${plateId}`}  >Geri dön</Link>/
                    <Text>Məhsul adı</Text >
                </Space>
            </Row>
            <Row>
                <Col span={24}>
                    <Search width="100%" placeholder='Axtarış edin' color="#333" onChange={SearchProductList} />
                </Col>
            </Row>
            <Form
                onFinish={onFinish}
            >
                <Row gutter={24} align='center' style={{ marginBottom: 50 }}>
                    <Form.Item hidden name="shop_id" initialValue={companyId}>
                        <Input />
                    </Form.Item>
                    <Form.Item hidden name="company_id" initialValue={plateId}>
                        <Input />
                    </Form.Item>
                    <Form.Item hidden name="inserted_user_id" initialValue={JSON.parse(localStorage.getItem('access_token'))?.id}>
                        <Input />
                    </Form.Item>
                    {store?.map((value, index) => (
                        <Col xs={24} sm={24} md={12} lg={7} xl={7}>
                            <Form.Item hidden name={["order_items", index, "discount"]} initialValue={value?.product_dicount}>
                                <Input />
                            </Form.Item>
                            <Form.Item hidden name={["order_items", index, "product_id"]} initialValue={value?.id}>
                                <Input />
                            </Form.Item>
                            <Form.Item hidden name={["order_items", index, "price"]} initialValue={value.price}>
                                <Input />
                            </Form.Item>
                            <ProductCard
                                key={index}
                                index={index}
                                price={Number(value?.price)}
                                dicounted_price={Number(discount?.[index]?.product_dicount)}
                                productName={value?.name}
                                title={value?.title}
                                count={value?.count}
                                measure={value?.measure_type}
                                salePercentage={value?.product_dicount}
                            />
                        </Col>
                    ))}
                </Row>
                <Row justify='end' style={{
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
                    <Space>
                        <Button htmlType='submit' type='primary'>Səbətə əlavə et</Button>
                        <Button htmlType='reset'>İmtina elə</Button>
                    </Space>

                </Row>
            </Form>
        </>
    )
}

export default Index