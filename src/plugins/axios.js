"use strict";

import Vue from 'vue';
import axios from "axios";
// import store from "./store";
// import router from './router';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    // timeout: 10000, //请求超过10秒即超时返回错误
    // headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    //baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

//配置同一个jessionid，使得axios能携带cookie
axios.defaults.withCredentials = true;

const _axios = axios.create(config);

//request拦截器
_axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

//response拦截器
_axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

Plugin.install = function (Vue) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        },
    });

};

Vue.use(Plugin)

//用户登录
// userLogin(data) {
//     return _axios.post('/api/USER/Login', data);
// }
export default Plugin;