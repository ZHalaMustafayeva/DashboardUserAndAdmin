import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { Row, Col, Button, Form, Input, Select, Switch, TreeSelect, Space, Typography, message } from 'antd';
import API from '../../../../API'
import styles from './style.module.scss';
import TotalPrices from '../TotalPrices';
import { BillInsertContext, useContext } from '../../Context/context';
const { Option } = Select;
const { Title } = Typography;
let valArrTotalAmount = [];
let valArrEDVAmount = [];
let sumTotalAmount;
let sumEDVAmount;
const Index = () => {
    const {
        distribution, novState, setCostTab, suppliers, taxEdv, checkbox, setCheckbox, renderTreeNodes, journalsTop, form,
        additionalTotalAmount, setAdditionalTotalAmount, additionalEdvAmount, setAdditionalEdvAmount, targetKeys, allPrf
    } = useContext(BillInsertContext)
    const setItemAdditional = (value) => form.setFields(value);
    const handleDeleteAddition = (val, i) => {
        if (val?.uuid) {
            let data = {
                "bill_expenses_id": null,
                "prf_expenses_id": val?.uuid
            }
            API.Finance.Bill.additionExpensesDelete(data).then(res => {
                delete checkbox[i]
                setCheckbox([...checkbox])
            })
        } else {
            delete checkbox[i]
            setCheckbox([...checkbox])
        }
        delete valArrTotalAmount[i]
        delete valArrEDVAmount[i]
        sumTotalAmount = valArrTotalAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        sumEDVAmount = valArrEDVAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setAdditionalTotalAmount(sumTotalAmount);
        setAdditionalEdvAmount(sumEDVAmount);
    }
    //! CalculateFunc Start---------------------------------------------------------------------------------
    const calculateFunc = (e, name, index) => {
        if (parseInt(e.target.value) < 0) {
            setItemAdditional([{ name: ['addition_expenses', index, name], value: null, errors: null }])
        } else if (e.target.value.startsWith('0')) {
            setItemAdditional([{ name: ['addition_expenses', index, name], value: null, errors: null }])
        }
        // //?---------------------------------------------------
        let quantity = form.getFieldValue(['addition_expenses', index, 'quantity']) || 0;
        let price = form.getFieldValue(['addition_expenses', index, 'amount']) || 0;
        if (quantity === 0 || price === 0) {
            setItemAdditional([{ name: ['addition_expenses', index, 'amountUI'], value: 0, errors: null }])
            setItemAdditional([{ name: ['addition_expenses', index, 'tax_id_value'], value: 0, errors: null }])
        }
        if (quantity || price) {
            setItemAdditional([{ name: ['addition_expenses', index, 'amountUI'], value: quantity * price, errors: null }])
            if (form.getFieldValue(['addition_expenses', index, 'tax_id'])) {
                let cCalcAmount = form.getFieldValue(['addition_expenses', index, 'amountUI'])
                const filtered = taxEdv.filter(a => a.uuid === form.getFieldValue(['addition_expenses', index, 'tax_id']) && a.name)
                let resCalc = cCalcAmount * filtered[0]?.name / 100
                setItemAdditional([{ name: ['addition_expenses', index, 'tax_id_value'], value: resCalc, errors: null }])
            } else {
                setItemAdditional([{ name: ['addition_expenses', index, 'tax_id_value'], value: 0, errors: null }])
            }
        }
        checkbox.forEach((val, index) => {
            if (val && val.status) {
                valArrTotalAmount[index] = form.getFieldValue(['addition_expenses', index, 'amountUI'])
                valArrEDVAmount[index] = form.getFieldValue(['addition_expenses', index, 'tax_id_value'])
            } else if (val && !val.status) {
                valArrTotalAmount[index] = 0
                valArrEDVAmount[index] = 0
            }
        })
        sumTotalAmount = valArrTotalAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        sumEDVAmount = valArrEDVAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setAdditionalTotalAmount(sumTotalAmount);
        setAdditionalEdvAmount(sumEDVAmount);
    };
    const handleCalcBillEDVAmount = (_, val, index) => {
        if (val === undefined) {
            setItemAdditional([{ name: ['addition_expenses', index, 'tax_id_value'], value: 0, errors: null }])
        } else {
            let t = form.getFieldValue(['addition_expenses', index, 'amountUI']) || 0;
            setItemAdditional([{ name: ['addition_expenses', index, 'tax_id_value'], value: val.children * t / 100, errors: null }])
        };
        checkbox.forEach((val, index) => {
            if (val && val.status) {
                valArrEDVAmount[index] = form.getFieldValue(['addition_expenses', index, 'tax_id_value'])
            } else if (val && !val.status) {
                valArrEDVAmount[index] = 0
            }
        })
        sumTotalAmount = valArrTotalAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        sumEDVAmount = valArrEDVAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setAdditionalTotalAmount(sumTotalAmount);
        setAdditionalEdvAmount(sumEDVAmount);
    };
    //! CalculateFunc End-----------------------------------------------------------------------------------
    useEffect(() => {
        valArrEDVAmount = []
        valArrTotalAmount = []
        checkbox.forEach((val, index) => {
            if (val && val.status) {
                valArrTotalAmount[index] = form.getFieldValue(['addition_expenses', index, 'amountUI']) || 0
                valArrEDVAmount[index] = form.getFieldValue(['addition_expenses', index, 'tax_id_value']) || 0
            } else if (val && !val.status) {
                valArrTotalAmount[index] = 0
                valArrEDVAmount[index] = 0
            }
        })
        sumTotalAmount = valArrTotalAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        sumEDVAmount = valArrEDVAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setAdditionalTotalAmount(sumTotalAmount);
        setAdditionalEdvAmount(sumEDVAmount);
    }, [checkbox])
    console.log('targetKeys', targetKeys);
    console.log('allPrf', allPrf);
    return (
        <Row style={{ width: '100%' }}>
            {checkbox.map((val, i) => (
                val && val.status &&
                <Col onClick={() => setCostTab(false)} key={i} className={styles.costParent}>
                    <Title className={styles.costTitle}>{val?.prf?.name ?? 'Yeni Əlavə Xərc'}</Title>
                    <Row gutter={12}>
                        <Col span={5}>
                            <Form.Item name={['addition_expenses', i, 'prf_id']} hidden></Form.Item>
                            <Form.Item className='c-form-item' label='Kontragent:' name={['addition_expenses', i, 'supplier_id']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                <Select className='c-select' allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                    {suppliers.map((a) => (
                                        <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Növ:' name={['addition_expenses', i, 'addition_expenses_type_id']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]} >
                                <Select className='c-select' filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                    {novState.map((a) => (
                                        <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='ƏX Bölünmə:' name={['addition_expenses', i, 'distribution_id']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]} >
                                <Select className='c-select' filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                    {distribution.map((a) => (
                                        <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item className='c-form-item' label='Miqdar:' name={['addition_expenses', i, 'quantity']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                <Input type='number' onChange={(e) => calculateFunc(e, 'quantity', i)} className='c-input' placeholder='Daxil edin' />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Qiymət:' name={['addition_expenses', i, 'amount']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                <Input type='number' onChange={(e) => calculateFunc(e, 'amount', i)} className='c-input' placeholder='Daxil edin' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Məbləğ:' name={['addition_expenses', i, 'amountUI']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                <Input disabled className='c-input' placeholder='Daxil edin' />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item className='c-form-item' label={
                                <span style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>Öhdəlik ƏDV dərəcəsi:</span>
                                    <Switch
                                        checked={val.check}
                                        onChange={(checked) => {
                                            valArrEDVAmount[i] = 0;
                                            console.log(valArrEDVAmount);
                                            sumEDVAmount = valArrEDVAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                                            if (val) {
                                                setItemAdditional([{ name: ['addition_expenses', i, 'tax_id'], value: null, errors: null }])
                                                setItemAdditional([{ name: ['addition_expenses', i, 'tax_id_value'], value: null, errors: null }])
                                            }
                                            setAdditionalEdvAmount(sumEDVAmount)
                                            checkbox[i].check = checked
                                            setCheckbox([...checkbox])
                                        }} size='small' />
                                </span>}>
                                {checkbox?.[i]?.check === true ?
                                    <div style={{ display: 'flex' }}>
                                        <Form.Item style={{ width: '50%' }} name={['addition_expenses', i, 'tax_id']} rules={[{ required: checkbox[i].check, message: 'Zəhmət olmasa doldurun...' }]} >
                                            <Select
                                                onChange={(e, a) => handleCalcBillEDVAmount(e, a, i)}
                                                className='c-select' filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                                {taxEdv?.map(item => (
                                                    <Option className='c-select-option' key={item.uuid} value={item.uuid}>{item.name}</Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item style={{ width: '50%' }} className='c-form-item' name={['addition_expenses', i, 'tax_id_value']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                            <Input disabled className='c-input' placeholder='Daxil edin' />
                                        </Form.Item>
                                    </div>
                                    : <b><i>ƏDV-dən azad</i></b>}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item className='c-form-item' label='Əlavə xərc nömrəsi:' name={['addition_expenses', i, 'addition_expenses_number']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                <Input className='c-input' placeholder='Daxil edin' />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Uçot hesabı:' name={['addition_expenses', i, 'chart_of_account']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                <TreeSelect
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
                            <Form.Item className='c-form-item' label='Ədv vergi uçotu:' name={['addition_expenses', i, 'tax_chart_of_account_id']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                <TreeSelect
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
                        <Col span={2}>
                            <Form.Item label={<span></span>}>
                                <Space style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    {checkbox.length > 0 &&
                                        <Button onClick={() => handleDeleteAddition(val, i)} style={{ flex: '1' }} danger type='dashed'>Sil</Button>
                                    }
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            ))}
            <Col span={24} style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }} className='d-flex justify-content-center'>
                <Button type='dashed' style={{ height: '38px', display: 'flex', alignItems: 'center' }}
                    onClick={() => {
                        if (allPrf === 'selected' && targetKeys.length !== 0) {
                            checkbox.push({ status: true })
                            setCheckbox([...checkbox])
                        } else if (allPrf === 'fragmented') {
                            checkbox.push({ status: true })
                            setCheckbox([...checkbox])
                        } else {
                            message.warning('Prf seçilməmiş əlavə xərc qeyd etmək mümkün deyil!')
                        }
                    }}
                >
                    <AiOutlinePlus />
                </Button>
            </Col>
            <TotalPrices additionalTotalAmount={additionalTotalAmount} additionalEdvAmount={additionalEdvAmount} />
        </Row>
    )
}

export default Index