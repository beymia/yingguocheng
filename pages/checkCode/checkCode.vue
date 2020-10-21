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
        <!--改用组件-->
<!--        <label v-for="(code,index) in 6" :key="index">-->
<!--          <input class="input_content"-->
<!--                 disabled-->
<!--                 maxlength="1"-->
<!--                 v-model="verificationCode[index]"-->
<!--                 type="text">-->
<!--        </label>-->
<!--        <input focus @input="inputCode" v-model="verificationCode" maxlength="6" class="empty_input" type="text">-->

        <view>
          <view style="height: 100rpx;"></view>
          <one-input v-model="verificationCode" :maxlength="6"></one-input>
          <view style="height: 100rpx;"></view>
        </view>
      </view>
      <view class="code_timer">
        <text>{{ timer }}秒後重發</text>
      </view>
    </view>
  </view>
</template>

<script>
import {login, verifyCode,sendCheckCode} from "../../request/api";
import oneInput from '../../components/myp-one/myp-one'

const APP = getApp().globalData;
export default {
  data() {
    return {
      phone: '',
      verificationCode: '',
      isFocus: 0,
      timer: 200,
      wxCode: '',
      from: ''
    }
  },

  onLoad(options) {
    console.log(options.from);
    this.phone = options.phone || APP.userInfo.mobile;//用户手机号
    this.change = options.change;//有值则是修改密码
    this.from = options.from;//登录完成后跳转的页面，默认跳转首页
    this.customToast('驗證碼已發送', false)
  },
  //页面隐藏式清除定时器，并且验证码归位
  onHide() {
    this.pageHide()
    console.log('hide清除定时器')
  },
  onUnload() {
    this.pageHide()
    console.log('unload清除定时器')
  },

  //进入页面直接开始定时器,时间为0时自动重发验证码
  mounted() {
    let self = this;
    this.countDown && clearInterval(this.countDown);
    this.countDown = setInterval(async () => {
      self.timer--;
      if (self.timer === 0) {
        try {
          await sendCheckCode({mobile: self.phone})
          self.customToast('已重發', false)
          self.timer = 200
        } catch (e) {
          console.log(e);
          self.customToast('验证码发送失败');
          //发送出错清除定时器
          clearInterval(self.countDown)
        }
      }
    }, 1000)
  },

  methods: {
    // changeCode(e){
    //   console.log(e);
    // },
    // //
    // inputCode(e) {
    //   this.verificationCode = e.detail.value
    // },

    //页面关闭或者卸载的操作
    pageHide(){
      this.verificationCode = '';
      uni.hideLoading();
      self.timer = 200;
      clearInterval(this.countDown)
      console.log('页面隐藏，清楚定时器');
    },

    //登陆失败
    loginError() {
      this.verificationCode = '';
      this.customToast('登陆失败')
    },

    //登录成功，將token賦值給全局對象並且存入本地storage中
    loginSuccess(result) {
      let self = this;
      uni.hideLoading()
      APP.userToken = result.data.token;
      APP.isLoginBox = false;
      uni.setStorageSync('token', APP.userToken)
      uni.switchTab({
        url: self.from ? `/pages/${self.from}/${self.from}` : '/pages/home/home',
        success() {
          //跳轉成功清除定時器，倒計時归为
          clearInterval(self.countDown);
          self.timer = 200;
          console.log('登陆成功，清除定时器')
        }
      })
    },
  },

  watch: {
    async verificationCode(value) {
      let self = this;

      if (value.length === 6) {
        uni.showLoading({
          title: this.change ? '請稍後' : '正在登錄中',
        })

          //驗證驗證碼，
          try{
            await verifyCode({mobile: self.phone, code: self.verificationCode})
          }catch (e) {
            console.log(self.phone);
            console.log(self.verificationCode);
            self.customToast('验证码错误')
            return;
          }

          //TODO change有值則跳轉到設置交易密碼頁面
          if (self.change) {
            uni.hideLoading()
            uni.redirectTo({
              url: '/pages/setPassword/setPassword',
            })
            return;
          }

        let result;
          //小程序登陆
          // #ifdef MP-WEIXIN
          uni.login({
            provider:'weixin',
            scopes: 'auth_base',
            async success(wxCode) {
              try {
                result = await login({
                  mobile: self.phone,
                  code: wxCode.code
                })
                self.loginSuccess(result)
              } catch (e) {
                console.log('登陆失败',e)
                self.loginError()
              }
            }
          })
          // #endif

        // APP 和 H5 登陆
        // #ifdef APP-PLUS | H5
        try {
          result = await login({
            mobile: self.phone,
          })
          self.loginSuccess(result)
        } catch (e) {
          console.log('登錄錯誤',e)
          self.loginError()
        }
        // #endif
      }
    }
  },
  components:{
    oneInput
  }
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
