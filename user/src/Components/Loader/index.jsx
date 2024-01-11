import { Spin, Progress } from 'antd';
import './style.scss'
const Index = ({ loading, percent }) => {
    return (
        <>
            {loading
                &&
                <span className='parent'>
                    <Spin tip="Gözləyin..." size="large" className='loader' />
                </span>
            }
        </>
    )
};
export default Index;