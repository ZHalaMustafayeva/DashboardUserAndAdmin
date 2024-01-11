import React, { useState, useEffect, useRef } from 'react'
import View from './View';
import Insert from './Insert';
import Update from './Update';
import Filter from './Filter';
import { Button, Select, Drawer, Radio } from '../../erp-component'

// import CollapseSearch from '../../Components/SearchBox/style'
import { PlusOutlined, FilterFilled, PrinterOutlined, FileExcelOutlined, ClearOutlined } from '@ant-design/icons';
import { Layout, Row, Table, notification, Input, Space, Form } from 'antd';


const Index = () => {

    return (

        <>
            < Row align='center' style={{ marginTop: "15px" }} className='fixed-submit-buttons' >
                <Space>
                    <Button pointer='none' htmlType="submit">Yadda saxla</Button>
                    <Button shadow='none' onClick={null} color="#23A4DD" bgcolor="transparent">Bağla</Button>
                </Space>
            </Row >
        </>
    )
}
Index.View = () => <View />
export default Index