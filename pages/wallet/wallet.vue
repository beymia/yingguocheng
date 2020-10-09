<template>
  <view class="wallet">
    <view class="container">
      <view class="head">
        <text class="balance">可用余額</text>
        <view>
          <text class="symbol">￥</text>
          <text class="amount">{{ amount }}</text>
        </view>
        <text @click="navRecharge" class="btn">立即充值</text>
      </view>
      <view class="options">
        <optionsList :list="options"></optionsList>
      </view>
    </view>
  </view>
</template>

<script>
import optionsList from "../../components-lk/optionsList/optionsList";

export default {
  data() {
    return {
      amount: '0.00',
      options: [{
        title: '掃碼支付',
        summary: '可使用錢包直接支付',
        icon: 'arrowright'
      }, {
        title: '消費記錄',
        icon: 'arrowright'
      }, {
        title: '修改交易密碼',
        icon: 'arrowright'
      }, {
        title: '重置交易密碼',
        icon: 'arrowright'
      },]
    }
  },
  onLoad(options) {
    this.amount = options.wallet;
  },
  methods: {
    navRecharge(){
      uni.navigateTo({
        url:"/pages/recharge/recharge"
      })
    }
  },
  components: {
    optionsList
  }
}
</script>

<style scoped lang="scss">
.wallet {
  width: 100%;
  height: 100%;
  padding-top: 100rpx;
  box-sizing: border-box;

.container{
  width: 100%;
  padding: 0 24rpx;
  box-sizing: border-box;

  .head{
    width: 100%;
    height: 174rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 154rpx;

    .balance{
      font-size: $font-size-lg;
      font-weight: $font-weight-lg;
      color: $font-color1;
    }
    .symbol{
      font-size: $font-size-lg;
      font-weight: $font-weight-lg;
      color: $font-color1;
    }
    .amount{
      font-size: 60rpx;
      font-weight: $font-weight-lg;
      color: $font-color1;
    }
    .btn{
      display: inline-block;
      width: 320rpx;
      height: 80rpx;
      background: $main-color;
      font-size: $font-size-base;
      color: #ffffff;
      text-align: center;
      line-height: 80rpx;
    }
  }

  .options {
    width: 100%;
    height: 360rpx;
  }
}
}
</style>
