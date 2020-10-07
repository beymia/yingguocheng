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
									{{address.address}} {{address.complete_address}}
								</view>
								<view class="other">
									<view class="is_default" v-if="address.is_default">
										默認地址
									</view>
									<view class="name">
										{{address.name}}{{(address.gender == undefined || "") ? "":(address.gender? "先生":"女士") }}
									</view>
									<view class="phone">
										{{address.phone}}
									</view>
								</view>
							</view>
							<view class="edit">
								<image src="/static/images/userAdress/edit.png" mode="" @tap.stop="edit(address.id)"></image>
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
			<button type="default" class="wxdr" @tap="wxdr">
				<image src="/static/images/userAdress/wx.jpg" mode=""></image>
				<text>微信導入</text>
			</button>
			<button type="default" class="add_adress" @tap="add">
				<image src="/static/images/userAdress/add.jpg" mode=""></image>
				<text>添加地址</text>
			</button>
		</view>
	</view>
</template>

<script>
	import listCell from '@/components-lk/list-cell/list-cell.vue'
	
	export default {
		components: {
			listCell
		},
		data() {
			return {
				userAddresses: [
					{
					"id": 1,
					"user_id": 1,
					"name": "張三",
					"phone": "18666610100",
					"gender": 0,
					"address": "蓮花智谷創業園",
					"complete_address": "經開區蓮花路與丹霞路交叉口",
					"description": "M13",
					"is_default": 1
				},{
					"id": 2,
					"user_id": 1,
					"name": "李四",
					"phone": "13220589546",
					"gender": 1,
					"address": "某個地區",
					"complete_address": "經開區蓮花路與丹霞路交叉口",
					"description": "B棟306室",
					"is_default": 0
				},{
					"id": 3,
					"user_id": 1,
					"name": "張三",
					"phone": "18666610100",
					"gender": 0,
					"address": "蓮花智谷創業園",
					"complete_address": "經開區蓮花路與丹霞路交叉口",
					"description": "M13",
					"is_default": 1
				},{
					"id": 4,
					"user_id": 1,
					"name": "李四",
					"phone": "13220589546",
					"gender": 1,
					"address": "某個地區",
					"complete_address": "經開區蓮花路與丹霞路交叉口",
					"description": "B棟306室",
					"is_default": 0
				},{
					"id": 5,
					"user_id": 1,
					"name": "張三",
					"phone": "18666610100",
					"gender": 0,
					"address": "蓮花智谷創業園",
					"complete_address": "經開區蓮花路與丹霞路交叉口",
					"description": "M13",
					"is_default": 1
				},{
					"id": 6,
					"user_id": 1,
					"name": "李四",
					"phone": "13220589546",
					"gender": 1,
					"address": "某個地區",
					"complete_address": "經開區蓮花路與丹霞路交叉口",
					"description": "B棟306室",
					"is_default": 0
				},
				{
					"id": 7,
					"user_id": 1,
					"name": "張三",
					"phone": "18666610100",
					"gender": 0,
					"address": "蓮花智谷創業園",
					"complete_address": "經開區蓮花路與丹霞路交叉口",
					"description": "M13",
					"is_default": 1
				},{
					"id": 8,
					"user_id": 1,
					"name": "李四",
					"phone": "13220589546",
					"gender": 1,
					"address": "某個地區",
					"complete_address": "經開區蓮花路與丹霞路交叉口",
					"description": "B棟306室",
					"is_default": 0
				},
				]
			}
		},
		computed: {
			// ...mapState(['addresses'])
		},
		onLoad() {
			getApp().globalData.userAddresses=this.userAddresses;
		},
		methods: {
			// ...mapMutations(['SET_ADDRESS', 'SET_ORDER_TYPE']),
			add() {
				uni.navigateTo({
					url: '/pages/addUserAdress/addUserAdress'
				})
			},
			edit(id) {
				getApp().globalData.edit_address_id = id;
				uni.navigateTo({
					url: '/pages/addUserAdress/addUserAdress?edit=true'
				})
			},
			choose(address) {
				/* this.SET_ADDRESS(address)
				this.SET_ORDER_TYPE('takeout') */
				uni.$emit('checked_adress',address)
				uni.switchTab({
					url: '/pages/order/order'
				})
			},
			wxdr(){
				uni.chooseAddress({
					success:res=>{
						let {errMsg,userName,telNumber,provinceName,cityName,countyName,detailInfo} = res
						if(errMsg == "chooseAddress:ok") {
							let new_address={name:userName,complete_address:cityName+countyName,address:"",description:detailInfo,phone:telNumber}
							this.userAddresses.push(new_address)
							console.log(new_address.gender)
						}
					}
					
				})
			},
			delete_address(id){
				var t=this.userAddresses.splice(this.userAddresses.findIndex(item => item.id == id),1)
				if(t){
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
