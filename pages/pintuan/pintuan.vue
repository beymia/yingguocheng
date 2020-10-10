<template>
	<view class="page">
			<view class="shop_info">
				<view class="info">
					<view class="shop_icon">
							<image src="/static/images/order/shop_icon.png" mode=""></image>
					</view>
					<view class="shop_name">
						{{shop_info.shop_name}}
					</view>
					<view class="type">
						{{type == 1 ? "外卖":"自取"}}
					</view>
				</view>
				<view class="distance">
					距离您{{trans_distance}}
				</view>
				<view class="biaoyu">
					快來叫上好友壹起喝奶茶吧~
				</view>
				<view class="pindan_invite">
					<button class="pindan_cancel">
						取消拼单
					</button>
					<button class="invite">
						邀请好友
					</button>
				</view>
			</view>
			
			<view class="detail">
				<view class="title">
					拼單詳情
				</view>
				<scroll-view scroll-y="true" class="order">
					<view class="order_item" v-for="(item,index) in pintuan_info">
						<view class="user_info">
							<view class="left">
								<view class="user_icon">
									<image :src="item.user_avatar" mode=""></image>
								</view>
								<view class="user_name">
									{{item.user_name}}
								</view>
								<view class="is_me" :class="{is_you:!item.is_me}">
									{{item.is_me ? "我":"友"}}
								</view>
							</view>
							<view class="ljdd" v-if="!item.goods_data">
								立即點單
							</view>
							<view v-else class="clear_edit">
								<view class="clear">
									清空
								</view>
								<view class="edit">
									修改商品
								</view>
							</view>
						</view>
						<view class="user_order">
							
						</view>
					</view>
				</scroll-view>
				
				
			</view>
			
	</view>
</template>

<script>
	import {pintuan_info} from "./data.js"
	export default {
		data() {
			return {
				shop_info:{
					"id": "15992871171146972",
					"shop_name": "合肥百乐门广场店",
					"shop_address": "安徽省合肥市蜀山区",
					"longitude": "117.23594319042803",
					"latitude": "31.7816537753481",
					"work_time": "10:0:00",
					"rest_time": "22:0:00",
					"current_order": "0",
					"current_cups": "0",
					"distance": 1.74
				},
				pintuan_info,
				type:2
			}
		},
		computed:{
			trans_distance(){
				let distance = this.shop_info.distance;
				if(parseInt(distance * 10) < 10){
					return distance * 1000 + "m"
				}else{
					return distance + "km"
				}
			}
		},
		methods: {
			resort_pintuan_info(pintuan_info){
				let index= pintuan_info.findIndex(item => item.is_me == true);
				if(index != -1){
					console.log(index)
					let me = pintuan_info.splice(index,1)
					pintuan_info.unshift(me[0]);
				}
				
			}
		},
		onLoad() {
			this.resort_pintuan_info(this.pintuan_info);
		}
	}
</script>

<style lang="scss" scoped>
	.shop_info{
		margin-top: 40rpx;
		padding: 0 24rpx;
		.info{
			display: flex;
			justify-content: center;
			margin-bottom: 10rpx;
			.shop_icon{
				width: 44rpx;
				height: 44rpx;
				margin-right: 10rpx;
			}
			.shop_name{
				font-size: 34rpx;
				color: #333333;
				font-weight: bold;
				flex: 1;
			}
			.type{
				font-size: 22rpx;
				color: #333333;
				background: #f2f2f2;
				padding: 4rpx 3rpx;
			}
		}
		.distance{
			font-size: 26rpx;
			color: #666666;
			margin-bottom: 30rpx;
		}
		.biaoyu{
			font-size: 26rpx;
			color: #666666;
			margin-bottom: 80rpx;
		}
		.pindan_invite{
			display: flex;
			justify-content: flex-end;
			margin-bottom: 50rpx;
			.pindan_cancel{
				width: 160rpx;
				height: 64rpx;
				background: #ffffff;
				border: 1px solid #17a1ff;
				border-radius: 4rpx;
				margin-right: 30rpx;
				font-size: 26rpx;
				color: #17A1FF;
			}
			.invite{
				width: 160rpx;
				height: 64rpx;
				background: #17a1ff;
				border-radius: 4rpx;
				font-size: 26rpx;
				color: #FFFFFF;
			}
		}
	}
	.detail{
		background-color: #F5F5F5;
		flex: 1;
		overflow: hidden;
		.title{
			height: 100rpx;
			line-height: 100rpx;
			font-size: 24rpx;
			color: #666666;
			padding-left: 24rpx;
		}
		.order{
			height: 100%;
			.order_item{
				background-color: #FFFFFF;
				padding: 0 24rpx;
				margin-bottom: 50rpx;
				.user_info{
					height: 112rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.left{
						display: flex;
						justify-content: center;
						align-items: center;
						.user_icon{
							width: 52rpx;
							height: 52rpx;
							margin-right: 20rpx;
						}
						.user_name{
							font-size: 28rpx;
							color: #333333;
							margin-right: 10rpx;
						}
						.is_me{
							width: 30rpx;
							height: 30rpx;
							background: #17a1ff;
							font-size: 20rpx;
							color: #FFFFFF;
							text-align: center;
							line-height: 30rpx;
							margin-right: 10rpx;
						}
						.is_you{
							background-color: #adadad;
						}
						.user_status{
							font-size: 24rpx;
							color:#999999;
						}
					}
					.ljdd{
						width: 150rpx;
						height: 48rpx;
						background: #ffffff;
						border: 1px solid #cccccc;
						border-radius: 4rpx;
						font-size: 22rpx;
						color: #999999;
						display: flex;
						justify-content: center;
						align-items: center;
					}
					.clear_edit{
						display: flex;
						align-items: center;
						.clear,.edit{
							display: flex;
							justify-content: center;
							align-items: center;
							padding: 0 20rpx;
							height: 48rpx;
							background: #ffffff;
							border: 1px solid #cccccc;
							color: #999999;
							border-radius: 4rpx;
							font-size: 22rpx;
							
						}
						.edit{
							margin-left: 20rpx;
						}
					}
				}
				.user_order{
					border-top: 1px solid #CCCCCC;
					.good{
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 30rpx 0;
						.icon{
							width:60rpx;
							height: 60rpx;
							margin: 0 20rpx;
						}
						.intro{
							flex: 1;
							.good_name_price{
								display: flex;
								justify-content: space-between;
								
								color: #333333;
								font-size: 28rpx;
							}
						}
					}
				}
			}
			
		}
	}

</style>
