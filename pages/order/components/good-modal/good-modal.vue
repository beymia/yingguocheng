<template>
	<!-- <view :class="{good_modal:true,modal_box:true,modal_scale:is_scale,modal_normal:!is_scale,modal_show:!is_scale} ">
	</view> -->
	<uni-popup ref="popup" type="center">
		<view class="good_modal">
			
		</view>
	</uni-popup>
</template>

<script>
	export default{
		data(){
			return{
				// is_scale:true
			}
		},
		mounted() {
			 this.$refs.popup.open();
		}
	}
</script>

<style lang="scss" scoped>
	// .good_modal{
	// 	width: 90%;
	// 	border-radius: 30rpx;
	// }
	// .modal-box {
	//     position: fixed;
	//     left: 50%;
	//     top: 50%;
	//     margin: auto;
	//     background: #fff;
	//     z-index: 1000;
	//     transition: all 0.3s ease-in-out;
	//     opacity: 0;
	//     box-sizing: border-box;
	//     visibility: hidden;
	// }
	// .modal_show{
	// 	opacity: 1;
	// 	visibility: visible;
	// }
		
	// .modal_scale{
	// 	transform: translate(-50%, -50%) scale(0);
	// }
	// .modal_normal{
	// 	transform: translate(-50%, -50%) scale(1);
	// }
	.good_modal{
		z-index: 999;
		width: 660rpx;
		position: fixed;
		top: calc(44px+var(--status-bar-height)+20px);
		left: 45rpx;
		bottom: 20px;
		transform: translate(-50%,-50%);
		background-color: #FFFFFF;
		border-radius: 30rpx;
	}
</style>
