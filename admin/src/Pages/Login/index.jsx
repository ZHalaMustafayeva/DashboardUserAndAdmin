import React from "react";
import style from './style.module.scss'
import { Form, Input, Button, Checkbox, Row, Col, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import API from '../../API'
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
const Index = () => {
    const navigate = useNavigate()
    const onFinish = (values) => {
        API.Auth.Sanctum.signIn(values).then(res => {
            if (res && res.status === 200) {
                navigate('/order')
            }
            else if(res && res.status === 404){
                alert(res?.data?.data);
            }
        })
    };
    const Login = () => {

    }

    return (
        <div style={{ height: '100vh' }}>

            <Row justify='center' align='middle' className={style.loginRow}>

                <Col span={24} style={{ marginBottom: 24 }}>
                    <Title level={3}> Daxil olun!</Title>
                </Col>
                <Col span={24}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Username!"
                                }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Password!"
                                }
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                    
                        <Row justify='center'>
                            <Col span={24} flex='none'>
                                <Button className={style.loginBtn} type="primary" htmlType="submit" >
                                    Daxil olun
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

// ReactDOM.render(<Index />, document.getElementById("container"));
export default Index;
