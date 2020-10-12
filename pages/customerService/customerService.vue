<template>
  <view class="customer_service">
    <!--自定義導航欄-->
    <view class="head">
      <uni-icons @click="toBack" style="display: inline-block;vertical-align: middle" type="arrowleft" size="40" color="#333333"></uni-icons>
      <view class="head_title">
        <text>品立高餐飲</text>
        <text>客服會話</text></view>
    </view>
    <!--聊天內容-->
    <view class="content">
      <!--歡迎語 & 時間-->
      <view class="tip">
        <text>{{initTime}}</text>
        <text>品立高餐飲為您服務</text>
      </view>

      <!--具體聊天內容-->
      <view class="detail">
        <view class="left">
          <image src="../../static/images_t/my/user_avatar.png"></image>
          <text>客服話語</text>
        </view>
        <view class="right">
          <image src="../../static/images_t/my/user_avatar.png"></image>
          <text>用戶話語</text>
        </view>
      </view>

    </view>
    <!--用戶輸入框-->
    <view class="user_input">
      <input type="text">
      <button plain>發送</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      initTime:0,
    }
  },
  mounted() {
    let date = new Date(),
        h = (date.getHours()+'').padStart(2,'0'),
        m = (date.getMinutes()+'').padStart(2,'0');
    this.initTime = h + ':' + m
  },
  methods: {
    toBack(){
      uni.navigateBack()
    }
  }
}
</script>

<style scoped lang="scss">
uni-page-body{
  min-height: 100%;
  background: $main-bg;
}
.customer_service{
  width: 100%;
  min-height: 100%;
  background: $main-bg;
  padding-top: 128rpx;
  box-sizing: border-box;

  .head{
    width: 100%;
    height: 128rpx;
    background: #ffffff;
    font-size: $font-size-lg;
    font-weight: $font-weight-lg;
    color: $font-color1;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    /* #ifdef MP | APP-PLUS*/
    padding-top: 47rpx;
    box-sizing: border-box;
    /* #endif*/
    .head_title{
      margin-left: 14rpx;

      text{
        display: block;
      }

      text:nth-child(2){
        font-size: $font-size-sm - 2rpx;
        font-weight: $font-weight-base;
        color: $font-color3;
      }
    }
  }

  .tip{
    width: 100%;
    height: 170rpx;
    font-size: $font-size-sm - 2rpx;
    color: $font-color3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    text:nth-child(2){
      margin-top: $spacing-lg;
    }
  }

  .user_input{
    width: 740rpx;
    height: 100rpx;
    position: fixed;
    bottom: 10rpx;
    left: 0;
    padding-left: $spacing-base;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    input{
      width: 548rpx;
      height: 80rpx;
      border-radius: 10rpx;
      background-color: #FFFFFF;
      padding:0 10rpx;
      box-sizing: border-box;
    }
    button{
      width: 140rpx;
      height: 80rpx;
      background-color: $main-color;
      border: none;
      font-size: $font-size-sm;
      color: #FFFFFF;
      line-height: 80rpx;
      border-radius: 10rpx;
    }
  }
}
</style>
