import { Axios } from "../../Config";
// import axios from 'axios'
const Index = {
    list: (data) => Axios.get('/shop-product-discount.php', { params: { ...data } }).then(res => res),
    getListById: (data) => Axios.get('/shop-product-discount.php', { params: { ...data } }).then(res => res),
    store: (data) => Axios.post('/shop-product-discount.php', data).then(res => res),
    update: (data) => Axios.put('/shop-product-discount.php', data).then(res => res),
    delete: (data) => Axios.delete('/shop-product-discount.php', { params: { ...data } }).then(res => res)
}

export default Index
