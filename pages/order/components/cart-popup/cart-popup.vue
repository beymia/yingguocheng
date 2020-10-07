<template>
	<uni-popup ref="popup_cart" type="bottom" @change="change" maskClick>
		<view class="cart-popup">
			<view class="header">
				<!-- <view class="order-type">
					<view class="font-weight-bold">门店订单</view>
					<view class="extra">自提/外送</view>
				</view>
				<view class="d-flex align-items-center" @tap="clear">
					<image src="/static/images/common/delete.png" class="delete-btn"></image>
					<view>清空购物车</view>
				</view> -->
				<view class="d-flex align-items-center" @tap="clear">
					<image src="/static/images/order/delete1.png"  class="delete-btn"></image>
					<view>清空購物袋</view>
				</view>
				<image src="/static/images/order/close.png" @tap="close" class="close_img"></image>
			</view>
			<scroll-view scroll-y class="content">
				<view class="wrapper">
					<view class="list">
						<view class="item" v-for="(item, index) in cart" :key="index">
							<view class="left">
								<checkbox-group class="ck" :data-id="item.id" @change="checkboxChange" >
									<label >
											<checkbox :value="item.id"  :checked="item.is_checked" />
									</label>
								</checkbox-group>
								<image :src="item.imgurl" mode="" class="image"></image>
							</view>
							<view class="right">
								<view class="name-and-materials">
									<view class="name">{{ item.name }}</view>
									<view class="materials" v-if="item.materials_text">{{ item.materials_text }}</view>
								</view>
								<view class="price-and-actions">
									<view class="price">￥{{ item.price }}</view>
									<actions :number="item.number" @add="add(item)" @minus="minus(item)"></actions>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</uni-popup>
</template>

<script>
// import uniPopup from '@/components/uni-popup/uni-popup.vue'
import actions from '../actions/actions.vue'

export default {
	components: {
		// uniPopup,
		actions
	},
	props: {
		cart: {
			type: Array,
			default: () => []
		}
	},
	methods: {
		open() {
			this.$refs['popup_cart'].open();
		},
		close() {
			this.$refs['popup_cart'].close()
		},
		change({show}) {
			this.$emit('change', show)
		},
		add(item) {
			this.$emit('add', item)
		},
		minus(item) {
			this.$emit('minus', item)
		},
		clear() {
			uni.showModal({
			    content: '清空购物袋',
				confirmColor: '#17A1FF',
			    success: res => {
			        if (res.confirm) {
						this.$emit('clear')
			        }
			    }
			})
		},
		checkboxChange(e){
			this.$emit("checkboxChange",e)
		}
	}
};
</script>

<style lang="scss" scoped>
.cart-popup {
	background-color: #FFFFFF;
	padding-bottom: 100rpx;
	border-radius: 20rpx 20rpx 0px 0px;
	// #ifdef H5
	bottom: var(--window-bottom);
	// #endif
}

.header {
	padding: 20rpx 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1rpx solid rgba($color: #c8c7cc, $alpha: 0.6);
	font-size: 24rpx;
	color: #999999;
	
	.close_img{
		width: 44rpx;
		height: 44rpx;
	}

	.order-type {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #343434;
		
		.extra {
			margin-right: 10rpx;
			border: 2rpx solid #DBA871;
			font-size: 18rpx;
			padding: 2rpx 10rpx;
			color: #DBA871;
			margin-left: 10rpx;
		}
	}
	
	.delete-btn {
		/* width: 46rpx;
		height: 46rpx; */
		width: 26rpx;
		height: 26rpx;
		margin-right: 10rpx;
	}
}

.content {
	width: 100%;
	max-height: calc(100vh - 600rpx);
	
	.wrapper {
		width: 100%;
		height: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		
	}
	
	.list {
		display: flex;
		flex-direction: column;
		margin-bottom: 30rpx;
		
		.item {
			display: flex;
			align-items: stretch;
			padding: 30rpx 0;
			position: relative;
			
			&:after {
				content: ' ';
				position: absolute;
				bottom: 0;
				left: 180rpx;
				right: 0;
				border-bottom: 1rpx solid rgba($color: #c8c7cc, $alpha: 0.6);
			}
			
			.left {
				flex-shrink: 0;
				display: flex;
				align-items: center;
				width: 204rpx;
				justify-content: space-between;
				.ck{
					//改变uni-app默认的多选框样式
					/deep/ .uni-checkbox-input {
						width: 50rpx !important;
						height: 50rpx !important;
						border-radius: 50%;
						transform: scale(.68);
					}
					
					/deep/ .uni-checkbox-input-checked {
						width: 50rpx !important;
						height: 50rpx !important;
						border-radius: 50%;
						background: $main-color;
						color: #fff !important;
						transform: scale(.68);
						border: none;
					}
					/deep/.uni-checkbox-input:hover{
						border-color: #d1d1d1 !important;
						transform: scale(.68);
					}
				}
				.image {
					//width: 180rpx;
					width:120rpx;
					height: 120rpx;
					margin-right: 16rpx;
				}
			}
			
			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				font-size: 28rpx;
				color: #343434;
				
				.name-and-materials {
					display: flex;
					flex-direction: column;
					margin-bottom: 20rpx;
					
					.name {
						font-weight: bold;
					}
					
					.materials {
						font-size: 24rpx;
						color: #999999;
					}
				}
				
				.price-and-actions {
					display: flex;
					justify-content: space-between;
				
					.price {
						color: #666666;
					}
				}
			}
		}
	}
}
</style>
