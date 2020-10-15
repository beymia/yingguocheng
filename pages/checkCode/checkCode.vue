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
    this.phone = APP.phone;
    this.change = options.change;
    uni.showToast({
      title: '驗證碼已經發送',
      duration: 2000,
      icon: 'none'
    })
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
      console.log('定時器觸發中',this.timer);
      let self = this;
      self.timer--;
      if (self.timer === 0) {
        uni.showToast({
          title: '已重發',
          duration: 2000,
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
      uni.hideLoading();
      uni.showToast({
        title: '出現了錯誤',
        duration: 2000,
        icon: 'none'
      })
    }
  },
  watch: {
    async verificationCode(value) {
      let self = this;
      try {
        if (value.length === 6) {
          uni.showLoading({
            title: this.change?'請稍後':'正在登錄中',
          })

          //TODO change有值則跳轉到設置交易密碼頁面
          if(this.change){
            try{
               // await verifyCode({mobile: self.phone, code: self.verificationCode})
              uni.hideLoading()
              uni.redirectTo({
                url:'/pages/setPassword/setPassword',
              })
            }catch (e){
              console.log(e);
              uni.showToast({
                title:'驗證碼錯誤',
                icon:'none',
                duration:2000
              })
            }
            return;
          }
          //TODO驗證驗證碼 改為後端驗證，修改交密碼須前段調用
           await verifyCode({mobile: self.phone, code: self.verificationCode})

          //TODO 此處獲取微信code
          /* #ifdef MP-WEIXIN*/
          await wx.login({
            success: async function (e) {
              if (e.code) {
                self.wxCode = e.code;
                console.log(e.code);
              } else {
                self.loginError()
              }
            }
          })
          /* #endif*/

          try {
            //開始登錄
						/* #ifdef MP-WEIXIN  */
						let result = await login({
						  mobile: self.phone,
							sm_code:self.verificationCode,
							code:self.wxCode
						})
						/* #endif */
						
            /* #ifndef MP-WEIXIN*/
						let result = await login({
						  mobile: self.phone,
							sm_code:self.verificationCode
						})
						/* #endif */
						
            //將token賦值給全局對象並且存入本地storage中
            APP.userToken = result.data.token;
            uni.setStorageSync('token',APP.userToken)
            uni.switchTab({
              url: '/pages/home/home',
              success() {
                //跳轉成功清除定時器，倒計時清零
                clearInterval(self.countDown);
                self.timer = 0;
              }
            })
            uni.hideLoading()
          } catch (e) {
            self.loginError()
          }
        }

      } catch (e) {
        self.loginError()
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
