<template>
	<view class="page">
			<view class="pintuanShop">
				<view class="info">
					<view class="shop_icon">
							<image src="/static/images/order/shop_icon.png" mode=""></image>
					</view>
					<view class="shop_name">
						{{pintuanShop.shop_name}}
					</view>
					<view class="type">
						{{pintuanType == 1 ? "外賣":"自取"}}
					</view>
				</view>
				<!-- <view class="distance">
					距離您{{trans_distance}}
				</view> -->
				<view class="biaoyu">
					快來叫上好友壹起喝奶茶吧~
				</view>
				<view class="pindan_invite">
					<template v-if="isCaptain">
						<button class="pindan_cancel" @tap="pindan_cancel">
							取消拼单
						</button>
						<!-- #ifdef MP-WEIXIN -->
						<button class="invite" hover-class="hover-comon" open-type="share">
							邀請好友
						</button>
						<!-- #endif -->
						<!-- #ifndef MP-WEIXIN -->
						<button class="invite" hover-class="hover-comon" @tap='invite()'>
							邀請好友
						</button>
						<!-- #endif -->
					</template>
					<template v-else>
						<button class="pindan_cancel" @tap="pindan_cancel">
							退出拼单
						</button>
					</template>
					
				</view>
			</view>
			<!-- 拼单详情开始 -->
			<view class="detail">
				<view class="title">
					拼單詳情
				</view>
				<view  class="order">
					<view class="order_item" v-for="(item,index) in pintuan_info">
						<view class="user_info">
							<view class="left">
								<view class="user_icon">
									<!-- <image :src="item.user_avatar" mode=""></image> -->
									<image src="/static/images_t/pintuan/touxiang.png" mode=""></image>
								</view>
								<view class="user_name">
									{{item.user_name}}
								</view>
								<view class="is_me" :class="{is_you:!item.is_me}">
									{{item.is_me ? "我":"友"}}
								</view>
							</view>
							<!-- <view class="ljdd" v-if="!item.goods_data">
								立即點單
							</view> -->
							<template v-if="item.is_me">
								<view v-if="item.goods_data&&item.goods_data.length" class="clear_edit">
									<view class="clear" @tap='clear'>
										清空
									</view>
									<!-- <view class="edit" >
										修改商品
									</view> -->
									<navigator url="/pages/order/order_pintuan" class="edit">
										修改商品
									</navigator>
								</view>
								<navigator v-else class="ljdd"  url="/pages/order/order_pintuan">
									立即點單
								</navigator>
							</template>	
							
						</view>
						<view class="user_order" v-if="item.goods_data">
							<view class="bordrline"></view>
							<view class="good" v-for="(itemc,indexc) in item.goods_data">
								<view class="icon">
									<image :src="itemc.imgurl" mode=""></image>
								</view>
								<view class="intro">
									<view class="good_name_price">
										<view class="good_name">
											{{itemc.goods_name}}
										</view>
										<view class="good_price">
											￥{{itemc.goods_price}}
										</view>
									</view>
									<view class="good_materials_number">
										<view class="materials">
											{{itemc.goods_norm}}
										</view>
										<view class="number">
											x{{itemc.goods_num}}
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				
			</view>
			<!-- 拼单详情结束 -->
			<!-- 结算开始 -->
			<view class="jiesuan" v-if="isCaptain">
				<view class="left">
					<view class="left_top">
						<text class="price">￥{{total_money}}</text>
						<text class="my_pirce">(我点￥{{money}})</text>
					</view>
					<view class="tip">
						如有商品參與優惠/活動，請結算實付金額為準
					</view>
				</view>
				<view class="right" @tap="pay(total_money)">
					結算
				</view>
			</view>
			<!-- 结算结束 -->
			<qrcode ref='qrcode' :qrUrl="qrUrl"></qrcode>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	// import {pintuan_info} from "./data.js"
	import {shops_list,shops_detail,pintuan_creat,pintuan_order,pintuan_invite,pintuan_invite_code,pintuan_lock,pintuan_unlock,pintuan_detail,pintuan_cancel} from '@/request/api_y.js'
	import locaAutho from '@/pages/order/components/locaAutho/locaAutho.vue'
	import qrcode from './components/qrcode.vue'
	export default {
		components:{
			locaAutho,
			qrcode
		},
		data() {
			return {
				
				pintuan_info:[],
				showLocaAutho:false,
				qrUrl:'',
				showQr:false,
				sett:true,
				onShowSett:false,
				
			}
		},
		async onLoad(options) {
			if(options.code){
				this.SET_PINTUAN_CODE(options.code)
				if(options.invite){//从邀请好友中进来
				const token = uni.getStorageSync('token');
				if(!token){
					getApp().globalData.isInvite = true
					getApp().globalData.pintuanCode = options.code
					uni.showModal({
					    content: '您還沒有登錄，請先登錄',
					    success: function (res) {
					        if (res.confirm) {
								uni.navigateTo({
									url:'/pages/login/login?from=pintuan'
								})
					        } else if (res.cancel) {
								uni.switchTab({
									url:'/pages/order/order'
								})
					        }
					    }
					});
					return
				}
					getApp().globalData.isInvite = false
					try{
						let invited = await pintuan_detail({code:options.code})
						if(invited.code == 1001){
							let res = await pintuan_invite({code:options.code})
							console.log(res)
							if(res.code == 1001){
								uni.showModal({
									content:'拼單已取消或存在其他進行中的拼單',
									showCancel:false,
									success() {
										uni.switchTab({
											url:'/pages/order/order'
										})
									}
								})
								return
							}
						}
						
					}catch(e){
						//TODO handle the exception
						console.log(e)
						return
					}
					uni.setStorageSync('pintuanCode',options.code)
					this.SET_PINTUAN_CODE(options.code)
					await this.pintuan_init(options.code);
					// this.itvId=setInterval(()=>{this.pintuan_init(options.code)},1500)
					return
				}else{
					
				//正常进入且已经有拼团
					this.SET_PINTUAN_CODE(options.code)
					await this.pintuan_init(options.code);
				// this.itvId=setInterval(()=>{this.pintuan_init(options.code)},1500)
				}
				
				
			}else{//正常进入但没有拼团
				if(getApp().globalData.isInvite){//从邀请中返回登录后进入
					try{
						let psc =getApp().globalData.pintuanCode
						let ivited = await pintuan_detail({code:psc})
						if(invited.code == 1001){
							let res = await pintuan_invite({code:psc})
							let ivited1 = await pintuan_detail({code:psc})
							console.log(res)
							if(res.code == 1001 && ivited1.code == 1001){
								uni.showModal({
									content:'拼單已取消或存在其他進行中的拼單',
									showCancel:false,
									success() {
										uni.switchTab({
											url:'/pages/order/order?from=pintuan'
										})
									}
								})
								return
							}
						}
						uni.setStorageSync('pintuanCode',psc)
						this.SET_PINTUAN_CODE(psc)
						await this.pintuan_init(psc);
						return
					}catch(e){
						//TODO handle the exception
						return
					}
					
				}
				
				//正常进入但没有拼团
			const token = uni.getStorageSync('token');
			if(!token){
				uni.showModal({
				    content: '您還沒有登錄，請先登錄',
				    success: function (res) {
				        if (res.confirm) {
							uni.navigateTo({
								url:'/pages/login/login?from=pintuan'
							})
				        } else if (res.cancel) {
							uni.switchTab({
								url:'/pages/order/order'
							})
				        }
				    }
				});
				return
			}
			console.log(this.choosedShop)
				if(!this.pintuanType){
					console.log(this.pintuanType)
					uni.showModal({
						content:'拼單不存在',
						showCancel:false,
						success() {
							uni.switchTab({
								url:'/pages/order/order'
							})
						}
					})
					return
				}
				var code = (await pintuan_creat({shop_id:this.choosedShop.id,vehicle_method:this.pintuanType})).data.code
				uni.setStorageSync('pintuanCode',code)
				this.SET_PINTUAN_CODE(code)
				console.log(88888888888)
				await this.pintuan_init(code)
				// this.itvId=setInterval(()=>{this.pintuan_init(code)},1500)
			}
			
		},
		onShow() {
			uni.showLoading({
			});
			setTimeout(function(){uni.hideLoading()},1000)
			if(this.onShowSett){
				this.sett=true
				this.pintuan_init(this.pintuanCode)
			}else{
				this.onShowSett=true
			}
		},
		onHide() {
			this.sett=false
		},
		onUnload() {
			// clearInterval(this.itvId)
			this.sett=false
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
			      return{
					  title:'【拼單】' + this.pintuan_info[0].user_name +'邀請你一起喝奶茶啦',
					  path:'/pages/pintuan/pintuan?invite=true&code='+this.pintuanCode,
					  imageUrl:'/static/images/order/invite.jpg'
				  }
			    }
		},
		computed:{
			...mapState(['orderType','pintuanType','choosedShop','choosedAddress','shopList','pintuanCart','pintuanShop','pintuanCode']),
			/* trans_distance(){
				let distance = this.pintuanShop.distance;
				if(parseInt(distance * 10) < 10){
					return distance * 1000 + "m"
				}else{
					return distance + "km"
				}
			} */
			isCaptain(){
				if(this.pintuan_info.length){
					return this.pintuan_info[0].captain && this.pintuan_info[0].captain == 1 ? true:false
				}
			},
			total_money(){
				if(this.pintuan_info.length){
					return parseInt(this.pintuan_info.find(item=>item.captain==1).total_money*100)/100
					}
			},
			money(){
				if(this.pintuan_info.length){
					return parseInt(this.pintuan_info[0].money*100)/100
				}
			}
		},
		methods: {
			...mapMutations(['SET_ORDER_TYPE','SET_PINTUAN_TYPE','SET_PINTUAN_CART','SET_SHOP_LIST','SET_CHOOSED_SHOP','SET_PINTUAN_SHOP','SET_PINTUAN_CODE']),
			resort_pintuan_info(pintuan_info){
				let index= pintuan_info.findIndex(item => item.is_me == true);
				if(index != -1){
					console.log(index)
					let me = pintuan_info.splice(index,1)
					pintuan_info.unshift(me[0]);
				}
				
			},
			async invite(){
				/* //分享爲二維碼
				this.$refs.qrcode.open()
				let qrUrl =	(await pintuan_invite_code({code:this.pintuanCode})).data
				console.log(qrUrl)
				this.qrUrl = qrUrl
				console.log(this.qrUrl) */
				//分享爲微信小程序
				uni.share({
				    provider: 'weixin',
				    scene: "WXSceneSession",
				    type: 5,
				    imageUrl: '/pages/pintuan/pintuan?invite=true&code='+this.pintuanCode,
				    title: '【拼單】' + this.pintuan_info[0].user_name +'邀請你一起喝奶茶啦',
				    miniProgram: {
				        id: 'wxd0f1e822e08155b2',
				        path: '/pages/pintuan/pintuan?invite=true&code='+this.pintuanCode,
				        type: 0
				        //webUrl: 'http://uniapp.dcloud.io'
				    },
				    success: ret => {
				        console.log(JSON.stringify(ret));
				    }
				});
			},
			async pindan_cancel(){
				/* uni.showModal({
					content:"確定要取消當前拼單嗎",
					success: async (res) => {
						if(res.confirm){
							uni.showLoading({
								
							})
							try{
								await pintuan_cancel({code:this.pintuanCode})
							}catch(e){
								//TODO handle the exception
							}
							uni.switchTab({
								url:'/pages/order/order'
							})
							uni.hideLoading()
						
						}
					}
				}) */
				uni.showLoading({
					
				})
				try{
					let res = await pintuan_cancel({code:this.pintuanCode})
					if(res.code == 1000){
						uni.setStorageSync('pintuanCode','')
					}
				}catch(e){
					//TODO handle the exception
				}
				uni.switchTab({
					url:'/pages/order/order'
				})
				uni.hideLoading()
			},
			async clear(){
				uni.showModal({
					content:"確定要清空當前選定的商品嗎？",
					success: async (res) => {
						if(res.confirm){
							console.log('aaaaaaaaaaaa')
							try{
								console.log('bbbbbbbbbbbb')
								let rr= await pintuan_order({code:this.pintuanCode,goods_data:'[]'})
								if(rr.code==1001){
									uni.showToast({
										title: '清空失敗，請稍候重試！',
										duration:2000
									});
								}
							}catch(e){
								//TODO handle the exception
								console.log(e)
							}
							// this.pintuan_info[0] =[]
							// let n_cart = this.pintuanCart.concat([])
							// n_cart[0] =[]
							// this.SET_PINTUAN_CART(n_cart)
						}
					}
				})
			},
			async pintuan_init(code){
				console.log('codecodecode')
				console.log(code)
				if (!this.sett){
					return
				}
				if(this.shopList.length == 0){
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
					await this.shop_init(this.loca_res)//获取门店列表和设置当前门店
				}
				
				let pintuan_info_res = await pintuan_detail({code:code})
				if(pintuan_info_res.code == 1001){
					uni.showModal({
						content:'拼單已取消或不存在',
						showCancel:false,
						success(){
							uni.switchTab({
								url:'/pages/order/order'
							})
						}
						
					})
					uni.setStorageSync('pintuanCode','')
					return
				}
				let pintuan_info = pintuan_info_res.data
				console.log(pintuan_info)
				this.resort_pintuan_info(pintuan_info)
				console.log(pintuan_info)
				this.pintuan_info = pintuan_info
				this.SET_PINTUAN_TYPE(pintuan_info[0].vehicle_method == '外卖' ? 1 : 2)
				console.log('this.pintuan_info')
				console.log(this.pintuan_info)
				 this.SET_PINTUAN_SHOP(this.shopList.find(item => item.id == pintuan_info[0].shop_id)) 
				console.log(this.pintuanShop)
				let pintuanCart =[]
				pintuan_info.forEach((item,index)=>{
					pintuanCart[index] = item.goods_data ? item.goods_data:[]
				})
				console.log('pintuanCart')
				console.log(pintuanCart)
				let pintuanCart1 = pintuanCart.concat([])
				console.log('pintuanCart1')
				console.log(pintuanCart1)
				 pintuanCart.forEach((item,index)=>{
						item.forEach(itemc=>{
							itemc.is_checked = true
							itemc.id = itemc.goods_id
							itemc.name = itemc.goods_name
							itemc.price = parseInt(itemc.goods_price * 100)/100
							itemc.truePrice = parseInt(itemc.goods_price * 100)/100
							itemc.imgurl = this.imgSrc + itemc.home_avatar
							itemc.number = itemc.goods_num
							itemc.materials_text = itemc.goods_norm
							itemc.norm_id = itemc.norm_id && itemc.norm_id.length ? itemc.norm_id.split(','):[]
						})
						
					
					//item.norm_id =
				}) 
				console.log(88888888)
				console.log(pintuanCart)
				this.SET_PINTUAN_CART(pintuanCart)
				getApp().globalData.isInvite=false
				setTimeout(()=>{this.pintuan_init(code)},1000)
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
				//this.SET_CHOOSED_SHOP(this.shopList[0])
				// console.log(this.choosedShop)
				 //alert(this.choosedShop.id)
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

			},
			async pay(price){
				const token = uni.getStorageSync('token');
				console.log(token)
				if(!token){
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
				}
				
				this.judge_is_rest()//
				if(!this.is_rest){
					uni.showLoading({})
					/* try{
						await pintuan_lock({code:this.pintuancode})
					}catch(e){
						//TODO handle the exception
					} */
					var app = getApp();
					var order_info={};
					var goods =[];
					var goods_data = [];
					this.pintuanCart.forEach(itemp =>{
						itemp.forEach(item=>{
							let good ={};
							good.id = item.id;
							good.goods_name = item.name;
							good.goods_price = item.truePrice;
							good.home_avatar = this.imgSrc + item.imgurl;
							good.norm = item.materials_text;
							good.norm_id = item.norm_id ? item.norm_id : [];
							good.goods_num =item.number;
							goods_data.push(good);
						})
						
						
					})
					if(goods_data.length==0){
						uni.showModal({
							content:'您還沒有選購商品',
							showCancel:false
							
						})
						uni.hideLoading()
						return
					}
					if(this.pintuanType == 1){
						let n_price = parseInt(price*100)
						let lowest_cost = parseInt(this.pintuanShop.detail.lowest_cost*100)
						let rest_money = lowest_cost - n_price
						if(n_price < lowest_cost){
							uni.showModal({
								content:'滿￥'+ lowest_cost + '起送,還差￥' + rest_money,
								showCancel:false
							})
							return
						}
					}
					order_info.goods_data = goods_data;
					order_info.shop_id = this.pintuanShop.id
					order_info.shop_name = this.pintuanShop.shop_name
					order_info.distance = this.pintuanShop.distance
					order_info.delivery_cost = this.choosedShop.detail.delivery_cost
					 // order_info.delivery_cost = 0.01
					order_info.lowest_cost = this.pintuanShop.detail.lowest_cost
					order_info.payment_info = price
					// order_info.payment_info = 0.01
					order_info.address_id = this.choosedAddress.id
					order_info.contact_name = this.choosedAddress.contact_name
					order_info.contact_sex = this.choosedAddress.contact_sex
					order_info.contact_phone = this.choosedAddress.contact_phone
					order_info.contact_address = this.choosedAddress.contact_address
					order_info.contact_number = this.choosedAddress.contact_number
					order_info.haul_method  = this.pintuanType
					order_info.current_cups = this.pintuanShop.detail.current_cups
					order_info.current_order = this.pintuanShop.detail.current_order
					app.globalData.goodsPayment = order_info;
					console.log(11111111111111)
					console.log(order_info)
					uni.hideLoading()
					uni.navigateTo({
						url:'/pages/orderPayment/orderPayment'
					})
					
				}
				
				
				
			},
		},
		
		
	}
</script>

<style lang="scss" scoped>
	.hover-comon{
		opacity: 0.6;
	}
	.bordrline{
		height: 1px;
		opacity: 0.5;
		border-top: 1px solid #cccccc;
	}
	.pintuanShop{
		margin-top: 40rpx;
		padding: 0 24rpx;
		.info{
			display: flex;
			justify-content: center;
			margin-bottom: 10rpx;
			.shop_icon{
				width: 44rpx;
				height: 44rpx;
				margin-right: 10rpx;
			}
			.shop_name{
				font-size: 34rpx;
				color: #333333;
				font-weight: bold;
				flex: 1;
			}
			.type{
				font-size: 22rpx;
				color: #333333;
				background: #f2f2f2;
				padding: 6rpx 10rpx;
			}
		}
		.distance{
			font-size: 26rpx;
			color: #666666;
			margin-bottom: 30rpx;
		}
		.biaoyu{
			font-size: 26rpx;
			color: #666666;
			margin-bottom: 80rpx;
		}
		.pindan_invite{
			display: flex;
			justify-content: flex-end;
			margin-bottom: 50rpx;
			.pindan_cancel{
				white-space: nowrap;
				width: 160rpx;
				height: 64rpx;
				background: #ffffff;
				border: 1px solid #17a1ff;
				border-radius: 4rpx;
				margin-right: 30rpx;
				font-size: 26rpx;
				color: #17A1FF;
			}
			.invite{
				width: 160rpx;
				height: 64rpx;
				background: #17a1ff;
				border-radius: 4rpx;
				font-size: 26rpx;
				color: #FFFFFF;
			}
		}
	}
	.detail{
		background-color: #F5F5F5;
		padding-bottom: 200rpx;
		.title{
			height: 100rpx;
			line-height: 100rpx;
			font-size: 24rpx;
			color: #666666;
			padding-left: 24rpx;
		}
		.order{
			height: 100%;
			.order_item{
				background-color: #FFFFFF;
				padding: 0 24rpx;
				margin-bottom: 50rpx;
				.user_info{
					height: 112rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.left{
						display: flex;
						align-items: center;
						.user_icon{
							width: 52rpx;
							height: 52rpx;
							margin-right: 20rpx;
						}
						.user_name{
							font-size: 28rpx;
							color: #333333;
							margin-right: 10rpx;
							max-width: 280rpx;
						}
						.is_me{
							width: 30rpx;
							height: 30rpx;
							background: #17a1ff;
							font-size: 20rpx;
							color: #FFFFFF;
							text-align: center;
							line-height: 30rpx;
							margin-right: 10rpx;
						}
						.is_you{
							background-color: #adadad;
						}
						.user_status{
							font-size: 24rpx;
							color:#999999;
						}
					}
					.ljdd{
						width: 150rpx;
						height: 48rpx;
						background: #ffffff;
						border: 1px solid #cccccc;
						border-radius: 4rpx;
						font-size: 22rpx;
						color: #999999;
						display: flex;
						justify-content: center;
						align-items: center;
					}
					.clear_edit{
						display: flex;
						align-items: center;
						.clear,.edit{
							display: flex;
							justify-content: center;
							align-items: center;
							padding: 0 20rpx;
							height: 48rpx;
							background: #ffffff;
							border: 1px solid #cccccc;
							color: #999999;
							border-radius: 4rpx;
							font-size: 22rpx;
							
						}
						.edit{
							margin-left: 20rpx;
						}
					}
				}
				.user_order{
					.good{
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 30rpx 0;
						.icon{
							width:60rpx;
							height: 60rpx;
							margin: 0 20rpx;
						}
						.intro{
							flex: 1;
							.good_name_price{
								display: flex;
								justify-content: space-between;
								color: #333333;
								font-size: 28rpx;
								.good_name{
									width: 400rpx;
									white-space: nowrap;
									overflow: hidden;
									text-overflow: ellipsis;
									margin-bottom: 10rpx;
								}
								.good_price{
									
								}
							}
							.good_materials_number{
								display: flex;
								justify-content: space-between;
								align-items: flex-start;
								.materials{
									width: 400rpx;
									font-size: 20rpx;
									color: #999999;
								}
								.number{
									color: #999999;
									font-size: 26rpx;
								}
							}
						}
					}
				}
			}
			
		}
	}
	
	.jiesuan{
		width: 100%;
		height: 100rpx;
		display: flex;
		position: fixed;
		left: 0;
		bottom: 0;
		.left{
			flex: 1;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 10rpx 0 10rpx 24rpx;
			.left_top{
				.price{
					color: #333333;
					font-size: 30rpx;
					margin-right: 16rpx;
				}
				.my_pirce{
					color: #333333;
					font-size: 28rpx;
				}
			}
			.tip{
				color: #E46A68;
				font-size: 20rpx;
			}
		}
		
		.right{
			background-color: $main-color;
			color: #FFFFFF;
			width: 200rpx;
			line-height: 100rpx;
			height: 100rpx;
			text-align: center;
		}
		
	}
</style>
