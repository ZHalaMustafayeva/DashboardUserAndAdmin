import React, { useState, useRef } from 'react'
import './style.scss'
import {
  Form, Drawer, Col,
  Row
} from 'antd'
import { Select, Button, Input, DatePicker } from '../../../erp-component'
import API from '../../../API'
import { Loader } from '../../../Components'
import { CloseOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'
const { Option } = Select;

const Index = ({ onClose, open, editData }) => {
  const [isLoad, setIsLoad] = useState(false);
  const [productList, setProductList] = useState([])
  const [shopList, setShopList] = useState([])
  const [child, setChild] = useState([true])
  const formRef = useRef();


  const onFinish = (value) => {
    setIsLoad(true)
    value?.shop_product_discounts?.map((val, ind)=>{
      val.id = editData?.id;
      val.discount_start_date = dayjs(val?.discount_start_date).format("YYYY-MM-DD")
      val.discount_end_date = dayjs(val?.discount_end_date).format("YYYY-MM-DD")

    })
    API.Discount.update(value).then(res => {
      if (res.status === 200) {
        onClose()
        setIsLoad(false)
      }
    })
  }

  const GetItemData = (id) => {

    API.Discount.list({ id }).then(res => {
      const { data } = res.data;
      // console.log(data)
      formRef.current.setFields([
        {name:['shop_product_discounts', 0, 'product_id'], value:data?.product_id},
        {name:['shop_product_discounts', 0, 'shop_id'], value:data?.shop_id},
        {name:['shop_product_discounts', 0, 'discount'], value:data?.discount},
        {name:['shop_product_discounts', 0, 'discount_start_date'], value:dayjs(data?.discount_start_date)},
        {name:['shop_product_discounts', 0, 'discount_end_date'], value:dayjs(data?.discount_end_date)}
      ])
    })
  }

  const Close = (uuid) => onClose()



  const afterChange = () => {
    formRef.current.resetFields()
    if (open) {
      GetItemData(editData?.id)
      GetProductList()
      GetShopList()
    }
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
  const AddInput = () => {
    setChild(prev => [...prev, true])
  }
  const RemoveInput = (index) => {
    delete child[index];
    setChild([...child]);
  }

  return (
    <Drawer
      title='Düzəliş et'
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


        <Row gutter={16} justify='start' align='middle' >
          <Col span={8} >
            <Form.Item label='Məhsul:' name={['shop_product_discounts', 0, 'product_id']} className='c-form-item' >
              <Select placeholder="Seçim edin">
                {productList?.map((value, index) => (
                  <Option value={value?.id} key={index}>{value?.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} >
            <Form.Item label='Mağaza' name={['shop_product_discounts', 0, 'shop_id']} className='c-form-item'>
              <Select placeholder="Seçim edin">
                {shopList?.map((value, index) => (
                  <Option value={value?.id} key={index}>{value?.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} >
            <Form.Item label='Endirim:' name={['shop_product_discounts', 0, 'discount']} className='c-form-item'>
              <Input width='100%' placeholder='Daxil edin' className='c-input' />
            </Form.Item>
          </Col>
          {/* <Col span={8} >
            <Form.Item label='Başlama tarixi:' name={['shop_product_discounts', 0, 'discount_start_date']} className='c-form-item'>
              <DatePicker width='100%' placeholder='Daxil edin' className='c-input' />
            </Form.Item>
          </Col>
          <Col span={8} >
            <Form.Item label='Bitmə tarixi:' name={['shop_product_discounts', 0, 'discount_end_date']} className='c-form-item'>
              <DatePicker width='100%' placeholder='Daxil edin' className='c-input' />
            </Form.Item>
          </Col> */}
        </Row>
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