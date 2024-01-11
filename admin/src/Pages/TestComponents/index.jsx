import React, { useState, useEffect, useRef } from 'react'
import View from './View';
import Insert from './Insert';
import Update from './Update';
import Filter from './Filter';

import { Layout, Row, Table, Col, notification, Input, Space, Form, Typography } from 'antd';

const { Text, Title } = Typography
const Index = () => {
    const columns = [
        {
            title: 'S/N',
            dataIndex: 'id',
            key: "id",
            ellipsis: false,
            align: 'start'
        },
        {
            title: 'Barkod',
            dataIndex: 'barcode',
            key: "code",
            ellipsis: false,
            align: 'start'
        },
        {
            title: 'Malın adı',
            dataIndex: 'name',
            key: "name",
            ellipsis: false,
            align: 'start'
        },
        {
            title: 'Miqdarı',
            dataIndex: 'amount',
            key: "amount",
            ellipsis: false,
            align: 'start'
        },
        {
            title: 'Ölçüsü',
            dataIndex: 'weight',
            key: "weight",
            ellipsis: false,
            align: 'start',
        },
        {
            title: 'Qiyməti',
            dataIndex: 'price',
            key: "price",
            ellipsis: false,
            align: 'start',

        },
        {
            title: 'Məbləği',
            dataIndex: 'quantity',
            key: "quantity",
            ellipsis: false,
            align: 'start',
        },
    ];
    const data = [
        {
            id: 1,
            barcode: "2345",
            name: "Kesmik",
            amount: "5.00",
            weight: "ED",
            price: "2.05",
            quantity: "7.58"
        }
    ]
    return (

        <>
            <div align='center' style={{ marginTop: "15px", display: "flex", justifyContent: "space-between" }} >
                <div style={{ width: "49.9%" }}>
                    <div style={{ border: "1px solid #333", display: "flex", marginBottom: 3 }}>
                        <div span={10} style={{ borderRight: "1px solid #333", textAlign: "center", width: "40%" }}>
                            <h2>Uzun ömür</h2>
                            <p style={{ margin: 0 }}>Ivanovka məhsulları</p>
                        </div>
                        <div span={14} style={{ textAlign: "center", width: "60%" }}>
                            <h2>Satış qaiməsi</h2>
                            <div style={{ display: "flex", justifyContent: "space-evenly", paddingTop: "5px" }}>
                                <span>Tarix 29.09.2023</span>
                                <span style={{ borderTop: "1px solid #333", borderLeft: "1px solid #333", borderRight: "1px solid #333", lineHeight: 1, padding: 3 }}>SF 062645</span>
                                <span>Saat 16:53</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ border: "1px solid #333", padding: 5, textAlign: 'left' }}>
                        <h4>Müştəri Adı: Araz, Qaradag rayonu, Lokbatan qes</h4>
                    </div>
                    <table border="1" style={{ width: "100%", borderCollapse: "collapse", marginBottom: 3 }}>
                        <thead >
                            <tr>
                                <th>S/N</th>
                                <th>Barkodu</th>
                                <th>Malın adı</th>
                                <th>Miqdarı</th>
                                <th>Ölçüsü</th>
                                <th>Qiyməti</th>
                                <th>Məbləği</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ textAlign: 'center' }}>1</td>
                                <td>12454678654</td>
                                <td>Kesmik</td>
                                <td style={{ textAlign: 'center' }}>5.00</td>
                                <td style={{ textAlign: 'center' }}>ED</td>
                                <td style={{ textAlign: 'center' }}>2.05</td>
                                <td style={{ textAlign: 'center' }}>7.58</td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'center' }}>2</td>
                                <td>12454678654</td>
                                <td>Kesmik</td>
                                <td style={{ textAlign: 'center' }}>5.00</td>
                                <td style={{ textAlign: 'center' }}>ED</td>
                                <td style={{ textAlign: 'center' }}>2.05</td>
                                <td style={{ textAlign: 'center' }}>7.58</td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'center' }}>3</td>
                                <td>12454678654</td>
                                <td>Kesmik</td>
                                <td style={{ textAlign: 'center' }}>5.00</td>
                                <td style={{ textAlign: 'center' }}>ED</td>
                                <td style={{ textAlign: 'center' }}>2.05</td>
                                <td style={{ textAlign: 'center' }}>7.58</td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{ width: "100%", display: 'flex', justifyContent: "space-between" }}>
                        <div style={{ width: "50%" }}></div>
                        <div style={{ width: "50%", display: 'flex', justifyContent: "space-between" }}>
                            <div style={{ textAlign: 'left' }}>
                                <p>Faktura Məbləği</p>
                                <p>Endirim Məbləği</p>
                                <p>Faktura Yekun Məbləği</p>
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <p>AZN</p>
                                <p>AZN</p>
                                <p>AZN</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p>145.3</p>
                                <p>0</p>
                                <p>15</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ width: "50%", textAlign: 'left' }}>
                            <span>Təhvil Verən</span>
                        </div>
                        <div style={{ width: "50%", textAlign: 'left' }}>
                            <span>Təhvil Alan</span>
                        </div>
                    </div>
                </div >
                <div style={{ width: "49.9%" }}>
                    <div style={{ border: "1px solid #333", display: "flex", marginBottom: 3 }}>
                        <div span={10} style={{ borderRight: "1px solid #333", textAlign: "center", width: "40%" }}>
                            <h2>Uzun ömür</h2>
                            <p style={{ margin: 0 }}>Ivanovka məhsulları</p>
                        </div>
                        <div span={14} style={{ textAlign: "center", width: "60%" }}>
                            <h2>Satış qaiməsi</h2>
                            <div style={{ display: "flex", justifyContent: "space-evenly", paddingTop: "5px" }}>
                                <span>Tarix 29.09.2023</span>
                                <span style={{ borderTop: "1px solid #333", borderLeft: "1px solid #333", borderRight: "1px solid #333", lineHeight: 1, padding: 3 }}>SF 062645</span>
                                <span>Saat 16:53</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ border: "1px solid #333", padding: 5, textAlign: 'left' }}>
                        <h4>Müştəri Adı: Araz, Qaradag rayonu, Lokbatan qes</h4>
                    </div>
                    <table border="1" style={{ width: "100%", borderCollapse: "collapse", marginBottom: 3 }}>
                        <thead >
                            <tr>
                                <th>S/N</th>
                                <th>Barkodu</th>
                                <th>Malın adı</th>
                                <th>Miqdarı</th>
                                <th>Ölçüsü</th>
                                <th>Qiyməti</th>
                                <th>Məbləği</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ textAlign: 'center' }}>1</td>
                                <td>12454678654</td>
                                <td>Kesmik</td>
                                <td style={{ textAlign: 'center' }}>5.00</td>
                                <td style={{ textAlign: 'center' }}>ED</td>
                                <td style={{ textAlign: 'center' }}>2.05</td>
                                <td style={{ textAlign: 'center' }}>7.58</td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'center' }}>2</td>
                                <td>12454678654</td>
                                <td>Kesmik</td>
                                <td style={{ textAlign: 'center' }}>5.00</td>
                                <td style={{ textAlign: 'center' }}>ED</td>
                                <td style={{ textAlign: 'center' }}>2.05</td>
                                <td style={{ textAlign: 'center' }}>7.58</td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'center' }}>3</td>
                                <td>12454678654</td>
                                <td>Kesmik</td>
                                <td style={{ textAlign: 'center' }}>5.00</td>
                                <td style={{ textAlign: 'center' }}>ED</td>
                                <td style={{ textAlign: 'center' }}>2.05</td>
                                <td style={{ textAlign: 'center' }}>7.58</td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{ width: "100%", display: 'flex', justifyContent: "space-between" }}>
                        <div style={{ width: "50%" }}></div>
                        <div style={{ width: "50%", display: 'flex', justifyContent: "space-between" }}>
                            <div style={{ textAlign: 'left' }}>
                                <p>Faktura Məbləği</p>
                                <p>Endirim Məbləği</p>
                                <p>Faktura Yekun Məbləği</p>
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <p>AZN</p>
                                <p>AZN</p>
                                <p>AZN</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p>145.3</p>
                                <p>0</p>
                                <p>15</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ width: "50%", textAlign: 'left' }}>
                            <span>Təhvil Verən</span>
                        </div>
                        <div style={{ width: "50%", textAlign: 'left' }}>
                            <span>Təhvil Alan</span>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}
Index.View = () => <View />
export default Index