<template>
  <view class="container">
    <popUpLayer>
      <template>
        <view class="login_box">
          <view class="head">
            <image src="../../static/images_t/orderForm/login_box.png"></image>
            <uni-icons @click="$emit('close-login-box',0)"
                       class="close"
                       type="clear"
                       size="50"
                       color="#D0D0D0">
            </uni-icons>
          </view>
          <view class="content">
            <view class="content_head">
              <text>歡迎登陸英國城~</text>
              <text>登錄後消費可獲取積分，享受更好的服務體驗</text>
            </view>
            <view class="login_btn">
              <button @click="navLogin" plain>使用手機號登陸</button>
            </view>
            <view class="protocol">
              <text>點擊登錄XX，即表示已閱讀並同意</text>
              <text>《XX用戶隱私條款》</text>
              <text>《用戶服務須知》</text>
            </view>
          </view>
        </view>
      </template>
    </popUpLayer>
  </view>
</template>

<script>
import popUpLayer from "../popUpLayer/popUpLayer";
import {login} from "../../request/api";

const APP = getApp().globalData
export default {
  name: "loginBox",
  methods: {
    navLogin() {
      /* uni.navigateTo({
        url:'/pages/login/login'
       })*/

      //TODO測試使用
      this.phone = 15660088912
      let result,
          self = this;
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
                  console.log(wxCode);
                  result = await login({
                    mobile: self.phone,
                    code: wxCode.code
                  })

                  //將token賦值給全局對象並且存入本地storage中
                  console.log(result);
                  APP.userToken = result.data.token;
                  uni.setStorageSync('token', APP.userToken)
                  uni.switchTab({
                    url: '/pages/home/home',
                    success(e) {
                      console.log(e);
                    }
                  })
                  uni.hideLoading()
                } catch (e) {
                  console.log(e);
                  console.log('登錄出錯')
                  uni.hideLoading()
                }
              }
            })
          } else {
            //h5登錄
            try {
              result = await login({
                mobile: self.phone,
              })
            } catch (e) {
              console.log(e);
              console.log('登錄錯誤')
              uni.hideLoading()
            }
            //將token賦值給全局對象並且存入本地storage中
            console.log(result);
            APP.userToken = result.data.token;
            uni.setStorageSync('token', APP.userToken)
            uni.switchTab({
              url: '/pages/home/home',
              success(e) {
                console.log(e);
              }
            })
            uni.hideLoading()
          }
        }
      })
    }
  },
  components: {
    popUpLayer
  }
}
</script>
<style scoped lang="scss">
.login_box {
  width:100vw;
  height: 700rpx;
  background: #FFFFFF;
  border-radius: 20rpx 20rpx 0 0;

  .head{
    width: 100%;
    height: 170rpx;
    position: relative;

    .close{
      position: absolute;
      right: 30rpx;
      top: 30rpx;
    }

    image{
      width: 150rpx;
      height: 120rpx;
      vertical-align: middle;
      position: absolute;
      top: 50rpx;
      left: 50%;
      margin-left: -75rpx;
    }
  }

  .content{
    width: 100%;
    height:530rpx ;
    margin-top: 32rpx;

    .content_head{
      width: 100%;
      height: 127rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 $spacing-base;
      box-sizing: border-box;

      text:nth-child(1){
        font-size: $font-size-lg + 16rpx;
        font-weight: $font-weight-lg;
        color: $font-color1;
      }

      text:nth-child(2){
        font-size: $font-size-base;
        font-weight: $font-weight-base;
        color: $font-color3;
      }
    }

    .login_btn{
      width: 100%;
      height: 96rpx;
      padding:0 40rpx;
      box-sizing: border-box;
      margin: 100rpx 0;

      button{
        width: 100%;
        height: 96rpx;
        border: none;
        background-color: $main-color;
        border-radius: 10rpx;
        font-size: $font-size-lg;
        font-weight: $font-weight-lg;
        color: #ffffff;
        padding: 0;
        line-height: 96rpx;
        margin: 0;
      }
    }
  }

  .protocol{
    width: 100%;
    font-size: $font-size-sm - 6rpx;
    font-weight: 400;
    color: $font-color3;
    text-align: center;

    text:nth-child(2),text:nth-child(3){
      color: $main-color;
    };
  }
}
</style>
