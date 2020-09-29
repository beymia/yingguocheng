<template>
  <view class="want_tell">
    <view class="tell_head">
      <view>英國城探秘</view>
    </view>
    <view class="tell_content">
      <view>INSPIRATION靈感之茶</view>
      <text>歡迎酷酷的妳來到奶茶星球。奶茶起源於江邊壹條名叫江邊裏的小巷，在這裏我們創造出第壹杯芝士茶，希望用壹杯好茶激發壹份靈感。此後我們創造了【滿杯紅柚、芝芝莓莓、芝芝芒芒、芝芝桃桃、多肉葡萄、波波家族】等眾多原創品種。
      </text>
    </view>
    <view class="tell_content">
      <view>都是我們的錯</view>
      <text>我們堅持使用水果、牛乳、鮮茶等新鮮原料現點現制，新鮮原料存在壹定差異，希望能得到您的諒解。如果您對出品有任何不滿，請隨時告知門店小夥伴，我們將免費為您重新制作。</text>
    </view>
    <view class="tell_content">
      <view>請註意</view>
      <text>我們堅持使用水果、牛乳、鮮茶等新鮮原料現點現制，新鮮原料存在壹定差異，希望能得到您的諒解。如果您對出品有任何不滿，請隨時告知門店小夥伴，我們將免費為您重新制作。</text>
    </view>

  </view>
</template>

<script>
export default {
  name: "wantTell"
}
</script>

<style lang="scss" scoped>
.want_tell{
  width: 100%;
  height: 100%;
  padding: $order-spacing-lg 65rpx;
  box-sizing: border-box;
  color: $font-color1;

  .tell_head{
    font-size: 44rpx;
    font-weight: $font-weight-lg;
    text-align: center;
  }

  .tell_content{
    view{
      font-size: $font-size-lg;
      margin: 50rpx 0 20rpx 0;
      text-align: center;
    }
    text{
      font-size: $font-size-base;
      text-indent: 2em;
      display: inline-block;
    }
  }
}
</style>