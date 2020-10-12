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
						{{type == 1 ? "外賣":"自取"}}
					</view>
				</view>
				<view class="distance">
					距離您{{trans_distance}}
				</view>
				<view class="biaoyu">
					快來叫上好友壹起喝奶茶吧~
				</view>
				<view class="pindan_invite">
					<button class="pindan_cancel">
						取消拼单
					</button>
					<button class="invite">
						邀請好友
					</button>
				</view>
			</view>
			<!-- 拼单详情开始 -->
			<view class="detail">
				<view class="title">
					拼單詳情
				</view>
				<view  class="order">
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
						<view class="user_order" v-if="item.goods_data">
							<view class="bordrline"></view>
							<view class="good" v-for="(itemc,indexc) in item.goods_data">
								<view class="icon">
									<image :src="itemc.home_avatar" mode=""></image>
								</view>
								<view class="intro">
									<view class="good_name_price">
										<view class="good_name">
											{{itemc.goods_name}}
										</view>
										<view class="good_price">
											￥{{itemc.goods_price}}
										</view>
									</view>
									<view class="good_materials_number">
										<view class="materials">
											{{itemc.goods_norm}}
										</view>
										<view class="number">
											x{{itemc.goods_num}}
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				
			</view>
			<!-- 拼单详情结束 -->
			<!-- 结算开始 -->
			<view class="jiesuan">
				<view class="left">
					<view class="left_top">
						<text class="price">￥143</text>
						<text class="my_pirce">(我点￥143)</text>
					</view>
					<view class="tip">
						如有商品參與優惠/活動，請結算實付金額為準
					</view>
				</view>
				<view class="right">
					結算
				</view>
			</view>
			<!-- 结算结束 -->
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
	.bordrline{
		height: 1px;
		opacity: 0.5;
		border-top: 1px solid #cccccc;
	}
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
				padding: 6rpx 10rpx;
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
				white-space: nowrap;
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
		padding-bottom: 200rpx;
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
							max-width: 280rpx;
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
								.good_name{
									width: 400rpx;
									white-space: nowrap;
									overflow: hidden;
									text-overflow: ellipsis;
									margin-bottom: 10rpx;
								}
								.good_price{
									
								}
							}
							.good_materials_number{
								display: flex;
								justify-content: space-between;
								align-items: flex-start;
								.materials{
									width: 400rpx;
									font-size: 20rpx;
									color: #999999;
								}
								.number{
									color: #999999;
									font-size: 26rpx;
								}
							}
						}
					}
				}
			}
			
		}
	}
	
	.jiesuan{
		width: 100%;
		height: 100rpx;
		display: flex;
		position: fixed;
		left: 0;
		bottom: 0;
		.left{
			flex: 1;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 10rpx 0 10rpx 24rpx;
			.left_top{
				.price{
					color: #333333;
					font-size: 30rpx;
					margin-right: 16rpx;
				}
				.my_pirce{
					color: #333333;
					font-size: 28rpx;
				}
			}
			.tip{
				color: #E46A68;
				font-size: 20rpx;
			}
		}
		
		.right{
			background-color: $main-color;
			color: #FFFFFF;
			width: 200rpx;
			line-height: 100rpx;
			height: 100rpx;
			text-align: center;
		}
		
	}
</style>
