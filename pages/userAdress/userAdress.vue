<template>
	<view class="page address_con">
		<view class="content">
			<view class="zwdz" v-if="!userAddresses.length">
				<image src="/static/images/userAdress/zwdz.png" mode=""></image>
				<text>暫無地址信息</text>
				<text>請點擊底部按鈕添加地址</text>
			</view>
			<scroll-view scroll-y="true" style="height: 100%;">
				<uni-swipe-action  >
					<uni-swipe-action-item class="mt30" v-for="(address,index) in userAddresses" :key="index">
						<view class="itemx" >
							<view class="info" @tap.stop="choose(address)">
								<view class="adress">
									 <text space="nbsp">{{address.contact_number}}   {{address.contact_address}}</text>  
								</view>
								<view class="other">
									<view class="is_default" v-if="address.default_status">
										默認地址
									</view>
									<view class="name">
										{{address.contact_name}}{{address.contact_sex}}
									</view>
									<view class="phone">
										{{address.contact_phone}}
									</view>
								</view>
							</view>
							<view class="edit">
								<image src="/static/images/userAdress/edit.png" mode="" @tap.stop="edit(address)"></image>
							</view>
						</view>
						<template v-slot:right>
							<view class="slot-button" @tap="delete_address(address.id)"><text class="slot-button-text">删除</text></view>
						</template>
					</uni-swipe-action-item>
				</uni-swipe-action>
				
			</scroll-view>
		</view>
		
		
		<view class="footer">
			<!-- <button type="info" @tap="add">+添加地址</button> -->
			<!-- #ifdef MP-WEIXIN -->
			<button type="default" class="wxdr" @tap="wxdr">
				<image src="/static/images/userAdress/wx.jpg" mode=""></image>
				<text>微信導入</text>
			</button>
			<!-- #endif -->
			
			<button type="default" class="add_adress" @tap="add">
				<image src="/static/images/userAdress/add.jpg" mode=""></image>
				<text>添加地址</text>
			</button>
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import listCell from '@/components-lk/list-cell/list-cell.vue'
	import {userAddresses,address_delete,address_add} from '@/request/api_y.js'
	export default {
		components: {
			listCell
		},
		data() {
			return {
				from:''
			}
		},
		computed: {
			...mapState(['orderType','choosedAddress','userAddresses']),
		},
		async onLoad({from}) {
			const token = uni.getStorageSync('token');
			if(!token){
				uni.showModal({
				    content: '您還沒有登錄，請先登錄',
				    success: function (res) {
				        if (res.confirm) {
							uni.redirectTo({
								url:'/pages/login/login?from=order'
							})
				        } else if (res.cancel) {
							uni.navigateBack({
								delta:1
							})
				        }
				    }
				});
				return
			}
			console.log(token)
			let uddresses = (await userAddresses()).data;
			this.SET_USER_ADDRESSES(uddresses);
			
			console.log('from:'+from)
			if(from){
				this.from = from;
			}
			
		},
		methods: {
			...mapMutations(['SET_ORDER_TYPE','SET_CHOOSED_ADDRESS','SET_USER_ADDRESSES']),
			add() {
				uni.navigateTo({
					url: '/pages/addUserAdress/addUserAdress'
				})
			},
			edit(address) {
				getApp().globalData.edit_address = address;
				uni.navigateTo({
					url: '/pages/addUserAdress/addUserAdress?is_edit=true'
				})
			},
			choose(address) {
				this.SET_CHOOSED_ADDRESS(address)
				this.SET_ORDER_TYPE(1)
				console.log(this.from)
				if(this.from == 'pintuan'){
					uni.redirectTo({
						url:'/pages/orderPayment/orderPayment'
					})
				}else{
					uni.switchTab({
						url: '/pages/order/order'
					})
				}
				
			},
			wxdr(){
				uni.chooseAddress({
					success:async (res)=>{
						
						let {errMsg,userName,telNumber,provinceName,cityName,countyName,detailInfo} = res
						if(errMsg == "chooseAddress:ok") {
							uni.showLoading({
								title:'地址導入中...',
								mask:true
							})
							let new_address={contact_name:userName,contact_sex:1,contact_address:cityName+countyName,contact_number:detailInfo,contact_phone:telNumber,default_status:2}
							console.log('new_address')
							console.log(new_address)
							let add =await address_add(new_address)
							console.log('add')
							console.log(add)
							let uddresses = (await userAddresses()).data;
							console.log('uddresses')
							console.log(uddresses)
							this.SET_USER_ADDRESSES(uddresses);
						}
						uni.hideLoading()
					}
					
				})
			},
			async delete_address(id){
				let code = (await address_delete({address_id:id})).code;
				if(code == 1000){
					this.userAddresses.splice(this.userAddresses.findIndex(item => item.id == id),1)
					uni.showToast({
					    title: '删除成功',
					    duration: 1000,
						icon:"none",
					});
				}

				
				
			}
		},
		 
	}
</script>

<style lang="scss" scoped>
	.address_con{
		background-color: #F5F5F5;
		
	}
	.content {
		flex: 1;
		height: auto;
		margin-top: 20rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		width: 100%;
		.zwdz{
			margin: auto;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			transform: translateY(-50%);
			image{
				width: 253rpx;
				height: 208rpx;
			}
			text{
				height: 40rpx;
				line-height: 40rpx;
				font-weight: 400;
				font-size: 28rpx;
				color: #999999;
				margin-bottom: 10rpx;
			}
		}
		.slot-button {
			/* #ifndef APP-NVUE */
			display: flex;
			height: 100%;
			/* #endif */
			flex: 1;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			padding: 0 40rpx;
			background-color: #ff5a5f;
			margin-left: 2px;
		}
		
		.slot-button-text {
			color: #ffffff;
			font-size: 14px;
		}
		.mt30{
			margin-top: 30rpx;
		}
		.itemx{
			box-sizing: border-box;
			width: 702rpx;
			height: 150rpx;
			background: #ffffff;
			border-radius: 20rpx;
			// margin-top: 30rpx; 
			margin-left: 24rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			.info{
				width: 508rpx;
				.adress{
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					margin-bottom: 10rpx;
				}
				.other{
					display: flex;
					align-items: center;
					.is_default{
						padding: 5rpx 10rpx;
						background: rgba(23,161,255,0.1);
						text-align: center;
						font-size: 18rpx;
						font-weight: 400;
						color: #17a1ff;
						margin-right: 16rpx;
					}
					.name{
						font-size: 22rpx;
						font-weight: 400;
						color: #333333;
						margin-right: 20rpx;
					}
					.phone{
						font-size: 22rpx;
						font-weight: 400;
						color: #333333;
					}
				}
			}
			.edit{
				width: 34rpx;
				height: 34rpx;
			}
		}
	}
	

	
	
	.footer {
		width: 100%;
		z-index: 10;
		background-color: #F5F5F5;
		display: flex;
		align-items: center;
		height: 120rpx;
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		
		.wxdr{
			width: 320rpx;
			height: 78rpx;
			background: #ffffff;
			border: 2rpx solid #17a1ff;
			border-radius: 10rpx;
			margin: 0;
			padding: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 30rpx;
			flex: 1;
			image{
				width: 40rpx;
				height: 37rpx;
				margin-right: 18rpx;
			}
			text{
				font-size: 28rpx;
				font-weight: 400;
				color: #17a1ff;
			}
		}
		.add_adress{
			width: 320rpx;
			height: 78rpx;
			flex: 1;
			background: #17a1ff;
			border-radius: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0;
			padding: 0;
			image{
				width: 28rpx;
				height: 28rpx;
				margin-right: 18rpx;
			}
			text{
				font-size: 28rpx;
				font-weight: 400;
				color: #ffffff;
			}
		}
	}
</style>
