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
        API.Discount.list().then(res => {
            const { data } = res.data
            setShowTableData([...data?.[1]])
        })
    }

    const SearchMarkets = (e, val) => {
        API.Discount.list({ pag: 1, product_id: e.target.value, shop_id: formRef.current.getFieldValue('company'), is_active:"" }).then(res => {
            const { data } = res.data
            setShowTableData([...data?.[1]])
        })

    }
    const columns = [
        {
            title: 'Məhsul',
            dataIndex: 'product_full_name',
            key: "product_full_name",
            ellipsis: false,
            align: 'start',
            sorter: {
                multiple: 1,
            },
        },
        {
            title: 'Mağaza',
            dataIndex: 'shop_name',
            key: "shop_name",
            ellipsis: false,
            align: 'start',
            sorter: {
                multiple: 1,
            },
        },
        {
            title: 'Endirim faizi',
            dataIndex: 'discount',
            key: "discount",
            ellipsis: false,
            align: 'start',
            sorter: {
                multiple: 1,
            },
        },
        {
            title: 'Əlavə edilmə tarixi',
            dataIndex: 'create_date',
            key: "create_date",
            ellipsis: false,
            align: 'start',
            sorter: {
                multiple: 1,
            },
            render: (text) => (`${text?.split(" ")?.[0]} ${text?.split(" ")?.[1].split(":")[0]}:${text?.split(" ")?.[1].split(":")[1]} `)
        },
        // {
        //     title: 'Başlama tarixi',
        //     dataIndex: 'discount_start_date',
        //     key: "name",
        //     ellipsis: false,
        //     align: 'start',
        //     sorter: {
        //         multiple: 5,
        //     },
        //     render: (text) => (`${text?.split(" ")?.[0]} ${text?.split(" ")?.[1].split(":")[0]}:${text?.split(" ")?.[1].split(":")[1]} `)

        // },
        // {
        //     title: 'Bitmə tarixi',
        //     dataIndex: 'discount_start_date',
        //     key: "name",
        //     ellipsis: false,
        //     align: 'start',
        //     sorter: {
        //         multiple: 5,
        //     },
        //     render: (text) => (`${text?.split(" ")?.[0]} ${text?.split(" ")?.[1].split(":")[0]}:${text?.split(" ")?.[1].split(":")[1]} `)

        // },
        // {
        //     title: 'Status',
        //     dataIndex: 'is_active',
        //     key: "is_active",
        //     ellipsis: false,
        //     align: 'start',
        //     sorter: {
        //         multiple: 5,
        //     },
        // },

    ];

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
                    <Col lg={9} xs={24}>
                        {/* <Row justify='space-between'>

                            <Col lg={15} xs={12} flex='none'>
                                <Form.Item name="barcode">
                                    <Search onChange={(e) => SearchMarkets(e, 'code')} width="100%" placeholder='Axtarın' />
                                </Form.Item>
                            </Col>

                            <Col lg={15} xs={12} flex='none' >
                                <Button onClick={() => { setOpen(true) }} btnheight="44px" >Yeni</Button>
                            </Col>
                        </Row> */}
                        <Row justify='end' gutter={16} style={{ marginBottom: 16 }}>
                <Col span={4} flex='none' sm={24}>
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