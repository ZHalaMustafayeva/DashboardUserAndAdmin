import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { Row, Col, Button, Form, Input, Select, TreeSelect, Space, Typography, message } from 'antd';
import API from '../../../../API'
import styles from './style.module.scss'
import { BillUpdateContext, useContext } from '../../Context/context';
import TotalPrices from '../TotalPrices'
const { Option } = Select;
const { Title } = Typography;
let valArrTotalAmount = [];
let valArrTotalAmount1 = [];
let valArrEDVAmount = [];
let valArrEDVAmount1 = [];
let sumTotalAmount;
let sumTotalAmount1;
let sumEDVAmount;
let sumEDVAmount1;
const Index = () => {
    const {
        allPrf, additionValues, setAdditionValues, setAdditionalExpensesProducts, tabState, requiredFields, disabledFields,
        additionalExpensesProducts, suppliers, taxEdv, renderTreeNodes, journalsTop, setItem, form, targetKeys, statusType
    } = useContext(BillUpdateContext);
    const [additionalTotalAmount, setAdditionalTotalAmount] = useState(0)
    const [additionalEdvAmount, setAdditionalEdvAmount] = useState(0)
    const setItemAdditional = (value) => form.setFields(value);
    const [distribution, setDistribution] = useState([]);
    const [novState, setNovState] = useState([]);
    const getDistributionFunc = () => {
        API.Procurement.Picklist.distribution().then(res => {
            if (res.status === 200) {
                setDistribution(res.data.data)
            }
        })
    };
    const getNovFunc = () => {
        API.Procurement.Picklist.list().then(res => {
            if (res.status === 200) {
                setNovState(res.data.data)
            }
        })
    };
    const handleDeleteAdditionExpenses = (val, i) => {
        let data = {
            "bill_expenses_id": null,
            "prf_expenses_id": val?.uuid
        }
        API.Finance.Bill.additionExpensesDelete(data).then(res => {
            delete additionalExpensesProducts[i]
            setAdditionalExpensesProducts([...additionalExpensesProducts])
        })
        delete valArrTotalAmount[i]
        delete valArrEDVAmount[i]
        sumTotalAmount = valArrTotalAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        sumEDVAmount = valArrEDVAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setAdditionalTotalAmount(sumTotalAmount);
        setAdditionalEdvAmount(sumEDVAmount);
    };
    const handleDeleteAddition = (val, i) => {
        console.log(val.uuid);
        if (val?.uuid) {
            let data = {
                "bill_expenses_id": val?.uuid,
                "prf_expenses_id": null
            }
            API.Finance.Bill.additionExpensesDelete(data).then(res => {
                delete additionValues[i]
                setAdditionValues([...additionValues])
            })
        } else {
            delete additionValues[i]
            setAdditionValues([...additionValues])
        }
        delete valArrTotalAmount[i]
        delete valArrEDVAmount[i]
        sumTotalAmount = valArrTotalAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        sumEDVAmount = valArrEDVAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setAdditionalTotalAmount(sumTotalAmount);
        setAdditionalEdvAmount(sumEDVAmount);
    };
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
        additionValues.forEach((val, index) => {
            valArrTotalAmount[index] = form.getFieldValue(['addition_expenses', index, 'amountUI'])
            valArrEDVAmount[index] = form.getFieldValue(['addition_expenses', index, 'tax_id_value'])
        })
        console.log(valArrTotalAmount);
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
            setItemAdditional([{ name: ['addition_expenses', index, 'tax_id_value'], value: val.children[0] * t / 100, errors: null }])
        };
        additionValues.forEach((val, index) => {
            valArrEDVAmount[index] = form.getFieldValue(['addition_expenses', index, 'tax_id_value'])
        })
        sumTotalAmount = valArrTotalAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        sumEDVAmount = valArrEDVAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setAdditionalTotalAmount(sumTotalAmount);
        setAdditionalEdvAmount(sumEDVAmount);
    };
    //! CalculateFunc End-----------------------------------------------------------------------------------
    useEffect(() => {
        getDistributionFunc()
        getNovFunc()
    }, [])
    // useEffect(() => {
    //     setAdditionValues(additionValues.filter(el => el))
    //     if (tabState === '3') {
    //         let temp = [...additionValues]
    //         temp = temp?.filter(el => el)
    //         additionalExpensesProducts.forEach((elem, index) => {
    //             setItem({ 'addition_expenses': { [index]: { 'uuid': null } } })
    //             setItem({ 'addition_expenses': { [index]: { 'prf_id': elem?.prf?.uuid } } })
    //             setItem({ 'addition_expenses': { [index]: { 'supplier_id': elem?.supplier?.uuid || null } } })
    //             setItem({ 'addition_expenses': { [index]: { 'addition_expenses_type_id': elem?.addition_expenses_type?.uuid || null } } })
    //             setItem({ 'addition_expenses': { [index]: { 'addition_expenses_number': elem?.addition_expenses_number } } })
    //             setItem({ 'addition_expenses': { [index]: { 'distribution_id': elem?.distribution?.uuid || null } } })
    //             setItem({ 'addition_expenses': { [index]: { 'amount': elem?.amount ?? 0 } } })
    //             setItem({ 'addition_expenses': { [index]: { 'quantity': elem?.quantity ?? 0 } } })
    //             setItem({ 'addition_expenses': { [index]: { 'amountUI': (elem?.amount ?? null) * (elem?.quantity) } } })
    //             setItem({ 'addition_expenses': { [index]: { 'chart_of_account': elem?.chart_account?.uuid } } })
    //             setItem({ 'addition_expenses': { [index]: { 'tax_chart_of_account_id': elem?.tax_chart_account?.uuid } } })
    //             setItem({ 'addition_expenses': { [index]: { 'tax_id': elem?.tax?.uuid || null } } })
    //             setItem({ 'addition_expenses': { [index]: { 'tax_id_value': (elem?.amount ?? 0) * (elem?.quantity ?? 0) * (elem?.tax?.tax_value ?? 0) / 100 } } })
    //             temp.unshift(undefined)
    //         })
    //         setAdditionValues([...temp])
    //         temp.forEach((elem, index) => {
    //             if (elem) {
    //                 setItem({ 'addition_expenses': { [index]: { 'uuid': elem?.uuid } } })
    //                 setItem({ 'addition_expenses': { [index]: { 'prf_id': null } } })
    //                 setItem({ 'addition_expenses': { [index]: { 'supplier_id': elem?.supplier?.uuid ?? null } } })
    //                 setItem({ 'addition_expenses': { [index]: { 'addition_expenses_type_id': elem?.type?.uuid ?? null } } })
    //                 setItem({ 'addition_expenses': { [index]: { 'addition_expenses_number': elem?.addition_expenses_number ?? null } } })
    //                 setItem({ 'addition_expenses': { [index]: { 'distribution_id': elem?.distribution?.uuid ?? null } } })
    //                 setItem({ 'addition_expenses': { [index]: { 'amount': elem?.amount ?? 0 } } })
    //                 setItem({ 'addition_expenses': { [index]: { 'quantity': elem?.quantity ?? 0 } } })
    //                 setItem({ 'addition_expenses': { [index]: { 'amountUI': (elem?.amount ?? null) * (elem?.quantity) } } })
    //                 setItem({ 'addition_expenses': { [index]: { 'chart_of_account': elem?.chart_account?.uuid } } })
    //                 setItem({ 'addition_expenses': { [index]: { 'tax_chart_of_account_id': elem?.tax_chart_account?.uuid } } })
    //                 setItem({ 'addition_expenses': { [index]: { 'tax_id': elem?.tax?.uuid } } })
    //                 setItem({ 'addition_expenses': { [index]: { 'tax_id_value': (elem?.amount ?? 0) * (elem?.quantity ?? 0) * (elem?.tax?.tax_value ?? 0) / 100 } } })
    //             }
    //         })
    //     }
    // }, [tabState])
    useEffect(() => {
        valArrEDVAmount = []
        valArrTotalAmount = []
        additionValues.forEach((val, index) => {
            if (val) {
                valArrTotalAmount[index] = form.getFieldValue(['addition_expenses', index, 'amountUI']) || 0
                valArrEDVAmount[index] = form.getFieldValue(['addition_expenses', index, 'tax_id_value']) || 0
            }
        })
        additionalExpensesProducts.forEach((val, index) => {
            if (val && val.status) {
                valArrTotalAmount1[index] = form.getFieldValue(['addition_expenses', index, 'amountUI']) || 0
                valArrEDVAmount1[index] = form.getFieldValue(['addition_expenses', index, 'tax_id_value']) || 0
            } else if (val && !val.status) {
                valArrTotalAmount1[index] = 0
                valArrEDVAmount1[index] = 0
            }
        })
        sumTotalAmount = valArrTotalAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        sumEDVAmount = valArrEDVAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        sumTotalAmount1 = valArrTotalAmount1.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        sumEDVAmount1 = valArrEDVAmount1.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setAdditionalTotalAmount(sumTotalAmount + sumTotalAmount1);
        setAdditionalEdvAmount(sumEDVAmount + sumEDVAmount1);
    }, [additionValues, additionalExpensesProducts])
    return (
        <Row style={{ width: '100%' }}>
            {allPrf === 'selected' && additionalExpensesProducts.map((val, i) => (
                val && val.status &&
                <Col key={i} className={styles.costParent}>
                    <Title className={styles.costTitle}>{val?.prf?.name ?? 'Yeni Əlavə Xərc'}</Title>
                    <Row gutter={12}>
                        <Col span={5}>
                            <Form.Item name={['addition_expenses', i, 'uuid']} hidden></Form.Item>
                            <Form.Item name={['addition_expenses', i, 'prf_id']} hidden></Form.Item>
                            <Form.Item className='c-form-item' label='Kontragent:' name={['addition_expenses', i, 'supplier_id']}
                                rules={[{ required: requiredFields.Required(['addition_expenses', i, 'supplier_id']), message: 'Zəhmət olmasa doldurun...' }]}>
                                <Select disabled={disabledFields.Disabled(['addition_expenses', i, 'supplier_id'])} className='c-select' allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                    {suppliers.map((a) => (
                                        <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Növ:' name={['addition_expenses', i, 'addition_expenses_type_id']}
                                rules={[{ required: requiredFields.Required(['addition_expenses', i, 'addition_expenses_type_id']), message: 'Zəhmət olmasa doldurun...' }]} >
                                <Select disabled={disabledFields.Disabled(['addition_expenses', i, 'addition_expenses_type_id'])} className='c-select' filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                    {novState.map((a) => (
                                        <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='ƏX Bölünmə:' name={['addition_expenses', i, 'distribution_id']}
                                rules={[{ required: requiredFields.Required(['addition_expenses', i, 'distribution_id']), message: 'Zəhmət olmasa doldurun...' }]} >
                                <Select disabled={disabledFields.Disabled(['addition_expenses', i, 'distribution_id'])} className='c-select' filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                    {distribution.map((a) => (
                                        <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Miqdar:' name={['addition_expenses', i, 'quantity']}
                                rules={[{ required: requiredFields.Required(['addition_expenses', i, 'quantity']), message: 'Zəhmət olmasa doldurun...' }]}>
                                <Input disabled={disabledFields.Disabled(['addition_expenses', i, 'quantity'])} onChange={(e) => calculateFunc(e, 'quantity', i)} type='number' className='c-input' placeholder='Daxil edin' />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item className='c-form-item' label='Qiymət:' name={['addition_expenses', i, 'amount']}
                                rules={[{ required: requiredFields.Required(['addition_expenses', i, 'amount']), message: 'Zəhmət olmasa doldurun...' }]}>
                                <Input disabled={disabledFields.Disabled(['addition_expenses', i, 'amount'])} onChange={(e) => calculateFunc(e, 'amount', i)} type='number' className='c-input' placeholder='Daxil edin' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Məbləğ:' name={['addition_expenses', i, 'amountUI']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                <Input disabled={disabledFields.Disabled(['addition_expenses', i, 'amountUI'])} type='number' className='c-input' placeholder='Daxil edin' />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label='Öhdəlik ƏDV dərəcəsi:'>
                                <div style={{ display: 'flex' }}>
                                    <Form.Item style={{ width: '50%' }} className='c-form-item' name={['addition_expenses', i, 'tax_id']}
                                        rules={[{ required: requiredFields.Required(['addition_expenses', i, 'tax_id']), message: 'Zəhmət olmasa doldurun...' }]} >
                                        <Select disabled={disabledFields.Disabled(['addition_expenses', i, 'tax_id'])} onChange={(e, a) => handleCalcBillEDVAmount(e, a, i)} className='c-select' filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                            {taxEdv?.map(item => (
                                                <Option className='c-select-option' key={item.uuid} value={item.uuid}>{item.name} %</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item style={{ width: '50%' }} className='c-form-item' name={['addition_expenses', i, 'tax_id_value']}
                                        rules={[{ required: requiredFields.Required(['addition_expenses', i, 'tax_id_value']), message: 'Zəhmət olmasa doldurun...' }]} >
                                        <Input disabled className='c-input' placeholder='Daxil edin...' />
                                    </Form.Item>
                                </div>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item className='c-form-item' label='Əlavə xərc nömrəsi:' name={['addition_expenses', i, 'addition_expenses_number']}
                                rules={[{ required: requiredFields.Required(['addition_expenses', i, 'addition_expenses_number']), message: 'Zəhmət olmasa doldurun...' }]}>
                                <Input disabled={disabledFields.Disabled(['addition_expenses', i, 'addition_expenses_number'])} className='c-input' placeholder='Daxil edin' />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Uçot hesabı:' name={['addition_expenses', i, 'chart_of_account']}
                                rules={[{ required: requiredFields.Required(['addition_expenses', i, 'chart_of_account']), message: 'Zəhmət olmasa doldurun...' }]}>
                                <TreeSelect
                                    disabled={disabledFields.Disabled(['addition_expenses', i, 'chart_of_account'])}
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
                            <Form.Item className='c-form-item' label='Ədv vergi uçotu:' name={['addition_expenses', i, 'tax_chart_of_account_id']}
                                rules={[{ required: requiredFields.Required(['addition_expenses', i, 'tax_chart_of_account_id']), message: 'Zəhmət olmasa doldurun...' }]}>
                                <TreeSelect
                                    disabled={disabledFields.Disabled(['addition_expenses', i, 'tax_chart_of_account_id'])}
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
                        {(statusType?.key !== 'draft' && statusType?.key !== 'pending') ?
                            null
                            :
                            <Col span={2}>
                                <Form.Item label={<span></span>}>
                                    <Space style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                        <Button onClick={() => handleDeleteAdditionExpenses(val, i)} style={{ flex: '1' }} danger type='dashed'>Sil</Button>
                                    </Space>
                                </Form.Item>
                            </Col>
                        }
                    </Row>
                </Col>
            ))}
            <hr />
            {additionValues.map((val, i) => (
                val &&
                <Col key={i} className={styles.costParent}>
                    <Title className={styles.costTitle}>{val?.uuid ? 'Öhdəlik Əlavə Xərc' : 'Yeni Əlavə Xərc'}</Title>
                    <Row gutter={12}>
                        <Col span={5}>
                            <Form.Item name={['addition_expenses', i, 'uuid']} hidden></Form.Item>
                            <Form.Item name={['addition_expenses', i, 'prf_id']} hidden></Form.Item>
                            <Form.Item className='c-form-item' label='Kontragent:' name={['addition_expenses', i, 'supplier_id']}
                                rules={[{ required: requiredFields.Required(['addition_expenses', i, 'supplier_id']), message: 'Zəhmət olmasa doldurun...' }]}>
                                <Select disabled={disabledFields.Disabled(['addition_expenses', i, 'supplier_id'])} className='c-select' allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                    {suppliers.map((a) => (
                                        <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Növ:' name={['addition_expenses', i, 'addition_expenses_type_id']}
                                rules={[{ required: requiredFields.Required(['addition_expenses', i, 'addition_expenses_type_id']), message: 'Zəhmət olmasa doldurun...' }]} >
                                <Select disabled={disabledFields.Disabled(['addition_expenses', i, 'addition_expenses_type_id'])} className='c-select' filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                    {novState.map((a) => (
                                        <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='ƏX Bölünmə:' name={['addition_expenses', i, 'distribution_id']}
                                rules={[{ required: requiredFields.Required(['addition_expenses', i, 'distribution_id']), message: 'Zəhmət olmasa doldurun...' }]} >
                                <Select disabled={disabledFields.Disabled(['addition_expenses', i, 'distribution_id'])} className='c-select' filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                    {distribution.map((a) => (
                                        <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Miqdar:' name={['addition_expenses', i, 'quantity']}
                                rules={[{ required: requiredFields.Required(['addition_expenses', i, 'quantity']), message: 'Zəhmət olmasa doldurun...' }]}>
                                <Input disabled={disabledFields.Disabled(['addition_expenses', i, 'quantity'])} onChange={(e) => calculateFunc(e, 'quantity', i)} type='number' className='c-input' placeholder='Daxil edin' />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item className='c-form-item' label='Qiymət:' name={['addition_expenses', i, 'amount']}
                                rules={[{ required: requiredFields.Required(['addition_expenses', i, 'amount']), message: 'Zəhmət olmasa doldurun...' }]}>
                                <Input disabled={disabledFields.Disabled(['addition_expenses', i, 'amount'])} onChange={(e) => calculateFunc(e, 'amount', i)} type='number' className='c-input' placeholder='Daxil edin' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Məbləğ:' name={['addition_expenses', i, 'amountUI']}
                                rules={[{ required: requiredFields.Required(['addition_expenses', i, 'amountUI']), message: 'Zəhmət olmasa doldurun...' }]}>
                                <Input disabled onChange={(e) => {
                                    if (e.target.value < 0) {
                                        setItem({ 'addition_expenses': { [i]: { 'amount': null } } })
                                    } else if (e.target.value.startsWith('0')) {
                                        setItem({ 'addition_expenses': { [i]: { 'amount': null } } })
                                    }
                                }} type='number' className='c-input' placeholder='Daxil edin' />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label='Öhdəlik ƏDV dərəcəsi:'>
                                <div style={{ display: 'flex' }}>
                                    <Form.Item style={{ width: '50%' }} className='c-form-item' name={['addition_expenses', i, 'tax_id']}
                                        rules={[{ required: requiredFields.Required(['addition_expenses', i, 'tax_id']), message: 'Zəhmət olmasa doldurun...' }]} >
                                        <Select disabled={disabledFields.Disabled(['addition_expenses', i, 'tax_id'])} onChange={(e, a) => handleCalcBillEDVAmount(e, a, i)} className='c-select' filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                            {taxEdv?.map(item => (
                                                <Option className='c-select-option' key={item.uuid} value={item.uuid}>{item.name} %</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item style={{ width: '50%' }} className='c-form-item' name={['addition_expenses', i, 'tax_id_value']}
                                        rules={[{ required: requiredFields.Required(['addition_expenses', i, 'tax_id_value']), message: 'Zəhmət olmasa doldurun...' }]} >
                                        <Input disabled className='c-input' placeholder='Daxil edin...' />
                                    </Form.Item>
                                </div>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item className='c-form-item' label='Əlavə xərc nömrəsi:' name={['addition_expenses', i, 'addition_expenses_number']}
                                rules={[{ required: requiredFields.Required(['addition_expenses', i, 'addition_expenses_number']), message: 'Zəhmət olmasa doldurun...' }]}>
                                <Input disabled={disabledFields.Disabled(['addition_expenses', i, 'addition_expenses_number'])} onChange={(e) => {
                                    if (e.target.value < 0) {
                                        setItem({ 'addition_expenses': { [i]: { 'addition_expenses_number': null } } })
                                    } else if (e.target.value.startsWith('0')) {
                                        setItem({ 'addition_expenses': { [i]: { 'addition_expenses_number': null } } })
                                    }
                                }} className='c-input' placeholder='Daxil edin' />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Uçot hesabı:' name={['addition_expenses', i, 'chart_of_account']}
                                rules={[{ required: requiredFields.Required(['addition_expenses', i, 'chart_of_account']), message: 'Zəhmət olmasa doldurun...' }]}>
                                <TreeSelect
                                    disabled={disabledFields.Disabled(['addition_expenses', i, 'chart_of_account'])}
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
                            <Form.Item className='c-form-item' label='Ədv vergi uçotu:' name={['addition_expenses', i, 'tax_chart_of_account_id']}
                                rules={[{ required: requiredFields.Required(['addition_expenses', i, 'tax_chart_of_account_id']), message: 'Zəhmət olmasa doldurun...' }]}>
                                <TreeSelect
                                    disabled={disabledFields.Disabled(['addition_expenses', i, 'tax_chart_of_account_id'])}
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
                        {(statusType?.key !== 'draft' && statusType?.key !== 'pending') ?
                            null
                            :
                            <Col span={2}>
                                <Form.Item label={<span></span>}>
                                    <Space style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                        <Button onClick={() => handleDeleteAddition(val, i)} style={{ flex: '1' }} danger type='dashed'>Sil</Button>
                                    </Space>
                                </Form.Item>
                            </Col>
                        }
                    </Row>
                </Col>
            ))}
            {(statusType?.key !== 'draft' && statusType?.key !== 'pending') ?
                null
                :
                <Col span={24} style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }} className='d-flex justify-content-center'>
                    <Button onClick={() => {
                        if ((allPrf === 'selected' && targetKeys.length !== 0) || allPrf === 'fragmented') {
                            setAdditionValues([...additionValues, {}]);
                        } else {
                            message.warning('Prf seçilməmiş əlavə xərc qeyd etmək mümkün deyil!');
                        }
                    }} type='dashed' style={{ height: '38px', display: 'flex', alignItems: 'center' }} >
                        <AiOutlinePlus />
                    </Button>
                </Col>
            }
            <TotalPrices additionalTotalAmount={additionalTotalAmount} additionalEdvAmount={additionalEdvAmount} />
        </Row>
    )
}

export default Index