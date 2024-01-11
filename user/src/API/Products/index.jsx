import { Axios } from "../../Config";
// import axios from 'axios'
const Index = {
    list: (data) => Axios.get('/product.php', { params: { ...data } }).then(res => res),
    update: (data) => Axios.put('/product.php', data).then(res => res),
}

export default Index
