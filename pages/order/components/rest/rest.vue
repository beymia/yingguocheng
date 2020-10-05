<template>
	<uni-popup ref="rest_popup" type="bottom" >
		<view class="rest">
			<text class="text1">本店已休息</text>
			<text class="text2">本店營業時間：{{opening_hours}}</text>
		</view>
	</uni-popup>
</template>

<script>
	export default{
		props:{
			opening_hours:{
				type:String,
				default:"周壹至周日 10:00-22:00"
			},
			is_rest:{
				type:[String,Boolean],
				default:false
			}
		},
		created() {
			this.$refs["rest_popup"].open();
		},
		watch:{
			is_rest(val){
				if(val){
					this.$refs["rest_popup"].open();
				}else{
					this.$refs["rest_popup"].close();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.rest{
		// position: fixed;
		width: 100%;
		height: 100rpx;
		background-color: #3C3C3A;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		z-index: 995;
		.text1{
			font-size: 28rpx;
			color: #FFFFFF;
			height: 40rpx;
			line-height: 40rpx;
		}
		.text2{
			font-size: 22rpx;
			color: #999999;
			height: 30rpx;
			line-height: 30rpx;
		}
	}
</style>
