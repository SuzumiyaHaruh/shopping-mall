<template>
  <div class="home">
    <!--    banner-->
    <div class="banner">
      <div class=" container"><img src="@/assets/images/home/banner.png"/></div>
    </div>
    <!--      精品推荐-->
    <Mytitle title="精品推荐" :imgSrc="this.imgSrc[0]"></Mytitle>
    <List :records="boutiqueArr"></List>
    <!--      热门兑换-->
    <Mytitle title="热门兑换" :imgSrc="this.imgSrc[1]"></Mytitle>
    <div class="container"><img src="@/assets/images/home/ad.png" style="margin-bottom: 30px"></div>
    <List :records="popularArr"></List>
    <!--    积分攻略-->
    <div class="integral">
      <Mytitle title="积分攻略" :imgSrc="this.imgSrc[2]"></Mytitle>
      <div class="container imgList">
        <div class="imgBox" v-for="(itemm,index) in this.integral" :key="index">
          <h2>{{ itemm.title }}</h2>
          <div class="btn">{{itemm.button}}</div>
          <img :src="itemm.img"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>


import Mytitle from "@/components/Home/Mytitle";
import List from "@/components/Home/List";
import {HotApi, JingpinApi} from "@/request/api";

export default {
  name: `Home`,
  components: {List, Mytitle},
  data() {
    return {
      imgSrc: [
        require('@/assets/images/home/Recommend.png'),
        require('@/assets/images/home/hot.png'),
        require('@/assets/images/home/integral.png'),
      ],
      //积分
      integral: [
        {title: '签到得鸡腿', button: '去签到', img: require('@/assets/images/home/integral-01.png')},
        {title: '购课得鸡腿', button: '去购课', img: require('@/assets/images/home/integral-02.png')},
        {title: '推荐得鸡腿', button: '去推荐', img: require('@/assets/images/home/integral-03.png')},
        {title: '做任务得鸡腿', button: '做任务', img: require('@/assets/images/home/integral-04.png')},
      ],
      boutiqueArr: [],
      popularArr: []
    }
  },
  created() {
    //精品推荐
    JingpinApi().then((res) => {
      this.boutiqueArr = res.data.data.records
    })
    //热门
    HotApi().then((res) => {
      this.popularArr = res.data.data.records
    })
  }
}
</script>

<style lang="less" scoped>
@import "./src/total.less";

.home {
  background: #F5F5F5;

  .banner {
    padding-bottom: 30px;
    background: #FFFFFF;

    img {
      display: block;
    }
  }

  .integral {
    background: #FFFFFF;
    padding-bottom: 47px;

    .imgList {
      display: flex;
      justify-content: space-between;

      .imgBox {
        text-align: center;
        position: relative;
        overflow: hidden;

        h2 {
          z-index: 10;
          position: absolute;
          font-size: 30px;
          font-weight: bold;
          color: #FFFFFF;
          top: 43px;
          left: 20px;
        }

        .btn {
          z-index: 10;
          position: absolute;
          width: 96px;
          height: 27px;
          line-height: 27px;
          color: #FFFFFF;
          border: 1px solid #FFFFFF;
          left: 20px;
          bottom: 50px;
        }

        img {
          width: 100%;
          height: 100%;
          transition: all .6s;
        }

        &:hover {
          img {
            transform: scale(1.1)
          }
        }
      }
    }
  }
}
</style>
