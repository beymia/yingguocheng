<template>
  <view class="recharge">
    <radio-group @change="selectAmount" class="amount">
        <view class="items"
              v-for="(recharge,index) in rechargeData"
              :key="index">
          <image :src="recharge.img"></image>
          <view class="recharge_info">
            <text class="amount">￥{{recharge.amount}}</text>
            <radio :value="recharge.amount" color="#17A1FF" class="select"></radio>
          </view>
        </view>
    </radio-group>
    <view class="foot">
      <text v-if="rechargeAmount">￥{{rechargeAmount}}</text>
      <view class="btn">充值</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      rechargeData:[{
        img:'../../static/images_t/recharge/recharge.png',
        amount:'100'
      },{
        img:'../../static/images_t/recharge/recharge.png',
        amount:'200'
      }],
      rechargeAmount:0,
    }
  },
  methods: {
    selectAmount(e){
      let amount = e.detail.value;
      if(!isNaN(amount)){
        this.rechargeAmount = amount
      }
    }
  }
}
</script>

<style scoped lang="scss">


.recharge{
  width: 100%;
  min-height:93vh;
  background-color: $main-bg;
  padding: $spacing-lg $spacing-base 0 $spacing-base;
  box-sizing: border-box;

  .items{
    width: 100%;
    height: 400rpx;
    background: #ffffff;
    border-radius: 30rpx;
    margin-bottom: $spacing-lg;
    overflow: hidden;

    image{
      width: 100%;
      height: 300rpx;
      vertical-align: middle;
    }
.recharge_info{
  width: 100%;
  height: 100rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 $spacing-lg;
  box-sizing: border-box;

  .amount{
    font-size: $font-size-lg + 4rpx;
    font-weight: $font-weight-lg;
    color: $font-color1;
  }

  /* H5端改版单选框的默认样式*/
  /* #ifdef H5*/
  /deep/.uni-radio-input {
    width: 34rpx !important;
    height: 34rpx !important;
    margin-right: 20rpx !important;
  }

  /* #endif*/
}

  }

  .foot{
    width: 100%;
    height: 98rpx;
    background: #ffffff;
    border-top: 1px solid #cccccc;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    padding-left: $spacing-base;
    box-sizing: border-box;
    align-items: center;

    text{
      font-size: $font-size-lg + 4rpx;
      font-weight: $font-weight-lg;
      color: $font-color1;
    }

    .btn{
      width: 200rpx;
      height: 98rpx;
      background: $main-color;
      font-size: $font-size-base;
      color: #ffffff;
      line-height: 98rpx;
      text-align: center;
      margin-left: auto;
    }
  }
}
</style>
