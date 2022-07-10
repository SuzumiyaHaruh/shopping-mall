<template>
  <div class="list container">
    <ul class="list">
      <li v-for="record in records" :key="record.id" @click="goDetailsFn(record.id)">
        <img v-show="record.isHotSale" class="bigImg" src="@/assets/images/home/hot-j.png">
        <img v-show="record.isLatest" class="bigImg" src="@/assets/images/home/new-j.png">
        <img v-lazy="`http://sc.wolfcode.cn${record.coverImg}`" >
        <div class="summary">
          <div class="title">{{record.name}}</div>
          <div class="drumstick">{{record.coin}} <img src="@/assets/images/home/monad.png"/></div>
          <div class="btn">立即兑换</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: `List`,
  props:['records'],
  methods:{
    goDetailsFn(id){
      this.$router.push(`/details?id=${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
@import "./src/total.less";

.list {
  width: 100%;
  display: flex;
  justify-content:flex-start	;
  flex-wrap: wrap;
  li {
    width: 285px;
    background: #FFFFFF;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    box-sizing: border-box;
    margin-right: 20px;
    margin-bottom: 20px;
    position: relative;
    //每一排最后一个盒子去掉right
    &:nth-child(4n) {
      margin-right: 0;
    }
    img {
      display: block;
    }
    .bigImg{
      position: absolute;
      top: 0;
      left: 0;
    }
    .summary {
      background: #FFFFFF;
      text-align: center;

      .title {
        font-size: 18px;
        color: #333333;
        margin: 22px 0 16px 0;
      }

      .drumstick {
        font-size: 18px;
        font-weight: bold;
        color: #FD604D;
        margin-bottom: 20px;

        img {
          width: 20px;
          display: inline-block;
        }
      }

      .btn {
        display: inline-block;
        width: 100px;
        height: 36px;
        color: @blue;
        font-size: 18px;
        line-height: 36px;
        margin-bottom: 32px;
        border: 1px solid @blue;
      }
    }

    &:hover {
      transition: all 0.8s;
      transform: translateY(-10px);

      .btn {
        background: @blue;
        color: #FFFFFF;
      }
    }
  }
}
</style>
