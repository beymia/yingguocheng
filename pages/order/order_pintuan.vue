<template>
	<view class="page">
		<!-- 自定义导航栏start -->
			<uni-nav-bar :title="title" statusBar style="">
			<template slot="left">
				<view style="height: 35px;line-height: 35px;border-radius: 18px;border: 1px solid #eaeaea;margin-left: 24rpx;padding: 0 15px;display: flex;align-self: center;">
					<uni-icons type="arrowleft" size="34" color="#333333" @tap='left_tap'></uni-icons>
					<text style="width: 29px;font-size: 17px;text-align: center;color: #EAEAEA;">|</text>
					<icon type="search" size="17" color="#666666" style="display: flex;align-items: center;" @tap="showSearch=true"></icon>
				</view>
			</template>
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
						<view class="shop_adress">{{shop_address}}</view>
						<!-- <uni-icons type="arrowright" size="35" color="#333333"></uni-icons> -->
					</view>
					<view class="bottom">
						<view class="shop_tab_icon" @tap="switch_shop">
							<image src="../../static/images/order/shop_tap.jpg" mode=""></image>
						</view>
						<view class="shop_name" >
							{{pintuanShop.shop_name}}
						</view>
						<!-- <view class="tip_text">
							{{choosedShop.tip}}
						</view> -->
						
					</view>
					
				</view>
				<view class="pintuan_type">
					{{pintuanType == 1 ? "外賣":"自取"}}
				</view>
			</view>
			<!-- 位置、自取、外卖、堂食end -->
			
			<!-- 公告栏start -->
			<view class="notice">
				<swiper   class="swiper_wrap_notice"  :autoplay="true" vertical circular :interval="3000" :duration="1000">
					<swiper-item v-if="!is_notice" v-for="(notice,notice_index) in notice_list1" :key="notice_index">
						<view class="swiper-item notice_title">
							<view class="notice_icon">
								<image src="/static/images/order/blueBall.png" mode=""></image>
							</view>
							<text class="notice_text">{{notice}}</text>
						</view>
					</swiper-item>
				</swiper>
				<!-- <view class="nnnnnnnnnnnnnn">
					<view class="mmmmmmmmmm" v-for="(item,index) in notice_list1">
						{{item}}
					</view>
				</view> -->
				
				
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
		<notice v-if="is_notice" style="flex: 1;display: flex;" :choosed_shop="pintuanShop"></notice>
		<!-- 新聞詳情頁結束 -->
		<!-- 点单主体部分start -->
		<view class="main" v-if="!is_notice">
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
								<!-- <view class="good_des">
									{{good.description}}
								</view> -->
								<rich-text class="good_des" :nodes="good.description"></rich-text>
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
		<cart-bar v-if="!is_notice && !is_rest" :cart="cart" :choosedShop="pintuanShop"
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
		<search v-if="showSearch" :show="showSearch" :categories="menu_list" @hide="showSearch=false" @choose="showProductDetailModal" ></search>
		<!-- 搜索页面end -->
		<!-- 拼团 -->
		<pintuan :show="showPintuan" @closePintuan="showPintuan = false" @choose_type="choose_pintuan_type"></pintuan>
		<!-- 拼团end -->
		<!-- 微信位置授權start -->
		<locaAutho :show="showLocaAutho" @openSetting="openSetting"></locaAutho>
		<!-- 微信位置授權end -->
		
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	// import {menu_list} from './data.js';
	import actions from './components/actions/actions.vue'
	import notice from './components/notice/notice.vue'
	import cartBar from './components/cartbar/cartbar-pintuan.vue'
	import productModal from './components/product-modal/product-modal.vue'
	import search from './components/search/search.vue'
	import rest from './components/rest/rest.vue'
	import pintuan from './components/pintuan/pintuan.vue'
	import locaAutho from './components/locaAutho/locaAutho.vue'
	import {shops_list,shops_detail,goods_list,goods_detail,pintuan_creat,pintuan_detail,pintuan_order} from '@/request/api_y.js'
	import {during} from '@/util/Date.js'
	import wxLogin from '@/util/wxLogin.js'
	export default{
		components:{
			actions,
			notice,
			productModal,
			cartBar,
			search,
			rest,
			pintuan,
			locaAutho,
			},
		data() {
			return {
				menu_list:[],
				//下面都是静态默认值
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
				showPintuan:false,
				showLocaAutho:false,
				shop_change_time:0
			
			}
		},
		watch:{
			/* choosedShop:{
				async handler(newval){
					if(this.shop_change_time == 0){
						this.shop_change_time =1
						return
					}
					console.log(this.shop_change_time)
					console.log(66666666666666666666666)
					console.log(newval)
					// //this.judge_is_rest()//判斷是否在休息
					// await this.shop_init(this.loca_res)//获取门店列表和设置当前门店
					await this.menu_list_init()//获取并设置当前门店下全部商品信息
					this.$nextTick(() => this.calcSize())
					console.log('bbbbbbbbbbbbbbbbbbbbbbbb')
				},
				deep:true
			} */
		},
		async onLoad() {
			
			uni.showLoading({
				
			})
			await this.judge_is_rest()//判斷是否在休息
			let t = 0
			if(!this.is_rest){
				await this.menu_list_init()//获取并设置当前门店下全部商品信息
				this.cart = this.pintuanCart[0]
				console.log(777777777777)
				console.log(this.cart)
				console.log(this.menu_list)
				this.cart.forEach((item,index)=>{
					let t1=0
					 this.menu_list.forEach(iteml=>{
						if(iteml.goods_list){
							let i=iteml.goods_list.findIndex(itemg=>{
									return itemg.id == item.id
							})
							if(i!=-1){
								t1=1
							}
							
						}
					})
					if(t1!=1){
						t = 1
						console.log('this.cart[index]')
						console.log(this.cart[index])
						this.cart.splice(index,1)
					}
					
				})
			}
			if(t){
				this.SET_PINTUAN_CART(this.cart)
				uni.showModal({
					content:'當前購物車中包含已失效商品，已自動刪除！',
					showCancel:false
				})
			}
			
			 //await this.init()
			  console.log("order onLoad")
			this.$nextTick(() => this.calcSize())
			uni.hideLoading()
		},

		 onReady() {
			 // console.log(this.choosedShop)
			 console.log("order onReady")
		},
		 onShow() {
			
		
		},
		onHide() {

		},
		
		computed:{
			...mapState(['orderType','pintuanType','choosedShop','choosedAddress','orderFrom','shopList','pintuanShop','pintuanCode',,'pintuanCart']),
			contact_number(){
				// console.log(this.choosedAddress)
				if(this.choosedAddress.contact_number ){
					if(this.choosedAddress.contact_number.length<=9){
						return this.choosedAddress.contact_number
					}else{
						return this.choosedAddress.contact_number.substr(0,8)+"..."
					}
				}
			},
			shop_address(){
				if(this.pintuanShop.shop_address){
					
					if(this.pintuanShop.shop_address.length<=9){
						return this.pintuanShop.shop_address
					}else{
						return this.pintuanShop.shop_address.substr(0,8)+"..."
					}
				}
			},
			notice_list1(){
				if(this.pintuanShop){
					
					if(this.pintuanShop.detail){
						console.log('cccccccccccccccccccccccccccc')
						let r = this.pintuanShop.detail.scroll_ad
						console.log(r)
						return r
					}
					
				}
				
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
				return this.pintuanShop.work_time + ' - ' +this.pintuanShop.rest_time
			}
		},
		methods:{
			...mapMutations(['SET_ORDER_TYPE','SET_PINTUAN_TYPE','SET_CHOOSED_SHOP','SET_CHOOSED_ADDRESS','SET_ORDER_FROM','SET_SHOP_LIST','SET_PINTUAN_SHOP','SET_PINTUAN_CODE',,'SET_PINTUAN_CART']),
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
			scan(){
				alert('scan')
				uni.scanCode({
					scanType:'qrCode',
					success() {
						alert('scan sucess')
					}
				})
			},
			left_tap(){
				uni.navigateBack({
					delta:1
				})
			},
			async openSetting(){
				//this.showLocaAutho = false
				    // 获取位置信息
					uni.openSetting({
					  success: async(dataAu)=> {
					    if (dataAu.authSetting["scope.userLocation"] == true) {
					     this.showLocaAutho = false
						 let loca_res = await this.long_lati()//获取当前定位经纬度
						 this.judge_is_rest()//判斷是否在休息
						 await this.shop_init(loca_res)//获取门店列表和设置当前门店
						 await this.menu_list_init()//获取并设置当前门店下全部商品信息
						 
						 this.$nextTick(() => this.calcSize())
						 
					    } else {
					      uni.showToast({
					        title: '授权失败',
					        icon: 'none',
					        duration: 1000
					      })
					    }
					  }
					})
				    
				
			},
			async judge_is_rest(){
				let work_status = (await shops_detail({shop_id:this.pintuanShop.id})).data.work_status
				if(work_status !=1){
					this.is_rest = true
					uni.showModal({
						content:'本店已休息，您可以選擇切換門店',
						cancelText:"留在當前",
						confirmText:"切換門店",
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url:'/pages/chooseShop/chooseShop'
								})
							} else if (res.cancel) {
					
								}
						}
					})
				}
				/* let isin = during(this.choosedShop.work_time,this.choosedShop.rest_time)
				if(!isin){
					this.is_rest = true
					uni.showModal({
						content:'本店已休息，您可以選擇切換門店',
						cancelText:"留在當前",
						confirmText:"切換門店",
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url:'/pages/chooseShop/chooseShop'
								})
							} else if (res.cancel) {
			
								}
						}
					})
				} */
			},
			handle_from(){
				switch(this.orderFrom){
					case 'home_tssx':
						let menu = this.menu_list.find(item => item.menu_name == '特色手信')
						this.menu_id_current=menu.id;
						this.goods_scrollTop = menu.top+Math.random();
						this.SET_ORDER_FROM('');
						break;
				}
			},
			async pin_tap(){
				// #ifdef H5
				uni.showModal({
					showCancel:false,
					content:'網頁版暫不支持此功能，請使用微信小程序版或手機app版！',
				})
				//return
				// #endif
				const token = uni.getStorageSync('token');
				console.log(token)
				if(token){
					var code = uni.getStorageSync('pintuanCode');
					if(code){
						var a = await pintuan_detail({code:code})
						if(a.code == 1000){
							uni.navigateTo({
								url:'/pages/pintuan/pintuan?pintuanCode='+code
							})
						}else{
							this.showPintuan =true
						}
					}else{
						this.showPintuan =true
					}
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
				this.showLoca = !this.showLoca
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
					norm_id:good.norm_id,
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
					var good=e.currentTarget.dataset.good
					console.log(e)
					console.log(good)
					if(values.length > 0){
						this.cart.find(item => item.id==good.id && item.materials_text == good.materials_text).is_checked=true;
					}else{
						this.cart.find(item => item.id==good.id && item.materials_text == good.materials_text).is_checked= false;
				}
		},
		async choose_pintuan_type(type){
			this.showPintuan=false;
			if(type==1 ){
				this.SET_PINTUAN_TYPE(1)
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
		async pay(price){
			console.log(111111)
			console.log(price)
			const token = uni.getStorageSync('token');
			console.log(2222222222)
			console.log(token)
			if(!token){
				// #ifdef MP-WEIXIN
					let iswl= await wxLogin({
						confirm(){
							uni.navigateTo({
								url:'/pages/login/login?from=pintuan'
							})
						},
						cancel(){
						}
					});
					if(iswl == 0)return
				// #endif
				// #ifndef MP-WEIXIN
				
				uni.showModal({
				    content: '您還沒有登錄，請先登錄',
				    success: function (res) {
				        if (res.confirm) {
							uni.navigateTo({
								url:'/pages/login/login?from=pintuan'
							})
				        } else if (res.cancel) {
				        }
				    }
				});
				return
				// #endif
			}
			console.log(33333333)
			uni.showLoading({})
			await this.judge_is_rest()//
			if(!this.is_rest){
				
				var app = getApp();
				var order_info={};
				var goods =[];
				var goods_data = [];
				this.cart.filter(item => item.is_checked==true).forEach(item =>{
					let good ={};
					good.goods_id = item.id;
					good.goods_norm = item.norm_id ? item.norm_id : [];
					good.goods_num = item.number
					
					goods_data.push(good);
					
				})
				try{
					console.log(44444444)
					console.log(goods_data)
					await pintuan_order({code:this.pintuanCode,goods_data: JSON.stringify(goods_data)})
				}catch(e){
					
					console.log(e)
				}
				uni.navigateBack({
					delta:1
				})
				
				
			}
			uni.hideLoading()
			
			
		},
		async long_lati(){
			var latitude = 0;
			var longitude = 0
			// #ifdef H5
						let res2 = await this.$jsonp('https://apis.map.qq.com/ws/location/v1/ip', {
						  key : 'MBTBZ-2PMKR-QARWA-W7MOH-AJ76K-6HB2J',
						  output:'jsonp',
						}).catch(e=>{})
						// console.log(res2)
						latitude = res2.result.location.lat
						longitude = res2.result.location.lng
			// #endif
					
					// #ifndef H5
						// #ifdef MP-WEIXIN
						//this.loca_autho
						// #endif
						let loca_res = await new Promise((resolve,reject)=>{
							uni.getLocation({
								success(res) {
									resolve(res)
								},
								fail(err){
									reject(err)
								}
							})
						}).catch(e=>{})
						latitude = loca_res.latitude
						longitude = loca_res.longitude
					// #endif
						console.log('latitude:'+latitude+'longitude:'+longitude)
						return {latitude:latitude,longitude:longitude}
		},
		async shop_init(loca_res){
			let spl= (await shops_list({latitude:loca_res.latitude,longitude:loca_res.longitude})).data
			// console.log(spl)
			//this.SET_SHOP_LIST(spl)
			spl.sort(function(item1,item2){
				if(parseInt(item1.distance*100) <= parseInt(item2.distance*100) ){
					return -1;
				}else{
					return 1
				}
			})
			// console.log(spl)
			let spl_prom=[]
			spl.forEach( async (item,index) =>{
				// console.log(shop_detail2)
				//spl[index].detail = (await shops_detail({shop_id:item.id})).data 
				spl_prom.push(shops_detail({shop_id:item.id}))
			})
			await Promise.all(spl_prom).then(values=>{
				let index = 0
				spl.forEach(item=>{
					item.detail = values[index].data
					index++
				})
				
			})
			console.log(spl)
			this.SET_SHOP_LIST(spl)
			this.SET_CHOOSED_SHOP(this.shopList[0])
			// console.log(this.choosedShop)
			 //alert(this.choosedShop.id)
		},
		async menu_list_init(){//获取并设置当前门店下全部商品信息
			let menu_list1 = (await goods_list({shop_id:this.pintuanShop.id})).data
			// console.log(this.choosedShop)
			console.log(menu_list1)
			let goods_promise = []
			// console.log(this.choosedShop) 
			let menu_list2=[]
			menu_list1.forEach(item =>{
				let obj = {};
				obj.id = item.id
				obj.icon_url = this.imgSrc + item.home_avatar
				obj.menu_name = item.classify_name
				obj.goods_list = []
				if(item.child && item.child.length){
					item.child.forEach(itemc =>{
						let objc = {}
						objc.id = itemc.id
						objc.name = itemc.goods_name
						objc.labels = itemc.goods_label
						objc.materials =[]
						objc.description = itemc.goods_detail
						objc.imgurl = this.imgSrc + itemc.home_avatar
						objc.price = parseInt(itemc.goods_price * 100)/100
						objc.sell_status = itemc.sell_status
						objc.goods_norm = itemc.goods_norm
						obj.goods_list.push(objc)
						goods_promise.push(goods_detail({goods_id:itemc.id}))
					})
				}
				menu_list2.push(obj)
			})
			console.log(menu_list2)
			await Promise.all(goods_promise).then( values =>{
				 console.log(values)
				let index = 0
				menu_list2.forEach(item =>{
						item.goods_list.forEach(itemc =>{
							let images =[]
							let materials = []
							values[index].data.goods_avatar.forEach(itemv=>{
								images.push(this.imgSrc + itemv)
							})
							// console.log(values[index].data.goods_norm)
							values[index].data.goods_norm.forEach(itemn=>{
								let normobj ={}
								normobj.group_name = itemn.name
								normobj.values = []
								itemn.child.forEach(itemvc=>{
									let valobj ={}
									valobj.id = itemvc.id
									valobj.parent_id = itemvc.parent_id
									valobj.name = itemvc.value
									valobj.price = parseInt(itemvc.price * 100)/100
									normobj.values.push(valobj)
								})
								console.log("fffffffffffff")
								console.log(normobj)
								materials.push(normobj)
								console.log(materials)
							})
							itemc.images = images
							itemc.materials = materials
							index++
						})
						
				})
				console.log(menu_list2)
			})
			// console.log('bojjijijj')
			this.menu_list=menu_list2
			
			// console.log(this.choosedShop)
			// console.log(this.shopList)
		},

	},
}
	
</script>

<style lang="scss" scoped>
	@import "order.scss";
	.pintuan_type{
			font-size: 22rpx;
			color: #333333;
			background: #f2f2f2;
			padding: 6rpx 10rpx;
	}
</style>
