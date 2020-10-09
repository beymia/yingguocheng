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
			
	</view>
</template>

<script>
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
				type:2
			}
		},
		computed:{
			trans_distance(){
				let distance = this.shop_info.distance;
				if(parseInt(distance * 10) < 10){
					return distance + "km"
				}else{
					return distance * 100 + "m"
				}
			}
		},
		methods: {
			
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
			font-size: 26px;
			color: #666666;
			margin-bottom: 30rpx;
		}
		.biaoyu{
			font-size: 26px;
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

</style>
