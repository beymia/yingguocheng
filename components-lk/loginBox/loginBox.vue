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

