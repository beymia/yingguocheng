<template>
	<view class="page">
		<!-- 自定义导航栏start -->
			<uni-nav-bar :title="title" statusBar style="">
			<template slot="left">
				<view style="height: 35px;line-height: 35px;border-radius: 18px;border: 1px solid #eaeaea;margin-left: 24rpx;display: flex;align-self: center;">
					<text style="font-size: 17px;color: rgb(102, 102, 102);width: 38px;text-align: center;" @tap="pin_tap" v-if="!showSearch">拼</text>
					<text style="font-size: 17px;color: rgb(102, 102, 102);width: 38px;text-align: center;" v-else>拼</text>
					<text style="font-size: 17px;text-align: center;color: #EAEAEA;">|</text>
					<icon type="search" size="17" color="#666666" style="display: flex;align-items: center;width: 38px;justify-content: center;margin-top: 4px;" @tap="showSearch=true"></icon>
				</view>
			</template>
			<!-- <template slot="right">
					<uni-icons type="scan" size='36' @tap='scan'></uni-icons>
			</template> -->
			
			
		</uni-nav-bar>
		<!-- 自定义导航栏end -->
		
		<!-- 头部start -->
		<view class="order_head">
			<!-- 位置、自取、外卖、堂食start -->
			
			<view class="location">
				<view class="left">
					<view class="top" @tap="loca_tap">
						<view class="loca_icon">
							<image src="/static/images/order/location.png" mode=""></image>
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
					<swiper-item v-if="!is_notice" v-for="(notice,notice_index) in notice_list1" :key="notice_index">
						<view class="swiper-item notice_title">
							<view class="notice_icon">
								<image src="../../static/images/order/blueBall.png" mode=""></image>
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
		<notice v-if="is_notice" style="flex: 1;display: flex;" :choosed_shop="choosedShop"></notice>
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
	import cartBar from './components/cartbar/cartbar.vue'
	import productModal from './components/product-modal/product-modal.vue'
	import search from './components/search/search.vue'
	import rest from './components/rest/rest.vue'
	import pintuan from './components/pintuan/pintuan.vue'
	import locaAutho from './components/locaAutho/locaAutho.vue'
	import {shops_list,shops_detail,goods_list,goods_detail,pintuan_creat,pintuan_detail} from '@/request/api_y.js'
	import {during} from '@/util/Date.js'
	import permission from '@/util/permission.js'
	import wxLogin from '@/util/wxLogin.js'
	
	const APP = getApp().globalData
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
				shop_change_time:0,
				timer:null,
				socket:null,
				heartTimer:null,
				socketStatus:0,
				showTime:0,
			}
		},
		watch:{
			choosedShop:{
				async handler(newval,oldval){
					if(this.shop_change_time == 0){
						this.shop_change_time =1
						return
					}
					if(newval.id == oldval.id)return
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
			}
		},
		async onLoad() {
			let conti = true
			// #ifdef MP-WEIXIN
				uni.getSetting({
				  success: (res) => {
				    console.log(res)
				    if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
						this.showLocaAutho = true
						conti = false
					}else if(res.authSetting['scope.userLocation'] == undefined){//初始化进入该页面
						
					}
				  }
				}) 
			// #endif
			if(!conti){
				return
			}
			 
			
			let loca_res = await this.long_lati()//获取当前定位经纬度
			this.loca_res = loca_res
			getApp().globalData.loca_res = loca_res
			await this.shop_init(this.loca_res)//获取门店列表和设置当前门店
			this.judge_is_rest()//判斷是否在休息
			await this.menu_list_init()//获取并设置当前门店下全部商品信息
			/* this.timer = setInterval( async ()=>{
				await this.shop_update()
			},2000) */
			 //await this.init()
			  console.log("order onLoad")
			  this.initWebSocket()
			this.$nextTick(() => this.calcSize())
			
		},

		 onReady() {
			 // console.log(this.choosedShop)
			 console.log("order onReady")
		},
		 onShow() {
			 // #ifdef MP-WEIXIN
			 	uni.getSetting({
			 	  success: (res) => {
			 	    console.log(res)
			 	    if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
			 			this.showLocaAutho = true
			 		}
			 	  }
			 	}) 
			 // #endif
			/* wx.openSetting({
				 success(res) {
				 	
				 }
			 }) */
			console.log("order onShow")
			this.handle_from()
			
			this.showTime!==0&&this.initWebSocket()
			console.log(this.choosedShop)
			console.log(this.shopList)
			this.showTime++
		},
		onHide() {
			console.log("order onhide")
			console.log(this.choosedShop)
			console.log(this.shopList)
		},
		onUnload() {
			clearInterval(this.timer)
			this.socket && this.socket.close()
		},
		onShareAppMessage(obj) {
			
		},
		
		computed:{
			...mapState(['orderType','pintuanType','choosedShop','choosedAddress','orderFrom','shopList']),
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
			shop_adress(){
				if(this.choosedShop.shop_address){
					console.log(111111111111)
					console.log(this.choosedShop)
					console.log(this.choosedShop.detail)
					console.log(this.choosedShop)
					if(this.choosedShop.shop_address.length<=9){
						return this.choosedShop.shop_address
					}else{
						return this.choosedShop.shop_address.substr(0,8)+"..."
					}
				}
			},
			notice_list1(){
				if(this.choosedShop){
					console.log("999999999999999999999999")
					console.log(this.choosedShop)
					if(this.choosedShop.detail){
						console.log('cccccccccccccccccccccccccccc')
						let r = this.choosedShop.detail.scroll_ad
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
				return this.choosedShop.work_time + ' - ' +this.choosedShop.rest_time
			}
		},
		methods:{
			...mapMutations(['SET_ORDER_TYPE','SET_PINTUAN_TYPE','SET_CHOOSED_SHOP','SET_CHOOSED_ADDRESS','SET_ORDER_FROM','SET_SHOP_LIST']),
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
					success(res) {
						let aa = res.result.split(':')
						if(aa.length=2&& aa[0].trim().toLowerCase() =='invitecode' ){
							uni.navigateTo({
								url:'/pages/pintuan/pintuan?invite=true&code='+aa[1]
							})
						}else{
							uni.showModal({
								showCancel:false,
								content:'請掃描正確的邀請碼'
							})
						}
					}
				})
			},
			async initWebSocket(){
				if(!APP.socket){
					try{
						 await APP.getSocket();
						 
					}catch(e){
						//TODO handle the exception
						console.log(e)
					}
				}
				if(APP.socket){
					APP.socket.onMessage(res=>{
							 console.log('从服务器获取的内容order:',res.data)
							 let spl = JSON.parse(JSON.stringify(this.shopList)) 
							 let chp = spl.find(item=>{
								 item.id == res.data.shop_id
							 })
							 chp.current_cups = res.data.current_cups
							 chp.current_order = res.data.current_order
							 chp.detail.current_cups = res.data.current_cups
							 chp.detail.current_order = res.data.current_order
							 this.SET_SHOP_LIST(spl)
					})
				}
				
				
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
				let work_status = (await shops_detail({shop_id:this.choosedShop.id})).data.work_status
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
				if(!token){
					// #ifdef MP-WEIXIN
						let iswl = await wxLogin({
							confirm(){
								uni.navigateTo({
									url:'/pages/login/login?from=order'
								})
							},
							cancel(){
								
							}
						});
						console.log(iswl)
						if(iswl == 0)return
						console.log('iswliswliswliswl')
					// #endif
					
					// #ifndef MP-WEIXIN
					uni.showModal({
					    content: '您還沒有登錄，請先登錄',
					    success: function (res) {
					        if (res.confirm) {
								uni.navigateTo({
									url:'/pages/login/login?from=order'
								})
					        } else if (res.cancel) {
					        }
					    }
					});
					return
					// #endif
				}
				var code = uni.getStorageSync('pintuanCode');
				if(code){
					try{
						console.log('cccccccccccccc')
						var a = await pintuan_detail({code:code})
						console.log('aaaaaaaaaaaaaaaaa')
						if(a.code == 1001){
							console.log('bbbbbbbbbbbbbbbb')
							this.showPintuan =true
						}else{
							uni.navigateTo({
								url:'/pages/pintuan/pintuan?code='+code
							})
						}
					}catch(e){
						//TODO handle the exception
						console.log(e)
					}
					
				}else{
					try{
						let res_pc = await pintuan_creat()
						console.log('res_pcres_pcres_pcres_pcres_pcres_pcres_pcres_pcres_pcres_pcres_pcres_pc')
						console.log(res_pc)
						if(res_pc.code == 1000){
							uni.setStorage({
								key:'pintuanCode',
								data:res_pc.data.code
							})
							uni.navigateTo({
								url:'/pages/pintuan/pintuan?code='+	res_pc.data.code
							})
						}else{
							this.showPintuan =true
						}
					}catch(e){
						//TODO handle the exception
						console.log(e)
					}
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
					url:"/pages/pintuan/pintuan"
				})
			}else{
				this.SET_PINTUAN_TYPE(2)
				uni.navigateTo({
					url:"/pages/pintuan/pintuan"
				})
			}
			
		},
		async pay(price){
			const token = uni.getStorageSync('token');
			console.log(token)
			if(!token){
				// #ifdef MP-WEIXIN
					let iswl = await wxLogin({
						confirm(){
							uni.navigateTo({
								url:'/pages/login/login?from=order'
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
								url:'/pages/login/login?from=order'
							})
				        } else if (res.cancel) {
				        }
				    }
				});
				return
				// #endif
			}
			this.judge_is_rest()//
			if(!this.is_rest){
				uni.showLoading({})
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
				if(goods_data.length==0){
					uni.showModal({
						content:'您還沒有選購商品',
						showCancel:false
						
					})
					return
				}
				order_info.goods_data = goods_data;
				order_info.shop_id = this.choosedShop.id
				order_info.shop_name = this.choosedShop.shop_name
				order_info.distance = this.choosedShop.distance
				order_info.delivery_cost = parseInt(this.choosedShop.detail.delivery_cost * 100)/100
				 // order_info.delivery_cost = 0.01
				order_info.lowest_cost = parseInt(this.choosedShop.detail.lowest_cost*100)/100
				order_info.payment_info = price
				// order_info.payment_info = 0.01
				order_info.address_id = this.choosedAddress.id
				order_info.contact_name = this.choosedAddress.contact_name
				order_info.contact_sex = this.choosedAddress.contact_sex
				order_info.contact_phone = this.choosedAddress.contact_phone
				order_info.contact_address = this.choosedAddress.contact_address
				order_info.contact_number = this.choosedAddress.contact_number
				order_info.haul_method  = this.orderType
				order_info.current_cups = this.choosedShop.detail.current_cups
				order_info.current_order = this.choosedShop.detail.current_order
				app.globalData.goodsPayment = order_info;
				console.log(order_info)
				uni.hideLoading()
				uni.navigateTo({
					url:'/pages/orderPayment/orderPayment'
				})
				
			}
			
			
			
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
								async fail(err){
									 // #ifdef APP-PLUS
										            /* uni.getSystemInfo({
										                success(res) {
										                    if(res.platform=='ios'){ //IOS
										                        plus.runtime.openURL("app-settings://");
										                    } else if (res.platform=='android'){ //安卓
										                       let main = plus.android.runtimeMainActivity();
										                        let Intent = plus.android.importClass("android.content.Intent");
										                        let mIntent = new Intent('android.settings.ACTION_SETTINGS');
										                        main.startActivity(mIntent);
										                    }
										                }
										            }); */
													uni.showModal({
														content:"无法获取位置信息，请开启定位且授权本应用后重新打开",
														showCancel:false,
														async success() {
															if(permission.isIOS){
																plus.runtime.openURL("app-settings://");
															}else{
																permission.handleLocation()
															}
														}
													})
													/* if(permission.isIOS){
														let lres = permission.requestIOS('location')
														if(lres!==1){
															uni.showModal({
																title:'提示',
																content:'请先授权获取位置信息',
																showCancel:false,
																success() {
																	permission.gotoAppSetting()
																}
															})
														}else{
															uni.showModal({
																title:'提示',
																content:'请先打开定位服务功能',
																showCancel:false,
																success() {
																	plus.runtime.openURL("app-settings://");
																}
															})
														}
													}else{
														let lres = permission.requestAndroid('location')
														if(lres!==1){
															uni.showModal({
																title:'提示',
																content:'请先授权获取位置信息',
																showCancel:false,
																success() {
																	permission.gotoAppSetting()
																}
															})
														}else{
																permission.handleLocation()
														}
													} */
													let is_l=false;
													do{
														await new Promise((resolvec,rejectc)=>{
															setTimeout(function(){
																console.log('locationlocationlocation location')
																uni.getLocation({
																	success(res1) {
																		console.log(res1)
																		is_l=true
																		resolvec(1)
																		resolve(res1)
																	},
																	fail(err1) {
																		console.log(22222222222)
																		rejectc(err1)
																	}
																})
															},1000);
														}).catch(e1=>{})
														
														console.log(3333333333)
													}while(!is_l)
									// #endif
								}
							})
						}).catch(e=>{
							
						})
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
			getApp().globalData.co ={current_cups:this.choosedShop.current_cups,current_order:this.choosedShop.current_order}
			// console.log(this.choosedShop)
			 //alert(this.choosedShop.id)
		},
		async shop_update(){
			let loca_res
			try{
				loca_res = await new Promise((resolve,reject)=>{
					uni.getLocation({
						success(res_l2){
							resolve(res_l2)
						},
						fail(){
							reject(0)
						}
					})
				})
			}catch(e){
				//TODO handle the exception
				console.log(e)
			}
			if(!loca_res)return
			getApp().globalData.loca_res = loca_res
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
			if(JSON.stringify(spl) == JSON.stringify(this.shopList))return
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
			let chshopinfo = (await shops_detail({shop_id:this.choosedShop.id})).data
			if(chshopinfo){
				getApp().globalData.co ={current_cups:chshopinfo.current_cups,current_order:chshopinfo.current_order} 
			}
			
			
			// console.log(this.choosedShop)
			 //alert(this.choosedShop.id)
		},
		async menu_list_init(){//获取并设置当前门店下全部商品信息
			let menu_list1 = (await goods_list({shop_id:this.choosedShop.id})).data
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
			// await goods_detail({goods_id:'16055845558452662'}).then((data)=>{console.log(data)})
			// console.log(menu_list2)
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
								itemn.child && itemn.child.forEach(itemvc=>{
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

		async init(){
			var latitude = 0;
			var longitude = 0
			uni.getLocation({
				type:'gcj02',
				altitude:true,
				success: async (res) => {
					// #ifndef H5
					latitude = res.latitude
					longitude = res.longitude
					// #endif
					
					// #ifdef H5
					//H5下使用騰訊地圖webservice接口
					/* let res2 = await new Promise((resolve, reject) => {
						uni.request({
							url:'https://apis.map.qq.com/ws/location/v1/ip?key=MBTBZ-2PMKR-QARWA-W7MOH-AJ76K-6HB2J',
							success(result) {
								if (result.statusCode !== 200 ) reject(result)
								resolve(result.data)
							},
							fail(err) {
								reject(err)
							}
						})
					}).catch(e => {}) */
					let res2 = await this.$jsonp('https://apis.map.qq.com/ws/location/v1/ip', {
					  key : 'MBTBZ-2PMKR-QARWA-W7MOH-AJ76K-6HB2J',
					  output:'jsonp',
					}).catch(e=>{})
					console.log(res2)
					latitude = res2.result.location.lat
					longitude = res2.result.location.lng
					// #endif
					
					let spl= (await shops_list({latitude:latitude,longitude:longitude})).data
					console.log('latitude:'+latitude+'longitude:'+longitude)
					console.log(spl)
					this.SET_SHOP_LIST(spl)
					this.shopList.sort(function(item1,item2){
						if(parseInt(item1.distance*100) <= parseInt(item2.distance*100) ){
							return -1;
						}else{
							return 1
						}
					})
					console.log(spl)
					this.shopList.forEach( async item =>{
					let shop_detail2=(await shops_detail({shop_id:item.id})).data
					console.log(shop_detail2)
					item.detail = shop_detail2
					})
					this.SET_CHOOSED_SHOP(this.shopList[0])
					console.log(this.choosedShop)
					 //alert(this.choosedShop.id)
					let menu_list1 = (await goods_list({shop_id:this.choosedShop.id})).data
					console.log(this.choosedShop)
					console.log(menu_list1)
					let goods_promise = []
					console.log(this.choosedShop) 
					let menu_list2=[]
					menu_list1.forEach(item =>{
						let obj = {};
						obj.id = item.id
						obj.icon_url = this.imgSrc + item.home_avatar
						obj.menu_name = item.classify_name
						obj.goods_list = []
						if(item.child && item.child.length){
							let objc = {}
							item.child.forEach(itemc =>{
								objc.id = itemc.id
								objc.name = itemc.goods_name
								objc.labels = itemc.goods_label
								objc.materials =[]
								objc.description = itemc.goods_detail
								objc.imgurl = this.imgSrc + itemc.home_avatar
								objc.price = itemc.goods_price
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
									console.log(values[index].data.goods_norm)
									values[index].data.goods_norm.forEach(itemn=>{
										let normobj ={}
										normobj.group_name = itemn.name
										normobj.values = []
										itemn.child.forEach(itemvc=>{
											let valobj ={}
											valobj.id = itemvc.id
											valobj.parent_id = itemvc.parent_id
											valobj.name = itemvc.value
											valobj.price = itemvc.price
											normobj.values.push(valobj)
										})
										console.log("fffffffffffff")
										console.log(normobj)
										materials.push(normobj)
										console.log(materials)
									})
									itemc.images = images
									itemc.materials = materials
								})
								
						})
						console.log(menu_list2)
					})
					console.log('bojjijijj')
					this.menu_list=menu_list2
					
				}
			})
			
		}
	},
}
	
</script>

<style lang="scss" scoped>
	@import "order.scss";
	
</style>
