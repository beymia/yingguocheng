<template>
  <view class="profile">
    <view class="head">
      <image v-if="wxUserInfo.avatarUrl" :src="wxUserInfo.avatarUrl"></image>
      <image v-else src="../../static/images_t/my/user_avatar.png"></image>
    </view>
    <view class="content">
      <view class="item name">
        <text>暱稱</text>{{wxUserInfo.nickName || user.user_name}}
      </view>
      <view class="item phone">
        <text>手機</text>{{handlerPhone}}
      </view>
      <view class="item create_time">
        <text>註冊</text>{{userInfo.created_at}}
      </view>
    </view>
  </view>
</template>

<script>
const APP = getApp().globalData
export default {
  data() {
    return {
      userInfo:APP.userInfo,
      wxUserInfo:APP.wxUserInfo,
    }
  },
  computed:{
    handlerPhone(){
     return this.userInfo.mobile.replace(/\d/g, function (value, index) {
        if (index >= 3 && index <= 6) {
          return '*'
        } else {
          return value
        }
      })
    },
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.profile{
  width: 100vw;
  height: 90vh;

  .head{
    width: 100%;
    height: 160rpx;
    display: flex;
    align-items: center;
    justify-content: center;

    image{
      width: 110rpx;
      height: 110rpx;
      vertical-align: middle;
      border-radius: 50%;
      overflow:hidden;
    }
  }


  .content{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $spacing-lg;
    box-sizing: border-box;

    .item{
      width: 100%;
      height: 100rpx;
      border-bottom: 1rpx solid #ccc;
      line-height: 100rpx;
      font-size: $font-size-base;
      color: $font-color1;

      text{
        margin-right: 80rpx;
      }
    }
  }
}
</style>
