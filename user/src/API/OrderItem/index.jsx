import { Axios } from "../../Config";


const Index = {
    list: (data) => Axios.get('/order-item.php', { params: { ...data } }).then(res => res)
}

export default Index
