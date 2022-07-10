<template>
  <div class="details">
    <div class=" container">
      <!--    //插槽-->
      <Breadcrumb :breadArr="breadArr"></Breadcrumb>
      <main>
        <div class="content">
          <div class="left">
            <div class="bigImg"><img v-lazy="`https://sc.wolfcode.cn${productInfo.coverImg}`"/></div>
            <ul>
              <li v-for="(item,index ) in productInfo.imgAltas" :key="index" @mouseenter="hoverFn(item.src)">
                <img v-lazy="`https://sc.wolfcode.cn${item.src}`"/>
              </li>
            </ul>
          </div>
          <div class="right">
            <div class="top">
              <h2>{{ productInfo.seriesTitle }}</h2>
              <p>{{ productInfo.seriesSubTitle }}</p>

              <div class="score">{{ productInfo.coin }}积分</div>
            </div>
            <div class="down">
              <section v-for="(items,index) in productInfo.parameterJson" :key="index">
                <strong>选择{{ items.title }}</strong>
                <ul>
                  <li
                      v-for="item in items.parameters"
                      :style="item.currentActivate?'border: 2px solid #0A328E;color: #0A328E':''"
                      :key="item.id"
                      @click="$router.push(`/details?id=${item.id}`)"
                  >
                    {{ item.title }}
                  </li>
                </ul>
              </section>
              <strong>数量<span>*礼品库存{{ productInfo.stock }}件</span></strong>
              <div class="step">
                <div class="reduce" @click="reduceFn">-</div>
                <input type="tel" v-model="stepNum"/>
                <div class="add" @click="addFn">+</div>
              </div>
              <div class="btns">
                <div class="addToCart" @click="addToCartFn">加入购物车</div>
                <div class="buyNow">立即购买</div>
              </div>
              <div class="love_share">
                <div class="love">
                  <img src="@/assets/images/details/like-click.png"/>
                  <span>喜欢 {{ productInfo.like }}</span>
                </div>
                <div class="share">
                  <vshare :vshareConfig="vshareConfig"></vshare>
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside>
          <h3>你还可以兑换</h3>
          <ul>
            <li v-for="item in this.themYouCanBuy" :key="item.id" @click="$router.push(`/details?id=${item.id}`)">
              <div class="left"><img v-lazy="`https://sc.wolfcode.cn${item.img}`"/></div>
              <div class="right">
                <div class="title">{{ item.name }}</div>
                <div class="score"><span>{{ item.coin }}积分</span></div>
              </div>
            </li>
          </ul>
        </aside>
      </main>
      <div class="tabs">
        <ul>
          <li @click="flag=true" :class="flag===true?'active':''">商品详情</li>
          <li @click="flag=false" :class="flag===false?'active':''">联系我们</li>
        </ul>
      </div>
      <div v-show="flag" v-html="productInfo.description"></div>
      <div v-show="!flag">
        <div class="problem">
          <h2>兑换后运费如何收取？</h2>
          <p>商城内大部分实物产品均可包邮，也支持上门自提。虚拟产品则无需运费，可在兑换后直接使用。
          <p>（注：新疆，西藏，内蒙古，青海，海南，宁夏暂不支持包邮，在此地区兑换商品需提前与客服确认运费。）</p>
          <h2>如何申请退换货？</h2>
          <p>所有产品均为鸡腿兑换礼品，无质量问题不支持退换货；
            如因喜好不同，或到货后后悔等原因，不支持退货；
            因客户原因如联系方式有误、电话停机、不接电话、无理由拒收等造成快件无法正常签收的情况，叩丁狼均不进行补发或赔付；
            如因质量问题需要退货，将由客服人员与客户联系，确认邮寄地址与流程。退回物品不得有人为损坏或使用痕迹，否则拒绝退换；
            如顾客选择自行寄回商品，请先垫付运费，到货验证商品后，叩丁狼将以鸡腿发放形式为用户报销运费，不接受单方面到付件。</p>
          <h2>如何开具发票？</h2>
          <p>叩丁狼积分商城产品均为定制礼品，使用积分兑换的产品均不支持开票。</p>
          <h2>关于鸡腿价格问题</h2>
          <p>因可能存在系统缓存、页面更新延迟等不确定性情况，导致价格显示异常，商品具体售价请以订单结算页价格为准。如您发现异常情况出现，请立即联系我们补正，以便您能顺兑换。</p>
          <h2>联系我们</h2>
          <p> www.wolfcode.cn</p>
          <p>微信公众号搜索“叩丁狼”</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {AddToCartApi, GoodsDetailsApi} from "@/request/api";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import vshare from 'vshare'
import {MessageFn} from "@/utils/toastFn";

export default {
  name: `Details`,
  components: {Breadcrumb, vshare},
  data() {
    return {
      breadArr: ['全部商品', '商品详情'],
      flag: true,
      // 分享功能的配置
      vshareConfig: {
        // 此处放分享列表（ID）
        shareList: ["weixin", "qzone",],
        //此处放置分享按钮设置
        share: [{bdSize: 24}],
        //此处放置浮窗分享设置
        slide: false
      },
      nav: [
        {name: ""},
        {name: ""}
      ],
      productInfo: {
        parameterJson: [
          {
            parameters: []
          }
        ]
      },
      themYouCanBuy: [],
      stepNum: 1
    }
  },
   created() {
    let id = this.$route.query.id
     GoodsDetailsApi({id})
        .then((res) => {
          if (res.code === 0) {
            let {nav, productInfo, themYouCanBuy} = res.data
            this.nav = nav;
            this.productInfo = productInfo;
            this.productInfo.description = this.productInfo.description.replace(/upload/g, 'http://sc.wolfcode.cn/upload');
            this.themYouCanBuy = themYouCanBuy;
          }
        })
  },
  watch: {
    "$route.query.id": {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.$router.go(0)
        }
      },
      deep: true
    }
  },
  methods: {
    hoverFn(img) {
      this.productInfo.coverImg = img;
    },
    reduceFn() {
      if (this.stepNum <= 0) {
        return;
      }
      this.stepNum--;
    },
    addFn() {
      if (this.stepNum >= this.productInfo.stock) {
        return;
      }
      this.stepNum++
    },
    // 加入购物车
    addToCartFn() {
      let id = this.$route.query.id
      AddToCartApi({
        productId: id,
        total: this.stepNum,
      }).then((res) => {
        console.log(res)
        if (res.code === 0) {
          MessageFn(this, '加入购物车成功', 'success')
          //刷新Header组件
          this.$emit("updateKeyFn");
        } else {
          MessageFn(this, res.message, "warning")
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
@import "./src/total.less";

.details {
  //margin-top: 60px;
  padding-bottom: 52px;
  background: #F5F5F5;
  main {
    display: flex;
    justify-content: space-between;

    .content {
      width: 970px;
      //background: #7d879a;
      display: flex;
      justify-content: space-between;

      .left {
        .bigImg {
          width: 459px;
          height: 440px;

          img {
            width: 459px;
            height: 440px;

          }
        }

        ul {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;

          li {
            width: 100px;
            height: 100px;

            &:nth-child(1) {
              img {
                filter: brightness(100%);
              }
            }

            &:hover {
              img {
                filter: brightness(100%);
              }
            }

            img {
              width: 100px;
              height: 100px;
              filter: brightness(50%);
              cursor: pointer;


            }

          }
        }
      }

      .right {
        padding: 0 49px 0 31px;

        .top {
          width: 430px;
          height: 160px;
          display: flex;
          flex-flow: column;
          justify-content: space-around;
          border-bottom: 1px solid #ECECEC;

          h2 {
            font-size: 28px;
            font-weight: bold;
            color: #000000;
          }

          p {
            font-size: 14px;
            font-weight: 300;
            color: #999999;
            line-height: 20px;
          }

          .score {
            font-size: 28px;
            font-weight: bold;
            color: #FD604D;
          }
        }

        .down {
          strong {

            font-weight: bold;
            color: #000000;
            margin-top: 19px;
            margin-bottom: 14px;
            display: block;

            span {
              font-size: 14px;
              color: #666666;
            }
          }

          ul {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;

            li {
              //min-width: 76px;
              height: 32px;
              //text-align: center;
              padding-left: 17px;
              padding-right: 17px;
              line-height: 32px;
              border: 1px solid #D1D1D1;
              margin-right: 20px;
              margin-bottom: 11px;
              cursor: pointer;

              &.active {
                border-bottom: 2px solid @blue;
              }
            }
          }

          .step {
            width: 106px;
            height: 32px;
            display: flex;
            justify-content: space-between;
            text-align: center;

            .reduce, .add {
              width: 30px;
              height: 32px;
              box-sizing: border-box;
              border: 1px solid #D1D1D1;
              cursor: pointer;
              line-height: 28px;
              user-select: none;
            }

            input {
              width: 46px;
              height: 32px;
              box-sizing: border-box;
              text-align: center;
              border: 0;
              //text-indent: 14px;
              border-bottom: 1px solid #D1D1D1;
              border-top: 1px solid #D1D1D1;
              user-select: none;

            }
          }

          .btns {
            font-size: 18px;
            font-weight: 300;
            color: #FFFFFF;
            text-align: center;
            display: flex;
            line-height: 46px;
            margin-top: 24px;

            .addToCart {
              width: 150px;
              height: 46px;
              background: #3DC36B;
              margin-right: 20px;
              cursor: pointer;
            }

            .buyNow {
              width: 150px;
              height: 46px;
              background: #FD604D;
              cursor: pointer;
            }
          }

          .love_share {
            margin-top: 25px;
            display: flex;

            .love {
              display: flex;
              align-items: center;
              padding-right: 16px;
              border-right: 1px solid #ECECEC;
              cursor: pointer;

              img {
                margin-right: 12px;
              }

              span {
                color: #666666;
              }
            }

            .share {
              margin-left: 16px;
            }
          }
        }
      }
    }

    aside {
      width: 230px;
      border-left: 1px solid #ECECEC;

      h3 {
        margin: 6px 0 20px 19px;
        font-size: 18px;
        font-weight: 400;
        color: #333333;
      }

      ul {
        margin-left: 19px;

        li {
          margin-bottom: 30px;
          display: flex;
          cursor: pointer;

          .left {
            width: 80px;
            height: 80px;
            margin-right: 11px;

            img {
              width: 100%;
              height: 100%;
              border: 2px solid transparent;
            }
          }

          .right {
            display: flex;
            flex-flow: column;
            justify-content: space-around;

            .title {
              width: 110px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              -o-text-overflow: ellipsis;
            }

            span {
              font-size: 18px;
              font-weight: bold;
              color: #FF5E0F;
            }
          }

          &:hover {
            .title {
              color: #0A328E;
            }

            img {
              border: 2px solid #0A328E;
            }
          }
        }
      }
    }
  }

  .tabs {
    width: 100%;
    border-top: 1px solid #ECECEC;
    cursor: pointer;

    ul {
      display: flex;

      li {
        width: 120px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 18px;
        font-weight: 300;
        color: #999999;

        &.active {
          background: #ECECEC;
          font-size: 18px;
          font-weight: bold;
          color: #333333;
        }
      }

    }

  }

  .problem {
    h2 {
      color: #333333;
      font-family: SourceHanSansSC;;
      font-size: 18px;
      font-weight: bold;
      line-height: 36px;
    }

    p {
      color: #333333;
      font-family: SourceHanSansSC;
      font-size: 18px;
      font-weight: 300;
      line-height: 36px;
    }
  }
}
</style>
