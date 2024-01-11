import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Input, Select, Empty, TreeSelect, Space, Collapse } from 'antd';
import API from '../../../../API'
import { BillUpdateContext, useContext } from '../../Context/context';
import TotalPrices from '../TotalPrices'
const { Option } = Select;
const { Panel } = Collapse;
let dependenceData = []
let dependenceData2 = []
let totalAmountPrf = []
let totalAmountEdv = [];
let sumTotalPrf;
let sumTotalEdv;
const Index = () => {
  const {
    form, valueSelectedPrfs, prfSelectedProducts, setItem,
    warehouseProductCategory, bankTime, taxEdv, itemUnit, requiredFields, disabledFields,
    journalsTop, renderTreeNodes, collapseKey, setCollapseKey,
    prfTotalState, setPrfTotalState, prfEdvState, setPrfEdvState,
  } = useContext(BillUpdateContext);
  const [dependenceState, setDependenceState] = useState([]);
  const [dependenceState2, setDependenceState2] = useState([]);
  const handleRendered = () => {
    prfSelectedProducts?.forEach((element, index) => {
      valueSelectedPrfs?.forEach(valueELement => {
        setItem({ 'prfs': { [index]: { 'id': element.uuid } } })
        element?.products?.forEach((elem, ind) => {
          valueELement?.products?.forEach(value => {
            if (element.uuid === valueELement.uuid) {
              if (elem?.description?.uuid === value?.prf_description?.uuid) {
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'product_id': elem?.attribute.uuid } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'description_id': elem?.description?.uuid } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'unit_idView': elem?.unit?.name } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'unit_id': elem?.unit?.uuid } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'quantity': elem?.quantity } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'amount': elem?.amount } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'total_amount': elem?.total_amount } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'tax_idView': elem?.tax?.tax_value || null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'tax_id': elem?.tax?.uuid || null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'total_tax_amount': elem?.total_tax_amount } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'note': elem?.note } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'uuid': value?.uuid } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_product_id': value?.description?.attribute?.uuid } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_description_id': value?.description?.uuid } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'accounting_account_id': value?.chart_account?.uuid } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_quantity': value?.quantity } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_unit_id': value?.unit?.uuid } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_amount': value?.amount } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'tax_idView': value?.tax?.tax_value || null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_tax_id': value?.tax?.uuid || null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'tax_accounting_account_id': value?.tax_chart_account?.uuid } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bank_duration_id': value?.duration_time?.uuid } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'supplier_duration_time_id': value?.supplier_duration_time?.uuid } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bank_duration': value?.bank_guarantee_date_duration } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'supplier_guarantee_date_duration': value?.supplier_guarantee_date_duration } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'accepted_commitment': value?.income_billed_quantity } } } } })
                let aquantity = form.getFieldValue(['prfs', index, 'products', ind, 'bill_quantity']) || 0
                let bamount = form.getFieldValue(['prfs', index, 'products', ind, 'bill_amount']) || 0
                let ctaxId = form.getFieldValue(['prfs', index, 'products', ind, 'bill_tax_id']) || 0
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'calculate_amount': aquantity * bamount } } } } })
                if (ctaxId) {
                  const filtered = taxEdv.filter(a => a.uuid === ctaxId && a.name)
                  let calc = form.getFieldValue(['prfs', index, 'products', ind, 'calculate_amount']);
                  setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_total_tax_amount': filtered?.[0]?.name * calc / 100 } } } } })
                } else {
                  setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_total_tax_amount': 0 } } } } })
                }
              }
            }
            else {
              setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'product_id': elem?.attribute.uuid } } } } })
              setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'description_id': elem?.description?.uuid } } } } })
              setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'unit_idView': elem?.unit?.name } } } } })
              setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'unit_id': elem?.unit?.uuid } } } } })
              setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'quantity': elem?.quantity } } } } })
              setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'amount': elem?.amount } } } } })
              setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'total_amount': elem?.total_amount } } } } })
              setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'tax_idView': elem?.tax?.tax_value || null } } } } })
              setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'tax_id': elem?.tax?.uuid || null } } } } })
              setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'total_tax_amount': elem?.total_tax_amount } } } } })
              setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'note': elem?.note } } } } })
            }
          })
        })
      })
    })
    prfSelectedProducts?.forEach((element, index) => {
      dependenceData[index] = { data: [] }
      dependenceData2[index] = { data: [] }
      setItem({ 'prfs': { [index]: { 'id': element.uuid } } })
      element?.products?.forEach((_, ind) => {
        dependenceData[index].data[ind] = []
        dependenceData2[index].data[ind] = []
        // console.log(form.getFieldValue(['prfs', index, 'products', ind, 'bill_product_id']));
        const uuid = { product_attribute_id: form.getFieldValue(['prfs', index, 'products', ind, 'bill_product_id']) }
        const uuid2 = { product_attribute_id: form.getFieldValue(['prfs', index, 'products', ind, 'product_id']) }
        API.Warehouse.categoryPropertyDescription.list(uuid).then(res => {
          dependenceData[index].data[ind] = res?.data?.data;
          setDependenceState([...dependenceData])
        })
        API.Warehouse.categoryPropertyDescription.list(uuid2).then(res => {
          dependenceData2[index].data[ind] = res.data.data
          setDependenceState2([...dependenceData2])
        })
      })
    })
    setDependenceState([...dependenceData])
  }
  const getCategoryPropertyDescription = (value, index, ind) => {
    setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_description_id': null } } } } })
    if (value === undefined) {
      dependenceData[index].data[ind] = []
      setDependenceState([...dependenceData])
    } else {
      const uuid = { product_attribute_id: form.getFieldValue(['prfs', index, 'products', ind, 'bill_product_id']) }
      API.Warehouse.categoryPropertyDescription.list(uuid).then(res => {
        dependenceData[index].data[ind] = res.data.data
        setDependenceState([...dependenceData])
      })
    }
  }
  const calculateHandleAmount = (e, name, index, ind) => {
    if (parseInt(e.target.value) < 0) {
      setItem({ 'prfs': { [index]: { 'products': { [ind]: { [name]: 0 } } } } })
    } else if (e.target.value.startsWith('0')) {
      setItem({ 'prfs': { [index]: { 'products': { [ind]: { [name]: 0 } } } } })
    }
    let aQuantity = form.getFieldValue(['prfs', index, 'products', ind, 'bill_quantity']) || 0
    let bAmount = form.getFieldValue(['prfs', index, 'products', ind, 'bill_amount']) || 0
    if (!aQuantity || !bAmount) {
      setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'calculate_amount': 0 } } } } })
    }
    if (aQuantity === 0 || bAmount === 0) {
      setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'calculate_amount': 0 } } } } })
    }
    if (aQuantity && bAmount) {
      setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'calculate_amount': aQuantity * bAmount } } } } })
      if (form.getFieldValue(['prfs', index, 'products', ind, 'bill_tax_id'])) {
        let cCalcAmount = form.getFieldValue(['prfs', index, 'products', ind, 'calculate_amount'])
        const filtered = taxEdv.filter(a => a.uuid === form.getFieldValue(['prfs', index, 'products', ind, 'bill_tax_id']) && a.name)
        let resCalc = cCalcAmount * filtered[0].name / 100
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_total_tax_amount': resCalc } } } } })
      } else {
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_total_tax_amount': 0 } } } } })
      }
    }
    prfSelectedProducts?.map((element, index) => {
      totalAmountPrf[index] = { value: [] }
      totalAmountEdv[index] = { value: [] }
      element?.products?.map((_, ind) => {
        totalAmountPrf[index].value[ind] = { status: element.status, count: form.getFieldValue(['prfs', index, 'products', ind, 'calculate_amount']) || 0 }
        totalAmountEdv[index].value[ind] = { status: element.status, count: form.getFieldValue(['prfs', index, 'products', ind, 'bill_total_tax_amount']) || 0 }
      })
    })
    sumTotalPrf = totalAmountPrf.reduce((acc, curr) => {
      const trueObjects = curr.value.filter(obj => obj.status === true);
      const trueCounts = trueObjects.map(obj => obj.count);
      const trueCountSum = trueCounts.reduce((a, c) => a + c, 0);
      return acc + trueCountSum;
    }, 0);
    sumTotalEdv = totalAmountEdv.reduce((acc, curr) => {
      const trueObjects = curr.value.filter(obj => obj.status === true);
      const trueCounts = trueObjects.map(obj => obj.count);
      const trueCountSum = trueCounts.reduce((a, c) => a + c, 0);
      return acc + trueCountSum;
    }, 0);
    setPrfTotalState(sumTotalPrf)
    setPrfEdvState(sumTotalEdv)
  }
  const handleCalcBillEDVAmount = (_, val, index, ind) => {
    if (val === undefined) {
      setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_total_tax_amount': 0 } } } } })
    } else {
      let t = form.getFieldValue(['prfs', index, 'products', ind, 'calculate_amount']) || 0;
      setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_total_tax_amount': val.children[0] * t / 100 } } } } })
    }
    prfSelectedProducts?.map((element, index) => {
      totalAmountPrf[index] = { value: [] }
      totalAmountEdv[index] = { value: [] }
      element?.products?.map((_, ind) => {
        totalAmountEdv[index].value[ind] = { status: element.status, count: form.getFieldValue(['prfs', index, 'products', ind, 'bill_total_tax_amount']) || 0 }
      })
    })
    sumTotalEdv = totalAmountEdv.reduce((accumulator, currentValue) => {
      currentValue.value.forEach((obj) => {
        if (obj.status === true) {
          accumulator += parseInt(obj.count);
        }
      });
      return accumulator;
    }, 0);
    setPrfEdvState(sumTotalEdv)
  }
  const handleSetSomeValues = (_, index) => {
    prfSelectedProducts[index].collapse = false;
  }
  useEffect(() => {
    handleRendered()
    prfSelectedProducts?.map((element, index) => {
      totalAmountPrf[index] = { value: [] }
      totalAmountEdv[index] = { value: [] }
      element?.products?.map((_, ind) => {
        totalAmountPrf[index].value[ind] = { status: element.status, count: form.getFieldValue(['prfs', index, 'products', ind, 'calculate_amount']) || 0 }
        totalAmountEdv[index].value[ind] = { status: element.status, count: form.getFieldValue(['prfs', index, 'products', ind, 'bill_total_tax_amount']) || 0 }
      })
    })
    sumTotalPrf = totalAmountPrf.reduce((acc, curr) => {
      const trueObjects = curr.value.filter(obj => obj.status === true);
      const trueCounts = trueObjects.map(obj => obj.count);
      const trueCountSum = trueCounts.reduce((a, c) => a + c, 0);
      return acc + trueCountSum;
    }, 0);
    sumTotalEdv = totalAmountEdv.reduce((acc, curr) => {
      const trueObjects = curr.value.filter(obj => obj.status === true);
      const trueCounts = trueObjects.map(obj => obj.count);
      const trueCountSum = trueCounts.reduce((a, c) => a + c, 0);
      return acc + trueCountSum;
    }, 0);
    setPrfTotalState(sumTotalPrf)
    setPrfEdvState(sumTotalEdv)
  }, [prfSelectedProducts])
  // console.log(prfSelectedProducts);
  // console.log(valueSelectedPrfs);
  return (
    <div>
      {!prfSelectedProducts.every(prf => prf.status === false) === false
        ?
        <Row style={{ width: '100%' }}>
          <Col span={24} style={{ height: '18vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Məhsul yoxdur" />
          </Col>
        </Row>
        :
        <Collapse onChange={(key) => {
          setCollapseKey(key)
        }} accordion activeKey={collapseKey}>
          {prfSelectedProducts?.map((element, index) => (
            element.status === true && <Panel key={index}
              onClick={(e) => {
                if (e.target.className === 'headerPanel' || e.target.className === 'ant-collapse-header') {
                  handleSetSomeValues(element, index)
                }
              }}
              header={
                <span className='headerPanel' style={{ display: 'inline-block', width: '100%' }}
                  onClick={() => { prfSelectedProducts[index].collapse = false; }}
                >{element?.name}
                  <b style={{ marginLeft: '1rem', color: 'crimson' }}>{element?.collapse && 'Boş buraxıla bilməz'}</b>
                </span>
              }>
              <Col span={24}>
                <Form.Item hidden name={['prfs', index, 'id']}>
                  <Input />
                </Form.Item>
                <div >
                  {element?.products?.map((elem, ind) => (
                    elem.status === true && <Row key={ind}>
                      <Col span={24}>
                        <Row gutter={12} style={{ height: '75px' }}>
                          <Col span={3}>
                            <Form.Item hidden name={['prfs', index, 'products', ind, 'uuid']} />
                            <Form.Item className='c-form-item' label={`${ind + 1}. Məhsul:`} name={['prfs', index, 'products', ind, 'product_id']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'product_id']), message: '' }]}>
                              <Select className='c-select' allowClear disabled>
                                {warehouseProductCategory?.map(item => (
                                  <Option className='c-select-option' key={item.uuid} value={item?.uuid}>{item?.name}</Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item className='c-form-item' label='Öhdəlik Məhsul:' name={['prfs', index, 'products', ind, 'bill_product_id']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'bill_product_id']), message: '' }]}>
                              <Select allowClear
                                disabled={disabledFields.Disabled(['prfs', index, 'products', ind, 'bill_product_id'])}
                                className='c-select'
                                showSearch
                                onChange={(value) => getCategoryPropertyDescription(value, index, ind)}
                                placeholder='Seçim edin'
                                filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}>
                                {warehouseProductCategory?.map(item => (
                                  <Option className='c-select-option' key={item.uuid} value={item.uuid}>{item.name}</Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item className='c-form-item' label='Təsnifatı:' name={['prfs', index, 'products', ind, 'description_id']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'description_id']), message: '' }]}>
                              <Select className='c-select' allowClear disabled
                                showSearch
                                filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                placeholder='Seçim edin'>
                                {dependenceState2?.[index]?.data?.[ind]?.map(item => (
                                  <Option className='c-select-option' key={item?.uuid} value={item?.uuid}>{item?.name}</Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item className='c-form-item' label='Öhdəlik Təsnifatı:' name={['prfs', index, 'products', ind, 'bill_description_id']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'bill_description_id']), message: '' }]}>
                              <Select
                                disabled={disabledFields.Disabled(['prfs', index, 'products', ind, 'bill_description_id'])}
                                className='c-select'
                                allowClear
                                showSearch
                                filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                placeholder='Seçim edin'>
                                {dependenceState?.[index]?.data?.[ind]?.map(item => (
                                  <Option className='c-select-option' key={item?.uuid} value={item?.uuid}>{item.name}</Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item className='c-form-item' label='Uçot hesabı:' name={['prfs', index, 'products', ind, 'accounting_account_id']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'accounting_account_id']), message: '' }]}>
                              <TreeSelect
                                disabled={disabledFields.Disabled(['prfs', index, 'products', ind, 'accounting_account_id'])}
                                className='c-select'
                                showSearch
                                placeholder="Please select"
                                allowClear
                                treeDefaultExpandAll
                                filterTreeNode={(input, option) => option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                              >
                                {renderTreeNodes(journalsTop)}
                              </TreeSelect>
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item className='c-form-item' label='Miqdar:' name={['prfs', index, 'products', ind, 'quantity']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'quantity']), message: '' }]}>
                              <Input className='c-input' disabled placeholder='Daxil edin' />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item className='c-form-item' label='Ölçü vahidi:' name={['prfs', index, 'products', ind, 'unit_idView']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'unit_id']), message: '' }]}>
                              <Select
                                className='c-select'
                                allowClear disabled
                                showSearch
                                filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                placeholder='Seçim edin'>
                                <Option className='c-select-option' value=''></Option>
                              </Select>
                            </Form.Item>
                            <Form.Item hidden={true} name={['prfs', index, 'products', ind, 'unit_id']}  >
                              <Input />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={12} style={{ height: '75px' }}>
                          <Col span={3}>
                            <Form.Item className='c-form-item' label='Öhdəlik miqdar:' name={['prfs', index, 'products', ind, 'bill_quantity']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'bill_quantity']), message: '' }]}>
                              <Input disabled={disabledFields.Disabled(['prfs', index, 'products', ind, 'bill_quantity'])} className='c-input' onChange={(e) => calculateHandleAmount(e, 'bill_quantity', index, ind)} type='number' min='0' placeholder='Daxil edin' />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item className='c-form-item' label='Öhdəlik ölçü vahidi:' name={['prfs', index, 'products', ind, 'bill_unit_id']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'bill_unit_id']), message: '' }]}>
                              <Select
                                disabled={disabledFields.Disabled(['prfs', index, 'products', ind, 'bill_unit_id'])}
                                className='c-select'
                                allowClear
                                showSearch
                                filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                placeholder='Seçim edin'>
                                {itemUnit?.map(item => (
                                  <Option className='c-select-option' key={item.uuid} value={item.uuid}>{item.name}</Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={2}>
                            <Form.Item className='c-form-item' label='Qiymət:' name={['prfs', index, 'products', ind, 'amount']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'amount']), message: '' }]}>
                              <Input className='c-input' disabled style={{ width: '100%', marginRight: '1rem' }} placeholder='Daxil edin' />
                            </Form.Item>
                          </Col>
                          <Col span={2}>
                            <Form.Item className='c-form-item' label='Məbləğ:' name={['prfs', index, 'products', ind, 'total_amount']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'total_amount']), message: '' }]}>
                              <Input className='c-input' disabled style={{ width: '100%', marginRight: '1rem' }} placeholder='Daxil edin' />
                            </Form.Item>
                          </Col>
                          <Col span={2}>
                            <Form.Item className='c-form-item' label='Öhdəlik qiymət:' name={['prfs', index, 'products', ind, 'bill_amount']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'bill_amount']), message: '' }]}>
                              <Input disabled={disabledFields.Disabled(['prfs', index, 'products', ind, 'bill_amount'])} className='c-input' onChange={(e) => calculateHandleAmount(e, 'bill_amount', index, ind)} type='number' min='0'
                                style={{ width: '100%', marginRight: '1rem' }} placeholder='Daxil edin' />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item className='c-form-item' label='Öhdəlik qiymət məbləğ:' name={['prfs', index, 'products', ind, 'calculate_amount']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'calculate_amount']), message: '' }]}>
                              <Input className='c-input' disabled style={{ width: '100%', marginRight: '1rem' }} placeholder='Daxil edin' />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item className='c-form-item' label='ƏDV dərəcəsi:' name={['prfs', index, 'products', ind, 'tax_idView']}>
                              {form.getFieldValue(['prfs', index, 'products', ind, 'tax_idView']) === null
                                ?
                                <b><i>ƏDV-dən azad</i></b>
                                :
                                <Select className='c-select' disabled>
                                  <Option className='c-select-option' value=''></Option>
                                </Select>
                              }
                            </Form.Item>
                            <Form.Item hidden={true} name={['prfs', index, 'products', ind, 'tax_id']} />
                          </Col>
                          <Col span={3}>
                            <Form.Item
                              className='c-form-item'
                              label='Öhdəlik ƏDV dərəcəsi:'
                              name={['prfs', index, 'products', ind, 'bill_tax_id']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'bill_tax_id']), message: '' }]}>
                              <Select
                                disabled={disabledFields.Disabled(['prfs', index, 'products', ind, 'bill_tax_id'])}
                                className='c-select'
                                allowClear
                                showSearch
                                onChange={(e, a) => handleCalcBillEDVAmount(e, a, index, ind)}
                                filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                placeholder='Seçim edin'>
                                {taxEdv?.map((item, i) => (
                                  <Option className='c-select-option' key={item.uuid} value={item.uuid}>{item.name} %</Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item className='c-form-item' label='ƏDV-li məbləğ:' name={['prfs', index, 'products', ind, 'total_tax_amount']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'total_tax_amount']), message: '' }]}>
                              <Input className='c-input' disabled />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={12} style={{ height: '75px' }}>
                          <Col span={3}>
                            <Form.Item className='c-form-item' label='Öhdəlik ƏDV-li məbləğ:' name={['prfs', index, 'products', ind, 'bill_total_tax_amount']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'bill_total_tax_amount']), message: '' }]}>
                              <Input className='c-input' disabled placeholder='Daxil edin' />
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item className='c-form-item' label='ƏDV uçotu:' name={['prfs', index, 'products', ind, 'tax_accounting_account_id']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'tax_accounting_account_id']), message: '' }]}>
                              <TreeSelect
                                disabled={disabledFields.Disabled(['prfs', index, 'products', ind, 'tax_accounting_account_id'])}
                                className='c-select'
                                showSearch
                                placeholder="Please select"
                                allowClear
                                treeDefaultExpandAll
                                filterTreeNode={(input, option) => option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                              >
                                {renderTreeNodes(journalsTop)}
                              </TreeSelect>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item label='Bank zəmanətinin müddəti:'>
                              <Space size={0}>
                                <Form.Item className='c-form-item' name={['prfs', index, 'products', ind, 'bank_duration']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'bank_duration']), message: '' }]}>
                                  <Input disabled={disabledFields.Disabled(['prfs', index, 'products', ind, 'bank_duration'])} className='c-input' min='0' type='number' placeholder='Daxil edin...' />
                                </Form.Item>
                                <Form.Item className='c-form-item' name={['prfs', index, 'products', ind, 'bank_duration_id']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'bank_duration_id']), message: '' }]}>
                                  <Select
                                    disabled={disabledFields.Disabled(['prfs', index, 'products', ind, 'bank_duration_id'])}
                                    className='c-select'
                                    allowClear
                                    showSearch
                                    filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                    placeholder='Seçim edin'>
                                    {bankTime?.map((item, i) => (
                                      <Option className='c-select-option' key={i} value={item.uuid}>{item.name}</Option>
                                    ))}
                                  </Select>
                                </Form.Item>
                              </Space>
                            </Form.Item>
                          </Col>
                          {/*  */}
                          <Col span={4}>
                            <Form.Item label='Təchizatçı zəmanətinin müddəti:'>
                              <Space size={0}>
                                <Form.Item className='c-form-item' name={['prfs', index, 'products', ind, 'supplier_guarantee_date_duration']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'supplier_guarantee_date_duration']), message: '' }]}>
                                  <Input disabled={disabledFields.Disabled(['prfs', index, 'products', ind, 'supplier_guarantee_date_duration'])} className='c-input' min='0' type='number' placeholder='Daxil edin...' />
                                </Form.Item>
                                <Form.Item className='c-form-item' name={['prfs', index, 'products', ind, 'supplier_duration_time_id']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'supplier_duration_time_id']), message: '' }]}>
                                  <Select
                                    disabled={disabledFields.Disabled(['prfs', index, 'products', ind, 'supplier_duration_time_id'])}
                                    className='c-select'
                                    allowClear
                                    showSearch
                                    filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                    placeholder='Seçim edin'>
                                    {bankTime?.map((item, i) => (
                                      <Option className='c-select-option' key={i} value={item.uuid}>{item.name}</Option>
                                    ))}
                                  </Select>
                                </Form.Item>
                              </Space>
                            </Form.Item>
                          </Col>
                          {/*  */}
                          <Col span={3}>
                            <Form.Item className='c-form-item' label='Qəbul edilən öhdəlik:' name={['prfs', index, 'products', ind, 'accepted_commitment']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'accepted_commitment']), message: '' }]}>
                              <Input disabled={disabledFields.Disabled(['prfs', index, 'products', ind, 'accepted_commitment'])} className='c-input' min='0' type='number' placeholder='Daxil edin' />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item className='c-form-item' label='Məhsulun miqdar qalığı:' name={['prfs', index, 'products', ind, 'product_remainder_quantity']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'product_remainder_quantity']), message: '' }]}>
                              <Input className='c-input' disabled min='0' type='number' placeholder='Daxil edin' />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item className='c-form-item' label='Qeyd:' name={['prfs', index, 'products', ind, 'note']} rules={[{ required: requiredFields.Required(['prfs', index, 'products', ind, 'note']), message: '' }]}>
                              <Input className='c-input' disabled />
                            </Form.Item>
                          </Col>
                        </Row>
                        <hr />
                      </Col >
                    </Row>
                  ))}
                </div>
              </Col>
            </Panel>
          ))}
        </Collapse>
      }
      <TotalPrices additionalEdvAmount={prfEdvState} additionalTotalAmount={prfTotalState} />
    </div >
  )
}
export default Index