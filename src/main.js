import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'
import VueLazyLoad from 'vue-lazyload'
import SlideVerify from 'vue-monoplasty-slide-verify' // 拼图验证码
import vueToTop from 'vue-totop'
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

//or require
Vue.use(ElementUI)
Vue.use(vueToTop)
Vue.use(SlideVerify)
Vue.use(VueLazyLoad, {
    loading: require('@/assets/images/loading.gif')  //此图片路径为懒加载的默认图，小伙伴根据实际情况更改路径
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

