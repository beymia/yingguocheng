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
		data(){
			return {
				is_rest:false
			}
		},
		props:{
			opening_hours:{
				type:String,
				default: "周壹至周日 10:00-22:00"
			},
			is_rest:{
				type:Boolean,
				default:false
			}
		},
		mounted() {
			 console.log(this.is_rest)
			if(this.is_rest){
				this.$refs["rest_popup"].open();
			} 
				
			
		},
		watch:{
			is_rest(val){
				if(val){
					console.log(11111111111111111)
					this.$refs["rest_popup"].open();
				}else{
					console.log(222222222222)
					this.$refs["rest_popup"].close();
				}
			}
		},
		methods:{
			
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
