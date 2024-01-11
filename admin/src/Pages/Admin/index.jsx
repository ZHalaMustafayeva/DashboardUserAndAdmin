import React, { useEffect, useState } from 'react'
import { Card } from '../../Components'
import { Row, Col, Space, Table } from 'antd';
import { Sorter } from '../../Components'
import { Link } from "react-router-dom";
import { Search } from '../../erp-component';
import { LeftOutlined } from '@ant-design/icons';
import API from '../../API'
import Update from './Update'
const Index = () => {
    const [showTableData, setShowTableData] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    const [editData, setEditData] = useState({})

    const editRow = (data) => {
        setEditData({ ...data })
        setOpenEdit(true)
    }
    const onClose = () => setOpenEdit(false)

    const GetTableData = () => {
        API.Order.list({ pag: 1, type: 1, status: 2 }).then(res => {
            const { data } = res.data
            setShowTableData([...data?.[1]])
        })
    }

    const columns = [
        {
            title: 'Mağaza',
            dataIndex: 'shop_name',
            key: "name",
            ellipsis: false,
            align: 'start',
            // filterDropdown: true,
            sorter: {
                multiple: 1,
            },
            // filterIcon: <>
            //     <FilterFilled onClick={_ => filter(0)} />
            // </>
        },
        // {
        //     title: 'Filial',
        //     dataIndex: 'branch',
        //     key: "name",
        //     ellipsis: false,
        //     align: 'start',
        //     sorter: {
        //         multiple: 2,
        //     },
        // },
        {
            title: 'Şirkət',
            dataIndex: 'company_name',
            key: "name",
            ellipsis: false,
            align: 'start',
            sorter: {
                multiple: 3,
            },
        },
        // {
        //     title: 'Maşın nömrəsi',
        //     dataIndex: 'car_number',
        //     key: "car_number",
        //     ellipsis: false,
        //     align: 'start',
        //     sorter: {
        //         multiple: 4,
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
        },
        {
            title: 'Əlavə edən',
            dataIndex: 'inserted_user',
            key: "name",
            ellipsis: false,
            align: 'start',
            sorter: {
                multiple: 6,
            },
        },
        {
            title: 'Statusu',
            dataIndex: 'status',
            key: "name",
            ellipsis: false,
            align: 'start',
            sorter: {
                multiple: 7,
            },
        },
    ];

    useEffect(() => {
        GetTableData()
    }, [])
    return (
        <>
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
        </>
    )
}

export default Index