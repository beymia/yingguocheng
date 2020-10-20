<template>
  <view class="foresee">
    <view class="head">
      <!-- TODO 替換圖片鏈接 foreseeList.worth_price-->
      <image :src="'../../static/images_t/milkTeaGift/img.png'"></image>
    </view>
    <view class="foresee_content">
      <view class="foresee_name">{{ foresee.card_name }}</view>
      <view class="fac_value">
        <text>選擇面額：</text>
        <text>￥{{ foresee.worth_price }}</text>
      </view>
      <!--溫馨提示-->
      <view class="point">
        <view class="tips">
          <text class="title">溫馨提示：</text>
          <text class="content">1、成功購買奶茶有禮電子卡後，可在【我的】-【奶茶有禮】-【我的奶茶有禮】中查看卡片以及好友贈送
            2、“奶茶有禮電子卡”儘通過官方運營的小程序進行售賣。如果您發現任何第三方以折扣、優惠或購物卡形式售賣“奶茶有禮電子卡”，請您務必提高警惕避免上當受騙
          </text>
        </view>
        <view class="notice">
          <text class="title">購買須知：</text>
          <text class="content">購買即視為閱讀併同意</text>
          <text class="special">《使用須知》</text>
          <text class="special">《奶茶商業預付卡章程》</text>
        </view>
      </view>
      <!--支付按鈕-->
      <view @click="buy" class="btn">
        <button plain>確認支付￥{{ foresee.worth_price }}</button>
      </view>
    </view>
  </view>
</template>

<script>
import {buyForesee} from "../../request/api";

export default {
  data() {
    return {
      foresee:{}
    }
  },
  onLoad(options){
    this.foresee = JSON.parse(decodeURIComponent(options.foresee))
  },
  methods: {
    async buy(){
      uni.showLoading({title:'购买中'})
      let self = this;
      try{
        //请求预支付信息
        let orderInfo = (await buyForesee({card_id:self.foresee.id})).data;
        self.utilPayment(orderInfo)
        self.customToast('购买成功')
      }catch (e) {
        console.log(e);
        self.customToast('购买失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
uni-page-body{
  height: 100%;
}
.foresee{
  width: 100%;
  min-height: 100%;
  background-color: $main-bg;
  padding: $spacing-lg $spacing-base 0 $spacing-base;
  box-sizing: border-box;

  .head{
    width: 100%;
    height: 400rpx;
    background: rgba(0,0,0,0);
    border-radius: 30rpx;
    margin-bottom: $spacing-lg;
  }

  .foresee_content{
    width: 100%;
    height: 550rpx;
    background: #ffffff;
    border-radius: 20rpx;
    display: flex;
    flex-direction: column;
    padding: $spacing-lg;
    box-sizing: border-box;

    .foresee_name{
      width: 100%;
      height: 45rpx;
      font-size:$font-size-lg;
      font-weight: $font-weight-lg;
      color: $font-color1;
      margin-bottom: 36rpx;
    }

    .fac_value{
      width: 100%;
      height: 75rpx;
      font-size: $font-size-lg;
      font-weight: $font-weight-lg;
      color: $font-color1;
      display: flex;
      justify-content: space-between;
      border-bottom: 1rpx solid #cccccc;
      margin-bottom: $spacing-lg;

      text:nth-child(1){
        font-size: $font-size-sm;
        font-weight: $font-weight-base;
      }
    }

    .point{
      width: 100%;
      font-size: $font-size-sm - 2rpx;
      font-weight: $font-weight-base;
      color: $font-color3;
      line-height: 1.6;

      .tips{
        margin-bottom: $spacing-lg;
      }

      .notice{
        .special{
          color: $main-color;
        }
      }
      .title{
        width: 120rpx;
        font-size: $font-size-sm;
        font-weight: $font-weight-lg;
        color: $font-color1;
      }
    }
  }

  .btn{
    width: 702rpx;
    height: 78rpx;
    background: $main-color;
    border-radius: 10rpx;
    position: fixed;
    bottom: $spacing-lg;
    left: $spacing-base;

    button{
      width: 100%;
      height: 100%;
      font-size: $font-size-base;
      color: #ffffff;
      border:none;
      margin: 0;
      padding: 0;
      line-height: 78rpx;
      text-align: center;
    }
  }
}
</style>
