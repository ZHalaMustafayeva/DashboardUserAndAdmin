import { Axios } from "../../Config";


const Index = {
    list: (data) => Axios.get('/order-item.php', { params: { ...data } }).then(res => res),
    delete: (data) => Axios.delete('/order-item.php', { data }).then(res => res)

}

export default Index
