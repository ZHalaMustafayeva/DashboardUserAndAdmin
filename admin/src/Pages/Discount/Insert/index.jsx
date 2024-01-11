import React, { useState, useRef } from 'react'
import './style.scss'
import {
  Form, Drawer, Col,
  Row,
} from 'antd'
import API from '../../../API'
import { Select, Button, Input, DatePicker } from '../../../erp-component'
import { Loader } from '../../../Components'
import { CloseOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'
const { Option } = Select
const Index = ({ onClose, open, editData }) => {
  const [isLoad, setIsLoad] = useState(false);
  const [productList, setProductList] = useState([])
  const [shopList, setShopList] = useState([])
  const [child, setChild] = useState([true])
  const formRef = useRef();

  const onFinish = (value) => {
    value.shop_product_discounts = value?.shop_product_discounts?.filter(val=>val)
    value.shop_product_discounts?.map((val, ind)=>{
      val.discount_start_date = dayjs(val?.discount_start_date).format("YYYY-MM-DD")
      val.discount_end_date = dayjs(val?.discount_end_date).format("YYYY-MM-DD")

    })
    API.Discount.store(value).then(res => {
      if (res.status) onClose();
    })
  }

  const GetProductList = () => {
    API.Products.list().then(res => {
      setProductList(res.data.data?.[1])
    })
  }
  const GetShopList = () => {
    API.ProductShop.list().then(res => {
      setShopList(res.data.data?.[1])
    })
  }
  const Close = (uuid) => onClose()

  const afterChange = () => {
    formRef.current.resetFields()
    if (open) {
      GetProductList()
      GetShopList()
    }
  }

  const AddInput = () => {
    setChild(prev => [...prev, true])
  }
  const RemoveInput = (index) => {
    delete child[index];
    setChild([...child]);
  }
  return (
    <Drawer
      title='Yeni'
      width='50%'
      className='c-drawer'
      onClose={Close}
      open={open}
      bodyStyle={{ paddingBottom: 80, backgroundColor: 'rgba(51, 48, 60, 0.04)', overflowY: 'scroll' }}
      headerStyle={{}}
      afterOpenChange={afterChange}
    >
      <Form
        ref={formRef}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row style={{ width: '100%' }} justify='end'>
          <Col span={4} flex='none'>
            <Button
              btnwidth="100%"
              btnheight="44px"
              fontsize="24px"
              colorhover="#fff !important"
              onClick={AddInput}>+</Button>
          </Col>
        </Row>
        {
          child?.map((value, index) => (
            value &&
            <Row gutter={16} justify='start' align='middle' key={index}>
              <Col span={8} >
                <Form.Item label='Məhsul:' name={['shop_product_discounts', index, 'product_id']} className='c-form-item' >
                  <Select placeholder="Seçim edin">
                    {productList?.map((value, index) => (
                      <Option value={value?.id} key={index}>{value?.product_full_name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item label='Mağaza' name={['shop_product_discounts', index, 'shop_id']} className='c-form-item'>
                  <Select placeholder="Seçim edin">
                    {shopList?.map((value, index) => (
                      <Option value={value?.id} key={index}>{value?.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4} >
                <Form.Item label='Endirim:' name={['shop_product_discounts', index, 'discount']} className='c-form-item'>
                  <Input width='100%' placeholder='Daxil edin' className='c-input' />
                </Form.Item>
              </Col> 
              {/* <Col span={8} >
                <Form.Item label='Başlama tarixi:' name={['shop_product_discounts', index, 'discount_start_date']} className='c-form-item'>
                  <DatePicker width='100%' placeholder='Daxil edin' className='c-input' />
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item label='Bitmə tarixi:' name={['shop_product_discounts', index, 'discount_end_date']} className='c-form-item'>
                  <DatePicker width='100%' placeholder='Daxil edin' className='c-input' />
                </Form.Item>
              </Col> */}
              <Col span={4} flex='none'>
                <Button
                  
                  bgcolor="orangered"
                  btnheight="44px"
                  bgcolorhover="orangered"
                  colorhover="#fff !important"
                  onClick={() => RemoveInput(index)}
                  icon={<CloseOutlined />}
                >
                </Button>
              </Col>


            </Row>
          ))
        }

        <Row align='end' className='fixed-submit-buttons'>
          <Button htmlType="submit" type='primary' className='c-btn c-btn--primary' >Yadda saxla</Button>
          <Button onClick={Close} className='c-btn c-btn--secondary'>Bağla</Button>
        </Row>
      </Form>
      <Loader loading={isLoad} />
    </Drawer >
  )
}

export default Index