<template>
	<view class="order_form_show">
		<view v-for="(order,index) in orderFormData"
          :key="index"
          class="order_form_content"
          @click="$emit('order-click')">
			<view class="order_shop">
				<view class="order_receiving">
					<text>{{order.receiving}}</text>
				</view>
				<view class="order_shop_name">
					<text>{{order.shop}}</text>
				</view>
				<view class="order_progress">
					<text>{{order.progress}}</text>
				</view>
			</view>
			<view class="order_goods_container">
				<view v-for="(goods,goodsIndex) in (order.goods)"
              :key="goodsIndex"
              class="order_goods">
					<view class="goods_img">
						<image :src="goods.img"></image>
					</view>
					<view class="goods_description">
						<view class="goods_name">
							<text>{{goods.name}}</text>
						</view>
						<view v-if="!goods.tableware" class="goods_feature">
							<text class="goods_straw">{{goods.straw}},</text>
							<text class="goods_type">{{goods.type}},</text>
							<text class="goods_size">{{goods.size}},</text>
							<text class="goods_sugar">{{goods.sugar}}</text>
						</view>
						<view v-else class="goods_tableware">
							<text>{{goods.tableware}}</text>
						</view>
					</view>
					<view class="single_count">
						<text>x {{goods.count}}</text>
					</view>
				</view>
				<view class="order_goods_foot">
					<view class="order_goods_date">
						<text>{{order.date}}</text>
					</view>
					<view class="order_goods_amount">
						<text>共{{order.totalCount}}件商品 合計：{{order.totalAmount}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			orderFormData: {
				type: Array,
				required: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order_form_show {
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		background-color: $order-bg;
		width: 100%;

		.order_form_content {
			width: 702rpx;
			min-height: 335rpx;
			background: #ffffff;
			border-radius: 20rpx;
			padding:0 $order-spacing;
			box-sizing: border-box;
			margin-top: $order-spacing;
		}

		.order_shop {
			width: 100%;
			height: 95rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #ccc;
			display: flex;
			font-size: 24rpx;
			position: relative;
			font-weight: 400;

			view {
				line-height: 95rpx;
			}

			.order_shop_name {
				width: 364rpx;
				color: #333333;
				margin-left: 20rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.order_progress {
				color: #999999;
				position: absolute;
				right: 0;
			}

			.order_receiving {
				width: 74rpx;
				height: 34rpx;
				line-height: 34rpx;
				text-align: center;
				background: #17a1ff;
				border-radius: 6rpx;
				align-self: center;
				font-size: 22rpx;
				color: #ffffff;
			}
		}

		.order_goods_container {
			padding: $order-spacing 0;
			box-sizing: border-box;
			font-weight: 400;
			color: #999999;

			.order_goods {
				display: flex;
				margin-bottom: $order-spacing;

				.goods_description {
					flex-grow: 1;
					margin-left: 20rpx;
					display: flex;
					flex-direction: column;
					font-size: 22rpx;
					font-weight: 400;
					color: #999999;


					.goods_name {
						height: 40rpx;
						line-height: 40rpx;
						font-size: 28rpx;
						color: #333333;
					}

					.goods_feature {
						font-size: 22rpx;
						display: flex;
						flex-wrap: wrap;
					}
				}

				.goods_img {
					flex-shrink: 0;
					width: 120rpx;
					height: 120rpx;
					vertical-align: middle;
				}

				.single_count {
					width: 130rpx;
					font-size: 24rpx;
					color: #999;
					text-align: right;
				}
			}
		}

		.order_goods_foot {
			width: 100%;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;

			.order_goods_date {
				font-size: 20rpx
			}

			.order_goods_amount {
				font-size: 24rpx;
				color: #333;
			}
		}
	}
</style>
