<template>
	<view class="page">
		<uni-status-bar></uni-status-bar>
		<view style="height: 44px;display: flex;justify-content: center;margin-bottom: 30rpx;">
			<image :src="home_images.logo[0]"  mode="aspectFit"></image>
		</view>
		<view class="container">
			<!-- 首页轮播图start -->
			<swiper class="swiper-wrap" 
			:indicator-dots="swiper.dots" 
			:indicator-color="swiper.indicator_color" 
			:indicator-active-color='swiper.indicator_active_color' 
			:autoplay="swiper.autoplay" 
			:circular='swiper.circular' 
			:interval="swiper.interval" 
			:duration="swiper.duration">
				<swiper-item class="swiper-item" v-for="(item,index) in home_images.poster">
						<image :src="item" mode=""></image>
				</swiper-item>
			</swiper>
			<!-- 首页轮播图end -->
			
			<!-- 主体目录start -->
			<view class="menu1">
				<view class="submenu1" @tap="mdzq">
					<view class="item1">
						<image src="/static/images/home/cup.png" mode=""></image>
					</view>
					<view class="item2">
						門店自取
					</view>
					<view class="item3">
						下單免排隊
					</view>
				</view>
				<view class="submenu2" @tap="waimai">
				<!-- <view class="submenu2" > -->
					<view class="item1">
						<image src="/static/images/home/motorbike.png" mode=""></image>
					</view>
					<view class="item2">
						外賣
					</view>
					<view class="item3">
						無需接觸 送茶到家
					</view>
				</view>
				<view class="submenu3" @tap="tangshi">
					<view class="item1">
						<image src="/static/images/home/eatIn.jpg" mode=""></image>
					</view>
					<view class="item2">
						堂食下單
					</view>
					<view class="item3">
						下單無排隊
					</view>
				</view>
			</view>
			
			<view class="menu2">
				<view class="submenu1">
					<view class="item1">
						<view class="item1_c1">
							<image  src="/static/images/home/company.png" mode=""></image>
						</view>
						<view class="item1_c2">
							企業團餐
						</view>
					</view>
					<view class="item2">
							火熱預定
					</view>
				</view>
				<view class="submenu2">
					<view class="item1">
						<image src="../../static/images/home/feature.png" mode=""></image>
					</view>
					<view class="item2" @tap="tssx">
							特色手信
					</view>
				</view>
				<view class="submenu2">
					<view class="item1">
						<image src="../../static/images/home/live.png" mode=""></image>
					</view>
					<view class="item2">
							直播網購
					</view>
				</view>
				
			</view>
			<!-- 主体目录end -->
			
			<!-- 积分start -->
			<view class="integral">
				<view class="myIntegral" @tap='jifen'>
					<view class="item1">
						我的積分 {{integral}}
					</view>
					<view class="item2">
						可兌換奶茶券和豐富靈感周邊
					</view>
				</view>
				<view class="memberCode" @tap="huiyuanma">
					<view class="item1">
						<image src="../../static/images/home/memberCode.png" mode=""></image>
					</view>
					<view class="item2">
						會員碼
					</view>
				</view>
			</view>
			<!-- 积分end -->
			
		</view>

	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import {home_images} from '@/request/api_y.js'
	import {userSpace} from '@/request/api.js'
	export default {
		data() {
			return {
				//以下均为默认值，将在onload时从后台获取新值替换
				swiper: {dots:false,indicator_color:'',indicator_active_color:'',autoplay:true,circular:true,interval:5000,duration:1000},
				integral:0,
				home_images:{
					poster:['/static/images_t/home/swiper01.png',
					'/static/images_t/home/swiper01.png','/static/images_t/home/swiper01.png'],
					logo:['../../static/icon/home_selected.png']
				},
			}
		},
		async onLoad() {
			await this.init()
		},
		onShareAppMessage(obj) {
			
		},
		computed:{
			...mapState(['orderType','orderFrom']),
		},
		methods: {
			...mapMutations(['SET_ORDER_TYPE','SET_ORDER_FROM']),
			mdzq(){
				this.SET_ORDER_TYPE(2)
				uni.switchTab({
					url:'/pages/order/order'
				})
			},
			waimai(){
				uni.navigateTo({
					url:'/pages/userAdress/userAdress'
				})
			},
			tangshi(){
				this.SET_ORDER_TYPE(3)
				uni.switchTab({
					url:'/pages/order/order'
				})
			},
			jifen(){
				uni.navigateTo({
					url:'/pages/pointsMall/pointsMall'
				})
			},
			huiyuanma(){
				uni.navigateTo({
					url:'/pages/memberCode/memberCode'
				})
			},
			tssx(){
				this.SET_ORDER_FROM('home_tssx')
				uni.switchTab({
					url:'/pages/order/order'
				})
			},
			async init(){
				try {
           let home_images_n = (await home_images({})).data;
		   home_images_n.logo[0] = this.imgSrc + home_images_n.logo[0]
		   home_images_n.poster.forEach((item,index)=>{
			    home_images_n.poster[index] = this.imgSrc + item
		   })
		   this.home_images = home_images_n
          console.log(this.home_images)
          const token = uni.getStorageSync('token');
          token&&(this.integral = (await userSpace({})).data.integral)
        }catch (e) {
          console.log(e);
        }
			}
		}
	}
</script>

<style lang="scss" >
	@import 'home.scss';
</style>
