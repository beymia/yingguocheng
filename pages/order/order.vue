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
				<swiper   class="swiper_wrap_notice"  :autoplay="true" vertical circular :interval="3000" :duration="1000">
					<swiper-item v-show="!is_notice" v-for="(notice,notice_index) in notice_list">
						<view class="swiper-item notice_title">
							<view class="notice_icon">
								<image src="../../static/images/order/blueBall.png" mode=""></image>
							</view>
							<text class="notice_text">{{notice}}</text>
						</view>
					</swiper-item>
				</swiper>
				
					<template v-if="is_notice">
						<view class="notice_more" @tap="is_notice=false">
							<text class="notice_more">收起</text>
							<uni-icons type="arrowup" size="24" color="#999999"></uni-icons>
						</view>
					</template>
					<template v-else>
						<view class="notice_more" @tap="is_notice=true">
							<text class="notice_more">更多</text>
							<uni-icons type="arrowdown" size="24" color="#999999"></uni-icons>
						</view>
					</template>
					
			</view>
			<!-- 公告栏end -->
		</view>
		<!-- 头部end-->
		<!-- 新聞詳情頁開始 -->
		<notice v-show="is_notice" :news_list="notice_list"></notice>
		<!-- 新聞詳情頁結束 -->
		<!-- 点单主体部分start -->
		<view class="main" v-show="!is_notice">
			<!-- 左侧菜单栏start -->
			<scroll-view class="menu_bar" scroll-y="true" >
				<view class="menu_item" v-for="(menu,menu_index) in menu_list"  :class="{active:menu.id==menu_id_current}" @click="menu_Tap(menu.id)" >
					<image class="menu_icon" :src="menu.icon_url" mode=""></image>
					<text class="menu_name">{{menu.menu_name}}</text>
				</view>
			</scroll-view>
			<!-- 左侧菜单栏end -->
			<!-- 右侧商品栏start -->
			<scroll-view scroll-y="true" scroll-with-animation :scroll-top="goods_scrollTop"  class="goods" @scroll="goods_scroll" >
				<view class="pdb50">
					<view class="goods_list" :id="`goods_${menu.id}`" v-for="(menu,menu_index) in menu_list">
						<view class="goods_title">
							{{menu.menu_name}}
						</view>
						<view class="goods_item" v-for="(good,good_index) in menu.goods_list" @tap="showProductDetailModal(good)">
							<view class="good_icon">
								<image :src="good.imgurl" mode=""></image>
							</view>
							<view class="good_intro">
								<view class="good_name">
									{{good.name}}
								</view>
								<view class="good_label">
									<!-- <view class="isHot" v-if="good.isHot">
										可做热饮
									</view>
									<view class="recipe">
										{{good.recipe}}
									</view> -->
									<view class="isHot" v-for="label in good.labels">
										{{label}}
									</view>
								</view>
								<view class="good_des">
									{{good.description}}
								</view>
								<view class="price">
									<view class="">
										￥{{good.price}}
									</view>
									<actions :materials-btn="!good.is_single"
											@materials="showProductDetailModal(good)" 
											:number="productCartNum(good.id)"
											@add="handleAddToCart(good)" 
											@minus="handleMinusFromCart(good)" />
								</view>
							</view>
						</view>
					</view>
				</view>
					
			</scroll-view>
			<!-- 右侧商品栏end -->
		</view>
		<!-- 点单主体部分end -->
		<!-- 商品詳情頁開始 -->
		<product-modal :product="good"
						:visible="goodModalVisible" 
						@cancel="closeProductDetailModal" 
						@add-to-cart="handleAddToCartInModal" 
		/>
		<!-- 商品詳情頁結束 -->
		<!-- 购物车栏 begin -->
		<cart-bar v-if="!is_notice && !is_rest" :cart="cart" 
				  @add="handleAddToCart" 
				  @minus="handleMinusFromCart"
				  @clear="clearCart"
				  @checkboxChange="checkboxChange"
				  @checkAllChange="checkAllChange"
				  @pay="pay"
		/>
		<!-- 购物车栏 end -->
		<!-- 休息中 start -->
		<rest opening_hours=""></rest>
		<!-- 休息中 end -->
	</view>
</template>

<script>
	import {menu_list} from './data.js';
	import actions from './components/actions/actions.vue'
	import notice from './components/notice/notice.vue'
	import CartBar from './components/cartbar/cartbar.vue'
	import ProductModal from './components/product-modal/product-modal.vue'
	import Search from './components/search/search.vue'
	import rest from './components/rest/rest.vue'
	export default{
		components:{
			actions,
			notice,
			ProductModal,
			CartBar,
			Search,
			rest
			},
		data() {
			return {
				shop_info:{
					shop_adress:'合肥市蜀山區丹霞路店店',
					shop_name:'合肥正大廣場店',
					tip:'送出外賣'
				},
				notice_list:[
					'多肉玫瓏瓜&玫瓏芒芒甘露新上市，優秀玫瓏瓜，清涼夏日解渴',
					'歐洲國外冰箱貼法國巴黎挪威英國倫敦新西蘭丹麥匈牙利出國紀念品',
					'【混合堅果】限時買壹送壹，下單兩件自動減免壹件，快來選購嘗鮮吧~',
					'生打椰系列全新上市，生打椰椰奶凍、生打椰椰芒2款可選，快來【當季限定】下單嘗鮮吧~',
					'【混合堅果】限時買壹送壹，下單兩件自動減免壹件，快來選購嘗鮮吧~'
				],
				menu_list,
				//下面都是静态默认值
				order_type_selected:'order_type_selected',
				order_type_current:0,
				title:'英国城',
				is_notice:false,
				menu_id_current:1,
				goods_scrollTop:0,
				good:{},
				goodModalVisible:false,
				cart:[],
			
			}
		},
		async onLoad() {
			uni.request({
			    url: 'https://host.dot_api.com/classify/list', //仅为示例，并非真实接口地址。
			    data: {
			    },
			    header: {
			        'custom-header': 'hello' //自定义请求头信息
			    },
			    success: (res) => {
			        console.log('onload sucess data---:'+res.data);
			    },
				complete: (res) => {
				    console.log(res);
				}
			});
			this.$nextTick(() => this.calcSize())
		},
		computed:{
			productCartNum(id) {	//计算单个饮品添加到购物车的数量
				return id => this.cart.reduce((acc, cur) => {
						if(cur.id === id) {
							return acc += cur.number
						}
						return acc
					}, 0)
			}
		},
		methods:{
			calcSize() {
				let h = 0
				
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
				let tabIndex=e.currentTarget.dataset.index
				this.order_type_current=tabIndex;
				console.log(tabIndex)
				if(tabIndex == 1){
					console.log('weoufowjfj')
					uni.navigateTo({
						url:"/pages/userAdress/userAdress"
					})
				}
				
			},
			menu_Tap(id){
				this.menu_id_current=id;
				this.goods_scrollTop = this.menu_list.find(item => item.id == id).top+Math.random();
				console.log(this.goods_scrollTop)
					
			},
			goods_scroll({detail}) {
				//this.goods_scrollTop=detail.scrollTop;//仅仅起到监听作用，防止重复设值不生效
				let {scrollTop} =detail;
				scrollTop=Math.ceil(scrollTop)+1;
				
				let tabs = this.menu_list.filter(item=>item.top<=scrollTop&&item.ht>scrollTop)
				if(tabs.length>0){
					this.menu_id_current=tabs[0].id
				}
			},
			showProductDetailModal(good) {
				this.good = good
				this.goodModalVisible = true
			},
			handleAddToCart(good) {	//添加到购物车
			console.log(this.productCartNum());
				const index = this.cart.findIndex(item => {
					if(!good.is_single) {
						return (item.id == good.id) && (item.materials_text == good.materials_text)
					} else {
						return item.id === good.id
					}
				})
				
				if(index > -1) {
					this.cart[index].number += (good.number || 1)
					return
				}
				
				this.cart.push({id: good.id,
					//cate_id: good.category_id,
					name: good.name,
					price: good.price,
					truePrice:good.truePrice|| good.price,
					number: good.number || 1,
					//image: good.images[0].url,
					imgurl:good.imgurl,
					is_single: good.is_single,
					materials_text: good.materials_text || '',
					is_checked:true,
				});
				// this.cart.push({
				// 	id: good.id,
				// 	cate_id: good.category_id,
				// 	name: good.name,
				// 	price: good.price,
				// 	number: good.number || 1,
				// 	image: good.images[0].url,
				// 	is_single: good.is_single,
				// 	materials_text: good.materials_text || ''
				// })
			},
			handleMinusFromCart(good) { //从购物车减商品
				let index
				if(good.is_single) {
				   index = this.cart.findIndex(item => item.id == good.id)
				} else {
				   index = this.cart.findIndex(item => (item.id == good.id) && (item.materials_text == good.materials_text))
				}
				this.cart[index].number -= 1
				if(this.cart[index].number <= 0) {
					this.cart.splice(index, 1)
				}
			},
			handleAddToCartInModal(good) {
				this.handleAddToCart(good)
				this.closeProductDetailModal()
			},
			closeProductDetailModal() {
				this.goodModalVisible = false
				this.good = {}
			},
			clearCart() {
				this.cart = []
			},
			checkAllChange(e){
				var values = e.detail.value;
				console.log(e)
				if(values.length > 0){
					this.cart.forEach(item => item.is_checked = true)
				}else{
					this.cart.forEach(item => item.is_checked = false)
				}
			},
			checkboxChange(e){
				var values = e.detail.value;
				var id=e.currentTarget.dataset.id;
				console.log(e)
				if(values.length > 0){
					this.cart.find(item => item.id==id).is_checked=true;
				}else{
					this.cart.find(item => item.id==id).is_checked= false;
			}
		}
	},
}
	
</script>

<style lang="scss" scoped>
	@import "order.scss";
</style>
