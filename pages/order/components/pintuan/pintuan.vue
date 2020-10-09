<template>
	<uni-popup ref="pintuan" type="bottom">
		<view class="pintuan_type">
			<view class="title">
				<view class="left">
					
				</view>
				<view class="text">
					請選擇壹種拼單方式
				</view>
				<view class="right">
					<image src="/static/images/order/close.png" mode="" @tap="closePintuan"></image>
				</view>
			</view>
			<view class="biaoyu">
				<view class="icon">
					<image src="/static/images/order/pintuan_icon1.jpg" mode=""></image>
				</view>
				<view class="">壹起點、更優惠</view>
				<view class="zw"></view>
				<view class="icon">
					<image src="/static/images/order/pintuan_icon1.jpg" mode=""></image>
				</view>
				<view class="">群收款、更便捷</view>
			</view>
			<view class="bordrline"></view>
			<view class="choose_type" @tap="choose_type(2)">
				<view class="icon_ziqu">
					<image src="/static/images/order/pintuan_ziqu.png" mode=""></image>
				</view>
				<view class="">
					門店自取
				</view>
			</view>
			<view class="bordrline"></view>
			<view class="choose_type" @tap="choose_type(1)">
				<view class="icon_waimai">
					<image src="/static/images/order/pintuan_waimai.png" mode=""></image>
				</view>
				<view class="">
					外賣
				</view>
			</view>
			<view class="bordrline"></view>
		</view>
	</uni-popup>
</template>

<script>
	export default{
		props:{
			show:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			show:{
				handler(newVal) {
					if (newVal) {
						this.open()
					} else {
						this.close()
					}
				},
				// immediate: true
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			open(){
				this.$refs.pintuan.open();
			},
			close(){
				this.$refs.pintuan.close();
			},
			closePintuan(){
				this.$emit("closePintuan")
			},
			choose_type(type){
				$emit("choose_type",type)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pintuan_type{
		background: #ffffff;
		border-radius: 20rpx 20rpx 0px 0px;
		padding: 0 24rpx 116rpx 24rpx;
		box-sizing: border-box;
		overflow: hidden;
		.title{
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 30rpx 0;
			.left{
				width: 50rpx;
			}
			.text{
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
				flex: 1;
				text-align: center;
			}
			.right{
				width: 44rpx;
				height: 44rpx;
				margin-right: 6rpx;
			}
		}
		.biaoyu{
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 22rpx;
			font-weight: 400;
			color: #17a1ff;
			margin-bottom: 30rpx;
			.icon{
				width: 28rpx;
				height: 28rpx;
				margin-right: 10rpx;
			}
			.zw{
				width: 30rpx;
			}
			
		}
		.bordrline{
			height: 1px;
			opacity: 0.5;
			border-top: 1px solid #cccccc;
		}
		.choose_type{
			display: flex;
			align-items: center;
			height: 120rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #333333;
			.icon_ziqu{
				width: 38rpx;
				height: 54rpx;
				margin-right: 30rpx;
			}
			.icon_waimai{
				width: 45rpx;
				height: 37rpx;
				margin-right: 23rpx;
			}
		}
	}
</style>
