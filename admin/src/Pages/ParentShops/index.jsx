import React, { useEffect, useState } from 'react'
import { Row, Col, Space, Table } from 'antd';
import { Button, Search } from '../../erp-component';
import API from '../../API'
import Update from './Update'
import Insert from './Insert'
const Index = () => {
    const [store, setStore] = useState([])
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
        API.ProductShop.list({ pag: 1, only_parent: "only_parent" }).then(res => {
            const { data } = res.data
            setShowTableData([...data?.[1]])
        })
    }

    const SearchMarkets = (e, val) => {
        if (val === 'shop') {
            API.ProductShop.list({ pag: 1, name: e.target.value, only_parent: "only_parent" }).then(res => {
                const { data } = res.data
                setShowTableData([...data?.[1]])
            })
        } else {
            API.ProductShop.list({ pag: 1, code: e.target.value, only_parent: "only_parent" }).then(res => {
                const { data } = res.data
                setShowTableData([...data?.[1]])
            })
        }
    }
    const columns = [
        {
            title: 'Mağaza',
            dataIndex: 'name',
            key: "name",
            ellipsis: false,
            align: 'start',
            sorter: {
                multiple: 1,
            },
        },
        {
            title: 'Kod',
            dataIndex: 'code',
            key: "code",
            ellipsis: false,
            align: 'start',
            sorter: {
                multiple: 3,
            },
        },
        {
            title: 'Ünvan',
            dataIndex: 'address',
            key: "address",
            ellipsis: false,
            align: 'start',
            sorter: {
                multiple: 4,
            },
        },
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
        },
        {
            title: 'Qeyd',
            dataIndex: 'note',
            key: "name",
            ellipsis: false,
            align: 'start',
            sorter: {
                multiple: 5,
            },
        }
    ];

    useEffect(() => {
        GetTableData()
    }, [])
    return (
        <>
            <Row justify='end' gutter={16}>
                <Col lg={10} xs={12} flex='none'>
                    <Search onChange={(e) => SearchMarkets(e, 'shop')} width="100%" placeholder='Mağaza adına görə' />
                </Col>
                <Col lg={10} xs={12} flex='none'>
                    <Search onChange={(e) => SearchMarkets(e, 'code')} width="100%" placeholder='Koda görə' />
                </Col>
                <Col lg={4} xs={12} flex='none'>
                    <Button onClick={() => { setOpen(true) }} btnheight="44px" >Yeni</Button>
                </Col>
            </Row>
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