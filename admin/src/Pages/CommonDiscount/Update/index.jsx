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
  const [shopList, setShopList] = useState([])
  const [productList, setProductList] = useState([])
  const [companyList, setCompanyList] = useState([])

  const [child, setChild] = useState([true])
  const formRef = useRef();


  const onFinish = (value) => {
    setIsLoad(true)
    API.CommonDiscount.update(value).then(res => {
      if (res.status === 200) {
        onClose()
        setIsLoad(false)
      }
    })
  }

  const GetItemData = (id) => {
    API.CommonDiscount.list({ id }).then(res => {
      const { data } = res.data;
      console.log(data);
      formRef.current.setFields([
        {
          name: 'discount', value: data?.discount,
        },
        {
          name: 'parent_shop_id', value: data?.parent_product_shop_id,
        },
        {
          name: 'company_id', value: data?.product_company_id
        },
        {
          name: 'id', value: data?.id
        }
      ])
    })
  }

  const Close = (uuid) => onClose()

  const afterChange = () => {
    formRef.current.resetFields()
    if (open) {
      GetItemData(editData?.id)
      GetShopList()
      GetCompanyList()
    }
  }

  const GetCompanyList = () => {
    API.Company.list().then(res => {
      setCompanyList(res.data.data?.[1])
    })
  }
  const GetShopList = () => {
    API.ProductShop.list({ pag: 1, only_parent: "only_parent" }).then(res => {
      setShopList(res.data.data?.[1])
    })
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
            <Form.Item hidden name="id">
              <Input />
            </Form.Item>
            <Form.Item label='Şirkət:' name='company_id' className='c-form-item' >
              <Select placeholder="Seçim edin">
                {companyList?.map((value, index) => (
                  <Option value={value?.id} key={index}>{value?.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} >
            <Form.Item label='Mağaza' name='parent_shop_id' className='c-form-item'>
              <Select placeholder="Seçim edin">
                {shopList?.map((value, index) => (
                  <Option value={value?.id} key={index}>{value?.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} >
            <Form.Item label='Endirim:' name='discount' className='c-form-item'>
              <Input width='100%' placeholder='Daxil edin' className='c-input' />
            </Form.Item>
          </Col>
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