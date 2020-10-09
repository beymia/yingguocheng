<template>
  <view class="discount">
    <view class="discount_head">
      <text @click="activeDiscount='unUsed'" :class="{'active':activeDiscount==='unUsed'}">可使用</text>
      <text @click="activeDiscount='used'" :class="{'active':activeDiscount==='used'}">已使用</text>
      <text @click="activeDiscount='fail'" :class="{'active':activeDiscount==='fail'}">已失效</text>
    </view>
    <view class="discount_empty" v-if="!(this[activeDiscount].length)">
      <image src="../../static/images_t/discount/discount_empty.png"></image>
      <text>暫無優惠券可用</text>
    </view>
    <view v-else class="discount_content">
      <discountModule @use-coupon="useCoupon" :discount="this[activeDiscount]"></discountModule>
    </view>
  </view>
</template>

<script>
import discountModule from "../../components-lk/discountModule/discountModule";
import {discount} from "../../request/api";

export default {
  data() {
    return {
      unUsed: [],
      used: [],
      fail: [],
      activeDiscount: 'unUsed'
    }
  },

  async mounted(){
    console.log(await this.requestDiscount(1));
    this.unUsed = await this.requestDiscount(1)
  },

  methods: {
    //點擊使用優惠券
    useCoupon(amount) {
      getApp().globalData.coupon = amount;
      uni.navigateBack({
        url: '/pages/orderPayment/orderPayment',
      })
    },

    //請求優惠券信息
    async requestDiscount(type) {
      try {
        //TODO 生產環境需要刪除設置的token
        getApp().globalData.userToken = '1'
        this.token = getApp().globalData.userToken;
        if (this.token) {
          return (await discount({
            token: this.token,
            type,
          })).data
        }else{
          uni.showToast({
            title:'請先登錄',
            duration:2000,
            icon:'none'
          })
          return []
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  watch: {
    async activeDiscount(value) {
      //沒有值的時候在獲取值
      if (this[this.activeDiscount].length === 0) {
        this.type = 1;
        switch (value) {
          case 'unUsed':
            this.type = 1;
            break;
          case 'used':
            this.type = 2
            break;
          default:
            this.type = 3
        }
        this[this.activeDiscount] = await this.requestDiscount(this.type)
      }
    },
  },
  components: {
    discountModule
  }
}
</script>

<style lang="scss" scoped>
uni-page-body {
  height: 100%;
}

.discount {
  width: 100%;
  min-height: 100%;
  background: #F5F6F8;

  .discount_head {
    width: 100%;
    height: 100rpx;
    background: #FFFFFF;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: $font-size-lg;
    font-weight: $font-weight-lg;
    color: $font-color2;
    box-sizing: border-box;
    position: fixed;
    top: --status-tab-height;

    text {
      display: inline-block;
      height: 100%;
      box-sizing: border-box;
      line-height: 100rpx;

      &.active {
        border-bottom: 4rpx solid $font-color1;
        color: $font-color1;
      }
    }
  }

  .discount_content {
    padding: 150rpx $spacing-base 0 $spacing-base;
    width: 100%;
    min-height: 100%;
    box-sizing: border-box;
  }

  .discount_empty{
    padding-top: 293rpx;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    image{
      width: 331rpx;
      height: 259rpx;
    }

    text{
      font-size: $font-size-sm;
      color: $font-color3;
    }
  }
}
</style>
