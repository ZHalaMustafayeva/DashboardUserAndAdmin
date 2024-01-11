import React from "react";
import style from './style.module.scss'
import { Form, Input, Button, Checkbox, Row, Col, Typography, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const { Title } = Typography;
const Index = () => {
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };

    return (
        <div style={{ height: '100vh' }}>

            <Row justify='center' align='middle' className={style.loginRow}>
                <Col span={24} flex='none' style={{ marginBottom: 24 }}>
                    <Title level={3}>Şifrəni unutmusunuz?</Title>
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
                                    message: "Please input your Email!"
                                }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="E-mail"
                            />
                        </Form.Item>
                        <Row justify='center'>
                            <Col span={24} flex='none'>
                                <Button className={style.loginBtn} type="primary" htmlType="submit" >
                                    Göndər
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
