import Vue from 'vue'
import Vuex from 'vuex'

//加密解密算法
var Base64Ende = {
    //加密
    encryption: function (data) {
        let tmp = window.btoa(window.encodeURIComponent(JSON.stringify(data)));
        let key = "wxd".split("");
        for (let i = 0; i < 3; i++) {
            tmp = window.btoa(tmp + key[i]);
        }
        return tmp;
    },
    //解密
    decryption: function (data) {
        if (data == null || data == "" || data == undefined) return null;
        let tmp = window.atob(data);
        for (let i = 0; i < 3; i++) {
            tmp = window.atob(tmp.substring(0, tmp.length - 1));
        }
        tmp = "" + window.decodeURIComponent(tmp);
        return JSON.parse(window.decodeURIComponent(tmp));
    }
}

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loginBar: true, //登录页面让导航栏消失
        modiPersonBg: false,//修改背景页面控制
        //ls.get('key')
        token: Base64Ende.decryption(window.sessionStorage.getItem('token')), //window.sessionStorage.getItem('token')
        username: window.sessionStorage.getItem('username'),
        isLogin: window.sessionStorage.getItem('loginState'), //检查是否登录
    },
    mutations: {
        LOGIN: (state, data) => {
            //更改token值
            state.token = data;
            state.isLogin = true;
            //加密用户数据
            window.sessionStorage.setItem('token', Base64Ende.encryption(data));
            window.sessionStorage.setItem('loginState', true);
        },
        LOGOUT: (state) => {
            //登出的时候要清除token
            state.token = null;
            state.isLogin = false;
            window.sessionStorage.removeItem('token');
            window.sessionStorage.removeItem('loginState');
        },
        USERNAME: (state, data) => {
            //把用户名也存起来
            state.username = data;
            window.sessionStorage.setItem('username', data);
        },
        CHECKLOGINBAR: (state, data) => {
            state.loginBar = data;
        },
        MODIPERSONBG: (state, data) => {
            //修改个人信息图层
            state.modiPersonBg = data;
        }
    },
    actions: {
        UserLogin({ commit }, data) {
            commit('LOGIN', data);
        },
        UserLogout({ commit }) {
            commit('LOGOUT');
        },
        UserName({ commit }, data) {
            commit('USERNAME', data);
        },
        CheckLoginBar({ commit }, data) {
            commit('CHECKLOGINBAR', data);
        },
        ModiPersonBg({ commit }, data) {
            commit('MODIPERSONBG', data);
        },
    },
    modules: {}
})