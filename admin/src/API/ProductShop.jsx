import { Axios } from "../Config";


const Index = {
    list: (data) => Axios.get('/product-shop.php', { params: { ...data } }).then(res => res),
    store: (data) => Axios.post('/product-shop.php', data).then(res => res),
    update: (data) => Axios.put('/product-shop.php', data).then(res => res)
}

export default Index
