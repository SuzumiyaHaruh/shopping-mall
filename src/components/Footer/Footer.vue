<template>
  <div class="footer">
    <div class="container footer-container">
      <div class="left">
        <img class="logoImg" src="@/assets/images/footer/slogan.png" alt="">
        <p>叩丁狼是一家专注于培养高级IT技术人才，为学员提供定制化IT职业规划方案及意见咨询服务
          的教育科技公司，为您提供海量优质课程，以及创新的线上线下学习体验，帮助您获得全新的个人发展和能力提升。</p>
      </div>
      <div class="middle">
        <ul>
          <li>
            <a href="">微信公众号</a>
            <img src="@/assets/images/home/wx.png" alt="">
          </li>
          <li>
            <a href="">新浪微博</a>
          </li>
          <li>
            <a href="">在线客服</a>
            <img src="@/assets/images/home/service.png" alt="">
          </li>
        </ul>
      </div>
      <div class="right">
        <span>全国免费咨询热线：</span>
        <h2>020-85628002 </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: `Footer`
}
</script>

<style lang="less" scoped>
@import "./src/total.less";

.footer {
  background: #242B39;

  .footer-container {
    display: flex;
    height: 240px;
    justify-content: space-between;
    align-items: center;

    .left {
      .logoImg {
        margin-bottom: 27px;
        display: block;
      }

      p {
        width: 426px;
        font-size: 12px;
        color: #7D879A;
        line-height: 20px;
      }
    }

    .middle {
      ul {
        display: flex;
        justify-content: space-between;

        li {
          position: relative;
          border-right: 1px solid #7d879a;
          padding: 0 18px;

          &:last-child {
            border: 0;
          }

          &:hover {
            img {
              display: block;
            }

            a {
              color: #FFFFFF;

            }
          }

          a {
            text-decoration: none;
            color: #7d879a;
          }

          img {
            position: absolute;
            top: -115px;
            left: 50%;
            transform: translateX(-50%);
            display: none;
          }
        }
      }
    }

    .right{
      span{
        font-size: 14px;
        color: #7D879A;
        margin-bottom: 10px;
        display: block;
      }
      h2{
        font-size: 28px;
        font-weight: bold;
        color: #FFFFFF;
      }
    }
  }
}
</style>
