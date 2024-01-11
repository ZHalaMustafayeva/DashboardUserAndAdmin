import React, { useState, useRef } from 'react'
import './style.scss'
import {
  Form, Drawer, Col,
  Row
} from 'antd'
import { CloseOutlined } from '@ant-design/icons';
import API from '../../../API'
import { Input, Button,Select } from '../../../erp-component'
import { Loader } from '../../../Components'
const { TextArea } = Input;
const { Option } = Select;

const Index = ({ onClose, open, editData }) => {
  const [isLoad, setIsLoad] = useState(false);
  const [childInput, setChildInput] = useState([]);
  const [shopList, setShopList] = useState([])

  const formRef = useRef();


  const onFinish = (value) => {
    value.id = editData?.id;
    // value.parent_id = null
    setIsLoad(true)
    API.ProductShop.update(value).then(res => {
      if (res.status === 200) {
        onClose()
        setIsLoad(false)
      }
    })
  }

  const GetItemData = (id) => {
    setChildInput([])
    API.ProductShop.list({ id }).then(res => {
      const { data } = res.data;
      data?.shop_cars?.forEach((value, index) => {
        setChildInput(prev => [...prev, true])
        formRef.current.setFieldsValue({
          shop_cars: { [index]: value?.car_number }
        })
      })
      formRef.current.setFieldsValue({
        name: data?.name,
        code: data?.code,
        note: data?.note,
        address: data?.address,
        parent_id: data?.parent_id,
      })
    })
  }

  const GetShopList = () => {
    API.ProductShop.list().then(res => {
      setShopList([...res.data.data[1]])
    })
  }

  const Close = (uuid) => onClose()

  const DeleteItem = (id, order_id) => {
    API.Order.delete({ id }).then(res => {
      if (res.status === 200) {
        GetItemData(order_id)
      }
    })
  }

  const afterChange = () => {
    formRef.current.resetFields()
    if (open) {
      GetItemData(editData?.id)
      GetShopList()
    }
  }

  const AddInput = () => {
    setChildInput(prev => [...prev, true])
  }
  const RemoveInput = (index) => {
    delete childInput[index];
    setChildInput([...childInput]);
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
        <Row gutter={16} justify='end'>
          <Col span={8} >
            <Form.Item label='Mağaza:' name='name' className='c-form-item' >
              <Input width='100%' placeholder='Daxil edin' className='c-input' />
            </Form.Item>
          </Col>
          <Col span={8} >
            <Form.Item label='Kod:' name='code' className='c-form-item' >
              <Input width='100%' placeholder='Daxil edin' className='c-input' />
            </Form.Item>
          </Col>
          <Col span={8} >
            <Form.Item label='Ünvan:' name='address' className='c-form-item'>
              <Input width='100%' placeholder='Daxil edin' className='c-input' />
            </Form.Item>
          </Col>
          <Col span={24} >
            <Form.Item label='Qeyd:' name='note' className='c-form-item'>
              <TextArea width='100%' placeholder='Daxil edin' className='c-input' />
            </Form.Item>
          </Col>
          {/* <Col span={24} flex='none'>
            <Button
              btnwidth="100%"
              btnheight="44px"
              fontsize="24px"
              colorhover="#fff !important"
              onClick={AddInput}>+</Button>
          </Col> */}
          {/* <Col span={24}>
            <Row gutter={16} align='middle'>
              {childInput?.map((value, index) => (
                value &&
                <>
                  <Col span={20} >
                    <Form.Item label='Mağaza maşını:' name={['shop_cars', index]} className='c-form-item'>
                      <Input width='100%' placeholder='Daxil edin' className='c-input' />
                    </Form.Item>
                  </Col>
                  <Col span={4} flex='none'>
                    <Button
                      btnwidth="100%"
                      bgcolor="orangered"
                      btnheight="44px"
                      bgcolorhover="orangered"
                      colorhover="#fff !important"
                      onClick={() => RemoveInput(index)}
                      icon={<CloseOutlined />}
                    >
                    </Button>
                  </Col>
                </>
              ))}

            </Row>
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