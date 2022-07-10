<template>
  <div class="goods">
    <div class="container">
      <Breadcrumb :breadArr="breadArr"></Breadcrumb>
      <img src="@/assets/images/home/ad.png"/>
      <ul>
        <li>
          <strong>排序:</strong>
          <span
              @click="sortFn(item.min,item.max,index)"
              :class="num1===index ? 'active' : ''"
              v-for="(item,index) in this.sortOptions"
              :key="index"
              class='avatar'>{{ item.title }}</span>
        </li>
        <li>
          <strong>分类:</strong>
          <span
              @click="categoryFn(item.type,index)"
              :class="num2===index ? 'active' : ''"
              v-for="(item,index) in this.categoryOptions"
              :key="index">{{ item.title }}</span>
        </li>
      </ul>
        <List :records="productList"></List>
      <div style="width: 100%;color: #0A328E;text-align: center;padding: 20px 0 20px 0">
        <p>已经到底了~</p>
      </div>
    </div>
  </div>
</template>

<script>
import {GoodsDataApi} from "@/request/api";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import List from "@/components/Home/List";
import {MessageFn} from "@/utils/toastFn";

export default {
  name: `Goods`,
  components: {List, Breadcrumb},
  data() {
    return {
      breadArr: ['全部商品'],
      sortOptions: [
        {min: 0, max: 0, title: '全部'},
        {min: 0, max: localStorage.getItem("mycoin"), title: '我能兑换的'},
        {min: 0, max: 2500, title: '0-2500分'},
        {min: 2500, max: 5000, title: '2500-5000分'},
        {min: 5000, max: 7500, title: '5000-7500分'},
        {min: 10000, max: 15000, title: '10000-15000分'},
        {min: 15000, max: 25000, title: '15000-25000分'},
      ],
      categoryOptions: [
        {type: 0, title: '全部'},
        {type: 1, title: '实体商品'},
        {type: 2, title: '虚拟商品'}
      ],
      //记录排序的当前项
      num1: 0, num2: 0,
      productList: [],
      // 栏目 目前可提供的参数是 1->精品推荐 2-> 热门兑换 0->全部
      did: 0,
      // ( 1->实体商品 2->虚拟商品 0->全部 )
      type: 0,
      // 大于多少积分，最少是0
      min: 0,
      // 少于多少积分，最多是10000，当传入0的时候，会直接返回所有商品，无视后台逻辑。
      max: 0,
      // 商品关键词
      keyword: '',
    }
  },

  created() {
    if (this.$route.query.keyword) {
      this.keyword = this.$route.query.keyword
    }
    this.getGoodsDataFn()
  },
  watch: {
    '$route.query.keyword': {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.$router.go(0)
        }
      }
    }
  },
  methods: {
    //将goods data请求抽离出来
    getGoodsDataFn() {
      GoodsDataApi({
        did: this.did,
        type: this.type,
        min: this.min,
        max: this.max,
        keyword: this.keyword,
      })
          .then((res) => {
            if (res.code === 0) {
              this.productList = res.data
              console.log(this.productList)
            }
          })
    },
    sortFn(min, max, index) {
      this.num1 = index
      // 如果点击的是“我能兑换的”
      if (index === 1) {
        let token = localStorage.getItem('x-auth-token')
        //判断是否登录
        if (!token) {
          MessageFn(this, '请先登录', 'warning')
          return;
        }
      }
      this.min = min
      this.max = max
      this.getGoodsDataFn()
    },
    categoryFn(type, index) {
      this.num2 = index
      this.type = type
      this.getGoodsDataFn()
    },
  }
}
</script>

<style lang="less" scoped>
@import "./src/total.less";

.goods {
  background: #F5F5F5;

  .container {
    img {
      margin-bottom: 30px;
    }

    ul {
      margin-bottom: 10px;

      li {
        display: block;

        strong {
          font-weight: bold;
          margin-right: 28px;
        }

        span {
          color: #a7a7a7;
          //font-weight: bold;
          margin-right: 28px;
          cursor: pointer;

          &.active {
            color: @blue;
            font-weight: bold;
          }
        }

        padding-bottom: 28px;
      }
    }
  }
}
</style>
