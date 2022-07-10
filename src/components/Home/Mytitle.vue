<template>
  <div class="myTitle container">
    <div class="left">
      <img :src="this.imgSrc">
      <h2>{{ this.title }}</h2>
    </div>
    <div class="right" v-show="this.title!=='积分攻略'">
      <span @click="$router.push('/goods')">更多</span>
      <img src="@/assets/images/home/Arrow.png"/>
    </div>
  </div>
</template>

<script>
export default {
  name: `Mytitle`,
  props: ['title', 'imgSrc']
}
</script>

<style lang="less" scoped>
@import "./src/total.less";
.myTitle {
  display: flex;
  font-family: SourceHanSansSC;
  color: #242B39;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0 20px 0;

  .left {
    display: flex;
    align-items: center;

    img {
      width: 40px;
      height: 36px;
      margin-right: 10px;
      display: block;
    }

    h2 {
      height: 29px;
      font-size: 30px;
      font-weight: bold;
      line-height: 29px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    span {
      font-weight: 300;
      color: #666666;
      margin-right: 6px;
      cursor: pointer;
    }

    img {
      width: 14px;
      height: 14px;
      display: block;
    }

  }
}
</style>
