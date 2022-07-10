<template>
  <div class="user_page">
    <div class="user container">
      <Breadcrumb :breadArr="breadArr"></Breadcrumb>
      <main>
        <aside>
          <div class="avatar" :style="{backgroundImage:`url(${avatar})`}"></div>
          <div class="name">
            {{ username }}
            <span @click="openLoginOutFn">[退出]</span>
          </div>
          <div class="title">
            <img src="@/assets/images/person/transaction.png" width="20" alt="交易管理"/>
            <span>交易管理</span>
          </div>
          <ul class="list">
            <li @click="$router.push('/user/center')" :class="{'active': $route.path.includes('/center')}">个人中心</li>
            <li @click="$router.push('/user/order')" :class="{'active': $route.path.includes('/order')}">我的订单</li>
            <li @click="$router.push('/user/cart')" :class="{'active': $route.path.includes('/cart')}">购物车</li>
            <li @click="$router.push('/user/message')" :class="{'active': $route.path.includes('/message')}">消息通知</li>
            <li @click="$router.push('/user/detail')" :class="{'active': $route.path.includes('/detail')}">积分明细</li>
            <li @click="$router.push('/user/attack')" :class="{'active': $route.path.includes('/attack')}">积分攻略</li>
          </ul>
          <div class="title">
            <img src="@/assets/images/person/transaction.png" width="20" alt="交易管理"/>
            <span>个人信息管理</span>
          </div>
          <ul class="list">
            <li @click="$router.push('/user/address')" :class="{'active': $route.path.includes('/address')}">地址管理</li>
            <li @click="$router.push('/user/safe')" :class="{'active': $route.path.includes('/safe')}">账号安全</li>
          </ul>
        </aside>
        <article>
          <router-view></router-view>
        </article>
      </main>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import {loginOutFn} from "@/components/User";

export default {
  name: `User`,
  components: {Breadcrumb},
  data() {
    return {
      breadArr: ['个人中心'],
      avatar: sessionStorage.getItem('avatar'),
      username: sessionStorage.getItem('username')
    }
  },
  methods: {

    //确认框
    openLoginOutFn() {
      this.$confirm('此操作将退出该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //退出账号
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
    }
  }
}
</script>

<style lang="less" scoped>
@import "./src/total.less";

.user_page {
  background: #F5F5F5;

  main {
    border-top: 1px solid #E1E1E1;
    padding: 28px 0 48px;
    display: flex;
    justify-content: space-between;

    aside {
      width: 200px;
      height: 740px;
      background: #E7E7E7;
      box-sizing: border-box;
      padding: 30px 18px 0;

      .avatar {
        width: 100px;
        height: 100px;
        margin: auto;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }

      .name {
        text-align: center;
        margin-top: 19px;
        margin-bottom: 43px;

        span {
          text-decoration: underline;
          color: @blue;
          cursor: pointer;

          &:hover {
            color: red;
          }
        }
      }

      .title {
        font-size: 16px;
        color: #333333;
        display: flex;
        align-items: center;
        margin-bottom: 14px;

        img {
          margin-right: 6px;
        }
      }

      .list {
        li {
          margin-bottom: 17px;
          font-weight: 300;
          color: #666666;
          cursor: pointer;

          &.active {
            color: @blue;
            font-weight: bold;

            &::before {
              width: 2px;
              height: 14px;
              background: @blue;
              display: inline-block;
              content: "";
              margin-right: 10px;
            }
          }
        }
      }

    }

    article {
      flex: 1;
      padding: 20px 0 0 20px;
      box-sizing: border-box;
      background: #fff;
    }
  }
}
</style>
