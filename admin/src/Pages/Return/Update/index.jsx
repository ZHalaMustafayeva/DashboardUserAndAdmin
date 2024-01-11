import React, { useState, useRef } from 'react'
import './style.scss'
import {
  Form, Drawer, Col,
  Row,
  Space
} from 'antd'
import { Input, Button, DatePicker } from '../../../erp-component';
import { DeleteOutlined } from '@ant-design/icons';
import { Languages } from '../../../Config'
import API from '../../../API'
import { Loader } from '../../../Components'
import dayjs from 'dayjs'
const innerText = Languages.SelectLanguage("Attribute");

const Index = ({ onClose, open, editData }) => {
  const [isLoad, setIsLoad] = useState(false);
  const [orderItems, setOrderItems] = useState([])
  const [printData, setPrintData] = useState({})
  const formRef = useRef();
  let count = 1
  const columns = [
    // {
    //   title: 'S/N',
    //   key: ""

    // },
    {
      title: 'Barkodu',
      key: "product_barcode"

    },
    {
      title: 'Malın adı',

      key: "product_name"
    },
    {
      title: 'Miqdarı',
      key: "amount"

    },
    {
      title: 'Ölçüsü',
      key: "product_measure_type"

    },
    {
      title: 'Qiyməti',
      key: "price"

    },
    {
      title: 'Məbləği',
      key: "total_price"

    },
  ]

  const onFinish = (value) => {
    value.order_id = editData?.id;
    setIsLoad(true)
    API.Order.update(value).then(res => {
      if (res.status === 200) {
        onClose()
        setIsLoad(false)
      }
    })
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

  const Close = (uuid) => onClose()

  const DeleteItem = (id, order_id) => {
    API.OrderItem.delete({ id }).then(res => {
      if (res.status === 200) {
        GetItemData(order_id)
      }
    })
  }

  const afterChange = () => {
    formRef.current.resetFields()
    if (open) {
      GetItemData(editData?.id);
      GetPrintData()
      formRef.current.setFieldsValue({
        shop_name: editData?.shop_name,
        company_name: editData?.company_name,
        inserted_user: editData?.inserted_user,
        create_date: dayjs(editData?.create_date),
      })

    }
  }

  const Print = () => {
    // const columns = this.columns.map(v => [v.dataIndex, v.render]);
    // const data = this.state.request_data;
    var _window_ = window.open('', '');
    _window_.document.write('<html><body >');


    //     <table border='1' cellspacing='0'>
    //         <tr>${columns.map(col => `<th>${col.title}</th>`).join('')}</tr>
    //         ${orderItems.map(val =>
    //   `<tr>${columns.map(key =>
    //     `<td>${val?.[key?.key]}</td>`.replace('null', '')).join('')}
    //             </tr>`
    // ).join("")}
    //     </table>
    //     </div>
    //     `;
    const { print_date, shop_address, shop_name, shop_code } = printData?.order
    const table = `
<div align=center style=" margin-top: 15px; display: flex; justify-content: space-between " >
<div style="width: 49.9% ">
    <div style="border: 1px solid #333; display: flex; margin-bottom: 3 ">
        <div  style=" border-right: 1px solid #333; text-align: center; width: 40% ">
            <h2>${printData?.order?.company_name}</h2>
            <p style=" margin: 0  ">${printData?.order?.company_note ?? ''}</p>
        </div>
        <div style="text-align: center; width: 60% ">
            <h2>Satış qaiməsi</h2>
            <div style=" display: flex; justify-content: space-evenly; padding-top: 5px ">
                <span>Tarix ${print_date?.split(" ")?.[0]?.split('-')?.[2]}.${print_date?.split(" ")?.[0]?.split('-')?.[1]}.${print_date?.split(" ")?.[0]?.split('-')?.[0]}</span>
                <span style=" border-top: 1px solid #333; border-left: 1px solid #333; border-right: 1px solid #333; line-height: 1; padding: 3 ">SF 062645</span>
                <span>Saat ${print_date?.split(" ")?.[1]?.split(":")?.[0]} : ${print_date?.split(" ")?.[1]?.split(":")?.[1]}</span>
            </div>
        </div>
    </div>
    <div style=" border: 1px solid #333; padding: 5; text-align: left ">
        <h4 style="margin:0 15px">Müştəri Adı: ${shop_name}(${shop_code}) ${shop_address}</h4>
        <p style="text-align :right; margin:0 15px"> ${printData?.shop_cars?.map(val => (val.car_number))}</p>
    </div>
    <table border="1" style=" width: 100%; border-collapse: collapse; margin-bottom: 3 ">
        <thead >
            <tr>
                <th>S/N</th>
                <th>Barkodu</th>
                <th>Malın adı</th>
                <th>Miqdarı</th>
                <th>Ölçüsü</th>
                <th>Qiyməti</th>
                <th>Məbləği</th>
            </tr>
        </thead>
        <tbody>

        ${printData?.order_items?.map(val =>
      `<tr>
      <td>${count++}</td>
      ${columns.map(key =>
        `<td>${val?.[key?.key] ? val?.[key?.key] : ""}</td>`.replace('null', '')).join('')}
                      </tr > `
    ).join("")}
        </tbody>
    </table>
    <div style=" width: 100%; display: flex; justify-content: space-between ">
        <div style=" width: 50% "></div>
        <div style=" width:50%; display: flex; justify-content: space-between ">
            <div style=" text-align: left ">
                <p>Faktura Məbləği</p>
                <p>Endirim Məbləği</p>
                <p>Faktura Yekun Məbləği</p>
            </div>
            <div style=" text-align: left ">
                <p>AZN</p>
                <p>AZN</p>
                <p>AZN</p>
            </div>
            <div style=" text-align: right ">
            <p>${printData?.order?.total_price}</p>
            <p>${printData?.order?.total_discount_price}</p>
            <p>${printData?.order?.total_price_summery}</p>
            </div>
        </div>
    </div>
    <div style=" display: flex; justify-content: space-between ">
        <div style=" width:50%; text-align: left ">
            <span>Təhvil Verən</span>
        </div>
        <div style=" width:50%; text-align: left ">
            <span>Təhvil Alan</span>
        </div>
    </div>
</div >
<div style="width: 49% ">
    <div style="border: 1px solid #333; display: flex; margin-bottom: 3 ">
        <div  style=" border-right: 1px solid #333; text-align: center; width: 40% ">
        <h2>${printData?.order?.company_name}</h2>
        <p style=" margin: 0  ">${printData?.order?.company_note}</p>
        </div>
        <div style="text-align: center; width: 60% ">
            <h2>Satış qaiməsi</h2>
            <div style=" display: flex; justify-content: space-evenly; padding-top: 5px ">
                <span>Tarix ${print_date?.split(" ")?.[0]?.split('-')?.[2]}.${print_date?.split(" ")?.[0]?.split('-')?.[1]}.${print_date?.split(" ")?.[0]?.split('-')?.[0]}</span>
                <span style=" border-top: 1px solid #333; border-left: 1px solid #333; border-right: 1px solid #333; line-height: 1; padding: 3 ">SF 062645</span>
                <span>Saat ${print_date?.split(" ")?.[1]?.split(":")?.[0]} : ${print_date?.split(" ")?.[1]?.split(":")?.[1]}</span>
            </div>
        </div>
    </div>
    <div style=" border: 1px solid #333; padding: 5; text-align: left ">
    <h4 style="margin:0 15px">Müştəri Adı: ${shop_name}(${shop_code}) ${shop_address}</h4>
    <p style="text-align :right; margin:0 15px"> ${printData?.shop_cars?.map(val => (val.car_number))}</p>
</div>
    <table border="1" style=" width: 100%; border-collapse: collapse; margin-bottom: 3 ">
        <thead >
            <tr>
                <th>S/N</th>
                <th>Barkodu</th>
                <th>Malın adı</th>
                <th>Miqdarı</th>
                <th>Ölçüsü</th>
                <th>Qiyməti</th>
                <th>Məbləği</th>
            </tr>
        </thead>
        <tbody>

        ${printData?.order_items?.map(val =>
      `<tr>
      <td>${count++}</td>
      ${columns.map(key =>
        `<td>${val?.[key?.key] ? val?.[key?.key] : ""}</td>`.replace('null', '')).join('')}
                      </tr>`
    ).join("")}
        </tbody>
    </table>
    <div style=" width: 100%; display: flex; justify-content: space-between ">
        <div style=" width: 50% "></div>
        <div style=" width:50%; display: flex; justify-content: space-between ">
            <div style=" text-align: left ">
                <p>Faktura Məbləği</p>
                <p>Endirim Məbləği</p>
                <p>Faktura Yekun Məbləği</p>
            </div>
            <div style=" text-align: left ">
                <p>AZN</p>
                <p>AZN</p>
                <p>AZN</p>
            </div>
            <div style=" text-align: right ">
                <p>${printData?.order?.total_price}</p>
                <p>${printData?.order?.total_discount_price}</p>
                <p>${printData?.order?.total_price_summery}</p>
            </div>
        </div>
    </div>
    <div style=" display: flex; justify-content: space-between ">
        <div style=" width:50%; text-align: left ">
            <span>Təhvil Verən</span>
        </div>
        <div style=" width:50%; text-align: left ">
            <span>Təhvil Alan</span>
        </div>
    </div>
</div >
`
    _window_.document.write(table);
    _window_.document.write('</body></html>');
    const logoImg = _window_.document.getElementById("logo")
    _window_.print();
    _window_.close();
    // logoImg?.addEventListener('load', () => {

    // _window_.print();
    // })
    // const _window_ = window.open('', '');
    // _window_.document.write('<html><body >');
    // _window_.document.write(table);
    // _window_.document.write('</body></html>');

    // _window_.print();
    // _window_.close();
  }

  const GetPrintData = () => {
    API.Order.list({ id: editData?.id, print: "print" }).then(res => {
      const { data } = res.data;
      setPrintData({ ...data })
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
      afterOpenChange={afterChange}
      extra={
        <Space>
          <Button onClick={Print}>Çap et</Button>
        </Space>
      }
    >
      <Form
        ref={formRef}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={6} >
            <Form.Item label='Mağaza:' name='shop_name' className='c-form-item' >
              <Input width='100%' disabled placeholder='Daxil edin' className='c-input' />
            </Form.Item>
          </Col>
          <Col span={6} >
            <Form.Item label='Şirkət:' name='company_name' className='c-form-item' >
              <Input width='100%' disabled placeholder='Daxil edin' className='c-input' />
            </Form.Item>
          </Col>
          <Col span={6} >
            <Form.Item label='Ekspeditor:' name='inserted_user' className='c-form-item'>
              <Input width='100%' disabled placeholder='Daxil edin' className='c-input' />
            </Form.Item>
          </Col>
          <Col span={6} >
            <Form.Item label='Tarix:' name='create_date' className='c-form-item' >
              <DatePicker width='100%' disabled placeholder='Daxil edin' className='c-input' />
            </Form.Item>
          </Col>
        </Row>
        {orderItems?.map((value, index) => (
          <Row gutter={16}
            key={index}
            style={{
              borderRadius: 8,
              border: '1px solid rgba(0, 0, 0, 0.10)',
              background: '#FFF',
              padding: 24,
              marginBottom: 16
            }}
          >
            <Col span={24}>
              <Row justify='end'>
                <Col span={4} flex='none'>
                  <DeleteOutlined onClick={() => DeleteItem(value?.id, value?.order_id)} />
                </Col>
              </Row>
            </Col>
            <Col span={8} >
              <Form.Item label='Sifariş adı:' name={["order_items", index, 'product_name']} className='c-form-item' >
                <Input width='100%' disabled placeholder='Daxil edin' className='c-input' />
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item label='Sifariş miqdarı:' name={["order_items", index, 'amount']} className='c-form-item' >
                <Input width='100%' placeholder='Daxil edin' className='c-input' />
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item label='Sifariş ölçümü:' name={["order_items", index, 'product_measure_type']} className='c-form-item'>
                <Input width='100%' disabled placeholder='Daxil edin' className='c-input' />
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item label='Sifariş qiyməti:' name={["order_items", index, 'price']} className='c-form-item' >
                <Input width='100%' disabled placeholder='Daxil edin' className='c-input' />
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item label='Sifariş endirimi:' name={["order_items", index, 'discount']} className='c-form-item' >
                <Input width='100%' disabled placeholder='Daxil edin' className='c-input' />
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item hidden name={["order_items", index, 'product_id']} className='c-form-item' >
                <Input width='100%' disabled placeholder='Daxil edin' className='c-input' />
              </Form.Item>
            </Col>
          </Row>
        ))}
        {/* <Row align='end' className='fixed-submit-buttons'>
          <Button htmlType="submit" type='primary' className='c-btn c-btn--primary' >Yadda saxla</Button>
          <Button onClick={Close} className='c-btn c-btn--secondary'>Bağla</Button>
        </Row> */}
      </Form>
      <Loader loading={isLoad} />
    </Drawer >
  )
}

export default Index