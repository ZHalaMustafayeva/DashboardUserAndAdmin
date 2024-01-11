import React, { useState, useRef } from 'react'
import './style.scss'
import {
  Form, Drawer, Col,
  Row, Upload
} from 'antd'
import { Input, Button } from '../../../erp-component'
import { UploadOutlined } from '@ant-design/icons';
import API from '../../../API'
import { Loader } from '../../../Components'
const Index = ({ onClose, open, editData }) => {
  const [isLoad, setIsLoad] = useState(false);
  const [imageBlob, setImageBlob] = useState(null);

  const formRef = useRef();

  const handleBeforeUpload = (file) => {
    // Convert the selected image file to a Blob
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageBlob(new Blob([event.target.result], { type: file.type }));
    };
    reader.readAsArrayBuffer(file);
    return false; // Prevent default upload behavior
  };
  const onFinish = (value) => {
    value.photo = 'profile.png'
    API.Auth.Sanctum.signUp(value).then(res => {
      if (res.status) onClose();
    })
  }



  const Close = (uuid) => onClose()


  const afterChange = () => {
    formRef.current.resetFields()
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
            <Form.Item label='Tam adı:' name='full_name' className='c-form-item' >
              <Input width='100%' placeholder='Daxil edin' className='c-input' />
            </Form.Item>
          </Col>
          <Col span={24} >
            <Form.Item label='E-poçt:' name='email' className='c-form-item'>
              <Input width='100%' placeholder='Daxil edin' className='c-input' />
            </Form.Item>
          </Col>
          <Col span={24} >
            <Form.Item label='Şəkil:' name='photo' className='c-form-item'>
              <Upload
                beforeUpload={handleBeforeUpload}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
              {/* <Input width='100%' placeholder='Daxil edin' className='c-input' /> */}
            </Form.Item>
          </Col>
          <Col span={24} >
            <Form.Item label="Şifrə" name='password' className='c-form-item'>
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