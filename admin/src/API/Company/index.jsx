import { Axios } from "../../Config";

const Index = {
    list: (data) => Axios.get('/product-company.php', { params: { ...data } }).then(res => res),
    store: (data) => Axios.post('/product-company.php', data).then(res => res),
    update: (data) => Axios.put('/product-company.php', data).then(res => res)
}

export default Index
