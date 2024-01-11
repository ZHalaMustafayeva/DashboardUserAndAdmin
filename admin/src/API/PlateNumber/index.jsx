import { Axios } from "../../Config";
// import axios from 'axios'
const Index = {
    list: (data) => Axios.get('/delivery_truck.php', { params: { ...data } }).then(res => res),
    update: (data) => Axios.put('/delivery_truck.php', data).then(res => res),
    store: (data) => Axios.post('/delivery_truck.php', data).then(res => res),
}

export default Index
