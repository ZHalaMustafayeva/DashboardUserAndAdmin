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
        API.PlateNumber.list().then(res => {
            const { data } = res.data
            setShowTableData([...data?.[1]])
        })
    }

    const columns = [
        {
            title: 'Maşın nömrəsi',
            dataIndex: 'number_plate',
            key: "name",
            ellipsis: false,
            align: 'start',
            sorter: {
                multiple: 1,
            },
        },
        {
            title: 'Sürücü',
            dataIndex: 'driver_info',
            key: "name",
            ellipsis: false,
            align: 'start',
            sorter: {
                multiple: 5
            }
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
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            key: "name",
            ellipsis: false,
            align: 'start',
            sorter: {
                multiple: 5,
            },
        },
    ];

    useEffect(() => {
        GetTableData()
    }, [])
    return (
        <>
            <Row justify='end' gutter={16} style={{ marginBottom: 16 }}>
                <Col span={4} flex='none' sm={24}>
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