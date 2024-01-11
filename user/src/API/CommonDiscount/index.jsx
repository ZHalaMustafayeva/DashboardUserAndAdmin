import { Axios } from "../../Config";
// import axios from 'axios'
const Index = {
    list: (data) => Axios.get('/common-discount.php', { params: { ...data } }).then(res => res),
    getListById: (data) => Axios.get('/common-discount.php', { params: { ...data } }).then(res => res),
    store: (data) => Axios.post('/common-discount.php', data).then(res => res),
    update: (data) => Axios.put('/common-discount.php', data).then(res => res),
    delete: (data) => Axios.delete('/common-discount.php', { params: { ...data } }).then(res => res)
}

export default Index
