import styled from "styled-components";
import { Menu } from "antd";

const Index = styled(Menu).attrs()`
    border: none;
    padding: 0 1rem;

    &::webkit-scrollbar {
        width: 10px;
        // display: none;
    }
    &::-webkit-scrollbar-thumb {
        // visibility: hidden;
        // display: none;
        // border-radius: 10px; /* Optional: add rounded corners to the thumb */
    }
    
    .ant-menu {
        background-color: #fff !important;
    }

    .ant-menu-item-selected {
        // border-radius: 6px !important;
        color: #fff;
        background-color: #23A4DD;
    }

    .ant-menu-submenu .ant-menu-sub {
        padding-left: 10px;
    }

    .ant-menu-submenu-title {
        color: #000;
    }

    .ant-menu-sub .ant-menu-item {
        font-weight: 400;
        padding: 0;
        padding-left: 20px !important;
        border-bottom: 1px solid #DDE6ED;
        border-radius: 0;
        margin: 0 4px;
        svg {
            margin-right: 8px;
        }
        svg #fi-rs-circle-small {
            fill: #000;
        }
        .ant-menu-title-content {
            font-weight: 500 !important;
        }
    }

    .ant-menu-submenu-title {
        span {
            color: #000;
        }
        span {
            svg{
                color: #000;
            }
        }
        i {
            color: #000;
        }
    }

    .ant-menu-sub .ant-menu-item-selected {
        color: #fff;
        background-color: #23A4DD;
        svg #fi-rs-circle-small {
            fill: #fff;
        }
    }
   
    .ant-menu-item .ant-menu-title-content {
        font-family: Montserrat;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 175%; /* 28px */
    }
   
    .ant-menu-submenu-title .ant-menu-title-content {
        font-weight: 600;
        font-family: 'Montserrat', sans-serif;
        font-family: Montserrat;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 175%; /* 28px */
    }

`

export default Index;