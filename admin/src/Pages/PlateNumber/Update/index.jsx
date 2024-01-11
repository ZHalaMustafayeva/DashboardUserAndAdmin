import React, { useState, useRef } from 'react'
import './style.scss'
import {
  Form, Drawer, Col,
  Row
} from 'antd'
import { Input, Button } from '../../../erp-component'
import API from '../../../API'
import { Loader } from '../../../Components'

const Index = ({ onClose, open, editData }) => {
  const [isLoad, setIsLoad] = useState(false);
  const formRef = useRef();

  const onFinish = (value) => {
    API.PlateNumber.update(value).then(res => {
      if (res.status === 200) {
        onClose()
        setIsLoad(false)
      }
    })
  }

  const GetItemData = (id) => {
    API.PlateNumber.list({ id }).then(res => {
      const { data } = res.data;
      formRef.current.setFieldsValue({
        number_plate: data?.number_plate,
        driver_info: data?.driver_info,
        id:data?.id
      })
    })
  }

  const Close = (uuid) => onClose()

  const afterChange = () => {
    formRef.current.resetFields()
    if (open) {
      GetItemData(editData?.id)
    }
  }


  return (
    <Drawer
      title='Yeni'
      width='30%'
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
        <Row gutter={16} justify='end'>
          <Col span={24} >
            <Form.Item label='Maşın nömrəsi:' name='number_plate' className='c-form-item' >
              <Input width="100%" placeholder='Daxil edin' className='c-input' />
            </Form.Item>
          </Col>
          <Col span={24} >
            <Form.Item label='Sürücü:' name='driver_info' className='c-form-item' >
              <Input width="100%" placeholder='Daxil edin' className='c-input' />
            </Form.Item>
            <Form.Item hidden name='id' className='c-form-item' >
              <Input width="100%" placeholder='Daxil edin' className='c-input' />
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