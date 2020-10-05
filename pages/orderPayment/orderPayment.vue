<template>
	<view class="order_payment">
		<!--头部-->
		<view class="order_payment_head">
			<view :class="['name_method',receivingMethod==='oneself'?'one_self':'']">
				<view class="shop_name">
					<text style="display: inline">合肥正大廣場店</text>
          <uni-icons style="display: inline-block;vertical-align: middle" type="arrowright" size="35" color="#333333"></uni-icons>
          <text v-if="receivingMethod === 'oneself'">距離您3.0km</text>
          <text v-else>張三(先生) 17756041449</text>
				</view>
				<view class="receiving_method">
					<view @click="toggleReceiving('oneself')" :class="['oneself',receivingMethod === 'oneself' ? 'active_method' : '']">
						<text>自取</text>
					</view>
					<view @click="toggleReceiving('otherPeople')" :class="['other_people',receivingMethod === 'otherPeople' ? 'active_method' : '']">
						<text>外賣</text>
					</view>
					<view @click="toggleReceiving('shop')" :class="['shop',receivingMethod === 'shop' ? 'active_method' : '']">
						<text>堂食</text>
					</view>
				</view>
			</view>
			<view class="phone" v-if="receivingMethod === 'oneself'">
				<view class="phone_input">
					<label>
						<text>聯系電話</text>
						<input :value="userPhone" type="number">
					</label>
				</view>
				<button @click="autoFill" class="auto_fill" plain>自動填寫</button>
			</view>
		</view>
		<!--取茶时间-->
		<view class="order_time">
			<view class="time_title">
				<text>取茶時間</text>
			</view>
			<view class="order_progress">
				<text>前面</text>
				<text class="text_color">11單/29</text>
				<text>杯制作中，</text>
				<text>預計</text>
				<text class="text_color">17分鐘</text>
				<text>後取茶</text>
			</view>
			<view class="current_progress">
				<progress activeColor="#17a1ff" backgroundColor="#f0f0f0" percent="60"></progress>
			</view>
		</view>
		<!--商品列表-->
		<view class="goods_list">
			<view class="list_detail">
				<view class="list_title">
					<text>商品列表</text>
				</view>
				<view class="goods_detail">
					<view class="goods_img">
						<image src="../../static/images_t/orderForm/shop.png"></image>
					</view>
					<view class="goods_info">
						<view class="goods_name">
							<text>多肉芒芒甘露</text>
						</view>
						<view class="goods_extra_info">
							<text>常規吸管，</text>
							<text>冰沙(推薦)，</text>
							<text>標準杯(500ml)，</text>
							<text> 正常(推薦）</text>
						</view>
					</view>
					<view class="goods_amount">
						<text>￥27</text>
						<text>x1</text>
					</view>
				</view>
			</view>
			<view class="attach_service">
        <view class="delivery_fee" v-if="receivingMethod==='otherPeople'">
          <view class="left">
            <text>配送費</text>
          </view>
          <view class="right">
            <text>￥5</text>
          </view>
        </view>
				<view class="service1">
					<view class="left">
						<view class="left_name">
							<text>靈感保溫袋</text>
							<text>推薦選擇</text>
						</view>
						<view class="left_des">
							<text>保冷保暖，鎖住新鮮口感</text>
						</view>
					</view>
					<view @click="isAttach = !isAttach" class="right">
						<label>
							<text>￥1.5</text>
							<radio :checked="isAttach" color="#17A1FF" />
						</label>
					</view>
				</view>
				<view class="service2">
					<view class="left">
						<text>優惠券</text>
						<image></image>
					</view>
					<view class="right">
						<view @click="isDiscount = !isDiscount" v-if="isDiscount">
              <text>暫無可用</text>
              <uni-icons style="display: inline-block;vertical-align: middle" type="arrowright" size="35" color="#999999"></uni-icons>
            </view>
            <view v-else class="discount">
              <view>【8元抵用券】-￥8</view>
              <image @click="isDiscount = !isDiscount" src="../../static/images/orderPayment/discount.png"></image>
            </view>
          </view>
				</view>
				<view class="service3">
					<view @click="isRemarks = !isRemarks"  class="left">
						<text>備註</text>
					</view>
					<view @click="isRemarks = !isRemarks"  class="right">
						<text>不打包</text>
            <uni-icons style="display: inline-block;vertical-align: middle" type="arrowright" size="35" color="#999999"></uni-icons>
					</view>
          <view class="remarks">
            <remarks></remarks>
          </view>
				</view>
			</view>
			<view class="count_amount">
				<text>共1件商品，小計</text>
				<text>￥27</text>
			</view>
		</view>
		<!--支付方式-->
		<view :class="['payment_method',receivingMethod==='oneself'?'one_self':'']">
			<text>支付方式</text>
			<view>
				<image src="../../static/images/orderPayment/weixin_icon.png"></image>
				<text>微信支付</text>
			</view>
		</view>
		<!--底部-->
		<view class="payment_foot">
			<view class="payment_amount">
				<text>合計</text>
				<text>￥27</text>
			</view>
			<view class="payment_btn">
				<button plain>支付</button>
			</view>
		</view>
		<view class="empty"></view>
	</view>
</template>

<script>
import remarks from "../../components-lk/remarks/remarks";
	export default {
		data() {
			return {
				receivingMethod: 'oneself',
				isAttach: false,
        isDiscount:false,
        userPhone:'213321123211',
        isRemarks:false
			}
		},
		methods: {
			toggleReceiving(method) {
				this.receivingMethod = method
			},
      autoFill(){
        this.userPhone = '17756041449'
      }
		},
    components:{
		  remarks
    }
	}
</script>

<style lang="scss" scoped>
uni-page-body{
  height: 100%;
}
	.order_payment {
		width: 100%;
		height: 100%;
		background-color: #F7F7F7;
		color: $font-color1;
		font-weight: $font-weight-base;

		.order_payment_head {
			width: 100%;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 0 $order-spacing-base;
			box-sizing: border-box;

			.name_method {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;

        &.one_self{
          border-bottom: 1rpx solid rgba(204, 204, 204, .5);
        }

				.shop_name {
					font-size: $font-size-lg + 2rpx;
					font-weight: $font-weight-lg;

					text:nth-child(3) {
						font-size: $font-size-sm + 2rpx;
						color: $font-color2;
						display: block;
						margin: 10rpx 0 $order-spacing-lg 0;
						font-weight: $font-weight-base;
					}
				}

				.receiving_method {
					width: 240rpx;
					height: 68rpx;
					background: #f6f6f6;
					border: 1rpx solid $main-color;
					border-radius: 34rpx;
					display: flex;
					align-items: center;
					justify-content: space-around;
					font-size: $font-size-sm;
					color: $main-color;

					view {
						flex: 1;
						text-align: center;
						width: 80rpx;
						height: 58rpx;
						line-height: 58rpx;

						&.active_method {
							background: $main-color;
							border-radius: 29rpx;
							color: #FFFFFF;
						}
					}
				}
			}

			.phone {
				width: 100%;
				height: 46rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: $order-spacing-lg + 4rpx 0;

				.phone_input {
					font-size: $font-size-base;
					color: $font-color1;

					label {
						display: flex;
						align-items: center;
						flex-wrap: nowrap;

						input {
							font-size: $font-size-base;
							color: $font-color1;
							margin-left: 20rpx;
						}
					}
				}

				.auto_fill {
					width: 118rpx;
					height: 46rpx;
					background: #ffffff;
					border: 1rpx solid $main-color;
					border-radius: 6rpx;
					font-size: $font-size-sm;
					color: $main-color;
					padding: 0;
					margin: 0;
					line-height: 46rpx;
				}
			}
		}

		.order_time {
			width: 100%;
			min-height: 210rpx;
			margin-top: $order-spacing-base;
			background: #FFFFFF;
			padding: $order-spacing-lg $order-spacing-base;
			box-sizing: border-box;
			font-size: $font-size-base;
			color: $font-color1;
			display: flex;
			flex-direction: column;

			.order_progress {
				font-size: $font-size-sm;
				color: $font-color3;
				margin: 20rpx 0;

				.text_color {
					color: $main-color;
					font-size: $font-size-base
				}
			}

			.current_progress {
				width: 702rpx;
				height: 30rpx;
				background: #f0f0f0;
				border-radius: 15rpx;
				overflow: hidden;

				/* #ifdef H5 */
				/deep/ .uni-progress-bar {
					height: 30rpx !important;
				}

				/deep/.uni-progress-inner-bar {
					border-radius: 15rpx;
				}

				/* #endif*/
			}
		}

		.goods_list {
			width: 100%;
			padding: $order-spacing-lg $order-spacing-base;
			box-sizing: border-box;
			background: #FFFFFF;
			margin-top: $order-spacing-base;

			.list_detail {
				width: 100%;
				height: 220rpx;
				border-bottom: 1rpx solid rgba(204, 204, 204, .4);
				display: flex;
				flex-direction: column;
				box-sizing: border-box;

				.list_title {
					height: 40rpx;
					font-size: $font-size-base;
					color: $font-color1;
				}

				.goods_detail {
					width: 100%;
					margin-top: $order-spacing-lg;
					display: flex;
					flex-wrap: nowrap;
					align-items: center;

					.goods_img {
						margin-right: 20rpx;

						image {
							width: 120rpx;
							height: 120rpx;
							vertical-align: middle;
						}
					}

					.goods_info {
						.goods_name {
							font-size: $font-size-base;
							font-weight: $font-weight-lg;
							color: $font-color1;
							margin-bottom: 10rpx;
						}

						.goods_extra_info {
							flex-shrink: 0;
							height: 60rpx;
							font-size: $font-size-sm - 2rpx;
							color: $font-color3;
							display: flex;
							flex-wrap: wrap;
						}
					}

					.goods_amount {
						width: 75rpx;
						height: 91rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						text-align: right;

						text:nth-child(1) {
							font-size: $font-size-lg + 2rpx;
							font-weight: $font-weight-lg;
							color: $font-color1;
						}

						text:nth-child(2) {
							font-size: $font-size-sm;
							color: $font-color3;
						}
					}
				}
			}

			.attach_service {
				width: 100%;
				font-size: $font-size-sm;
				color: $font-color1;
				padding-top: $order_spacing-lg;
				box-sizing: border-box;

				.service1,
				.service2,
				.service3,
        .delivery_fee{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: $order-spacing-lg;

					.left {
						display: flex;
						flex-direction: column;
						justify-content: space-around;
					}
				}

				.service1 {
					.left {
						.left_name {
							align-self: flex-start;

							text:nth-child(2) {
								flex: 1;
								display: inline-block;
								width: 80rpx;
								height: 30rpx;
								background: $main-color;
								border-radius: 4rpx;
								color: #FFFFFF;
								font-size: $font-size-sm - 6rpx;
								text-align: center;
								line-height: 30rpx;
								margin-left: 10rpx;
								overflow: hidden;
								vertical-align: middle;
							}
						}

						.left_des {
							flex: 1;
							font-size: $font-size-sm - 2rpx;
							color: $main-color;
							padding-top: 10rpx;
						}
					}

					.right {
						height: 34rpx;
						font-size: $font-size-sm;
						color: $font-color1;

						text {
							margin-right: 10rpx;
						}

						/* #ifdef H5*/
						/deep/.uni-radio-input {
							width: 34rpx;
							height: 34rpx;
							margin-right: 0;
						}

						/* #endif*/
					}
				}

				.service2,
				.service3 {
					.right {
						font-size: $font-size-sm;
						color: #cccccc;
					}
				}
        .service3{
          .right{
            color: $font-color1;
          }
        }
        .service2{
          min-height: 46rpx;
          .right{
            .discount{
              width: 254rpx;
              display: flex;
              justify-content: space-between;
              align-items: center;

              view {
                width: 214rpx;
                height: 46rpx;
                border: 2rpx solid $main-color;
                border-radius: 23px;
                font-size: $font-size-sm - 4rpx;
                color: $main-color;
                line-height: 42rpx;
                text-align: center;
                box-sizing: border-box;
              }

              image{
                width: 34rpx;
                height: 34rpx;
                vertical-align: middle;
              }
            }
          }
        }
			}

			.count_amount {
				width: 100%;
				text-align: right;
				height: 33rpx;
				font-size: $font-size-sm;
				color: $font-color1;

				text:nth-child(2) {
					font-size: $font-size-lg + 2rpx;
					font-weight: $font-weight-lg;
					vertical-align: middle;
				}
			}
		}

		.payment_method {
			width: 100%;
			height: 93rpx;
			background: #FFFFFF;
			font-size: $font-size-sm;
			color: $font-color1;
			padding: 0 $order-spacing-base;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;

      &.one_self{
        margin-top: $order-spacing-lg;
      }

			view {
				display: flex;
				align-items: center;

				image {
					width: 29rpx;
					height: 25rpx;
					vertical-align: middle;
					margin-right: 10rpx;
				}
			}
		}

		.payment_foot {
			width: 100%;
			height: 97rpx;
			background: #ffffff;
			border-top: 1rpx solid #cccccc;
			display: flex;
			justify-content: flex-end;
			box-sizing: border-box;
			position: fixed;
			bottom: 0;

			.payment_amount {
				font-size: $font-size-sm;
				color: $font-color1;
				line-height: 97rpx;
				margin-right: $order-spacing-lg;
				margin-left: 10rpx;

				text:nth-child(2) {
					font-size: $font-size-sm + 2rpx;
					font-weight: $font-weight-lg;
					color: $main-color;
				}
			}

			button {
				border: none;
				width: 200rpx;
				height: 97rpx;
				background: $main-color;
				font-size: $font-size-base;
				color: #ffffff;
				padding: 0;
				line-height: 97rpx;
				border-radius: 0;
			}
		}

		.empty {
			width: 100%;
			height: 96rpx;
		}
	}
</style>
