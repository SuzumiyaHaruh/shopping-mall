<template>
  <div class="login_modal" style="z-index: 22">
    <div class="login_bg" @click="closeLogin"></div>
    <div class="login_content">
      <img class="close" @click="closeLogin" src="@/assets/images/login/userArrow.png" alt="User">
      <ul>
        <li @click="loginWay='phone'" :class="loginWay==='phone'? 'active' : ''">手机号登录</li>
        <li @click="weixinClickFn" :class="loginWay==='wechat'? 'active' : ''">微信扫码登录</li>
      </ul>
      <section v-show="loginWay==='phone'" class="form">
        <div class="input-container">
          <input type="number" v-model="phoneNum" placeholder="请输入手机号"/>
        </div>
        <slide-verify :l="42" :r="20" :w="362"
                      :h="140" @success="onSuccess"
                      @fail="onFail"
                      @refresh="onRefresh"
                      :style="{ width: '100%', marginBottom: '20px' }"
                      class="slide-box"
                      ref="slideBlock"
                      :slider-text="msg">
        </slide-verify>
        <div class="input-container">
          <input type="text" v-model="code" placeholder="请输入验证码"/>
          <div class="vCode_btn">
            <span v-show="showCode" placeholder="" @click="getCodeFn">获取验证码</span>
            <span v-show="!showCode">{{ count }} s</span>
          </div>
        </div>
        <div class="login_btn" @click="submitFn">登录</div>
      </section>
      <div v-show="loginWay==='wechat'" id="weixin" ></div>
    </div>
  </div>
</template>

<script>
import {validateTelephone} from "@/utils";
import {BindWechatApi, GetCodeApi, LoginApi} from "@/request/api";
import {MessageFn} from "@/utils/toastFn";
export default {
  name: `Login`,
  data() {
    return {
      msg: "向右滑动",
      phoneNum: "",
      count: 60,//倒计时
      showCode: true,//true代表显示’获取验证码‘，false代表显示倒计时
      code: "",//验证码
      loginWay: "phone",//phome或wechat
    };
  },
  methods: {
    //扫码登录
    // 点击了微信扫码登录
    weixinClickFn() {
      this.loginWay = 'wechat'
      let _this = this;
      // eslint-disable-next-line no-undef
      new WxLogin({
        id: "weixin",
        appid: "wx67cfaf9e3ad31a0d",  // 这个appid要填死
        scope: "snsapi_login",
        // 扫码成功后重定向的接口
        redirect_uri: "https://sc.wolfcode.cn/cms/wechatUsers/shop/PC",
        // state填写编码后的url
        state: encodeURIComponent(window.btoa("http://localhost:8080/" + _this.$route.path)),
        // 调用样式文件
        href: "data:text/css;base64,Lyogd3hsb2dpbi5jc3MgKi8NCi5pbXBvd2VyQm94IC50aXRsZSwgLmltcG93ZXJCb3ggLmluZm97DQogICAgZGlzcGxheTogbm9uZTsNCn0NCg0KLmltcG93ZXJCb3ggLnFyY29kZXsNCiAgICBtYXJnaW4tdG9wOiAyMHB4Ow0KfQ0K\n",
      });
    },
    //关闭login
    closeLogin() {
      this.$store.commit("hideLoginModal");
    },
    // 拼图成功
    onSuccess(times) {
      let ms = (times / 1000).toFixed(1);
      this.msg = "login success, 耗时 " + ms + "s";
    },
    // 拼图失败
    onFail() {
      this.onRefresh(); // 重新刷新拼图
    },
    // 拼图刷新
    onRefresh() {
      this.msg = "再试一次";
    },
    // 点击登录按钮
    submitFn() {
      //判断手机号有问题
      if (!validateTelephone(this.phoneNum.trim())) {
        MessageFn(this, "手机号为空或错误，请重新输入手机号", "warning")
        return;
      }
      //判断验证码有没有填写
      if (this.code.trim() === "") {
        MessageFn(this, "请输入验证码", "warning")
        return;
      }
      //判断滑块有问题
      if (this.msg == "再试一次" || this.msg == "向右滑动") {
        MessageFn(this, "请滑动拼图", "warning")
        return;
      } else {
        // 以上如果全部都通过了，就终于可以开始登录了

        // 存在uuid，
        let uuid = sessionStorage.getItem("uuid");
        if (uuid){
          // 证明此时是从微信扫码后想要做的手机号绑定
          BindWechatApi({
            phone: this.phoneNum,
            verifyCode: this.code,
            uuid: uuid,
          }).then((res)=>{
            if (res.code === 0) {
              // 存储token
              localStorage.setItem("x-auth-token", res["x-auth-token"]);
              // 提示成功
              MessageFn(this,res.message,'success');
              // 关闭登录框
              this.$store.commit("hideLoginModal");
              // 更新一下Header组件
              this.$emit("updateKeyFn");
              // 拿到这个路径 this.$route.path
              this.$router.push(this.$route.path) // 相当于在删除地址栏的code
              // 清除uuid
              sessionStorage.removeItem("uuid");
            }
          })
        }
        else {
          // 纯粹的手机号登录,不是从微信扫码过来的
          LoginApi({
            // this.phoneNum,
            // this.code,
            phone: this.phoneNum,
            verifyCode: this.code
          }).then((res) => {
            if (res.code === 0) {
              MessageFn(this,res.message,"success")
              //存储token
              localStorage.setItem('x-auth-token', res["x-auth-token"])
              //切换登录状态(Header组件改为购物车)
              this.$store.commit("changeIsLogined")
              //Login框消失
              this.$store.commit("hideLoginModal")
              // 更新一下Header组件
              this.$emit("updateKeyFn");
            }
          })
        }
      }
    },
    //点击获取验证码
    getCodeFn() {
      //正则校验手机号
      let result = validateTelephone(this.phoneNum);
      if (result) {
        //手机号正确
        GetCodeApi({phone: this.phoneNum.trim()})
            .then((res) => {
              if (res.code === 0) {
                this.showCode = false;
                MessageFn(this, "验证码发送成功", "success")
                let timer = setInterval(() => {
                  this.count--;
                  if (this.count === 0) {
                    //重置倒计时
                    this.count = 60;
                    clearInterval(timer)
                    this.showCode = true;
                  }
                }, 1000)
              } else {
                MessageFn(this, res.message, "warning")
              }
            })
            .catch((err) => {
              MessageFn(this, '请重新发送' + err, "warning")
            })
      } else {
        // 手机号错误
        MessageFn(this, "请输入正确手机号", "warning")
      }
    }
  },
}
</script>

<style lang="less" scoped>
@import "./src/total.less";

#weixin {
  width: 300px;
  margin: auto;
}

.login_modal {
  position: fixed;
  width: 100%;
  height: 100%;

  .login_bg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  .login_content {
    width: 555px;
    height: 423px;
    background: url("@/assets/images/login/loginBg.png");
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    .close {
      position: absolute;
      right: 55px;
      top: 10px;
    }

    ul {
      display: flex;
      justify-content: center;
      font-size: 18px;
      margin-top: 50px;
      margin-bottom: 20px;

      li {
        color: #999;
        cursor: pointer;

        &:first-child {
          border-right: 1px solid #000;
          padding-right: 10px;
        }

        &:last-child {
          padding-left: 10px;
        }

        &.active {
          color: #333;
        }
      }
    }

    .form {
      width: 362px;
      margin: auto;

      .input-container {
        width: 100%;
        display: flex;
        height: 50px;
        margin-bottom: 20px;
        justify-content: space-between;

        input {
          flex: 1;
          height: 50px;
          font-size: 16px;
          text-indent: 1rem;
          border: 1px solid #ccc;
          box-sizing: border-box;
        }

        .vCode_btn {
          width: 100px;
          height: 50px;
          color: #fff;
          text-align: center;
          line-height: 50px;
          background: @blue;
          margin-left: 10px;
          cursor: pointer;
        }
      }

      /deep/ .slide-box {
        width: 100%;
        position: relative;
        box-sizing: border-box;

        canvas {
          position: absolute;
          left: 0;
          top: -140px;
          display: none;
          width: 100%;
          box-sizing: border-box;
        }

        .slide-verify-block {
          width: 85px;
          height: 136px;
        }

        .slide-verify-refresh-icon {
          top: -140px;
          display: none;
        }

        &:hover {
          canvas {
            display: block;
          }

          .slide-verify-refresh-icon {
            display: block;
          }
        }
      }

      .login_btn {
        width: 362px;
        height: 50px;
        color: #fff;
        background: @blue;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
      }

    }
  }
}
</style>
