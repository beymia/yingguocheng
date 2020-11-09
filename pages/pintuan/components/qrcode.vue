<template>
	<uni-popup ref='qrcode' type="center" maskClick>
		<view class="qr_con">
			<view class="title">
				請使用點單頁面右上角的掃碼功能掃描下方二維碼
			</view>
			<view class="img">
				<image :src="qrUrl" mode=""></image>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			qrUrl:{
				type:String,
				default:''
			},
			show:{
				type:[Boolean,String]
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
				this.$refs['qrcode'].open();
			},
			close(){
				this.$refs['qrcode'].close();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.qr_con{
		width: 600rpx;
		background-color: #FFFFFF;
		padding: 60rpx;
		box-sizing: border-box;
		.title{
			font-size: 32rpx;
			color: #333333;
			margin-bottom: 30rpx;
		}
		.img{
			width: 100%;
			height: 480rpx;
		}
	}
</style>
