import React, { useState } from "react";
import { Row, Col, Space, Menu, Typography } from "antd";
import Button from "./Button";
import { ClearFilterIcon, Excel, Copy, Dots } from "./Icons";
import Search from "./Search";
import Dropdown from "./Dropdown";

const { Title } = Typography;

const Index = (props) => {
  const {
    selectedRowKeys,
    innerText,
    isStatusBtn,
    activeView,
    changeStatus,
    searchPlaceholder,
    onSearch,
    searchClassName,
    activeBtnOnClick,
    activeBtnClassName,
    deactiveBtnOnClick,
    deactiveBtnClassName,
    isExcelBtn,
    excelBtnOnClick,
    excelBtnClassName,
    isPrintBtn,
    printBtnIcon,
    printBtnOnClick,
    printBtnClassName,
    clearFilterOnClick,
    clearFilterBtnClassName,
    newBtnIcon,
    newBtnOnClick,
    isNewBtn,
    newBtnType,
    newBtnClassName,
    isDropdownData,
    dropdownData,
    isCopyBtn,
    copyBtnOnClick,
    isSubActive,
    subActiveBtnOnClick,
    subActiveBtnClassName
  } = props;
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const ErpDropdown = ({ data }) => {
    const ErpMenu = (
      <Menu style={{ width: "200px" }}>
        {data?.map((item) => (
          <Menu.Item
            style={{ padding: "10px 16px 10px 24px" }}
            key={item.key}
            icon={item.icon}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <Dropdown className="showDropdownin1970" placement="bottomRight" overlay={ErpMenu}>
        <Space>
          <Dots style={{ cursor: "pointer" }} />
        </Space>
      </Dropdown>
    );
  };
  return (
    <>
      <Row className="c-table-header" justify="space-between" align="middle">
        <Space>
          <Search
            className={searchClassName}
            onChange={onSearch}
            placeholder={innerText.search_placeholder}
            color="#909090"
          />
          {selectedRowKeys?.length > 0 && (
            <Button
              onClick={() => changeStatus(activeView === "active" ? 0 : 1)}
              color={activeView === "active" ? "#FF0000" : "#00DE00 "}
              bgcolor="transparent"
              bgcolorhover={
                activeView === "active"
                  ? "rgb(255, 0, 0, 0.1) !important"
                  : "rgb(0, 222, 0, 0.1) !important "
              }
              bgcolorshadow="none !important"
              shadow="none !important"
              btnheight="44px !important"
              btnwidth="112px !important"
              colorhover={
                activeView === "active"
                  ? "#FF0000 !important"
                  : "#00DE00 !important "
              }
            >
              {activeView === "active"
                ? innerText.btn_deactivate
                : innerText.btn_activate}
            </Button>
          )}
        </Space>
        <Col span={16} flex="none">
          <Space>
            {isStatusBtn && (
              <>
                <Button
                  onClick={activeBtnOnClick}
                  className={activeBtnClassName}
                  bgcolor={
                    activeView === "active"
                      ? "rgb(0, 222, 0, 0.1) !important"
                      : "#fff !important"
                  }
                  color="#00DE00 !important"
                  padding="6px 24px"
                  fontsize="16px"
                  border="2px solid #00DE00"
                  btnheight="40px !important"
                  btnwidth="109.5px !important"
                  fontweight={500}
                  bgcolorhover="rgb(0, 222, 0, 0.1) !important"
                  borderhover="2px solid #00DE00 !important"
                >
                  {innerText.btn_active}
                </Button>

                <Button
                  onClick={deactiveBtnOnClick}
                  className={deactiveBtnClassName}
                  bgcolor={
                    activeView === "deactive"
                      ? "rgb(255, 0, 0, 0.1) !important"
                      : "#fff !important"
                  }
                  color="#FF0000 !important "
                  border="2px solid #FF0000"
                  padding="6px 24px"
                  fontsize="16px"
                  btnheight="40px !important"
                  btnwidth="109.5px !important"
                  fontweight={500}
                  bgcolorhover="rgb(255, 0, 0, 0.1) !important"
                  borderhover="2px solid #FF0000 !important"
                >
                  {innerText.btn_deactive}
                </Button>
                {isSubActive &&
                  <Button
                    onClick={subActiveBtnOnClick}
                    className={subActiveBtnClassName}
                    bgcolor={activeView === 'subdeactive'
                      ? "#FAFAFA !important"
                      : "##FFF  !important"
                    }
                    color="#505050 !important "
                    border={activeView === 'subdeactive'
                      ? "2px solid #505050 !important"
                      : "2px solid #C5C5C5 !important"
                    }
                    padding="6px 24px"
                    fontsize="16px"
                    btnheight="40px !important"
                    btnwidth="131px !important"
                    fontweight={500}
                    bgcolorhover="#FAFAFA !important"
                    borderhover="2px solid #C5C5C5 !important"
                  >
                    {innerText.subDeactive}
                  </Button>
                }
              </>
            )}
            {isExcelBtn && (
              <Button
                className={excelBtnClassName}
                icon={<Excel />}
                onClick={excelBtnOnClick}
                btnheight="40px !important"
                fontsize="16px"
                bgcolor="#23A4DD !important"
                bgcolorhover="#23A4DD !important"
                fontsizehover="18px !important"
                bgcolorshadow="4px 4px 30px 0px rgba(22, 22, 22, 0.10) !important"
              >
                {innerText.excel}
              </Button>
            )}
            {isPrintBtn && (
              <Button
                className={printBtnClassName}
                icon={printBtnIcon}
                onClick={printBtnOnClick}
                padding="11px"
                bgcolorhover="#23A4DD"
                btnwidth="40px !important"
                btnheight="40px !important"
                color="#fff !important"
                bgcolorshadow="4px 4px 30px 0px rgba(22, 22, 22, 0.10) !important"
              ></Button>
            )}
            {isCopyBtn && (
              <Button
                className={printBtnClassName}
                onClick={copyBtnOnClick}
                icon={<Copy />}
                padding="11px"
                bgcolor="#fff"
                btnwidth="40px !important"
                btnheight="40px !important"
                color="#fff !important"
                border="2px solid #23A4DD"
                bgcolorhover="rgb(35, 164, 221, 0.1) !important"
                borderhover="2px solid #23A4DD !important"
              ></Button>
            )}
            <Button
              className={clearFilterBtnClassName}
              onClick={clearFilterOnClick}
              icon={<ClearFilterIcon />}
              radius="6px"
              bgcolor="#505050"
              fontsize="16px"
              padding="6px 24px"
              bgcolorhover="#505050"
              color="#fff !important"
              btnheight="40px !important"
              btnwidth="211px !important"
              bgcolorshadow="4px 4px 30px 0px rgba(22, 22, 22, 0.10) !important"
            >
              {innerText.btn_clear_filter}
            </Button>
            {isNewBtn &&
              <Button
                className={newBtnClassName}
                type={newBtnType}
                onClick={newBtnOnClick}
                icon={newBtnIcon}
                radius="6px"
                btnwidth="112px !important"
                btnheight="40px !important"
                fontsize="16px"
                padding="8px 24px"
                bgcolorhover="#23A4DD !important"
                bgcolorshadow="4px 4px 30px 0px rgba(22, 22, 22, 0.10) !important"
              >
                {innerText.btn_new}
              </Button>
            }


            <ErpDropdown data={dropdownData} />
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default Index;
