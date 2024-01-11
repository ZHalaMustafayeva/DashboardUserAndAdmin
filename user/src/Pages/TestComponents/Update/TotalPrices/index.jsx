import React from 'react';
import { Row, Col, Typography, Space, Card } from 'antd';
import styles from './style.module.scss'
const { Text } = Typography;
const Index = ({ additionalTotalAmount, additionalEdvAmount }) => {
    return (
        <>
            <Space className={styles.cardParent}>
                <Card className={styles.cardDesign} size="small">
                    <span className={styles.justifyBetween}>
                        <b style={{ fontSize: '12px' }}>Cəmi məbləğ:</b>
                        <span>{additionalTotalAmount.toFixed(2) || 0} AZN</span>
                    </span>
                </Card>
                <Card className={styles.cardDesign} size="small">
                    <span className={styles.justifyBetween}>
                        <b style={{ fontSize: '12px' }}>Cəmi ƏDV məbləği:</b>
                        <span>{additionalEdvAmount?.toFixed(2) || 0} AZN</span>
                    </span>
                </Card>
                <Card className={styles.cardDesign} size="small">
                    <span className={styles.justifyBetween}>
                        <b style={{ fontSize: '12px' }}>Cəmi vergi daxili məbləğ:</b>
                        <span>{(additionalEdvAmount + additionalTotalAmount)?.toFixed(2) || 0} AZN</span>
                    </span>
                </Card>
            </Space>
        </>
    )
};
export default Index;