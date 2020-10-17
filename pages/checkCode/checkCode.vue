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
        <label v-for="(code,index) in 6" :key="index">
          <input class="input_content"
                 disabled
                 maxlength="1"
                 v-model="verificationCode[index]"
                 type="text">
        </label>
        <input focus @input="inputCode" v-model="verificationCode" maxlength="6" class="empty_input" type="text">
      </view>
      <view class="code_timer">
        <text>{{ timer }}秒後重發</text>
      </view>
    </view>
  </view>
</template>

<script>
import {login, verifyCode} from "../../request/api";
const APP = getApp().globalData;
export default {
  data() {
    return {
      phone: '',
      verificationCode: '',
      isFocus: 0,
      timer: 200,
      wxCode: '',
    }
  },
  onLoad(options) {
    this.phone = options.phone || APP.userInfo.mobile;
    this.change = options.change;
    this.customToast('驗證碼已發送',false)
  },
  onHide() {
    this.verificationCode = '';
    uni.hideLoading();
    clearInterval(this.countDown)
  },
  onUnload() {
    this.verificationCode = '';
    uni.hideLoading();
    clearInterval(this.countDown)
    console.log('清除定時器');
  },
  mounted() {
    this.countDown && clearInterval(this.countDown);
    this.countDown = setInterval(() => {
      let self = this;
      self.timer--;
      if (self.timer === 0) {
        uni.showToast({
          title: '已重發',
          icon: 'none',
          success() {
            self.timer = 200
          }
        })
      }
    }, 1000)
  },
  methods: {
    inputCode(e) {
      this.verificationCode = e.detail.value
    },
    loginError() {
      this.verificationCode = '';
      this.customToast('出現了錯誤')
    },
    //登录成功，將token賦值給全局對象並且存入本地storage中
    loginSuccess(result){
      let self = this;
      uni.hideLoading()
      APP.userToken = result.data.token;
      uni.setStorageSync('token', APP.userToken)
      uni.switchTab({
        url: '/pages/home/home',
        success() {
          //跳轉成功清除定時器，倒計時清零
          clearInterval(self.countDown);
          self.timer = 0;
        }
      })
    }
  },
  watch: {
    async verificationCode(value) {
      let self = this;

      if (value.length === 6) {
        console.log('驗證碼輸入完成')
        uni.showLoading({
          title: this.change ? '請稍後' : '正在登錄中',
        })
        try {
          //TODO change有值則跳轉到設置交易密碼頁面
          if (this.change) {
            try {
              console.log(self.phone);
              let result = await verifyCode({mobile: self.phone, code: self.verificationCode})
              console.log(result);
              uni.hideLoading()
              uni.redirectTo({
                url: '/pages/setPassword/setPassword',
              })
            } catch (e) {
              console.log(e);
              this.customToast('驗證碼錯誤')
            }
            return;
          }

          //TODO驗證驗證碼，
          await verifyCode({mobile: self.phone, code: self.verificationCode})
          let result;
          uni.getProvider({
            service: 'oauth',
            async success(res) {
              //小程序登錄
              if (res.provider[0] === 'weixin') {
                uni.login({
                  provider: res.provider[0],
                  scopes: 'auth_base',
                  async success(wxCode) {
                    try {
                      result = await login({
                        mobile: self.phone,
                        code: wxCode.code
                      })
                      self.loginSuccess(result)
                    } catch (e) {
                      console.log(e);
                      console.log('api登錄出錯')
                      self.loginError()
                    }
                  }
                })
              } else {
                //h5登錄
                try {
                  result = await login({
                    mobile: self.phone,
                  })
                  self.loginSuccess(result)
                } catch (e) {
                  console.log(e);
                  console.log('登錄錯誤')
                  self.loginError()
                }
              }
            }
          })
        } catch (e) {
          self.loginError()
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.check_code{
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

  .input_container{
    width: 100%;
    height: 405rpx;
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
      margin-bottom: 103rpx;

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

  .code_input{
    display: flex;
    justify-content: space-between;

    .input_content{
      width: 80rpx;
      height: 1rpx;
      border-bottom: 1rpx solid #cccccc;
      text-align: center;
      z-index: -1;
    }

    .empty_input{
      width: calc(100% + 200rpx);
      position: absolute;
      opacity: 0;
      z-index: 999;
      background-color: pink;
      margin-left: -200rpx;

    }
  }

  .code_timer{
    height: 33rpx;
    font-size: $font-size-sm;
    color: $font-color3;
    margin-left: auto;
    line-height: 33rpx;
  }
}
</style>
