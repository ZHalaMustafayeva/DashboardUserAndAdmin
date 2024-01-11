import { Axios } from "../../Config";
// import axios from 'axios'
const Index = {
    list: (data) => Axios.get('/order.php', { params: { ...data } }).then(res => res),
    getListById: (data) => Axios.get('/order.php', { params: { ...data } }).then(res => res),
    store: (data) => Axios.post('/order.php', data).then(res => res),
    update: (data) => Axios.put('/order.php', data).then(res => res),
    delete: (data) => Axios.delete('/order.php', { params: { ...data } }).then(res => res)

}

export default Index
