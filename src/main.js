import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './plugins/axios'
import './plugins/element.js'
import './globalComponents'

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')

//安装jsonp，解决第三方跨域问题
// import vueJsonp from 'vue-jsonp'
// Vue.use(vueJsonp)

//引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

// 修改title
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})
