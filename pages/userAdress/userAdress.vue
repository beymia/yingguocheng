<template>
	<view class="page address_con">
		<scroll-view scroll-y="true" class="content">
			<!-- <list-cell v-for="(address, index) in addresses" :key="index" :line-left="false" @tap="choose(address)">
				<view class="address">
					<view class="info">
						<view class="user-row">
							{{ `${address.name}(${address.gender ? '女士' : '男士'}) ${address.phone}` }}
						</view>
						<view class="address-row">
							<view class="is-default" v-if="address.is_default">默认地址</view>
							<view class="address">{{ `${address.address} ${address.description}` }}</view>
						</view>
					</view>
					<image src="/static/images/userAdress/edit.png" @tap.stop="edit(address.id)" class="edit-btn"></image>
				</view>
			</list-cell> -->
			<view class="item" v-for="(address,index) in addresses" :key="index" @tap="choose(address)">
				<view class="info">
					<view class="adress">
						{{address.address}} {{address.complete_address}}
					</view>
					<view class="other">
						<view class="is_default" v-if="address.is_default">
							默認地址
						</view>
						<view class="name">
							{{address.name}}{{address.gender ? "先生":"女士"}}
						</view>
						<view class="phone">
							{{address.phone}}
						</view>
					</view>
				</view>
				<view class="edit">
					<image src="/static/images/userAdress/edit.png" mode=""></image>
				</view>
			</view>
		</scroll-view>
		
		<view class="footer">
			<!-- <button type="info" @tap="add">+添加地址</button> -->
			<button type="default" class="wxdr">
				<image src="/static/images/userAdress/wx.jpg" mode=""></image>
				<text>微信導入</text>
			</button>
			<button type="default" class="add_adress">
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
				addresses: [{
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
				}]
			}
		},
		computed: {
			// ...mapState(['addresses'])
		},
		methods: {
			// ...mapMutations(['SET_ADDRESS', 'SET_ORDER_TYPE']),
			add() {
				uni.navigateTo({
					url: '/pages/addresses/add'
				})
			},
			edit(id) {
				uni.navigateTo({
					url: '/pages/addresses/add?id=' + id
				})
			},
			choose(address) {
				/* this.SET_ADDRESS(address)
				this.SET_ORDER_TYPE('takeout') */
				uni.$once('userAdress',address)
				uni.switchTab({
					url: '/pages/order/order'
				})
			}
		}
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
		padding-bottom: 170rpx;
		
		.item{
			width: 702rpx;
			height: 150rpx;
			background: #ffffff;
			border-radius: 20rpx;
			margin-top: 30rpx; 
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
		justify-content: space-between;
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
