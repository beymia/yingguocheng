<template>
	<view class="order_form_show">
		<view v-for="(order,index) in orderFormData"
          :key="index"
          class="order_form_content"
          @click="orderPayment(order,index)">
			<view class="order_shop">
				<view class="order_receiving">
					<text>{{order.haul_method}}</text>
				</view>
				<view class="order_shop_name">
					<text>{{order.shop_name}}</text>
				</view>
				<view class="order_progress">
					<text>{{order.pay_status}}</text>
				</view>
			</view>
			<view class="order_goods_container">
				<view v-for="(goods,goodsIndex) in (order.goods_data)"
              :key="goodsIndex"
              class="order_goods">
					<view class="goods_img">
						<image :src="'../../static/images_t/orderForm/shop.png'"></image>
					</view>
					<view class="goods_description">
						<view class="goods_name">
							<text>{{goods.goods_name}}</text>
						</view>
						<view v-if="!goods.tableware" class="goods_feature">
							<text class="goods_straw">{{goods.norm}},</text>
<!--							<text class="goods_type">{{goods.type}},</text>-->
<!--							<text class="goods_size">{{goods.size}},</text>-->
<!--							<text class="goods_sugar">{{goods.sugar}}</text>-->
						</view>
						<view v-else class="goods_tableware">
							<text>{{goods.tableware}}</text>
						</view>
					</view>
					<view class="single_count">
						<text>x {{goods.goods_num}}</text>
					</view>
				</view>
				<view class="order_goods_foot">
					<view class="order_goods_date">
						<text>{{order.created_at}}</text>
					</view>
					<view class="order_goods_amount">
						<text>共{{order.goods_data.length}}件商品 合計：{{order.payment_info}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	  data(){
	    return {
	      orderAmount:0
      }
    },
		props: {
			orderFormData: {
				type: Array,
				required: true
			}
		},
		mounted() {
			console.log(this.orderFormData)
		},
    methods:{
	    /*
	    * 跳转至订单支付页，已经支付过的订单不做处理
	    * */
	    orderPayment(order,index){
        if(order.pay_status === '待支付'){
          this.$emit('order-click',{order,index})
        }
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
		background-color: $main-bg;
		width: 100%;

		.order_form_content {
			width: 702rpx;
			min-height: 335rpx;
			background: #ffffff;
			border-radius: 20rpx;
			padding:0 $spacing-lg;
			box-sizing: border-box;
			margin-top: $spacing-lg;
		}

		.order_shop {
			width: 100%;
			height: 95rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #ccc;
			display: flex;
			font-size: $font-size-sm;
			position: relative;
			font-weight: $font-weight-base;

			view {
				line-height: 95rpx;
			}

			.order_shop_name {
				width: 364rpx;
				color: $font-color1;
				margin-left: 20rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.order_progress {
				color: $font-color3;
				position: absolute;
				right: 0;
			}

			.order_receiving {
				width: 74rpx;
				height: 34rpx;
				line-height: 34rpx;
				text-align: center;
				background: $main-color;
				border-radius: 6rpx;
				align-self: center;
				font-size: $font-size-sm - 2rpx;
				color: #ffffff;
			}
		}

		.order_goods_container {
			padding: $spacing-lg 0;
			box-sizing: border-box;
			font-weight: $font-weight-base;
			color: $font-color3;

			.order_goods {
				display: flex;
				margin-bottom: $spacing-lg;

				.goods_description {
					flex-grow: 1;
					margin-left: 20rpx;
					display: flex;
					flex-direction: column;
					font-size: $font-size-sm - 2rpx;
					font-weight: $font-weight-base;
					color: $font-color3;


					.goods_name {
						height: 40rpx;
						line-height: 40rpx;
						font-size: $font-size-base;
						color: $font-color1;
					}

					.goods_feature {
						font-size: $font-size-sm - 2rpx;
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
					font-size: $font-size-sm;
					color: $font-color3;
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
				font-size: $font-size-sm - 4rpx
			}

			.order_goods_amount {
				font-size: $font-size-sm;
				color: $font-color1;
			}
		}
	}
</style>
