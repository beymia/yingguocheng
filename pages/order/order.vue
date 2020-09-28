<template>
	<view class="page">
		<!-- 自定义导航栏start -->
		<uni-nav-bar :title="title" statusBar style="">
			<block slot="left">
				<view style="height: 35px;line-height: 35px;border-radius: 18px;border: 1px solid #eaeaea;margin-left: 24rpx;padding: 0 15px;display: flex;align-self: center;">
					<text style="font-size: 17px;color: #666666;" >拼</text>
					<text style="width: 29px;font-size: 17px;text-align: center;color: #EAEAEA;">|</text>
					<icon type="search" size="17" color="#666666" ></icon>
				</view>
			</block>
		</uni-nav-bar>
		<!-- 自定义导航栏end -->
		
		<!-- 头部start -->
		<view class="order_head">
			<!-- 位置、自取、外卖、堂食start -->
			<view class="location">
				<view class="left">
					<view class="top">
						<view class="loca_icon">
							<image src="../../static/images/order/location.png" mode=""></image>
						</view>
						<view class="shop_adress">{{shop_info.shop_adress.length<=9 ? shop_info.shop_adress:shop_info.shop_adress.substr(0,8)+"..." }}</view>
						<uni-icons type="arrowright" size="35" color="#333333"></uni-icons>
					</view>
					<view class="bottom">
						<view class="shop_tab_icon">
							<image src="../../static/images/order/shop_tap.jpg" mode=""></image>
						</view>
						<view class="shop_name">
							{{shop_info.shop_name}}
						</view>
						<view class="tip_text">
							{{shop_info.tip}}
						</view>
					</view>
					
				</view>
				<view class="right">
					<view data-index='0'  class="order_type " :class="order_type_current==0?order_type_selected:''" @tap="order_type_tap">
						自取
					</view>
					<view data-index='1' class="order_type " :class="order_type_current==1?order_type_selected:''" @tap="order_type_tap">
						外賣
					</view>
					<view data-index='2' class="order_type " :class="order_type_current==2?order_type_selected:''" @tap="order_type_tap">
						堂食
					</view>
				</view>
			</view>
			<!-- 位置、自取、外卖、堂食end -->
			
			<!-- 公告栏start -->
			<view class="notice">
				<swiper class="swiper_wrap_notice" style="height: 35rpx;"  :autoplay="true" vertical circular :interval="3000" :duration="1000">
					<swiper-item v-for="(notice,index) in notice_list">
						<view class="swiper-item notice_title">
							<view class="notice_icon">
								<image src="../../static/images/order/blueBall.png" mode=""></image>
							</view>
							<text class="notice_text">{{notice.text}}</text>
						</view>
					</swiper-item>
				</swiper>
				
				<view class="notice_more">
					<text class="notice_more">更多</text>
					<uni-icons type="arrowdown" size="24" color="#999999"></uni-icons>
				</view>
			</view>
			<!-- 公告栏end -->
		</view>
		<!-- 头部end-->
		<!-- 点单主体部分start -->
		<view class="main">
			<!-- 左侧菜单栏start -->
			<scroll-view class="menu_bar" scroll-y="true" >
				<view class="menu_item">
					<image class="menu_icon" src="/static/images_t/order/tstc.png" mode=""></image>
					<text class="menu_name">堂食套餐</text>
				</view>
			</scroll-view>
			<!-- 左侧菜单栏end -->
			
		</view>
		<!-- 点单主体部分end -->
	</view>
</template>

<script>
	export default{
		components:{},
		data() {
			return {
				shop_info:{
					shop_adress:'合肥市蜀山區丹霞路店店',
					shop_name:'合肥正大廣場店',
					tip:'送出外賣'
				},
				notice_list:[{
					text:'多肉玫瓏瓜&玫瓏芒芒甘露新上市，優秀玫瓏瓜，清涼夏日解渴'
				},{
					text:'歐洲國外冰箱貼法國巴黎挪威英國倫敦新西蘭丹麥匈牙利出國紀念品'
				}],
				//下面都是默认值
				order_type_selected:'order_type_selected',
				order_type_current:0,
				title:'英国城'
			
			}
		},
		onLoad() {
			this.styleobj={height:'40rpx'}
		},
		computed:{
			
		},
		methods:{
			order_type_tap(e){
			
				this.order_type_current=e.currentTarget.dataset.index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "order.scss";
</style>
