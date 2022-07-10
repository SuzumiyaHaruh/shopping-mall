<template>
  <div class="center">
    <div class="avatar"><img :src="avatar"></div>
    <div class="detail">
      <span class="name">用户名:<p>{{ username }}</p></span>
      <span class="coin">我的积分:<p>{{ mycoin }}</p>分</span>
      <div class="btn-group">
        <span class="quit" @click="openLoginOutFn()">退出登录</span>
        <span class="unbind" @click="openBindingWeChat">解绑账号</span>
      </div>
    </div>
  </div>
</template>

<script>
import {UnBindWechatApi} from "@/request/api";
import {loginOutFn} from "@/components/User/index";

export default {
  name: `Center`,
  data() {
    return {
      avatar: sessionStorage.getItem('avatar'),
      username: sessionStorage.getItem('username'),
      mycoin: sessionStorage.getItem('mycoin'),
    }
  },
  methods: {
    //退出账号
    openLoginOutFn() {
      this.$confirm('此操作将退出该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //退出登录
        loginOutFn(this)
        this.$message({
          type: 'success',
          message: '退出成功，即将返回首页!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });
      });
    },
    // 解绑微信
    openBindingWeChat() {
      this.$confirm('此操作将解绑该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.unBindingWeChat()
        this.$message({
          type: 'success',
          message: '解绑成功，即将返回首页!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消解绑'
        });
      });
    },
    unBindingWeChat() {
      //解绑账号
      UnBindWechatApi().then(res => {
        //退出
        if (res.code === 0) {
          setTimeout(() => {
            localStorage.removeItem('x-auth-token')
            sessionStorage.clear()
            this.$router.push('/home')
          }, 2000)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "./src/total.less";

.center {
  position: absolute;
  display: flex;
  align-items: center;
  margin: 50px;
  text-align: center;

  .avatar {
    margin-right: 20px;

    img {
      border-radius: 50%;
    }
  }

  .detail {
    .name {
      display: flex;
      justify-content: center;

      p {
        font-weight: bold;
      }
    }

    .coin {
      display: flex;
      justify-content: center;

      p {
        color: red;
      }
    }

    .btn-group {
      display: flex;

      .quit {
        display: block;
        width: 100px;
        height: 50px;
        background: #0a328e;
        color: #ffffff;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
      }

      .unbind {
        display: block;
        width: 100px;
        height: 50px;
        background-color: #e7e7e7;
        color: #333333;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
      }
    }

    span {
      margin: 10px;
    }
  }

  .modal {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;

    section {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .5);
    }

    .wranbox {
      border-radius: 10px;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      width: 320px;
      height: 190px;
      background: #fff;
      padding: 0 10px;
      box-sizing: border-box;

      .text {
        text-align: center;
        margin-top: 40px;
        font-size: 18px;
        font-weight: 700;
        line-height: 1.2;
        color: #999;
      }

      .button1, .button2 {
        position: absolute;
        bottom: 20px;
        width: 100px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #fff;
        cursor: pointer;
      }

      .button1 {
        left: 30px;
        background: #ccc;
      }

      .button2 {
        right: 30px;
        background: @blue;
      }
    }
  }


  // 这里是模态框的过渡动画
  // 入场的起始状态就等于立场的最终状态
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s linear;
  }

  .fade-enter-to, .fade-leave {
    opacity: 1;
  }
}
</style>
