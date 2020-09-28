<template>
	<view class="invoice">
		<checkbox-group class="invoice_box">
			<label>
				<checkbox class="invoice_content">
					<view>
						<text>開票金額：{{ invoice.amount }}</text>
						<text>訂單號：{{ invoice.orderNumber }}</text>
						<text>下單時間：{{ invoice.orderDate }}</text>
					</view>
				</checkbox>
			</label>
		</checkbox-group>
	</view>
</template>

<script>
	export default {
		props: {
			invoice: {
				type: [Array, Object],
				required: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.invoice {
		width: 100%;
		height: 200rpx;
		font-size: 24rpx;
		font-weight: 400;
		background: #fff;
		color: #333333;
		border-radius: 20rpx;
		padding: 30rpx;
		box-sizing: border-box;

		.invoice_box {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;

			label {
				width: 100%;
				height: 100%;

				.invoice_content {
					width: 100%;
					height: 140rpx;
					display: flex;

					view {
						height: 100%;
						margin-left: $order-spacing;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
					}

					/* #ifdef H5*/
					//改变uni-app默认的多选框样式
					/deep/ .uni-checkbox-input {
						width: 42rpx !important;
						height: 42rpx !important;
						border-radius: 50%;
					}

					/deep/ .uni-checkbox-input-checked {
						width: 46rpx !important;
						height: 46rpx !important;
						border-radius: 50%;
						background: #17A1FF;
						color: #fff !important;
						border: none;
					}

					/* #endif*/

					
				}
			}
		}
	}
</style>
