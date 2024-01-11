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
const { TextArea } = Input;
const Index = ({ onClose, open, editData }) => {
  const [isLoad, setIsLoad] = useState(false);
  const [imageBlob, setImageBlob] = useState(null);

  const handleBeforeUpload = (file) => {
    // Convert the selected image file to a Blob
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageBlob(new Blob([event.target.result], { type: file.type }));
    };
    reader.readAsArrayBuffer(file);
    return false; // Prevent default upload behavior
  };

  const handleUpload = () => {
    let value = {}
    // Send the imageBlob to the server or perform other actions
    if (imageBlob) {
      value.logo = imageBlob;
      API.Company.store(value).then(res => {
        if (res.status) onClose();
      })
      // Use Fetch API or Axios to send the Blob to the server
    }
  }
  const formRef = useRef();


  const onFinish = (value) => {
    const payload = {
      name: value.name,
      note: value.note,
      logo: 'profile.png', // Get the Blob object of the uploaded file
      // logo: value.logo[0].originFileObj, // Get the Blob object of the uploaded file
    };
    API.Company.store(payload).then(res => {
      if (res.status) onClose();
    })
  }



  const Close = (uuid) => onClose()


  const afterChange = () => {
    formRef.current.resetFields()
    // }
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
            <Form.Item label='Şirkət:' name='name' className='c-form-item' >
              <Input width="100%" placeholder='Daxil edin' className='c-input' />
            </Form.Item>
          </Col>
          <Col span={24} >
            <Form.Item label='Qeyd:' name='note' className='c-form-item'>
              <TextArea placeholder='Daxil edin' className='c-input' />
            </Form.Item>
          </Col>
          <Col span={24} >
            {/* <Upload
              beforeUpload={handleBeforeUpload}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload> */}

            <Form.Item
              // label="Logo"
              name="logo"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              }}
            >
              <Upload name="logo" listType="picture">
                <Button icon={<UploadOutlined />}>Upload Logo</Button>
              </Upload>
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