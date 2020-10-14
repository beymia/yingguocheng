<template>
  <view class="member_code">
    <popUpLayer>
      <template>
        <view class="content">
          <view class="user_info">
            <image src="../../static/images_t/my/user_avatar.png"></image>
            <view>{{ user.user_name }}</view>
          </view>
<!--          <view class="payment">-->
<!--            <image @click="usedWallet" v-if="!isWallet" src="../../static/images_t/bulkInvoice/select_false.png"></image>-->
<!--            <image @click="usedWallet" v-else src="../../static/images_t/bulkInvoice/select_true.png"></image>-->
<!--            <view>使用奶茶錢包支付</view>-->
<!--            <view>（可用餘額￥{{ user.balance || '0.00' }}）</view>-->
<!--          </view>-->
          <view class="qr_code">
            <view>此二维码可累计积分</view>
            <image :src="qrCodeData"></image>
            <view>会员码每30秒自动刷新一次</view>
          </view>
        </view>
      </template>
    </popUpLayer>
  </view>
</template>

<script>
import popUpLayer from "../../components-lk/popUpLayer/popUpLayer";

import {qrCode} from "../../request/api";

export default {
  data() {
    return {
      user: {},
      qrCodeData: '',
      isWallet:false,
      timer :null
    }
  },
  async onLoad() {
    this.user = getApp().globalData.userInfo;
    await this.QRcode();
    this.timer = setInterval(async ()=>{
      await this.QRcode()
      console.log(1);
    },30000)
  },
  methods: {
    async QRcode() {
      this.qrCodeData = (await qrCode({})).data
    },
    usedWallet(){
      this.isWallet = !this.isWallet
    }
  },
  onHide(){
    clearInterval(this.timer)
  },
  onUnload(){
    clearInterval(this.timer)
  },
  components: {
    popUpLayer
  }
}
</script>

<style lang="scss" scoped>
image {
  width:100rpx;
  height:100rpx;
}
.member_code{
  width: 100%;
  height: 100vh;
  z-index: -1111;

  .content{
    width: 100vw;
    height: 984rpx;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;

    .user_info{
      font-size: $font-size-lg;
      color: #000000;
      margin-bottom: 50rpx;
      margin-top: -75rpx;
      display: flex;
      flex-direction: column;
      align-items: center;

      image{
        width: 130rpx;
        height: 130rpx;
        margin-bottom: 10rpx;
        vertical-align: middle;
      }
    }

    .payment{
      width: 500rpx;
      height: 54rpx;
      display: flex;
      justify-content: space-around;
      border-bottom:1rpx solid #cccccc;
      font-size: $font-size-sm;
      color: #000000;
      margin-bottom: 100rpx;

      image{
        width: 30rpx;
        height: 30rpx;
        vertical-align: middle;
      }

      view:nth-child(3){
        color: $font-color3;
      }
    }

    .qr_code{
      display: flex;
      flex-direction: column;
      align-items: center;

      view:nth-child(1){
        font-size: $font-size-sm;
        color: #000000;
        margin-bottom: 30rpx;
      }

      image{
        width: 260rpx;
        height: 260rpx;
        vertical-align: middle;
        margin-bottom: 20rpx;
      }

      view:nth-child(3){
        font-size:$font-size-sm - 2rpx;
        color: $font-color3;
      }
    }
  }
}
</style>
