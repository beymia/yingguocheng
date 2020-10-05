<template>
  <view class="customer_service">
    <view class="head">
      <uni-icons @click="toBack" style="display: inline-block;vertical-align: middle" type="arrowleft" size="40" color="#333333"></uni-icons>
      <view class="head_title">
        <text>品立高餐飲</text>
        <text>客服會話</text></view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
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
}
</style>
