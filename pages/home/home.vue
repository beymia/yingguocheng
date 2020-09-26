<template>
	<view class="page">
		
		<view class="container">
			<!-- 首页轮播图start -->
			<swiper class="swiper-wrap" :indicator-dots="swiper.dots" :indicator-color="swiper.indicator_color" :indicator-active-color='swiper.indicator_active_color' :autoplay="swiper.autoplay" :circular='swiper.circular' :interval="swiper.interval" :duration="swiper.duration">
				<swiper-item class="swiper-item" v-for="(item,index) in swiper.images_src">
						<image :src="item" mode=""></image>
				</swiper-item>
			</swiper>
			<!-- 首页轮播图end -->
			
			<!-- 主体目录start -->
			<view class="menu1">
				<view class="submenu1">
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
				<view class="submenu2">
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
				<view class="submenu3">
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
					<view class="item2">
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
				<view class="myIntegral">
					<view class="item1">
						我的積分 {{integral}}
					</view>
					<view class="item2">
						可兌換奶茶券和豐富靈感周邊
					</view>
				</view>
				<view class="memberCode">
					<view class="item1">
						<image src="../../static/images_t/home/memberCode.png" mode=""></image>
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
	export default {
		data() {
			return {
				//以下均为默认值，将在onload时从后台获取新值替换
				swiper: {dots:false,indicator_color:'',indicator_active_color:'',autoplay:true,circular:true,interval:5000,duration:1000,images_src:['/static/images_t/home/swiper01.png','/static/images_t/home/swiper01.png','/static/images_t/home/swiper01.png']},
				integral:0,
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" >
	@import 'home.scss';
</style>
