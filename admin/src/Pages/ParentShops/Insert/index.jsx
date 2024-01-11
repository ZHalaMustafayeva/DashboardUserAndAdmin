import React, { useState, useRef } from 'react'
import './style.scss'
import {
  Form, Drawer, Col,
  Row
} from 'antd'
import API from '../../../API'
import { CloseOutlined } from '@ant-design/icons';
import { Loader } from '../../../Components'
import { Input, Button, Select } from '../../../erp-component'
const { TextArea } = Input;
const { Option } = Select;
const Index = ({ onClose, open, editData }) => {
  const [isLoad, setIsLoad] = useState(false);
  const [orderItems, setOrderItems] = useState([])
  const [childInput, setChildInput] = useState([true])
  const [shopList, setShopList] = useState([])
  const formRef = useRef();


  const onFinish = (value) => {
    // value.parent_id = null;
    API.ProductShop.store(value).then(res => {
      if (res.status) onClose();
    })
    // value.order_id = editData?.id;
    // setIsLoad(true)
    // API.Order.update(value).then(res => {
    //   if (res.status === 200) {
    //     onClose()
    //     setIsLoad(false)
    //   }
    // })
  }

  const GetItemData = (order_id) => {
    API.OrderItem.list({ order_id }).then(res => {
      const { data } = res.data;
      setOrderItems([...data?.[1]])
      data?.[1]?.map((value, index) => {
        formRef.current.setFieldsValue({ order_items: { [index]: { product_name: value?.product_name } } })
        formRef.current.setFieldsValue({ order_items: { [index]: { amount: value?.amount } } })
        formRef.current.setFieldsValue({ order_items: { [index]: { price: value?.price } } })
        formRef.current.setFieldsValue({ order_items: { [index]: { discount: value?.discount } } })
        formRef.current.setFieldsValue({ order_items: { [index]: { product_measure_type: value?.product_measure_type } } })
        formRef.current.setFieldsValue({ order_items: { [index]: { product_id: value?.id } } })
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
    if(open){
      GetShopList();
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
      title='Yeni'
      width='50%'
      className='c-drawer'
      onClose={Close}
      open={open}
      bodyStyle={{ paddingBottom: 80, backgroundColor: 'rgba(51, 48, 60, 0.04)', overflowY: 'scroll' }}
      headerStyle={{}}
      afterOpenChange={afterChange}
    // extra={
    //   <Space>
    //     <Button onClick={Print}>Çap et</Button>
    //   </Space>
    // }
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