<template>
	<view class="page">
		<view class="top_tap">
			<view class="tap_con">
				<view class="tap_item" :class="{active:is_xzmd}" @tap="is_xzmd=true">
					選擇門店
				</view>
				<view class="active_border" v-if="is_xzmd"></view>
			</view>
			<view class="tap_con">
				<view class="tap_item" :class="{active:!is_xzmd}" @tap="is_xzmd=false">
					常用
				</view>
				<view class="active_border" v-if="!is_xzmd"></view>
			</view>
			<view class="borderline"></view>
		</view>
		<!-- 選擇門店開始 -->
		<view class="content_xzmd" v-if="is_xzmd">
			<view class="search_lab" @tap="showSearch=true">
				<view class="icon">
					<image src="/static/images/order/search-icon.png" mode=""></image>
				</view>
				<view class="text">
					搜索
				</view>
			</view>
			
			<map v-if="map_show" :latitude="choosedShop.latitude ? choosedShop.latitude : latitude" :longitude="choosedShop.longitude ? choosedShop.longitude :longitude" :markers="markers" class="map"></map>
			
			<view class="is_hide_map" v-if="map_show" @tap="map_show=false">
				<text>收起地圖</text>
				<uni-icons type="arrowup" size="24"></uni-icons>
			</view>
			<view class="is_hide_map" v-if="!map_show" @tap="map_show=true">
				<text>展開地圖</text>
				<uni-icons type="arrowdown" size="24"></uni-icons>
			</view>
			
			<scroll-view scroll-y="true" class="shop_list">
				<view class="shop_item" :class="{active:items.id == choosedShop.id}" v-for="(items,indexs) in (searchShopList ? searchShopList:shopList)" :key="indexs" @tap="shop_tap(indexs)">
					<view class="left">
						<view class="shop_name">
							{{items.shop_name}}
						</view>
						<view class="order_waisong">
							<view class="order">
								<view class="progress" :style="{width: items.current_cups > 100 ? 100:items.current_cups +'%'}"></view>
								<view class="text">
									{{items.current_order}}單/{{items.current_cups}}杯製作中
								</view>
							</view>
							<view class="waisong">
								可外送
							</view>
						</view>
						<view class="location">
							<view class="loca_icon">
								<image src="/static/images/order/location.png" mode=""></image>
							</view>
							<view class="loca_text">
								{{items.shop_address}}
							</view>
						</view>
						<view class="yysj">
							<view class="clock">
								<image src="/static/images/order/clock.png" mode=""></image>
							</view>
							<view class="yysj_text">
								營業時間：{{items.work_time}}-{{items.rest_time}}
							</view>
						</view>
					</view>
					<view class="right" @tap="order_tap(items)">
						<view class="text1" >
							去下單
						</view>
						<view class="text2">
							距離{{items.distance}}km
						</view>
					</view>
					<view class="shop_right_corner" v-if="items.id == choosedShop.id">
						<image src="/static/images/order/shop_right_corner.png" mode=""></image>
					</view>
				</view>
				
			<view class="nomore" v-if="shopList.length">
				沒有更多了~
			</view>
			</scroll-view>
		</view>
		<!-- 選擇門店結束 -->
		<!-- 常用開始 -->
		<view class="content_cy" v-if="!is_xzmd">
			<scroll-view scroll-y="true" class="shop_list">
				<view class="shop_item" :class="{active:items.id == choosedShop.id}" v-for="(items,indexs) in cyShopList" :key="indexs" @tap="shop_tap(indexs)">
					<view class="left">
						<view class="shop_name">
							{{items.shop_name}}
						</view>
						<view class="order_waisong">
							<view class="order">
								<view class="progress" :style="{width: items.current_cups+'%'}"></view>
								<view class="text">
									{{items.current_order}}單/{{items.current_cups}}杯製作中
								</view>
							</view>
							<view class="waisong">
								可外送
							</view>
						</view>
						<view class="location">
							<view class="loca_icon">
								<image src="/static/images/order/location.png" mode=""></image>
							</view>
							<view class="loca_text">
								{{items.shop_address}}
							</view>
						</view>
						<view class="yysj">
							<view class="clock">
								<image src="/static/images/order/clock.png" mode=""></image>
							</view>
							<view class="yysj_text">
								營業時間：{{items.work_time}}-{{items.rest_time}}
							</view>
						</view>
					</view>
					<view class="right" @tap="order_tap(items)">
						<view class="text1" >
							去下單
						</view>
						<view class="text2">
							距離{{items.distance}}km
						</view>
					</view>
					<view class="shop_right_corner" v-if="items.id == choosedShop.id">
						<image src="/static/images/order/shop_right_corner.png" mode=""></image>
					</view>
				</view>
				
			<view class="nomore" v-if="shopList.length">
				沒有更多了~
			</view>
			</scroll-view>
		</view>
		<!-- 常用結束 -->
		<!-- 搜索页面start -->
		<search :show="showSearch" :categories="shopList" @hide="showSearch=false" @choose="search_choose" ></search>
		<!-- 搜索页面end -->
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import search from './components/search/search.vue'
	export default {
		components:{
			search
		},
		data() {
			return {
				is_xzmd:true,
				latitude: 39.909,
				longitude: 116.39742,
				map_show:true,
				showSearch:false,
				searchShopList:null,
				order_cup_progress:[],
			};
		},
		computed:{
			...mapState(["choosedShop","shopList","cyShopList"]),
			markers(){
				return [{
					latitude:this.choosedShop.latitude,
					longitude:this.choosedShop.longitude,
					iconPath: '/static/images/order/mark.png',
					width:'58rpx',
					height:'96rpx',
					callout:{
						content:this.choosedShop.shop_name,
						display:"ALWAYS"
					}
					}]
			}
		},
		onLoad() {
			/* this.shopList.forEach(item =>{
				let order= Math.ceil(Math.random() * 15);
				let cup =0;
				do{
					cup = Math.ceil(Math.random() * 4 * order)
					console.log(order+":"+cup)
				}while(cup < order)
				let progress = cup + '%';
				item.ocp={
					order:order,
					cup:cup,
					progress:progress
				}
				console.log(item.ocp)
			}) */
			if(this.shopList.length <= 2){
				this.SET_CY_SHOP_LIST(this.shopList)
			}else{
				let cys= [this.shopList[0],this.shopList[1]]
				this.SET_CY_SHOP_LIST(cys)
			}
			console.log(this.shopList)
			console.log(this.cyShopList)
			console.log(111111111)
			console.log("shop onLoad")
		},
		onShow() {
			console.log("shop onShow")
		},
		onHide() {
			console.log("shop onHide")
		},
		onUnload() {
			console.log("shop onUnload")
		},
		methods:{
			...mapMutations(["SET_CHOOSED_SHOP","SET_SHOP_LIST","SET_CY_SHOP_LIST"]),
			search_choose(shop){
				this.SET_CHOOSED_SHOP(shop)
				this.searchShopList=[shop];
				
			},
			shop_tap(indexs){
				console.log(44444444444)
				this.SET_CHOOSED_SHOP(this.shopList[indexs]);
			},
			order_tap(shop){
				this.SET_CHOOSED_SHOP(shop);
				uni.switchTab({
					url:"/pages/order/order"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.borderline{
		border-top: 1px solid #CCCCCC;
		opacity: 0.5;
		width: 100%;
	}
	.content_xzmd{
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	.content_cy{
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	.top_tap{
		display: flex;
		flex-wrap: wrap;
		.tap_con{
			flex: 1;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			.tap_item{
				height: 96rpx;
				line-height: 96rpx;
				font-size: 32rpx;
				color:#666666;
				text-align: center;
				width: 100%;
			}
			.active{
				color: $main-color;
			}
			.active_border{
				height: 4rpx;
				background-color: $main-color;
				width: 80rpx;
				
			}
		}
	}
	
	.search_lab{
		width: 702rpx;
		height: 62rpx;
		background: #f6f6f6;
		border-radius: 31rpx;
		margin: 30rpx auto;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.icon{
			width: 18rpx;
			height: 19rpx;
			margin-right: 10rpx;
		}
		.text{
			font-size: 24rpx;
			color: #999999;
			margin-right: 20rpx;
		}
	}
	.map{
		width: 750rpx;
		height: 450rpx;
		margin-bottom: 14rpx;
	}
	.is_hide_map{
		color: #333333;
		font-size: 24rpx;
		margin-bottom: 14rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		text{
			margin-right: 10rpx;
		}
		
	}
	.shop_list{
		padding: 30rpx 24rpx;
		flex: 1;
		background-color: #F5F5F5;
		overflow: hidden;
		box-sizing: border-box;
		.active{
			border: 1px solid $main-color;
		}
		.shop_item{
			padding: 28rpx 30rpx;
			border-radius: 20rpx;
			position: relative;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;
			/* left start */
			.left{
				flex: 1;
				.shop_name{
					font-size: 28rpx;
					font-weight: bold;
					color: #333333;
					margin-bottom: 14rpx;
				}
				.order_waisong{
					display: flex;
					align-items: center;
					.order{
						width: 200rpx;
						height: 22rpx;
						border-radius: 22rpx;
						background-color: #f0f0f0;
						position: relative;
						margin-right: 20rpx;
						.progress{
							height: 22rpx;
							border-radius: 22rpx;
							background-color: $main-color;
						}
						.text{
							position: absolute;
							top:0;
							left: 0;
							height: 22rpx;
							line-height: 22rpx;
							width: 100%;
							font-size: 14rpx;
							color: #333333;
							padding-left: 12rpx;
						}
					}
					.waisong{
						width: 80rpx;
						height: 34rpx;
						line-height: 34rpx;
						background: #ffffff;
						border: 1px solid $main-color;
						border-radius: 4rpx;
						font-size: 22rpx;
						color: $main-color;
						text-align: center;
					}
				}
				.location{
					display: flex;
					margin-bottom: 20rpx;
					.loca_icon{
						width: 23rpx;
						height: 23rpx;
						margin-right: 10rpx;
						margin-top: 8rpx;
					}
					.loca_text{
						flex: 1;
						font-size: 22rpx;
						color: #333333;
						line-height: 40rpx;
						word-break: break-all;
						word-wrap: break-word;
					}
				}
				.yysj{
					display: flex;
					align-items: center;
					.clock{
						width: 23rpx;
						height: 23rpx;
						margin-right: 10rpx;
						margin-left: 4rpx;
					}
					.yysj_text{
						font-size: 22rpx;
						color: #333333;
					}
				}
			}
			/* left end */
			.right{
				display: flex;
				flex-direction: column;
				align-items: center;
				flex-shrink: 0;
				margin-left: 70rpx;
				.text1{
					font-size: 24rpx;
					color: #333333;
					margin-bottom: 10rpx;
				}
				.text2{
					font-size: 18rpx;
					color: #666666;
				}
			}
			
			.shop_right_corner{
				width: 68rpx;
				height: 68rpx;
				position: absolute;
				right: -1px;
				bottom: -1px;
			}
		}
		.nomore{
			font-size: 18rpx;
			color: #999999;
			margin-bottom: 40rpx;
			text-align: center;
		}
	}
</style>
