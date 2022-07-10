<template>
  <div class="header">
    <section class="container">
      <div class="left">欢迎来到叩丁严选</div>
      <div class="right">
        <ul>
          <li class="avatar_li"><img @click="showToastFn" class="avatar" :src="userInfo.headImg"
                                     alt="">用户名：{{ userInfo.nickName }}
          </li>
          <li>我的鸡腿: {{ userInfo.coin }}</li>
          <li>获取鸡腿</li>
          <li>叩丁狼官网</li>
        </ul>
        <div v-if="$store.state.isLogined" class="cart_btn">
          <img
              src="@/assets/images/Shopping.png"
              alt="" width="20" height="20"
          />
          <span>购物车</span>
          <b>{{ cartTotal }}</b>
        </div>
        <div v-else class="login_btn" @click="openLogin">登录</div>
      </div>
    </section>
  </div>
</template>

<script>

import {MessageFn} from "@/utils/toastFn";
import {UserInfoApi, WeixinLoginApi} from "@/request/api";

export default {
  name: `Header`,
  data() {
    return {
      //用户登录一般后端都会返回一个token作为登录凭证
      isLogined: false,
      cartTotal: 0,
      userInfo: {
        headImg: sessionStorage.getItem('avatar') || require('@/assets/images/home/user.png'),
        nickName: sessionStorage.getItem('username') || '游客',
        coin: sessionStorage.getItem('mycoin') || '--',
      }
    }
  },
  created() {
    this.bindWechatFn()
  },
  watch: {
    //监听当前路由变化
    "$route.path": {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          //不相等，离开当前页面
          // 更新Header组件
          this.$emit("updateKeyFn");
        }
      }
    }
  },
  methods: {
    //打开Login
    openLogin() {
      this.$store.commit("showLoginModal")
    },

    showToastFn() {
      if (!localStorage.getItem('x-auth-token')){
        MessageFn(this, '请先登录', 'success')
      }
    },
    bindWechatFn() {
      //用户扫码
      if (this.$route.query.code) {
        WeixinLoginApi({
          code: this.$route.query.code
        }).then((res) => {
          if (res.code === 0) {
            // 成功
            MessageFn(this, res.message, "success");
            localStorage.setItem('x-auth-token', res["x-auth-token"])
            // 更新Header组件
            this.$emit("updateKeyFn");
            //扫码成功，清除地址栏上面的code
            this.$router.push(this.$route.path);
            setTimeout(() => {
              this.$router.go(0); // 刷新当前页
            }, 2000);

          } else if (res.code === 407) {
            // 需要手机验证码登录
            MessageFn(this, '请使用手机号登录绑定微信', 'warning')
            // 重新打开登录框
            this.$store.commit("showLoginModal");
            // 临时保留uuid
            sessionStorage.setItem("uuid", res.uuid);
          } else if (res.code === 400) {
            // 请重新扫描
            MessageFn(this, '请重新扫描二维码登录', 'warning')
            // 重新打开登录框
            this.$store.commit("showLoginModal");
          } else {
            MessageFn(this, res.message, "warning");
          }
        })
      } else {
        //没有code
        let token = localStorage.getItem('x-auth-token')
        this.$store.commit("changeIsLogined")
        if (token) {
          //已经登录
          //获取用户信息
          UserInfoApi().then((res) => {
            //解构，即获取data里的cartTotal
            let {cartTotal, userInfo} = res.data
            this.cartTotal = cartTotal
            this.userInfo = userInfo
            // 存储我的积分、头像和昵称
            sessionStorage.setItem("mycoin", userInfo.coin);
            sessionStorage.setItem("avatar", userInfo.headImg);
            sessionStorage.setItem("username", userInfo.nickName);
          })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "./src/total.less";

.header {
  width: 100%;
  height: 40px;
  color: #FFFEFE;
  background: #242B39;

  section {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .right {
      display: flex;

      ul {
        display: flex;
        align-items: center;

        li {
          margin-right: 20px;
          cursor: pointer;

          &.avatar_li {
            display: flex;
            align-items: center;
          }

          .avatar {
            width: 26px;
            height: 26px;
            border-radius: 13px;
            margin-right: 5px;
          }
        }
      }

      .login_btn {
        width: 124px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: @blue;
        cursor: pointer;
      }

      .cart_btn {
        width: 124px;
        height: 40px;
        background: @blue;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          margin: 0 8px 0 6px;
        }

        b {
          width: 22px;
          height: 22px;
          background: #FD604D;
          border-radius: 11px;
          text-align: center;
          line-height: 22px;
        }
      }
    }
  }
}
</style>
