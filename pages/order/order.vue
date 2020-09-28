<template>
	<view class="page">
		<!-- 自定义导航栏start -->
		<uni-nav-bar :title="title" statusBar style="">
			<block slot="left">
				<view style="height: 35px;line-height: 35px;border-radius: 18px;border: 1px solid #eaeaea;margin-left: 24rpx;padding: 0 15px;display: flex;align-self: center;">
					<text style="font-size: 17px;color: #666666;" >拼</text>
					<text style="width: 29px;font-size: 17px;text-align: center;color: #EAEAEA;">|</text>
					<icon type="search" size="17" color="#666666" style="display: flex;align-items: center;" ></icon>
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
				<view class="menu_item" v-for="(menu,menu_index) in menu_list" :class="{active:menu.id==menu_id_current}" @click="menu_Tap(menu.id)" >
					<image class="menu_icon" :src="menu.icon_url" mode=""></image>
					<text class="menu_name">{{menu.menu_name}}</text>
				</view>
			</scroll-view>
			<!-- 左侧菜单栏end -->
			<!-- 右侧商品栏start -->
			<scroll-view scroll-y="true" scroll-with-animation :scroll-top="goods_scrollTop"  class="goods" @scroll="goods_scroll" >
					<view class="goods_list" :id="`goods_${menu.id}`" v-for="(menu,menu_index) in menu_list">
						<view class="goods_title">
							{{menu.menu_name}}
						</view>
						<view class="goods_item" v-for="(good,good_index) in menu.goods_list">
							<view class="good_icon">
								<image :src="good.imgurl" mode=""></image>
							</view>
							<view class="good_intro">
								<view class="good_name">
									{{good.name}}
								</view>
								<view class="good_label">
									<view class="isHot" v-if="good.isHot">
										可做热饮
									</view>
									<view class="recipe">
										{{good.recipe}}
									</view>
								</view>
								<view class="good_des">
									{{good.des}}
								</view>
								<view class="price">
									<view class="">
										￥{{good.price}}
									</view>
								</view>
							</view>
						</view>
					</view>
			</scroll-view>
			<!-- 右侧商品栏end -->
			
		</view>
		<!-- 点单主体部分end -->
	</view>
</template>

<script>
	import {menu_list} from './data.js';
	import actions from './components/actions/actions.vue'
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
				menu_list,
				//下面都是静态默认值
				order_type_selected:'order_type_selected',
				order_type_current:0,
				title:'英国城',
				menu_id_current:1,
				goods_scrollTop:0
			
			}
		},
		onLoad() {
			this.$nextTick(() => this.calcSize())
		},
		computed:{
			
		},
		methods:{
			calcSize() {
				let h = 0
				let view = uni.createSelectorQuery().select('#ads')
				view.fields({
					size: true
				}, data => {
					h += Math.floor(data.height)
				}).exec()
				
				this.menu_list.forEach(item => {
					let view = uni.createSelectorQuery().select(`#goods_${item.id}`)
					view.fields({
						size: true
					}, data => {
						item.top = h
						h += data.height
						item.ht = h
					}).exec()
				})
			},
			order_type_tap(e){
			
				this.order_type_current=e.currentTarget.dataset.index;
			},
			menu_Tap(id){
				this.menu_id_current=id;
				this.goods_scrollTop = this.menu_list.find(item => item.id == id).top
				console.log(this.goods_scrollTop)
					
			},
			goods_scroll({detail}) {
				this.goods_scrollTop=detail.scrollTop;//仅仅起到监听作用，防止重复设值不生效
				let {scrollTop} =detail;
				scrollTop=Math.ceil(scrollTop)+1;
				
				let tabs = this.menu_list.filter(item=>item.top<=scrollTop&&item.ht>scrollTop)
				if(tabs.length>0){
					this.menu_id_current=tabs[0].id
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "order.scss";
</style>
