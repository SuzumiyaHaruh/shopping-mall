import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import store from "@/store";

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/details',
        name: 'details',
        component: () => import( '../views/Details.vue')
    },
    {
        path: '/free',
        name: 'free',
        component: () => import( '../views/Free.vue')
    },
    {
        path: '/goods',
        name: 'goods',
        component: () => import( '../views/Goods.vue')
    },
    {
        path: '/order',
        name: 'order',
        component: () => import('../views/Order.vue')
    },
    {
        path: '/user',
        // name: 'user',
        component: () => import( '../views/User.vue'),
        children: [
            {
                path: '',
                redirect: '/user/center'
            },
            {
                path: 'center',
                meta: "个人中心",
                component: () => import(/* webpackChunkName: "center" */ '../components/User/Center.vue')
            },
            {
                path: 'order',
                meta: "我的订单",
                component: () => import(/* webpackChunkName: "order" */ '../components/User/Order.vue')
            },
            {
                path: 'cart',
                meta: "购物车",
                component: () => import(/* webpackChunkName: "cart" */ '../components/User/Cart.vue')
            },
            {
                path: 'message',
                meta: "消息通知",
                component: () => import(/* webpackChunkName: "message" */ '../components/User/Message.vue')
            },
            {
                path: 'detail',
                meta: "积分明细",
                component: () => import(/* webpackChunkName: "detail" */ '../components/User/Detail.vue')
            },
            {
                path: 'attack',
                meta: "积分攻略",
                component: () => import(/* webpackChunkName: "attack" */ '../components/User/Attack.vue')
            },
            {
                path: 'address',
                meta: "地址管理",
                component: () => import(/* webpackChunkName: "address" */ '../components/User/Address.vue')
            },
            {
                path: 'safe',
                meta: "账号安全",
                component: () => import(/* webpackChunkName: "safe" */ '../components/User/Safe.vue')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

// 全局守卫:
// 可以使用 router.beforeEach 注册一个全局前置守卫： 全局前置守卫：初始化时执行、每次路由切换前执行
// 可以使用 router.afterEach 注册一个全局后置守卫： 全局后置守卫：初始化时执行、每次路由切换后执行
// 守卫中的参数：
// to: Route: 即将要进入的目标（路由对象）
// from: Route: 当前导航正要离开的路由
// next: Function:  调用该方法来控制接下来的行为       （后置守卫中没有这个参数）

router.beforeEach((to, from, next) => {
    //去个人中心页面，判断是否登录
    //user,user/xxx
    let mypath = to.path
    //如果路劲中出现了/user，那就返回true
    let exp1 = new RegExp(/\/user/g)
    let exp2 = new RegExp(/\/order/g)
    if (exp1.test(mypath)||exp2.test(mypath)) {
        let token = localStorage.getItem('x-auth-token')
        if (token) {
            //如果已经登录，允许跳转
            next()
        } else {
            //如果未登录，提示
            store.dispatch("changeToastAsync", {msg: '请先登录', type: 'danger'});
        }
        return //防止执行上面next之后重复执行下面的next
    }
    next()
})

router.beforeEach((to, from, next) => {
    // 路由跳转后，让页面回到顶部
    // chrome
    document.body.scrollTop = 0; // firefox
    document.documentElement.scrollTop = 0; // safari
    window.pageYOffset = 0; // 调用 next()，一定要调用 next 方法，否则钩子就不会被销毁
    next();
    //to 即将进入的路由
    //from 即将离开的路由
    //next 放行
});

export default router
