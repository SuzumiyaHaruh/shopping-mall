import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //是显示登录模式
        isShowLoginModal: false,
        //Header组件登录状态
        isLogined: localStorage.getItem('x-auth-token'),
        //toast的显示隐藏
        toastStatus: false,
        //toast内容
        toastMsg: "默认内容",
        //toast类型
        toastType: "success",

    },
    getters: {},
    mutations: {
        //显示登录框
        showLoginModal(state) {
            state.isShowLoginModal = true;
        },
        //隐藏登录框
        hideLoginModal(state) {
            state.isShowLoginModal = false;
        },
        //修改登录状态
        changeIsLogined(state) {
            state.isLogined = localStorage.getItem('x-auth-token');
        },
        //修改toast显示
        showToast(state, payload) {
            state.toastStatus = true
            state.toastMsg = payload.msg
            state.toastType = payload.type
        },

        hideToast(state) {
            state.toastStatus = false
        }
    },
    actions: {
        //异步控制显示
        changeToastAsync({commit}, payload) {
            commit("showToast",
                {
                    msg: payload.msg,
                    type: payload.type
                })
            setTimeout(() => {
               commit("hideToast")
            }, 2000)
        }
    },
    modules: {}
})
