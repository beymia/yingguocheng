<template>
  <view class="check_code">
    <view class="login_head">
      <image src="../../static/images_t/orderForm/login_box.png"></image>
    </view>
    <view class="input_container">
      <view class="login_tip">
        <text>請輸入驗證碼</text>
        <text>已將驗證碼發送至{{ phone }}</text>
      </view>
      <view class="code_input">
        <view>
          <view style="height: 100rpx"></view>
          <one-input v-model="verificationCode" :maxlength="6"></one-input>
        </view>
      </view>
      <view class="code_timer">
        <text>{{ timer }}秒後重發</text>
      </view>
    </view>
  </view>
</template>

<script>
import {
  login,
  verifyCode,
  sendCheckCode,
  registered,
} from "../../request/api";
import oneInput from "../../components/myp-one/myp-one";

const APP = getApp().globalData;

//输入验证码
export default {
  data() {
    return {
      phone: "",
      verificationCode: "",
      isFocus: 0,
      timer: 200,
      wxCode: "",
      from: "",
    };
  },

  onLoad(options) {
    options.query = JSON.parse(options.query);
    this.phone = options.query.phone || APP.userInfo.mobile; //用户手机号
    this.change = options.query.change; //有值则是修改密码
    this.from = options.query.from; //登录完成后跳转的页面，默认跳转首页
    this.customToast("驗證碼已發送", false);
  },

  //页面隐藏式清除定时器，并且验证码归位
  onUnload() {
    this.pageHide();
  },

  //进入页面直接开始定时器,时间为0时自动重发验证码
  mounted() {
    this.setCountDown(this.reCountDown);
  },

  methods: {
    //定时器计时
    setCountDown(fill) {
      this.countDown && clearInterval(this.countDown);
      let self = this;
      self.countDown = setInterval(() => {
        self.timer--;
        if (self.timer === 0) {
          clearInterval(self.countDown);
          self.timer = 200;
          fill();
        }
      }, 1000);
    },

    //重新发送验证码
    reCountDown() {
      let self = this;
      uni.showModal({
        title: "是否重新發送驗證碼",
        async success(res) {
          try {
            if (res.confirm) {
              await sendCheckCode({ mobile: self.phone });
              self.customToast("已重新發送", false);
              self.setCountDown(self.reCountDown);
            }
          } catch (e) {
            self.customToast("驗證碼發送失敗");
          }
        },
      });
    },

    //页面关闭或者卸载的操作
    pageHide() {
      this.verificationCode = "";
      uni.hideLoading();
      this.timer = 200;
      clearInterval(this.countDown);
    },

    //登陆失败
    loginError() {
      this.pageHide();
      this.customToast("登錄失敗");
    },

    //登录成功，將token賦值給全局對象並且存入本地storage中
    loginSuccess(result) {
      let self = this;
      uni.hideLoading();
      APP.userToken = result.data.token;
      APP.isLoginBox = false;
      uni.setStorageSync("token", APP.userToken);
      //options没有值时默认跳转首页
      let tabbarPage = ["home", "order", "orderForm", "my"];
      self.from = self.from || "home";
      if (tabbarPage.indexOf(self.from) !== -1) {
        uni.switchTab({
          url: `/pages/${self.from}/${self.from}`,
          success() {
            self.pageHide();
          },
        });
      } else {
        uni.redirectTo({
          url: `/pages/${self.from}/${self.from}`,
          success() {
            self.pageHide();
          },
        });
      }

      // if (self.from && self.from !== "order") {
      //   uni.redirectTo({
      //     url: `/pages/${self.from}/${self.from}`,
      //     success() {
      //       self.pageHide();
      //     },
      //   });
      // } else {
      //   let pageUrl = self.from || "home";
      //   uni.switchTab({
      //     url: `/pages/${pageUrl}/${pageUrl}`,
      //     success() {
      //       self.pageHide();
      //     },
      //   });
      // }
    },
  },

  watch: {
    async verificationCode(value) {
      let self = this;

      if (value.length === 6) {
        // TODO 验证码输入完毕后隐藏软键盘，解决跳转到设置密码页面安卓手机不聚焦问题
        uni.hideKeyboard();

        uni.showLoading({
          title: this.change ? "請稍後" : "正在登錄中",
        });

        // 驗證驗證碼 TODO
        // try {
        //   await verifyCode({ mobile: self.phone, code: self.verificationCode });
        // } catch (e) {
        //   self.customToast("驗證碼錯誤");
        //   return;
        // }

        // change有值則跳轉到設置交易密碼頁面
        if (self.change) {
          uni.hideLoading();
          uni.redirectTo({
            url: "/pages/setPassword/setPassword",
          });
          return;
        }

        let result;
        //小程序登陆
        // #ifdef MP-WEIXIN
        uni.login({
          provider: "weixin",
          scopes: "auth_base",
          async success(wxCode) {
            try {
              result = await registered({
                mobile: self.phone,
                code: wxCode.code,
              });
              self.loginSuccess(result);
            } catch (e) {
              console.log("登錄失敗", e);
              self.loginError();
            }
          },
        });
        // #endif

        // APP 和 H5 登陆
        // #ifdef APP-PLUS | H5
        try {
          result = await login({
            mobile: self.phone,
          });
          self.loginSuccess(result);
        } catch (e) {
          try {
            result = await registered({
              mobile: self.phone,
            });
            self.loginSuccess(result);
          } catch (e) {
            console.log("登錄錯誤", e);
            self.loginError();
          }
        }
        // #endif
      }
    },
  },
  components: {
    oneInput,
  },
};
</script>

<style lang="scss" scoped>
.check_code {
  width: 100vw;
  padding: 0 $spacing-base;
  box-sizing: border-box;

  .login_head {
    width: 100%;
    height: 170rpx;
    padding-top: 50rpx;

    image {
      width: 150rpx;
      margin: 0 auto;
    }
  }

  .input_container {
    width: 100%;
    display: flex;
    padding-top: 50rpx;
    flex-direction: column;
    justify-content: space-between;

    .login_tip {
      width: 100%;
      height: 100rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      text:nth-child(1) {
        font-size: $font-size-lg + 2rpx;
        font-weight: $font-weight-lg;
        color: $font-color1;
      }

      text:nth-child(2) {
        font-size: $font-size-sm;
        color: $font-color3;
      }
    }
  }

  .code_input {
    display: flex;
    justify-content: space-between;

    .input_content {
      width: 80rpx;
      height: 1rpx;
      border-bottom: 1rpx solid #cccccc;
      text-align: center;
      z-index: -1;
    }

    .empty_input {
      width: calc(100% + 200rpx);
      position: absolute;
      opacity: 0;
      z-index: 999;
      background-color: pink;
      margin-left: -200rpx;
    }
  }

  .code_timer {
    width: 100%;
    height: 33rpx;
    font-size: $font-size-sm;
    color: $font-color3;
    text-align: end;
    line-height: 33rpx;
    margin-top: 100rpx;
  }
}
</style>
