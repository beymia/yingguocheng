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
              <!-- #ifndef MP-WEIXIN-->
              <button @click="navLogin" plain>使用手機號登陸</button>
              <!-- #endif-->
              <!-- #ifdef MP-WEIXIN-->
              <button open-type="getUserInfo"
                      @getuserinfo="getUserInfo"
                      plain>使用微信號登陸
              </button>
              <!-- #endif-->
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
import {login, userSpace} from "../../request/api";

const APP = getApp().globalData
export default {
  name: "loginBox",
  data() {
    return {
      isAuth: 0,
    }
  },
  methods: {
    // #ifndef MP-WEIXIN
    navLogin() {
      this.isAuth++;
    },
    // #endif
    // #ifdef MP-WEIXIN
    async getUserInfo(e) {
      let self = this;
      if (e.detail.userInfo) {
        uni.showLoading({title: '正在登陆中...', mask: true})
        APP.wxUserInfo = e.detail.userInfo;
        uni.login({
          provider: "weixin",
          async success(wxCode) {
            try {
              //获取token以及用户信息
              APP.userToken = (await login({code: wxCode.code,})).data.token;
              APP.userInfo = (await userSpace()).data
              uni.setStorageSync('token',APP.userToken)
              self.isLoginBox = APP.isLoginBox = false;
              uni.hideLoading()
              //强制刷新当前页面
              let pageUlr = getCurrentPages();
              pageUlr = pageUlr.slice(-1)
              uni.reLaunch({
                url: '/' + pageUlr[0].is,
              })
            } catch (e) {
              console.log(e);
              uni.hideLoading()
              self.isAuth++;
              APP.isAuth = true;
            }
          },
        });
      } else {
        APP.isAuth = false;
        self.isAuth = 0;
      }
    },
    // #endif
  },
  watch: {
    isAuth(value) {
      if (value) {
        uni.navigateTo({
          url: '/pages/login/login'
        })
      }
    },
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
  z-index: 999999;

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
