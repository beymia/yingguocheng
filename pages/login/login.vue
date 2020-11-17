<template>
  <view class="login">
    <view class="login_head">
      <image src="../../static/images_t/orderForm/login_box.png"></image>
    </view>
    <view class="login_tip">
      <text>您的手機號</text>
      <text>未註冊的手機驗證碼將自動創建XX賬戶</text>
    </view>
    <view class="login_input">
      <picker class="area_code_select"
              :range="areaCode"
              @change="changeAreaCode"
              :value="cAreaCode">
        <text>+{{ areaCode[cAreaCode] }}</text>
        <uni-icons class="arrow_down"
                   type="arrowdown"
                   size="30"
                   color="#666666">
        </uni-icons>
      </picker>
      <input class="phone_input"
             v-model="phone"
             type="number"
             maxlength="11"
             placeholder="請輸入手機號"/>
    </view>
    <view class="login_submit" @click="loginStart">
      <button plain
              :class="[phone.length>=6?'phone_success':'']"
              hover-class="none">
        <uni-icons
            class="submit"
            type="arrowright"
            size="50"
            color="#ffffff">
        </uni-icons>
      </button>
    </view>
  </view>
</template>

<script>
import {sendCheckCode} from "../../request/api";

//发送验证码，具体的登录逻辑在checkCode
export default {
  data() {
    return {
      phone: '',
      cAreaCode: 0,
      areaCode: ['853', '86', '82', '84', '850', '852', '855', '856', '81', '880', '886'],
      from:'',
    }
  },
  onLoad(options){
    options.from && (this.from = options.from)
  },
  methods: {
    async loginStart() {

      //手机号错误的处理
      if (this.phone.length > 11 || this.phone.length < 6) {
        this.customToast('手機號錯誤',false)
        return
      }

      try {
        uni.showLoading({
          title: '正在發送驗證碼',
          mask: true,
        })
        //發送驗證碼 TODO
       // await sendCheckCode({
       //    mobile: this.phone
       //  })
        uni.hideLoading()
        /*手机号正确，跳转至验证码接收頁*/
        uni.navigateTo({
          url: '/pages/checkCode/checkCode?query=' + JSON.stringify({phone:this.phone,from:this.from})
        })
      } catch (e) {
				console.log(e)
        //驗證碼發送失敗
        this.customToast('驗證碼發送失敗')
      }
    },
    changeAreaCode(e) {
      this.cAreaCode = e.detail.value;
    },
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  background-color: #FFFFFF;
  box-sizing: border-box;
  padding: 0 $spacing-base;

  .login_head {
    width: 100%;
    height: 170rpx;
    padding-top: 50rpx;

    image {
      width: 150rpx;
      margin: 0 auto;
    }
  }

  .login_tip {
    width: 100%;
    height: 150rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 50rpx;
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

  .login_input {
    width: 100%;
    height: 66rpx;
    border-bottom: 1rpx solid #cccccc;
    padding-bottom: 20rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

    .area_code_select {
      width: 117rpx;

      text {
        font-size: $font-size-lg;
        color: $font-color1;
      }

      .arrow_down {
        display: inline-block;
      }
    }

    .phone_input {
      height: 30rpx;
      flex: 1;
      padding-left: 20rpx;
      box-sizing: border-box;
      font-size: $font-size-base;
      color: $font-color3;
      position: relative;

      &:after {
        width: 1rpx;
        height: 30rpx;
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -15rpx;
        background-color: #707070;
      }
    }
  }

  .login_submit{
    width: 156rpx;
    height: 96rpx;
    background-color: #E9E9E9;
    border-radius: 100rpx;
    margin-top: 150rpx;
    overflow: hidden;
    float: right;

    button{
      width: 100%;
      height: 100%;
      border: none;
      padding: 0;
      text-align: center;
      line-height: 96rpx;

      .submit{
        display: inline;
        height: 100%;
        text-align: center;

        /deep/.uni-icons{
          display: inline;
        }
      }
    }
  }

  .phone_success{
    background:$main-color
  }
}
</style>
