<template>
  <view class="discount_module">
    <view v-for="(coupon,index) in discount" :key="index" class="coupon">
      <view class="detail">
        <view class="coupon_amount">
          <text>￥{{ coupon.goods_quota }}</text>
        </view>
        <view class="coupon_detail">
          <text>{{ coupon.goods_name }}</text>
          <text>有效期：{{ coupon.created_at }} - {{ coupon.expired_at }}</text>
        </view>
      </view>
      <view class="use">
        <text>{{ coupon.authority }}</text>
        <button @click="$emit('use-coupon',coupon.goods_quota)">立即使用</button>
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		name: "discountModule",
		props: {
			discount: {
				type: Array,
				redirect: true,
			}
		},
	}
</script>

<style scoped lang="scss">
	.discount_module {
		width: 100%;
		min-height: 100%;
		background: #F5F6F8;

		.coupon {
			width: 100%;
			height: 230rpx;
			margin-bottom: $order-spacing-lg;
			background: #fefefe;
			border-radius: 10rpx 10rpx 0rpx 0rpx;
			box-sizing: border-box;


			.detail {
				width: 100%;
				height: 140rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid rgba(204, 204, 204, .5);

				.coupon_amount {
					font-size: 60rpx;
					font-weight: $font-weight-lg;
					color: $main-color;
					margin-left: 40rpx;
				}

				.coupon_detail {
					margin-right: 26rpx;
					display: flex;
					flex-direction: column;

					text:nth-child(1) {
						font-size: 34rpx;
						font-weight: $font-weight-lg;
						color: $font-color1;
					}

					text:nth-child(2) {
						padding-top: 10rpx;
						font-size: $font-size-sm - 2rpx;
						color: $font-color1;
					}
				}
			}

			.use {
				width: 100%;
				height: 90rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				text {
					font-size: $font-size-sm - 2rpx;
					color: $font-color3;
					padding-left: 40rpx;
				}

				button {
					width: 140rpx;
					height: 46rpx;
					background: #ffffff;
					border: 1rpx solid $main-color;
					border-radius: 23rpx;
					font-size: $font-size-sm - 2rpx;
					color: $main-color;
					padding: 0;
					margin: 0;
					line-height: 46rpx;
					margin-right: 26rpx;
				}
			}
		}
	}
</style>
