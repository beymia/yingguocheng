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
        <label v-for="(code,index) in 5" :key="index">
          <input class="input_content"
              disabled
              maxlength="1"
              v-model="verificationCode[index]"
              type="number">
        </label>
        <input focus @input="inputCode" maxlength="5" class="empty_input" type="text">
      </view>
      <view class="code_timer">
        <text>{{timer}}秒後重發</text>
      </view>
    </view>
  </view>
</template>

<script>
import {verifyCode,login} from "../../request/api";

export default {
  data() {
    return {
      phone: '',
      verificationCode: '',
      isFocus: 0,
      timer:200
    }
  },
  onLoad(options) {
    this.phone = options.phone;
    uni.showToast({
      title:'驗證碼已經發送',
      duration:2000,
      icon:'none'
    })
  },
  mounted() {
    this.countDown = setInterval(()=>{
      let self = this;
      self.timer--;
      if(self.timer === 0){
        console.log(self.timer);
        uni.showToast({
          title:'已重發',
          duration:2000,
          icon:'none',
          success(){
            self.timer = 200
          }
        })
      }
    },1000)
  },
  methods: {
    inputCode(e) {
      this.verificationCode = e.detail.value
    }
  },
  watch:{
   async verificationCode(value){
      try{
        if(value.length===5){
          uni.showLoading({
            title:'正在登錄中',
          })
          await verifyCode()
          //此處獲取微信code
          await login()
          uni.hideLoading()
        }
      }catch (e){
        uni.showToast({
          title:'出現了錯誤',
          duration:2000,
          icon:'none'
        })
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
      width: 100%;
      position: absolute;
      opacity: 0;
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
