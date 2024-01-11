import { memo, useEffect, useRef } from 'react'
import API from "../../API"
import { Space } from "antd"
import { Button } from '../../erp-component'
import { Reject, Back } from '../../erp-component/Icons'
import { CheckOutlined } from "@ant-design/icons"

const Index = ({ value, trn_data, trn_list, callback, form }) => {
    console.log(value);
    // value => signature api-dan gelen datani map edib otururuk
    // trn_date => next button ucun params => show api-dan generate edib otururk
    // trn_list => reject button ucun params => show api-dan generate edib otururk
    // callback => istenilen button onclickden sonra icra edilmesi istenilen funksiyalari bir methoda yigib otururuk
    // form => antd useform
    const nextDisable = useRef(false)
    const backDisable = useRef(false)
    const rejectDisable = useRef(false)

    useEffect(() => {
        nextDisable.current = false
        backDisable.current = false
        rejectDisable.current = false
    })
    const setFormError = (name, messages) => {
        name = name.splitMap('.');
        form.setFields([{ name, errors: [...messages] }]);
    }

    const renderButtonGroup = () => {
        const onClickNext = (trn_data) => {
            if (!nextDisable.current) {
                nextDisable.current = true
                trn_data && API.Signature.Signature.store(trn_data).then(res => {
                    switch (res.status) {
                        case 201: {
                            callback && callback()
                            break;
                        }
                        case 400: {
                            const { data } = res.data;
                            for (let key in data) {
                                setFormError(key, data[key]);
                            }
                            break;
                        }
                    }
                    nextDisable.current = true
                })
            }
        }

        const onRejectClick = (trn_list) => {
            if (!rejectDisable.current) {
                rejectDisable.current = true
                trn_list && API.Signature.Signature.reject(trn_list).then(_ => {
                    callback && callback()
                })
            }
        }

        const onReturnClick = (trn_list) => {
            if (!backDisable.current) {
                backDisable.current = true
                API.Signature.Signature.return(trn_list).then(_ => {
                    callback && callback()
                })
            }
        }

        switch (value.key) {
            case 'next_method':
                return (
                    <Button
                        disabled={nextDisable.current}
                        icon={<CheckOutlined />}
                        onClick={_ => onClickNext(trn_data)}
                        bgcolor="#fff !important"
                        padding="10px 24px"
                        border="2px solid #00DE00 !important"
                        btnwidth="100%"
                        color="#00DE00 !important"
                        colorhover="#00DE00 !important"
                        bgcolorshadow="4px 4px 30px 0px rgba(22, 22, 22, 0.10)"
                    >
                        {value?.content?.button_name_nat}
                    </Button >
                )
            case 'reject_method':
                return (
                    <Button
                        disabled={rejectDisable.current}
                        icon={<Reject />}
                        onClick={_ => onRejectClick(trn_list)}
                        bgcolor="#fff !important"
                        color='#FF0000 !important'
                        padding="10px 24px"
                        colorhover="#FF0000 !important"
                        border="2px solid #FF0000 !important"
                        bgcolorshadow="4px 4px 30px 0px rgba(22, 22, 22, 0.10)"
                    >
                        Reject
                    </Button>
                )
            case 'return_method':
                return (
                    <Button
                        disabled={backDisable.current}
                        icon={<Back />}
                        onClick={_ => onReturnClick(trn_list)}
                        bgcolor="#fff !important"
                        color='#FAA31E !important'
                        border="2px solid #FAA31E !important"
                        padding="10px 24px"
                        colorhover="#FAA31E !important"
                        bgcobgcolorshadoworhover="4px 4px 30px 0px rgba(22, 22, 22, 0.10)"
                    >
                        Back
                    </Button >
                )
            default:
                break;
        }
    }
    return (
        <Space>
            {renderButtonGroup()}
        </Space>
    )
}
export default memo(Index)