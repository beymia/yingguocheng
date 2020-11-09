<template>
	<uni-popup ref="loca" type="bottom">
		<view class="loca">
			<view class="shenqing">
				<view class="icon">
					<image src="/static/images/order/wx.png" mode=""></image>
				</view>
				<view class="title">
					當前應用
				</view>
				<view class="sq">
					申請
				</view>
			</view>
			<view class="huoqu">
				獲取你的位置信息
			</view>
			<view class="qingqiu">
				請求授權位置權限
			</view>
			<button type="default" class="shouquan"  @tap="openSetting">
				去授權
			</button>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		name:'locaAutho',
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
						this.open();
					} else {
						this.close();
					}
				},
				 // immediate: true
			}
		},
		mounted() {
			if(this.show == true){
				this.open()
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			open(){
				this.$refs['loca'].open();
			},
			close(){
				this.$refs['loca'].close();
			},
			/* loca_autho(e){
				console.log(e)
				this.$emit('loca_autho')
			}, */
			openSetting() {  this.$emit('openSetting')}
		}
	}
</script>

<style lang="scss" scoped>
.loca{
	border-radius: 20rpx 20rpx 0 0 ;
	display: flex;
	padding: 40rpx 40rpx 0 40rpx;
	width: 100%;
	box-sizing: border-box;
	background-color: #FFFFFF;
	flex-direction: column;
	.shenqing{
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
		.icon{
			width: 40rpx;
			height: 40rpx;
		}
		.title{
			margin-left: 20rpx;
			font-size: 30rpx;
			color: #333333;
			height: 40rpx;
			line-height: 40rpx;
			font-weight: bold;
		}
		.sq{
			margin-left: 20rpx;
			font-size: 30rpx;
			color: #666666;
			height: 40rpx;
			line-height: 40rpx;
		}
	}
	.huoqu{
		padding: 40rpx 0 ;
		font-size: 34rpx;
		font-weight: bold;
	}
	.qingqiu{
		font-size: 28rpx;
		color: #999999;
	}
	.shouquan{
		margin: 70rpx 60rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		color: #FFFFFF;
		border-radius: 20rpx;
		font-size: 36rpx;
		background-color: #07BF62;
	}
}
</style>
