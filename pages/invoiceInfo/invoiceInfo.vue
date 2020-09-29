<template>
	<view class="invoice_info">
		<view class="invoice_content">
			<form action="">
				<invoiceSelect></invoiceSelect>
			</form>
		</view>
		<view class="tips">
			<view class="tips_title">
				<text>温馨提示：</text>
			</view>
			<view class="tips_content">
				<text>應國家稅務局總局要求，您若開具增值稅普通發票，須同時提供企業擡頭及納稅人識別號，否則將無法用於企業報銷。</text>
			</view>
		</view>
		<view class="invoice_submit">
			<button class="submit_btn" plain>提交申請</button>
		</view>
	</view>
</template>

<script>
	import invoiceSelect from "../../components-lk/invoiceSelect/invoiceSelect";
	export default {
		data() {
			return {}
		},
		methods: {},
		components: {
			invoiceSelect
		}
	}
</script>

<style lang="scss" scoped>
	uni-page-body {
		height: 100%;
	}

	.invoice_info {
		width: 100%;
		height: 100%;
		background: $order-bg;
		padding: $order-spacing-lg $order-spacing-base;
		box-sizing: border-box;

		.invoice_content {
			width: 100%;
			background: #FFFFFF;
			border-radius: 20rpx;
			padding: 0 $order-spacing-base;
			box-sizing: border-box;
		}

		.tips {
			margin-top: $order-spacing-lg + 2rpx;
			font-size: $font-size-sm - 2rpx;
			color: $font-color3;
			box-sizing: border-box;


			.tips_title {
				margin-bottom: 20rpx;
			}

			/* #ifdef H5*/
			.tips_title {
				margin-bottom: 20rpx;
				transform: scale(0.9);
			}

			.tips_content {
				transform: scale(0.9);
			}

			/* #endif*/
		}

		/* #ifndef H5*/
		.tips {
			padding: 0 $order-spacing-lg;
		}

		/* #endif*/

		.invoice_submit {
			width: 702rpx;
			height: 78rpx;
			position: fixed;
			left: 0;
			bottom: 50rpx;
			margin-left: $order-spacing-base;

			.submit_btn {
				height: 100%;
				padding: 0;
				margin: 0;
				font-size: $font-size-base;
				color: #ffffff;
				background: $main-color;
				border: none
			}
		}
	}
</style>
