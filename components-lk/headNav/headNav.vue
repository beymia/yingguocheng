<template>
	<view class="head_nav_container">
		<view @click="$emit('nav-click')" class="head_nav_bar">
			<view v-if="iconURL" class="head_nav_icon">
				<uni-icons color="#333333" size="35" :type="iconURL"></uni-icons>
			</view>
			<view class="head_nav_text">
				<text>{{text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				required: true
			},
			iconURL: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.head_nav_container {
		width: 750rpx;
		height: 128rpx;
		background: #ffffff;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 2;
	}

	.head_nav_bar {
		width: 150rpx;
		height: 60rpx;
		background: #ffffff;
		border: 1rpx solid #cccccc;
		border-radius: 30rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
    position: absolute;
		/* #ifdef MP */
		left: 24rpx;
		bottom: 14rpx;
		/* #endif */

		/* #ifdef H5 | APP-PLUS */
		left: 24rpx;
		top: 22rpx;
		/* #endif */

		.head_nav_text {
			height: 30rpx;
			font-size: $font-size-base - 2rpx;
			font-weight: $font-weight-base;
			text-align: left;
			line-height: 30rpx;
			color: $font-color2;
		}

		.head_nav_icon {
			width: 26rpx;
			height: 21rpx;
			line-height: 21rpx;
		}
	}
</style>
