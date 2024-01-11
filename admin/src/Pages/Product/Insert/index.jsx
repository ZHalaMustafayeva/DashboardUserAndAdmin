import React, { useState, useRef } from 'react'
import './style.scss'
import {
  Form, Drawer, Col,
  Row,
} from 'antd'
import API from '../../../API'
import { Select, Button, Input } from '../../../erp-component'
import { Loader } from '../../../Components'

const { Option } = Select
const Index = ({ onClose, open, editData }) => {
  const [isLoad, setIsLoad] = useState(false);
  const [companyList, setCompanyList] = useState([])
  const formRef = useRef();


  const onFinish = (value) => {
    API.Products.store(value).then(res => {
      if (res.status) onClose();
    })
  }

  const GetCompanyList = () => {
    API.Company.list().then(res => {
      const { data } = res.data
      setCompanyList([...data?.[1]]);
    })
  }

  const Close = (uuid) => onClose()

  const afterChange = () => {
    formRef.current.resetFields()
    if (open) {
      GetCompanyList()
    }
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
        <Row gutter={16} justify='start'>
          <Col span={8} >
            <Form.Item label='Məhsul:' name='name' className='c-form-item' >
              <Input width='100%' placeholder='Daxil edin' className='c-input' />
            </Form.Item>
          </Col>
          <Col span={8} >
            <Form.Item label='Barkod:' name='barcode' className='c-form-item' >
              <Input width='100%' placeholder='Daxil edin' className='c-input' />
            </Form.Item>
          </Col>
          <Col span={8} >
            <Form.Item label='Şirkət' name='company_id' className='c-form-item'>
              <Select placeholder="Seçim edin">
                {companyList?.map((value, index) => (
                  <Option value={value?.id} key={index}>{value?.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} >
            <Form.Item label='Qiymət:' name='price' className='c-form-item'>
              <Input width='100%' placeholder='Daxil edin' className='c-input' />
            </Form.Item>
          </Col>
          <Col span={8} >
            <Form.Item label='Ölçüm:' name='measure_type' className='c-form-item'>
              <Select placeholder="Seçim edin">
                <Option value="1">kq</Option>
                <Option value="2">ədəd</Option>
                <Option value="3">litr</Option>
              </Select>
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