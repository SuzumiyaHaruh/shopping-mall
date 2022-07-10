// request.js
import axios from "axios";
//基本路径相同，但后缀的api不同的接口，称为ieRestful风格接口
let instance = axios.create({
    baseURL: "http://gz.wolfcode.cn/cms",
    timeout: 5000
});

// http request 拦截器
instance.interceptors.request.use(
    (config) => {
        if (config.url === "/wechatUsers/PCLogin" || config.url === "/sendSMS" || config.url === '/phoneRegin' || config.url === '/shop/carts/add' || config.url === '/wechatUsers/binding') {
            config.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }
        const token = localStorage.getItem("x-auth-token");
        if (token) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers["x-auth-token"] = token; //请求头加上token
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// http response 拦截器
instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    //接口错误状态处理，也就是说无响应时的处理
    (error) => {
        return Promise.reject(error.response.status); // 返回接口返回的错误信息
    }
);

export default instance
