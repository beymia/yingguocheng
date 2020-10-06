<template>
  <view class="discount">
    <view class="discount_head">
      <text @click="activeDiscount='canUse'" :class="{'active':activeDiscount==='canUse'}">可使用</text>
      <text @click="activeDiscount='used'" :class="{'active':activeDiscount==='used'}">已使用</text>
      <text @click="activeDiscount='failure'" :class="{'active':activeDiscount==='failure'}">已失效</text>
    </view>
    <view class="discount_content">
      <discountModule @use-coupon="useCoupon" :discount="discount"></discountModule>
    </view>
  </view>
</template>

<script>
import discountModule from "../../components-lk/discountModule/discountModule";

export default {
  data() {
    return {
      discount: [{
        goods_name: '奶茶抵用券',
        goods_quota: 8,
        created_at: '2020.09.23',
        expired_at: '2020.10.23',
        authority: '部分飲品可用'
      },
      ],
      activeDiscount: 'canUse'
    }
  },
  methods: {
    useCoupon(amount) {
      getApp().globalData.coupon = amount;
      uni.navigateBack({
        url: '/pages/orderPayment/orderPayment',
      })
    }
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
	}
</style>
