import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Form, Table } from 'antd';
import { Button, Search, Select } from '../../erp-component';
import API from '../../API'
import Update from './Update'
import Insert from './Insert'

const { Option } = Select;
const Index = () => {
    const [store, setStore] = useState([])
    const formRef = useRef()
    const [companyList, setCompanyList] = useState([])
    const [showTableData, setShowTableData] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    const [open, setOpen] = useState(false)
    const [editData, setEditData] = useState({})


    const editRow = (data) => {
        setEditData({ ...data })
        setOpenEdit(true)
    }
    const onClose = () => {
        setOpenEdit(false)
        setOpen(false)
        GetTableData();
    }

    const GetTableData = () => {
        API.Products.list().then(res => {
            const { data } = res.data
            setShowTableData([...data?.[1]])
        })
    }

    const SearchMarkets = (e, val) => {
        if (val === 'shop') {
            API.Products.list({ pag: 1, name: e.target.value, company_id: formRef.current.getFieldValue('company') }).then(res => {
                const { data } = res.data
                setShowTableData([...data?.[1]])
            })
        } else {
            API.Products.list({ pag: 1, barcode: e.target.value, company_id: formRef.current.getFieldValue('company') }).then(res => {
                const { data } = res.data
                setShowTableData([...data?.[1]])
            })
        }
    }
    const columns = [
        {
            title: 'Məhsul',
            dataIndex: 'name',
            key: "name",
            ellipsis: false,
            align: 'start',
            sorter: {
                multiple: 1,
            },
        },
        {
            title: 'Şirkət',
            dataIndex: 'company_name',
            key: "name",
            ellipsis: false,
            align: 'start',
            sorter: {
                multiple: 1,
            },
        },
        {
            title: 'Ölçü tipi',
            dataIndex: 'measure_type',
            key: "name",
            ellipsis: false,
            align: 'start',
            sorter: {
                multiple: 1,
            },
        },
        {
            title: 'Qiymət',
            dataIndex: 'price',
            key: "price",
            ellipsis: false,
            align: 'start',
            sorter: {
                multiple: 3,
            },
        },
        {
            title: 'Barkod',
            dataIndex: 'barcode',
            key: "address",
            ellipsis: false,
            align: 'start',
            sorter: {
                multiple: 4,
            },
        },
        // {
        //     title: 'Endirim faizi',
        //     dataIndex: 'product_dicount',
        //     key: "name",
        //     ellipsis: false,
        //     align: 'start',
        //     sorter: {
        //         multiple: 5,
        //     },
        // },
        {
            title: 'Yaradılma tarixi',
            dataIndex: 'create_date',
            key: "name",
            ellipsis: false,
            align: 'start',
            sorter: {
                multiple: 5,
            },
            render: (text) => (`${text?.split(" ")?.[0]} ${text?.split(" ")?.[1].split(":")[0]}:${text?.split(" ")?.[1].split(":")[1]} `)

        }

    ];
    const FilteredForCompany = () => {
        API.Products.list({ pag: 1, company_id: formRef.current.getFieldValue('company') }).then(res => {
            const { data } = res.data
            setShowTableData([...data?.[1]])
        })
    }
    const GetCompanyList = () => {
        API.Company.list().then(res => {
            const { data } = res.data
            setCompanyList([...data?.[1]]);
        })
    }
    useEffect(() => {
        GetTableData()
        GetCompanyList()
    }, [])
    return (
        <>
            <Form ref={formRef}>
                <Row justify='end' gutter={16}>
                    <Col lg={5} xs={12} >
                        <Form.Item name="company">
                            <Select allowClear onChange={FilteredForCompany} placeholder="Seçim edin">
                                {companyList?.map((value, index) => (
                                    <Option value={value?.id} key={index}>{value?.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={7} xs={12} flex='none'>
                        <Form.Item name="name">
                            <Search onChange={(e) => SearchMarkets(e, 'shop')} width="100%" placeholder='Məhsul adına görə' />
                        </Form.Item>
                    </Col>
                    <Col lg={9} xs={24}>
                        <Row justify='space-between'>

                            <Col lg={15} xs={12} flex='none'>
                                <Form.Item name="barcode">
                                    <Search onChange={(e) => SearchMarkets(e, 'code')} width="100%" placeholder='Barkoda görə' />
                                </Form.Item>
                            </Col>

                            <Col lg={9} xs={12} flex='none'>
                                <Button onClick={() => { setOpen(true) }} btnheight="44px" >Yeni</Button>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Form>
            <Row gutter={24} align='center'>
                <Table
                    className='c-table'
                    rowClassName={(record, index) => {
                        if (index % 2 !== 0) return 'bg-table-splitted c-table-body'
                        return 'c-table-body'
                    }}
                    size="small"
                    columns={columns}
                    pagination={false}
                    filterMultiple={true}
                    rowKey={record => record.uuid}
                    dataSource={showTableData}
                    scroll={{
                        x: 1000,
                        y: window.innerHeight - 325,
                    }}
                    onRow={(record, rowIndex) => ({ onClick: () => editRow(record, rowIndex) })}
                />
            </Row >
            <Update open={openEdit} editData={editData} onClose={onClose} />
            <Insert open={open} onClose={onClose} />
        </>
    )
}

export default Index