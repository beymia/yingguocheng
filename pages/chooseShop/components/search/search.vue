<template>
	<uni-transition :mode-class="['slide-left']" :styles="tranStyles" :show="show">
		<view class="d-flex flex-column overflow-hidden common">
			<view class="search-box">
				<view class="search-input">
					<image src="/static/images/order/search-icon.png" class="search-icon"></image>
					<input class="s_input" type="text" v-model="keyword" 
							placeholder=" " 
							placeholder-class="placeholder" @input="handleKeywordInput">
				    <image v-if="keyword" src="/static/images/order/image-delete.png" class="close-icon" @tap="clear" />
				</view>
				<view class="ml-30" @tap="hide">取消</view>
			</view>
			<scroll-view class="result" scroll-y>
				<view class="wrapper" style="padding: 0 0 30rpx 24rpx;">
					
						<!-- <view class="product" v-for="(item, index) in result" :key="index" @tap="handleChoose(item, true)">
							<view class="d-flex align-items-center">
								<image :src="item.imgurl" class="pro-image"/>
								<view class="pro-name">{{ item.name }}</view>
							</view>
							<view class="pro-price">￥{{ item.price }}</view>
						</view> -->
						<view v-if="result.length" class="shop_item" v-for="(item, index) in result" :key="index" @tap="handleChoose(item, true)">
							<view class="shop_name">
								{{item.shop_name}}
							</view>
							<view class="shop_address">
								{{item.shop_address}}
							</view>
						</view>
					</view>
			</scroll-view>
			</view>
		</view>
	</uni-transition>
</template>

<script>
	import uniTransition from '@/components/uni-transition/uni-transition.vue'
	export default {
		name: 'search',
		components: {
			uniTransition
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			categories: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				tranStyles: {
					width: '100%',
					position: 'absolute',
					// // #ifdef MP-WEIXIN
					// top: "69px",
					// // #endif
					// // #ifndef MP-WEIXIN
					// top: "calc(var(--status-bar-height) + 44px)",
					// // #endif
					top: 0,
					left: 0,
					bottom: 0,
					backgroundColor: '#fff',
					zIndex: 997
				},
				
				keyword: '',
				result: []
			}
		},
		async created() {
			/* this.hotSearch = await this.$api('hotSearch')
			this.historySearch = await this.$api('historySearch') */
			/* var statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			this.tranStyles.top= statusBarHeight + 44 +"px"; */
		},
		methods: {
			hide() {
				this.keyword = ''
				this.result = []
				this.$emit('hide')
			},
			handleChoose(item, isSearch = false) {
				if(isSearch) {
					this.hide()
					this.$emit('choose', item)
					return
				}
				this.categories.forEach(category => {
					const find = category.goods_list.find(good => good.id == item.id)
					if(find) {
						this.hide()
						this.$emit('choose', find)
						return
					}
				})
			},
			handleKeywordInput(e) {
				//为了方便，这里使用商品列表的数据来筛选结果
				const {value} = e.detail
				
				if(!value) {
					this.result = []
					return
				}
				
				let result = []
				let second_result = []
				this.categories.forEach(shop => {
					
						if(shop.shop_name.indexOf(value) > -1) {
							result.push(shop)
						}else if(shop.shop_address.indexOf(value) > -1){
							second_result.push(shop)
						}
				})
				setTimeout(() => this.result = result.concat(second_result), 300)
			},
			clearHistory(){
				this.historySearch=[]
			},
			clear() {
				this.keyword=''
				this.result = []
			}
		}
	}
</script>

<style lang="scss" scoped>
	.common{
		font-size: 24rpx;
		color: #999999;
	}
	.overflow-hidden {
	    overflow: hidden !important;
	}
	.flex-column{
		flex-direction: column;
	}
	.placeholder {
	    font-size: 24rpx;
	    color: #999;
	}
	.s_input{
		margin-left: 10rpx;
		color: #333333;
		 font-size: 24rpx;
	}
	.search-box {
		height: 100rpx;
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid rgba($color: #c8c7cc, $alpha: 0.6);
		
		.search-input {
			flex: 1;
			height: 60rpx;
			padding: 10rpx 20rpx;
			background-color: #f7f7f7;
			font-size: 26rpx;
			border-radius: 50rem !important;
			display: flex;
			align-items: center;

			.search-icon {
				width: 30rpx;
				height: 30rpx;
				margin-right: 10rpx;
			}
			
			input {
				flex: 1;
			}
			
			.close-icon {
				width: 30rpx;
				height: 30rpx;
				margin-left: 20rpx;
			}
		}
	}
	
	.section {
		padding: 30rpx;
		
		.header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20rpx;
			
			.title {
				font-size: 28rpx;
				color: #343434;
				font-weight: bold;
			}
			
			.subtitle {
				display: flex;
				align-items: center;
				font-size: 24rpx;
				color: #999;
				
				image {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
		
		.list {
			display: flex;
			flex-wrap: wrap;
			
			.item {
				background-color: #f5f5f7;
				padding: 10rpx 20rpx;
				font-size: 24rpx;
				color: #666;
				border-radius: 50rem !important;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				
				.name-image {
					width: 30rpx;
					height: 30rpx;
				}
			}
		}
	}
	
	.result {
		height: calc(100vh - 120rpx);
		/* #ifdef H5 */
		height: calc(100vh - 120rpx - 100rpx );
		/* #endif */
		overflow: hidden;
		
		.shop_item{
			border-bottom: 0.5px solid rgba(200, 199, 204, 0.6);
			padding: 10rpx 0;
			.shop_name{
				color: #333333;
				font-size: 28rpx;
				font-weight: bold;
				line-height: 40rpx;
			}
			.shop_address{
				color: #999999;
				font-size: 24rpx;
				line-height: 32rpx;
			}
		}
		
		.product {
			padding: 20rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 26rpx;
			
			.pro-image {
				width: 144rpx;
				height: 108rpx;
			}
			
			.pro-price {
				font-weight: 500 !important;
			}
		}
	}
</style>
