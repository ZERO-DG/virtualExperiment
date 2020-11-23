import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

const About = () =>
    import('../views/About.vue');

const CourseDetails = () =>
    import("../views/CourseDetails.vue")

const VistMap = () =>
    import("../views/VistMap.vue")

Vue.use(VueRouter);

//获取原型对象上的push函数,解决重复跳转的问题
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false, title: '首页' }
},
{
    path: '/about',
    name: 'About',
    component: About,
    meta: { requiresAuth: false, title: '关于' }
},
{
    path: '/CourseDetails',
    name: 'CourseDetails',
    component: CourseDetails,
    meta: { requiresAuth: true, title: '课程详情' }
},
{
    path: '/VistMap',
    name: 'VistMap',
    component: VistMap,
    meta: { requiresAuth: true, title: '访问地图' }
},
{
    path: '/Experiment',
    name: 'Experiment',
    component: () =>
        import("../views/Experiment.vue"),
    meta: { requiresAuth: true, title: '实验室' }
},
{
    path: '/Login',
    name: 'Login',
    component: () =>
        import("../views/Login.vue"),
    meta: { title: '登录注册' }
},
{
    path: '/SearchPage',
    name: 'SearchPage',
    component: () =>
        import("../views/SearchPage.vue"),
    meta: { requiresAuth: true, title: '搜索页面' }
},
{
    path: '/PerSomInform',
    name: 'PerSomInform',
    component: () =>
        import("../views/PerSomInform.vue"),
    meta: { requiresAuth: true, title: '个人信息' }
},
{
    path: '/CollectionCourses',
    name: 'CollectionCourses',
    component: () =>
        import("../views/CollectionCourses.vue"),
    meta: { requiresAuth: true, title: '收藏课程' }
},
{
    path: '/JumpUser/*',
    name: 'JumpUser',
    component: () =>
        import("../views/JumpUser.vue"),
    meta: { requiresAuth: false, title: '跳转' }
},
{
    path: '/ExperReport',
    name: 'ExperReport',
    component: () =>
        import("../views/ExperReport.vue"),
    meta: { requiresAuth: true, title: '上传报告' }
},
{
    path: '/personExperRecord',
    name: 'personExperRecord',
    component: () =>
        import("../views/personExperRecord.vue"),
    meta: { requiresAuth: true, title: '个人实验记录' }
},
{
    path: '/allExperRecord',
    name: 'allExperRecord',
    component: () =>
        import("../views/allExperRecord.vue"),
    meta: { requiresAuth: true, title: '实验统计' }
},
{
    path: '/ScoreView',
    name: 'ScoreView',
    component: () =>
        import("../views/ScoreView.vue"),
    meta: { requiresAuth: true, title: '详细分数查看' }
},
]

const router = new VueRouter({
    // mode: 'history',//坑爹，美化url坑害自己
    routes
});

//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
    //获取store里面的token
    // console.log("store:" + store.state.token)
    let token = store.state.token;
    // let token = false;
    //判断要去的路由有没有requiresAuth
    if (to.meta.requiresAuth) {
        if (token) {
            next();
        } else {
            next({
                path: '/Login',
                query: { redirect: to.fullPath } // 将刚刚要去的路由path作为参数，方便登录成功后直接跳转到该路由
            });
        }

    } else {
        next();
    }
});


export default router