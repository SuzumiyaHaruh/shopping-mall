<template>
  <nav class="nav">
    <div class="container">
      <img class="logo" @click="$router.push('/home')" src="@/assets/images/indexLogo.png" alt=""/>
      <ul>
        <li @click="$router.push('/home')" :class="$route.path==='/home' ? 'active' : ''">首页</li>
        <li @click="$router.push('/goods')" :class="$route.path==='/goods' ? 'active' : ''">全部商品</li>
        <li @click="$router.push('/user')" :class="{'active': $route.path.includes('/user')}">个人中心</li>
        <li @click="$router.push('/order')" :class="$route.path==='/order' ? 'active' : ''">我的订单</li>
        <li @click="$router.push('/free')" :class="$route.path==='/free' ? 'active' : ''">专属福利</li>
      </ul>
      <div class="search">
        <input @keydown.enter="searchFn" type="text" placeholder="请输入关键字" v-model.trim="searchContent"/>
        <span @click="searchFn"><img src="@/assets/images/search.png" alt=""/></span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: `Nav`,
  data() {
    return {
      searchContent: ''
    }
  },
  methods: {
    searchFn() {
      this.$router.push(`goods?keyword=${this.searchContent}`)
      this.searchContent = ''
    }
  }

}
</script>

<style lang="less" scoped>
@import "./src/total.less";

.nav {
  .container {
    height: 118px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ul {
      width: 500px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      li {
        font-size: 16px;
        color: #242B39;
        font-weight: 500;
        cursor: pointer;
        padding: 5px 0 5px 0;

        &.active {
          font-weight: bold;
          color: @blue;
        }
      }

    }

    .search {
      width: 264px;
      height: 40px;

      input {
        float: left;
        padding: 0;
        width: 214px;
        height: 40px;
        border: 1px solid #DEDEDE;
        box-sizing: border-box;
        outline: none;
        border-radius: 20px 0px 0px 20px;
        text-indent: 1em;
      }

      span {
        float: right;
        width: 50px;
        height: 40px;
        background: @blue;
        border-radius: 0px 20px 20px 0px;
        cursor: pointer;
        line-height: 40px;
        text-align: center;
      }

    }

  }
}
</style>
