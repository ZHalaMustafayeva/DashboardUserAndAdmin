import { Row, Col } from "antd";

const Index = ({ className, style }) => {

    return (
        <Row style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
            {/* <Col span={24} style={{ textAlign: 'center' }} > */}
            <svg width="20" height="6" viewBox="0 0 20 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Line 13" d="M20 3L15 0.113249V5.88675L20 3ZM0 3.5H15.5V2.5H0V3.5Z" fill="#505050" />
            </svg>
            {/* </Col>
            <Col span={24} style={{ textAlign: 'center' }}> */}
            <svg width="20" height="6" viewBox="0 0 20 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Line 14" d="M0 3L5 5.88675L5 0.113247L0 3ZM20 2.5L4.5 2.5L4.5 3.5L20 3.5L20 2.5Z" fill="#505050" />
            </svg>
            {/* </Col> */}
        </Row>

    )
}

export default Index;