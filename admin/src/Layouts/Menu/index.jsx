import React from "react";
import "./style.scss";
import { useNavigate} from "react-router-dom";
import { HomeOutlined } from '@ant-design/icons';
import { Circle, ArrowDown, ArrowUp } from '../../erp-component/Icons'
import { Menu } from '../../erp-component'
import { ConfigProvider } from "antd";
const style = {
    menu: {
        // height: "calc(100vh - 145px)",
        // overflow: "auto",
        // width: '315px'
    },
};

const getItem = (label, key, url, icon, children) => ({ label, key, url, icon, children });
const items = [
    getItem('Ana səhifə', 'order1', `/order`, <HomeOutlined />),
    getItem('Sifarişlər', 'order', `/order`, <Circle />),
    getItem('Məhsullar', 'products', `/product`, <Circle />),
    getItem('Əsas Mağazalar', 'shops', `/shops`, <Circle />),
    getItem('Filiallar', 'shop-branchs', `/shop-branchs`, <Circle />),
    getItem('Şirkətlər', 'company', `/company`, <Circle />),
    getItem('Ekspeditor', 'forwarder', `/forwarder`, <Circle />),
    getItem('Geri Qaytarılanlar', 'return', `/return`, <Circle />),
    getItem('Endirimlər', 'discount', `/discount`, <Circle />),
    getItem('Ümumi Endirimlər', 'common-discount', `/common-discount`, <Circle />),
    getItem('Maşın nömələri', 'plate-number', `/plate-number`, <Circle />),
];

const Index = () => {
    const Navigation = useNavigate();
    const onSelect = (event) => {
        const { keyPath } = event;
        const path = keyPath.reverse();
        const { length } = path;
        let url;
        switch (length) {
            case 1: {
                url = items.find((value) => value.key === path[0]).url;
                break;
            }
            case 2: {
                const children = items.find((value) => value.key === path[0]).children;
                url = children.find((value) => value.key === path[1]).url;
                break;
            }
            default:
                url = process.env.REACT_APP_HOME;
        }
        Navigation(url);
    };
    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemMarginInline: 0
                    }
                }
            }}
        >
            <Menu
                // theme='dark'
                expandIcon={(child) => child?.isOpen ? <ArrowUp style={{ width: '20px', height: '20px' }} /> : <ArrowDown style={{ width: '20px', height: '20px' }} />}
                // expandIcon={<ArrowDown style={{ width: '20px', height: '20px' }} />}
                style={style.menu}
                defaultSelectedKeys={["order"]}
                mode="inline"
                items={items}
                onSelect={onSelect}
            />
        </ConfigProvider>
    );
};
export default Index;
