import { Axios } from "../../Config";

const Index = {
    list: (data) => Axios.get('/product-company.php', { params: { ...data } }).then(res => res)
}

export default Index
