<template>
	<view class="page">
		<!-- 自定义导航栏start -->
		<uni-nav-bar :title="title" statusBar style="" >
			<block slot="left">
				<view style="height: 35px;line-height: 35px;border-radius: 18px;border: 1px solid #eaeaea;margin-left: 24rpx;padding: 0 15px;display: flex;align-self: center;">
					<text style="font-size: 17px;color: #666666;" @tap="pin_tap" v-if="!showSearch">拼</text>
					<text style="font-size: 17px;color: #666666;" v-else>拼</text>
					<text style="width: 29px;font-size: 17px;text-align: center;color: #EAEAEA;">|</text>
					<icon type="search" size="17" color="#666666" style="display: flex;align-items: center;" @tap="showSearch=true"></icon>
				</view>
			</block>
		</uni-nav-bar>
		<!-- 自定义导航栏end -->
		
		<!-- 头部start -->
		<view class="order_head">
			<!-- 位置、自取、外卖、堂食start -->
			
			<view class="location">
				<view class="left">
					<view class="top" @tap="loca_tap">
						<view class="loca_icon">
							<image src="../../static/images/order/location.png" mode=""></image>
						</view>
						<view v-if="orderType == 1" class="shop_adress">{{contact_number}}</view>
						<view v-else class="shop_adress">{{ shop_adress}}</view>
						<uni-icons type="arrowright" size="35" color="#333333"></uni-icons>
					</view>
					<view class="bottom">
						<view class="shop_tab_icon" @tap="switch_shop">
							<image src="../../static/images/order/shop_tap.jpg" mode=""></image>
						</view>
						<view class="shop_name" @tap="switch_shop">
							{{choosedShop.shop_name}}
						</view>
						<!-- <view class="tip_text">
							{{choosedShop.tip}}
						</view> -->
						
					</view>
					
				</view>
				<view class="right">
					<view   class="order_type " :class="orderType==2?'order_type_selected':''" @tap="order_type_tap(2)">
						自取
					</view>
					<view  class="order_type " :class="orderType==1?'order_type_selected':''" @tap="order_type_tap(1)">
						外賣
					</view>
					<view  class="order_type " :class="orderType==3?'order_type_selected':''" @tap="order_type_tap(3)">
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
		<notice v-show="is_notice" :choosed_shop="choosedShop"></notice>
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
									<actions v-if="!is_rest"
											:materials-btn="!!(good.materials && good.materials.length)"
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
		<product-modal  v-if="!is_rest"
						:product="good"
						:visible="goodModalVisible" 
						@cancel="closeProductDetailModal" 
						@add-to-cart="handleAddToCartInModal" 
		/>
		<!-- 商品詳情頁結束 -->
		<!-- 购物车栏 begin -->
		<cart-bar v-if="!is_notice && !is_rest" :cart="cart" :choosedShop="choosedShop"
				  @add="handleAddToCart" 
				  @minus="handleMinusFromCart"
				  @clear="clearCart"
				  @checkboxChange="checkboxChange"
				  @checkAllChange="checkAllChange"
				  @pay="pay"
		/>
		<!-- 购物车栏 end -->
		<!-- 休息中 start -->
		<rest :is_rest="is_rest" :opening_hours="opening_hours"></rest>
		<!-- 休息中 end -->
		<!-- 搜索页面start -->
		<search :show="showSearch" :categories="menu_list" @hide="showSearch=false" @choose="showProductDetailModal" ></search>
		<!-- 搜索页面end -->
		<!-- 拼团 -->
		<pintuan :show="showPintuan" @closePintuan="showPintuan = false" @choose_type="choose_pintuan_type"></pintuan>
		<!-- 拼团end -->
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import {menu_list} from './data.js';
	import actions from './components/actions/actions.vue'
	import notice from './components/notice/notice.vue'
	import cartBar from './components/cartbar/cartbar.vue'
	import productModal from './components/product-modal/product-modal.vue'
	import search from './components/search/search.vue'
	import rest from './components/rest/rest.vue'
	import pintuan from './components/pintuan/pintuan.vue'
	export default{
		components:{
			actions,
			notice,
			productModal,
			cartBar,
			search,
			rest,
			pintuan
			},
		data() {
			return {
				menu_list,
				//下面都是静态默认值
				order_type_selected:'order_type_selected',
				title:'英国城',
				is_notice:false,
				menu_id_current:1,
				goods_scrollTop:0,
				good:{},
				goodModalVisible:false,
				cart:[],
				showSearch:false,
				localAdress:{},
				is_rest:false,
				showPintuan:false
			
			}
		},
		async onLoad() {
			this.$nextTick(() => this.calcSize())
		},
		computed:{
			...mapState(['orderType','pintuanType','choosedShop','choosedAddress']),
			contact_number(){
				console.log(this.choosedAddress)
				if(this.choosedAddress.contact_number ){
					if(this.choosedAddress.contact_number.length<=9){
						return this.choosedAddress.contact_number
					}else{
						return this.choosedAddress.contact_number.substr(0,8)+"..."
					}
				}
			},
			shop_adress(){
				if(this.choosedShop.shop_address){
					if(this.choosedShop.shop_address.length<=9){
						return this.choosedShop.shop_address
					}else{
						return this.choosedShop.shop_address.substr(0,8)+"..."
					}
				}
			},
			notice_list(){
				return this.choosedShop.detail.scroll_ad
			},
			productCartNum(id) {	//计算单个饮品添加到购物车的数量
				return id => this.cart.reduce((acc, cur) => {
						if(cur.id === id) {
							return acc += cur.number
						}
						return acc
					}, 0)
			},
			opening_hours(){
				return this.choosedShop.work_time + ' - ' +this.choosedShop.rest_time
			}
		},
		methods:{
			...mapMutations(['SET_ORDER_TYPE','SET_PINTUAN_TYPE','SET_CHOOSED_SHOP','SET_CHOOSED_ADDRESS']),
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
			pin_tap(){
				const token = uni.getStorageSync('token');
				console.log(token)
				if(token){
					this.showPintuan = true
				}else{
						uni.showModal({
						    content: '您還沒有登錄，請先登錄',
						    success: function (res) {
						        if (res.confirm) {
									uni.navigateTo({
										url:'/pages/login/login'
									})
						        } else if (res.cancel) {
						        }
						    }
						});
				}
			},
			loca_tap(){
				if(this.orderType == 1){
					uni.navigateTo({
						url:"/pages/userAdress/userAdress"
					})
				}else{
					uni.navigateTo({
						url:"/pages/chooseShop/chooseShop"
					})
				}
				
			},
			switch_shop(){
				uni.navigateTo({
					url:"/pages/chooseShop/chooseShop"
				})
			},
			order_type_tap(type){
				if(type == 1){
					uni.navigateTo({
						url:"/pages/userAdress/userAdress"
					})
				}else{
					this.SET_ORDER_TYPE(type)
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
					if(good.materials && good.materials.length) {
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
					// is_single: good.is_single,
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
				if(good.materials && !good.materials.length) {
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
		},
		choose_pintuan_type(type){
			this.showPintuan=false;
			if(type==1 ){
				uni.navigateTo({
					url:"/pages/userAdress/userAdress?from=pintuan"
				})
			}else{
				this.SET_PINTUAN_TYPE(2)
				uni.navigateTo({
					url:"/pages/pintuan/pintuan"
				})
			}
			
		},
		pay(price){
			var app = getApp();
			var order_info={};
			var goods =[];
			var goods_data = [];
			this.cart.filter(item => item.is_checked==true).forEach(item =>{
				let good ={};
				good.id = item.id;
				good.goods_name = item.name;
				good.goods_price = item.truePrice;
				good.home_avatar = item.imgurl;
				good.norm = item.materials_text;
				good.norm_id = item.norm_id ? item.norm_id : [];
				good.goods_num =item.number;
				goods_data.push(good);
				
			})
			order_info.goods_data = goods_data;
			order_info.shop_id = this.choosedShop.id
			order_info.shop_name = this.choosedShop.shop_name
			order_info.distance = this.choosedShop.distance
			order_info.delivery_cost = this.choosedShop.delivery_cost
			order_info.lowest_cost = this.choosedShop.lowest_cost
			order_info.payment_info = price
			order_info.address_id = this.choosedAddress.id
			order_info.contact_name = this.choosedAddress.contact_name
			order_info.contact_sex = this.choosedAddress.contact_sex
			order_info.contact_phone = this.choosedAddress.contact_phone
			order_info.contact_address = this.choosedAddress.contact_address
			order_info.contact_number = this.choosedAddress.contact_number
			app.globalData.goodsPayment = order_info;
			console.log(order_info)
			uni.navigateTo({
				url:'/pages/orderPayment/orderPayment'
			})
			
			
		}
	},
}
	
</script>

<style lang="scss" scoped>
	@import "order.scss";
</style>
