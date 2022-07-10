<template>
  <div id="app">
    <transition name="fade">
      <Toast v-show="$store.state.toastStatus"></Toast>
    </transition>
    <!--登录-->
    <Login
        v-show="$store.state.isShowLoginModal"
        @updateKeyFn="updateKeyFn"
    >
    </Login>
    <!--头部-->
    <!--要让一个组件重新进入created,最简单的方法就是加key，同时在父组件监听路由-->
    <Header :key="updateKey" @updateKeyFn="updateKeyFn"></Header>
    <!--导航-->
    <Nav></Nav>
    <!--路由-->
    <router-view @updateKeyFn="updateKeyFn"></router-view>
    <!--底部-->
    <Footer></Footer>
    <!--    回到顶部-->
    <vueToTop bottom="300" type="3" color="#0A328E" size="50"></vueToTop>

  </div>
</template>

<style lang="less">

</style>
<script>
import Header from "@/components/Header/Header";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import Login from "@/components/Login/Login";
import Toast from "@/components/Toast/Toast";

export default {
  components: {Toast, Login, Footer, Nav, Header},
  data() {
    return {
      updateKey: 0
    }
  },

  methods: {
    // 更新Header的key值
    updateKeyFn() {
      this.updateKey++
    }
  }
}
</script>
<style lang="less">
body {
  font-size: 16px;
  font-family: SourceHanSansSc;
  color: #333333;
}

a {
  color: #333;
  text-decoration: none;
}

input {
  outline: none;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s linear;
}

.fade-enter-to, .fade-leave {
  opacity: 1;
}

img[lazy="loading"] {
  display: block;
  width: 30% !important;
  height: 30% !important;
  margin: 30% auto 0;
}
</style>
