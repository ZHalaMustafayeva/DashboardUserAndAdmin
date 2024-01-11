import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Form, Input, Select, TreeSelect, Space } from 'antd';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import API from '../../../../API'
import { BillUpdateContext, useContext } from '../../Context/context';
import TotalPrices from '../TotalPrices'
const { Option } = Select;
let newTotalAmount = [];
let newEdvAmount = [];
let sumNewTotal;
let sumNewEdv;

let dependenceDataNew = [{ data: [] }]
const Index = () => {
    const {
        allPrf, setItem, newProductTab, setNewProductTab, statusType,
        form, journalsTop, renderTreeNodes, warehouseProductCategory,
        bankTime, taxEdv, itemUnit, requiredFields, disabledFields
    } = useContext(BillUpdateContext);
    const [dependenceStateNew, setDependenceStateNew] = useState([{}]);
    const [newTotalState, setNewTotalState] = useState(0);
    const [newEdvState, setNewEdvState] = useState(0);
    const getTesnifatNew = (value, ind) => {
        form.setFieldsValue({ 'prfs': { 0: { 'products': { [ind]: { 'description_id': null } } } } })
        const uuid = { product_attribute_id: form.getFieldValue(['prfs', 0, 'products', ind, 'product_id']) }
        if (value !== undefined) {
            API.Warehouse.categoryPropertyDescription.list(uuid).then(res => {
                dependenceDataNew[0].data[ind] = res.data.data
                setDependenceStateNew([...dependenceDataNew])
            })
        } else {
            dependenceDataNew[0].data[ind] = []
            setDependenceStateNew([...dependenceDataNew])
        }
    };
    useEffect(() => {
        form.setFieldsValue({ 'prfs': { 0: { 'id': null } } })
        newProductTab?.forEach((el, ind) => {
            if (el.uuid) {
                setItem({ 'prfs': { [0]: { 'products': { [ind]: { 'uuid': el?.uuid ?? null } } } } })
                setItem({ 'prfs': { [0]: { 'products': { [ind]: { 'product_id': el?.description?.attribute?.uuid ?? null } } } } })
                getTesnifatNew('a', ind)
                setItem({ 'prfs': { [0]: { 'products': { [ind]: { 'description_id': el?.description?.uuid ?? null } } } } })
                setItem({ 'prfs': { [0]: { 'products': { [ind]: { 'accounting_account_id': el?.chart_account?.uuid ?? null } } } } })
                setItem({ 'prfs': { [0]: { 'products': { [ind]: { 'unit_id': el?.unit?.uuid } } } } })
                setItem({ 'prfs': { [0]: { 'products': { [ind]: { 'quantity': el?.quantity } } } } })
                setItem({ 'prfs': { [0]: { 'products': { [ind]: { 'amount': el?.amount } } } } })
                let quantityV = form.getFieldValue(['prfs', 0, 'products', ind, 'quantity']);
                let amountV = form.getFieldValue(['prfs', 0, 'products', ind, 'amount']);
                setItem({ 'prfs': { [0]: { 'products': { [ind]: { 'total_amount': quantityV * amountV } } } } })
                let totalAmountV = form.getFieldValue(['prfs', 0, 'products', ind, 'total_amount']);
                setItem({ 'prfs': { [0]: { 'products': { [ind]: { 'tax_id': el?.tax?.uuid } } } } })
                let taxV = form.getFieldValue(['prfs', 0, 'products', ind, 'tax_id']);
                let find = taxEdv.filter(a => a.uuid === taxV)
                setItem({ 'prfs': { [0]: { 'products': { [ind]: { 'total_tax_amount': totalAmountV * find?.[0]?.name / 100 } } } } })
                setItem({ 'prfs': { [0]: { 'products': { [ind]: { 'tax_accounting_account_id': el?.tax_chart_account?.uuid ?? null } } } } })
                setItem({ 'prfs': { [0]: { 'products': { [ind]: { 'bank_duration_id': el?.duration_time?.uuid } } } } })
                setItem({ 'prfs': { [0]: { 'products': { [ind]: { 'bank_duration': el?.bank_guarantee_date_duration } } } } })
                setItem({ 'prfs': { [0]: { 'products': { [ind]: { 'accepted_commitment': el?.income_billed_quantity } } } } })
                setItem({ 'prfs': { [0]: { 'products': { [ind]: { 'product_remainder_quantity': 1 } } } } })
                setItem({ 'prfs': { [0]: { 'products': { [ind]: { 'note': el?.note } } } } })
            }
        })
    }, [allPrf]);
    const changeCalculate = (e, a, ind, name) => {
        let quantityC = form.getFieldValue(['prfs', 0, 'products', ind, 'quantity']);
        let amountC = form.getFieldValue(['prfs', 0, 'products', ind, 'amount']);
        if (parseInt(e.target.value) < 0) {
            setItem({ 'prfs': { 0: { 'products': { [ind]: { [name]: 0 } } } } })
        } else if (e.target.value.startsWith('0')) {
            setItem({ 'prfs': { 0: { 'products': { [ind]: { [name]: 0 } } } } })
        }
        if (!quantityC || !amountC) {
            setItem({ 'prfs': { 0: { 'products': { [ind]: { 'total_amount': 0 } } } } })
        }
        if (quantityC === 0 || amountC === 0) {
            setItem({ 'prfs': { 0: { 'products': { [ind]: { 'total_amount': 0 } } } } })
        }
        if (quantityC && amountC) {
            setItem({ 'prfs': { 0: { 'products': { [ind]: { 'total_amount': quantityC * amountC } } } } })
            if (form.getFieldValue(['prfs', 0, 'products', ind, 'tax_id'])) {
                let cCalcAmount = form.getFieldValue(['prfs', 0, 'products', ind, 'total_amount'])
                const filtered = taxEdv.filter(a => a.uuid === form.getFieldValue(['prfs', 0, 'products', ind, 'tax_id']) && a.name)
                let resCalc = cCalcAmount * filtered[0].name / 100
                setItem({ 'prfs': { 0: { 'products': { [ind]: { 'total_tax_amount': resCalc } } } } })
            } else {
                setItem({ 'prfs': { 0: { 'products': { [ind]: { 'total_tax_amount': 0 } } } } })
            }
        }
        newProductTab.forEach((val, index) => {
            if (val) {
                newTotalAmount[index] = form.getFieldValue(['prfs', 0, 'products', index, 'total_amount',])
                newEdvAmount[index] = form.getFieldValue(['prfs', 0, 'products', index, 'total_tax_amount'])
            } else if (val) {
                newTotalAmount[index] = 0
                newEdvAmount[index] = 0
            }
        })
        sumNewTotal = newTotalAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        sumNewEdv = newEdvAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setNewTotalState(sumNewTotal);
        setNewEdvState(sumNewEdv);
    };
    const handleCalcBillEDVAmount = (_, val, ind, name) => {
        if (val === undefined) {
            setItem({ 'prfs': { 0: { 'products': { [ind]: { [name]: 0 } } } } })
        } else {
            let t = form.getFieldValue(['prfs', 0, 'products', ind, 'total_amount']);
            setItem({ 'prfs': { 0: { 'products': { [ind]: { [name]: val.children * t / 100 } } } } })
        }
        newProductTab.forEach((val, index) => {
            if (val) {
                newEdvAmount[index] = form.getFieldValue(['prfs', 0, 'products', index, 'total_tax_amount'])
            } else if (val) {
                newEdvAmount[index] = 0
            }
        })
        sumNewEdv = newEdvAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setNewEdvState(sumNewEdv);
    };
    const handleDeleteNewProduct = (value, ind) => {
        console.log(value, ind);
        if (value?.uuid) {
            API.Finance.Bill.deleteNewProduct(value?.uuid).then(res => {
                console.log(res.data.data);
            })
            delete newProductTab[ind]
            setNewProductTab([...newProductTab])
        } else {
            delete newProductTab[ind]
            setNewProductTab([...newProductTab])
        }
    }
    useEffect(() => {
        newTotalAmount = []
        newEdvAmount = []
        newProductTab.forEach((val, index) => {
            if (val) {
                newTotalAmount[index] = form.getFieldValue(['prfs', 0, 'products', index, 'total_amount',])
                newEdvAmount[index] = form.getFieldValue(['prfs', 0, 'products', index, 'total_tax_amount'])
            } else if (val) {
                newTotalAmount[index] = 0
                newEdvAmount[index] = 0
            }
        })
        sumNewTotal = newTotalAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        sumNewEdv = newEdvAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setNewTotalState(sumNewTotal);
        setNewEdvState(sumNewEdv);
    }, [newProductTab])
    return (
        <>
            {newProductTab?.map((val, ind) => (
                val && <Row key={ind} style={{ width: '100%' }}>
                    <Col span={24}>
                        <Row gutter={12} style={{ height: '75px' }}>
                            <Col span={4}>
                                <Form.Item hidden name={['prfs', 0, 'id']} />
                                <Form.Item hidden name={['prfs', 0, 'products', ind, 'uuid']} />
                                <Form.Item label={`${ind + 1}. Məhsul:`} name={['prfs', 0, 'products', ind, 'product_id']}
                                    rules={[{ required: requiredFields.Required(['prfs', 0, 'products', ind, 'product_id']), message: '' }]}>
                                    <Select
                                        disabled={disabledFields.Disabled(['prfs', 0, 'products', ind, 'product_id'])}
                                        allowClear
                                        showSearch
                                        filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                        onChange={(value) => getTesnifatNew(value, ind)} placeholder='Seçim edin...'>
                                        {warehouseProductCategory?.map(item => (
                                            <Option key={item.uuid} value={item.uuid}>{item.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label='Təsnifatı:' name={['prfs', 0, 'products', ind, 'description_id']}
                                    rules={[{ required: requiredFields.Required(['prfs', 0, 'products', ind, 'description_id']), message: '' }]}>
                                    <Select
                                        disabled={disabledFields.Disabled(['prfs', 0, 'products', ind, 'description_id'])}
                                        allowClear
                                        showSearch
                                        filterOption={(input, option) => (option?.children?.toLowerCase() ?? '').includes(input?.toLowerCase())}
                                        placeholder='Seçim edin'>
                                        {dependenceStateNew?.[0]?.data?.[ind]?.map(item => (
                                            <Option key={item.uuid} value={item.uuid}>{item.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label='Uçot hesabı:' name={['prfs', 0, 'products', ind, 'accounting_account_id']}
                                    rules={[{ required: requiredFields.Required(['prfs', 0, 'products', ind, 'accounting_account_id']), message: '' }]}>
                                    <TreeSelect
                                        disabled={disabledFields.Disabled(['prfs', 0, 'products', ind, 'accounting_account_id'])}
                                        showSearch
                                        placeholder="Please select"
                                        allowClear
                                        treeDefaultExpandAll
                                    >
                                        {renderTreeNodes(journalsTop)}
                                    </TreeSelect>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label='Ölçü vahidi:' name={['prfs', 0, 'products', ind, 'unit_id']}
                                    rules={[{ required: requiredFields.Required(['prfs', 0, 'products', ind, 'unit_id']), message: '' }]}>
                                    <Select allowClear
                                        disabled={disabledFields.Disabled(['prfs', 0, 'products', ind, 'unit_id'])}
                                        showSearch
                                        filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                        placeholder='Seçim edin'>
                                        {itemUnit?.map(item => (
                                            <Option key={item.uuid} value={item.uuid}>{item.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label='Miqdar:' name={['prfs', 0, 'products', ind, 'quantity']}
                                    rules={[{ required: requiredFields.Required(['prfs', 0, 'products', ind, 'quantity']), message: '' }]}>
                                    <Input disabled={disabledFields.Disabled(['prfs', 0, 'products', ind, 'quantity'])} onChange={(e) => changeCalculate(e, 'any', ind, 'quantity')} type='number' placeholder='Daxil edin' />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label='Qiymət:' name={['prfs', 0, 'products', ind, 'amount']}
                                    rules={[{ required: requiredFields.Required(['prfs', 0, 'products', ind, 'amount']), message: '' }]}>
                                    <Input disabled={disabledFields.Disabled(['prfs', 0, 'products', ind, 'amount'])} onChange={(e) => changeCalculate(e, 'any', ind, 'amount')} type='number' style={{ width: '100%', marginRight: '1rem' }} placeholder='Daxil edin' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={12} style={{ height: '75px' }}>
                            <Col span={4}>
                                <Form.Item label='Məbləğ:' name={['prfs', 0, 'products', ind, 'total_amount']}
                                    rules={[{ required: requiredFields.Required(['prfs', 0, 'products', ind, 'total_amount']), message: '' }]}>
                                    <Input disabled type='number' style={{ width: '100%', marginRight: '1rem' }} placeholder='Daxil edin' />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label='ƏDV dərəcəsi:' name={['prfs', 0, 'products', ind, 'tax_id']}
                                    rules={[{ required: requiredFields.Required(['prfs', 0, 'products', ind, 'tax_id']), message: '' }]}
                                >
                                    <Select allowClear
                                        disabled={disabledFields.Disabled(['prfs', 0, 'products', ind, 'tax_id'])}
                                        showSearch
                                        onChange={(e, a) => handleCalcBillEDVAmount(e, a, ind, 'total_tax_amount')}
                                        placeholder='Seçim edin'>
                                        {taxEdv?.map((item, i) => (
                                            <Option key={i} value={item.uuid}>{item.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label='ƏDV-li məbləğ:' name={['prfs', 0, 'products', ind, 'total_tax_amount']}
                                    rules={[{ required: requiredFields.Required(['prfs', 0, 'products', ind, 'total_tax_amount']), message: '' }]}>
                                    <Input disabled type='number' placeholder='Daxil edin...' />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label='ƏDV uçotu:' name={['prfs', 0, 'products', ind, 'tax_accounting_account_id']}
                                    rules={[{ required: requiredFields.Required(['prfs', 0, 'products', ind, 'tax_accounting_account_id']), message: '' }]}>
                                    <TreeSelect
                                        disabled={disabledFields.Disabled(['prfs', 0, 'products', ind, 'tax_accounting_account_id'])}
                                        showSearch
                                        placeholder="Please select"
                                        allowClear
                                        treeDefaultExpandAll
                                    >
                                        {renderTreeNodes(journalsTop)}
                                    </TreeSelect>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label='Bank zəmanətinin müddəti:'>
                                    <Space size={0}>
                                        <Form.Item name={['prfs', 0, 'products', ind, 'bank_duration_id']} rules={[{ required: requiredFields.Required(['prfs', 0, 'products', ind, 'bank_duration_id']), message: '' }]}>
                                            <Select allowClear
                                                disabled={disabledFields.Disabled(['prfs', 0, 'products', ind, 'bank_duration_id'])}
                                                showSearch
                                                filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                                placeholder='Seçim edin'>
                                                {bankTime?.map((item, i) => (
                                                    <Option key={i} value={item.uuid}>{item.name}</Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item name={['prfs', 0, 'products', ind, 'bank_duration']} rules={[{ required: requiredFields.Required(['prfs', 0, 'products', ind, 'bank_duration']), message: '' }]}>
                                            <Input min='0' type='number' onChange={(e) => {
                                                if (e.target.value < 0) {
                                                    setItem({ 'prfs': { 0: { 'products': { [ind]: { 'bank_duration': 0 } } } } })
                                                }
                                                if (e.target.value.startsWith('0')) {
                                                    setItem({ 'prfs': { 0: { 'products': { [ind]: { 'bank_duration': 0 } } } } })
                                                }
                                            }} placeholder='Daxil edin...' disabled={disabledFields.Disabled(['prfs', 0, 'products', ind, 'bank_duration'])} />
                                        </Form.Item>
                                    </Space>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label='Qəbul edilən öhdəlik:' name={['prfs', 0, 'products', ind, 'accepted_commitment']}
                                    rules={[{ required: requiredFields.Required(['prfs', 0, 'products', ind, 'accepted_commitment']), message: '' }]}>
                                    <Input disabled={disabledFields.Disabled(['prfs', 0, 'products', ind, 'accepted_commitment'])} onChange={(e) => {
                                        if (e.target.value < 0 || e.target.value.startsWith(0)) {
                                            form.setFieldsValue({ 'prfs': { 0: { 'products': { [ind]: { 'accepted_commitment': 0 } } } } })
                                        }
                                    }} type='number' placeholder='Daxil edin...' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={12} style={{ height: '75px' }}>
                            <Col span={4}>
                                <Form.Item label='Məhsulun miqdar qalığı:' name={['prfs', 0, 'products', ind, 'product_remainder_quantity']}
                                    rules={[{ required: requiredFields.Required(['prfs', 0, 'products', ind, 'product_remainder_quantity']), message: '' }]}>
                                    <Input disabled type='number' placeholder='Daxil edin...' />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label='Note:' name={['prfs', 0, 'products', ind, 'note']} rules={[{ required: requiredFields.Required(['prfs', 0, 'products', ind, 'note']), message: '' }]}>
                                    <Input disabled={disabledFields.Disabled(['prfs', 0, 'products', ind, 'note'])} placeholder='Daxil edin...' />
                                </Form.Item>
                            </Col>
                            {(statusType?.key !== 'draft' && statusType?.key !== 'pending') ?
                                null
                                :
                                newProductTab.filter(elm => elm !== undefined).length > 1 &&
                                <Col span={1} style={{ display: 'flex', alignItems: 'center' }} className='d-flex justify-content-center'>
                                    <Button style={{ height: '38px', display: 'flex', alignItems: 'center' }}
                                        onClick={() => handleDeleteNewProduct(val, ind)}
                                    >
                                        <AiOutlineMinus />
                                    </Button>
                                </Col>
                            }
                        </Row>
                    </Col >
                    {newProductTab.length > 1 && <Col span={24} style={{ margin: '.4rem 0' }}>
                        <hr />
                    </Col>}
                </Row>
            ))}
            {(statusType?.key !== 'draft' && statusType?.key !== 'pending') ?
                null
                :
                <Row>
                    <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='d-flex justify-content-center'>
                        <Button style={{ height: '38px', display: 'flex', alignItems: 'center' }}
                            onClick={() => {
                                newProductTab.push({})
                                setNewProductTab([...newProductTab])
                            }}
                        >
                            <AiOutlinePlus />
                        </Button>
                    </Col>
                </Row>
            }
            <TotalPrices additionalTotalAmount={newTotalState} additionalEdvAmount={newEdvState} />
        </>
    )
}
export default Index