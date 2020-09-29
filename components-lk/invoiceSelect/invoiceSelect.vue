<template xmlns="">
	<view class="invoice_select">
		<view class="invoice_items invoice_type">
			<label class="invoice_title">
				<text>發票類型</text>
				<input type="text" value="電子發票" disabled>
			</label>
		</view>
		<view class="invoice_items invoice_amount">
			<label class="invoice_title">
				<text>發票金額</text>
				<input type="text" value="￥11.78" disabled>
			</label>
		</view>
		<view class="invoice_items invoice_method">
			<radio-group class="invoice_title">
				<text>開票方式</text>
				<label class="invoice_radio">
					<radio color="#17A1FF" value="type" />
					<text class="incoive_radio_text">商品類別</text>
				</label>
				<label class="invoice_radio">
					<radio color="#17A1FF" value="detail" />
					<text class="incoive_radio_text">商品明細</text>
				</label>
			</radio-group>
		</view>
		<view class="invoice_items invoice_look">
			<radio-group class="invoice_title">
				<text>發票擡頭</text>
				<label class="invoice_radio">
					<radio color="#17A1FF" value="personal" />
					<text class="incoive_radio_text">個人</text>
				</label>
				<label class="invoice_radio">
					<radio color="#17A1FF" value="unit" />
					<text class="incoive_radio_text">單位</text>
				</label>
			</radio-group>
		</view>
		<view class="invoice_items invoice_email">
			<label class="invoice_title">
				<text>郵箱地址</text>
				<input type="text" placeholder="（必填）">
			</label>
		</view>

	</view>
</template>

<script>
	export default {
		name: "invoiceSelect"
	}
</script>

<style scoped lang="scss">
	/* H5端改版单选框的默认样式*/
	/* #ifdef H5*/
	/deep/.uni-radio-input {
		width: 34rpx !important;
		height: 34rpx !important;
		margin-right: 20rpx !important;
	}

	/* #endif*/

	.invoice_select {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;

		.invoice_items {
			width: 100%;
			height: 95rpx;
			line-height: 95rpx;
			border-bottom: 1rpx solid rgba(204, 204, 204, 0.3);

			.invoice_title {
				display: flex;
				font-size: 24rpx;
				color: #333333;

				text {
					margin-right: 80rpx;
					font-size: 24rpx;
					font-weight: 700;
				}

				input {
					height: 95rpx;
					width: 431rpx;
					line-height: 95rpx;
					font-size: 24rpx;
					color: #666666;
					box-sizing: border-box;
					font-weight: 400;
				}
				
				.incoive_radio_text {
					font-weight: 400;
					color: #666666;
				}
				.invoice_radio:nth-child(2){
					position: absolute;
					left:405rpx;
				}
			}
		}
	}
</style>
