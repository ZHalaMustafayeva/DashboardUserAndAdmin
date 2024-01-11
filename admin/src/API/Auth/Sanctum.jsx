
import { Axios } from "../../Config";
import { message } from 'antd';

const Index = {
    signIn: (data) => {
        message.loading({ content: 'Loading...', key: "msg" });
        delete data.remember
        return Axios.post("/admin-signin.php", data).then(res => {
            if (res.status === 200) localStorage.setItem("access_token", JSON.stringify(res.data.data));

            return res;
        }, err=>{
            return err?.response;
        });
    },
    signUp: (data) => {
        return Axios.post('/signup.php', data).then(res => res)
    },
    list: (data) => Axios.get('/user.php', { params: { ...data } }).then(res => res),
    update: (data) => Axios.put('/user.php', data).then(res => res),

}

export default Index;