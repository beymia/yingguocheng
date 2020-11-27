<template>
	<uni-transition :mode-class="['slide-left']" :styles="tranStyles" :show="show">
		<view class="d-flex flex-column overflow-hidden common">
			<view class="search-box">
				<view class="search-input">
					<image src="/static/images/order/search-icon.png" class="search-icon"></image>
					<input class="s_input" type="text" v-model="keyword" 
							:placeholder="hotSearch[0]?hotSearch[0].name:''" 
							placeholder-class="placeholder" @input="handleKeywordInput">
				    <image v-if="keyword" src="/static/images/order/image-delete.png" class="close-icon" @tap="clear" />
				</view>
				<view class="ml-30" @tap="hide">取消</view>
			</view>
			<scroll-view class="result" scroll-y>
				<template v-if="!result.length">
					<view class="section" v-if="historySearch.length">
						<view class="header">
							<view class="title">歷史搜索</view>
							<view class="subtitle" @tap="clearHistory">
								<image src="/static/images/order/delete.png"></image>
								<view>清除</view>
							</view>
						</view>
						<view class="list">
							<view class="item" v-for="(item, index) in historySearch" :key="index" @tap="handleChoose(item)">
								{{ item.name }}
							</view>
						</view>
					</view>
					<view class="section">
						<view class="header">
							<view class="title">熱門推薦</view>
						</view>
						<view class="list">
							<view class="item" v-for="(item, index) in hotSearch" :key="index" @tap="handleChoose(item)">
								<view class="name">{{ item.name }}</view>
								<!-- <image v-if="item.nameImage" :src="item.nameImage" class="name-image"></image> -->
							</view>
						</view>
					</view>
				</template>
				<template v-else>
					<view class="wrapper" style="padding: 0 30rpx 30rpx 0;">
						<view class="product" v-for="(item, index) in result" :key="index" @tap="handleChoose(item, true)">
							<view class="d-flex align-items-center">
								<image :src="item.imgurl" class="pro-image"/>
								<view class="pro-name">{{ item.name }}</view>
							</view>
							<view class="pro-price">￥{{ item.price }}</view>
						</view>
					</view>
				</template>
			</scroll-view>
			</view>
		</view>
	</uni-transition>
</template>

<script>
	import uniTransition from '@/components/uni-transition/uni-transition.vue'
	export default {
		name: 'search',
		components: {
			uniTransition
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			categories: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				tranStyles: {
					width: '100%',
					position: 'absolute',
					// // #ifdef MP-WEIXIN
					// top: "69px",
					// // #endif
					// // #ifndef MP-WEIXIN
					// top: "calc(var(--status-bar-height) + 44px)",
					// // #endif
					left: 0,
					bottom: 0,
					backgroundColor: '#fff',
					zIndex: 997
				},
				hotSearch: [
					{id:5,name:'黑糖波波希臘酸奶',price:19,is_single:true,isHot:false,labels:['含乳、燕麥、南瓜子仁'],materials:[],description:'黑糖脆波波與希臘酸奶靈感碰撞，酸奶部分無糖。選用100%生牛乳發酵，零添加我配附件哦机文件',images:['/static/images_t/order/htbbxlsn_large.png','/static/images_t/order/drmmgl_large.png'],imgurl:'/static/images_t/order/htbbxlsn.png'},
					{id:6,name:'冷萃桂花綠',price:9,is_single:true,isHot:false,labels:['含茶'],materials:[],description:'冷萃茶不用等待叫號，可直接向店員出示後領取。細嫩茶芽與桂花壹同於冷露中为;为人家放假未发觉',images:['/static/images_t/order/htbbxlsn_large.png','/static/images_t/order/drmmgl_large.png'],imgurl:'/static/images_t/order/lcghl.png'},
					{id:7,name:'NFC桃桃汁',price:25,is_single:true,isHot:false,labels:'',materials:[],description:'非濃縮還原，0脂肪，0添加劑，純粹鮮榨，不添加壹滴水。甜美水蜜桃鮮榨',images:['/static/images_t/order/htbbxlsn_large.png','/static/images_t/order/drmmgl_large.png'],imgurl:'/static/images_t/order/nfcttz.png'},
					{id:8,name:'多肉芒芒甘露',price:27,is_single:true,isHot:true,labels:['含乳制品、茶'],materials:[],description:'冷/熱500ml 冷670ml 人氣top2經典茫茫與楊枝甘露的靈感碰撞，精選清幽綠茶',images:['/static/images_t/order/htbbxlsn_large.png','/static/images_t/order/drmmgl_large.png'],imgurl:'/static/images_t/order/drmmgl.png'}
				],
				historySearch: [
					{id:1,name:'黑糖波波希臘酸奶',price:19,is_single:false,isHot:false,labels:['可做热饮','含乳、燕麥、南瓜子仁'],materials:[{"group_name": "餐具需要","values": [{"id": 1289,"name": "需要餐具","price": "1","is_selected": false},{"id": 1289,"name": "不需要壹次性餐具","price": "0","is_selected": false}]}],description:'黑糖脆波波與希臘酸奶靈感碰撞，酸奶部分無糖。選用100%生牛乳發酵，零添加我配附件哦机文件',images:['/static/images_t/order/htbbxlsn_large.png','/static/images_t/order/drmmgl_large.png'],imgurl:'/static/images_t/order/htbbxlsn.png'},
					{id:2,name:'冷萃桂花綠',price:9,is_single:false,isHot:false,labels:['可做热饮','含茶'],
					materials:[
						{"group_name": "餐具需要","values": [{"id": 1289,"name": "需要餐具","price": "1","is_selected": false},{"id": 1289,"name": "不需要壹次性餐具","price": "0","is_selected": false}]},
						{"group_name": "狀態","values": [{"id": 1289,"name": "冰沙（推薦）","price": "1","is_selected": false,"is_exclusive": true},{"id": 1289,"name": "熱","price": "1","is_selected": false},{"id": 1289,"name": "溫","price": "1","is_selected": false}]},
						{"group_name": "杯型","values": [{"id": 1289,"name": "標準杯（500ml）","price": "1","is_selected": false,"is_exclusive": true},{"id": 1289,"name": "加大MAX杯（670ml）","price": "1","is_selected": false,"is_exclusive": true}]},
						{"group_name": "冰量","values": [{"id": 1289,"name": "正常（推薦）","price": "1","is_selected": false,"is_exclusive": true},{"id": 1289,"name": "少冰","price": "1","is_selected": false,"is_exclusive": true},{"id": 1289,"name": "少少冰","price": "1","is_selected": false,"is_exclusive": true}]}
						],description:'冷萃茶不用等待叫號，可直接向店員出示後領取。細嫩茶芽與桂花壹同於冷露中为;为人家放假未发觉',images:['/static/images_t/order/htbbxlsn_large.png','/static/images_t/order/drmmgl_large.png'],imgurl:'/static/images_t/order/lcghl.png'},
					{id:3,name:'NFC桃桃汁',price:25,is_single:false,isHot:false,labels:'',materials:[],description:'非濃縮還原，0脂肪，0添加劑，純粹鮮榨，不添加壹滴水。甜美水蜜桃鮮榨',images:['/static/images_t/order/htbbxlsn_large.png','/static/images_t/order/drmmgl_large.png'],imgurl:'/static/images_t/order/nfcttz.png'},
					{id:4,name:'多肉芒芒甘露',price:27,is_single:true,isHot:true,labels:['可做热饮','含乳制品、茶'],materials:[],description:'冷/熱500ml 冷670ml 人氣top2經典茫茫與楊枝甘露的靈感碰撞，精選清幽綠茶',images:['/static/images_t/order/htbbxlsn_large.png','/static/images_t/order/drmmgl_large.png'],imgurl:'/static/images_t/order/drmmgl.png'},
					{id:5,name:'黑糖波波希臘酸奶',price:19,is_single:true,isHot:false,labels:['含乳、燕麥、南瓜子仁'],materials:[],description:'黑糖脆波波與希臘酸奶靈感碰撞，酸奶部分無糖。選用100%生牛乳發酵，零添加我配附件哦机文件',images:['/static/images_t/order/htbbxlsn_large.png','/static/images_t/order/drmmgl_large.png'],imgurl:'/static/images_t/order/htbbxlsn.png'},
					{id:6,name:'冷萃桂花綠',price:9,is_single:true,isHot:false,labels:['含茶'],materials:[],description:'冷萃茶不用等待叫號，可直接向店員出示後領取。細嫩茶芽與桂花壹同於冷露中为;为人家放假未发觉',images:['/static/images_t/order/htbbxlsn_large.png','/static/images_t/order/drmmgl_large.png'],imgurl:'/static/images_t/order/lcghl.png'},
					{id:7,name:'NFC桃桃汁',price:25,is_single:true,isHot:false,labels:'',materials:[],description:'非濃縮還原，0脂肪，0添加劑，純粹鮮榨，不添加壹滴水。甜美水蜜桃鮮榨',images:['/static/images_t/order/htbbxlsn_large.png','/static/images_t/order/drmmgl_large.png'],imgurl:'/static/images_t/order/nfcttz.png'},
					{id:8,name:'多肉芒芒甘露',price:27,is_single:true,isHot:true,labels:['含乳制品、茶'],materials:[],description:'冷/熱500ml 冷670ml 人氣top2經典茫茫與楊枝甘露的靈感碰撞，精選清幽綠茶',images:['/static/images_t/order/htbbxlsn_large.png','/static/images_t/order/drmmgl_large.png'],imgurl:'/static/images_t/order/drmmgl.png'}
				],
				keyword: '',
				result: []
			}
		},
		async created() {
			console.log('searchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearch')
			console.log(this.categories)
			var statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			this.tranStyles.top= statusBarHeight + 44 +"px";
			
			/* this.hotSearch = await this.$api('hotSearch')
			this.historySearch = await this.$api('historySearch') */
			try {
			    const history_search = uni.getStorageSync('historySearch');
			    if (history_search) {
			        this.historySearch = JSON.parse(history_search) 
			    }else{
					this.historySearch = []
				}
			} catch (e) {
			    // error
			}
			
			let hotSearch = []
			this.categories.forEach(category => {
				category.goods_list.forEach(good => {
					hotSearch.push(good)
				})
			})
			let l = hotSearch.length
			if(l > 6){
				let new_hot = []
				do{
					let x = Math.round(Math.random() * l)
					let g = hotSearch[x]
					let is =new_hot.find(good=>{
						good.id == g.id
					})
					if(!is){
						new_hot.push(g)
					}
				}while(new_hot.length <= 6) 
				hotSearch = new_hot
			}
			this.hotSearch = hotSearch
		},
		watch:{
			categories(n){
				console.log('searchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearch')
				console.log(n)
			}
		},
		methods: {
			hide() {
				this.keyword = ''
				this.result = []
				this.$emit('hide')
			},
			handleChoose(item, isSearch = false) {
				if(isSearch) {
					this.hide()
					let i =this.historySearch.findIndex(good=>{
						return item.id == good.id
					})
					if(i==-1){
						this.historySearch.push(item)
						let new_h = JSON.stringify(this.historySearch)
						uni.setStorage({
							key:"historySearch",
							data:new_h
						})
					}
					
					this.$emit('choose', item)
					return
				}
				
				let h_exis = false
				let h_find = ''
				this.categories.forEach(category => {
					//  const find = category.goods_list.find(good => good.id == item.id)
					// if(find) {
					// 	this.hide()
					// 	this.$emit('choose', find)
					// 	return
					// }
					const find = category.goods_list.find(good => good.id == item.id)
					if(find){
						h_exis = true
						h_find = find
					}
					
					
				})
				if(h_exis){
					this.hide()
					this.$emit('choose', h_find)
					return
				}else{
					uni.showToast({
					    title: '商品已過期',
					    duration: 1500,
						icon:"none",
					});
					let new_h = this.historySearch.filter(good=>{
						good.id != item.id
					})
					this.historySearch = new_h
					new_h = JSON.stringify(new_h)
					uni.setStorage({
						key:'historySearch',
						data:new_h
					})
				}
			},
			handleKeywordInput(e) {
				//为了方便，这里使用商品列表的数据来筛选结果
				const {value} = e.detail
				
				if(!value) {
					this.result = []
					return
				}
				
				let result = []
				this.categories.forEach(category => {
					category.goods_list.forEach(good => {
						if(good.name.indexOf(value) > -1) {
							result.push(good)
						}
					})
				})
				setTimeout(() => this.result = result, 300)
			},
			clearHistory(){
				this.historySearch=[]
				let new_h =''
				uni.setStorage({
					key:'historySearch',
					data:new_h
				})
			},
			clear() {
				this.keyword=''
				this.result = []
			}
		}
	}
</script>

<style lang="scss" scoped>
	.common{
		font-size: 24rpx;
		color: #999999;
	}
	.overflow-hidden {
	    overflow: hidden !important;
	}
	.flex-column{
		flex-direction: column;
	}
	.placeholder {
	    font-size: 24rpx;
	    color: #999;
	}
	.s_input{
		margin-left: 10rpx;
		color: #333333;
		 font-size: 24rpx;
	}
	.search-box {
		height: 100rpx;
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid rgba($color: #c8c7cc, $alpha: 0.6);
		
		.search-input {
			flex: 1;
			height: 60rpx;
			padding: 10rpx 20rpx;
			background-color: #f7f7f7;
			font-size: 26rpx;
			border-radius: 50rem !important;
			display: flex;
			align-items: center;

			.search-icon {
				width: 30rpx;
				height: 30rpx;
				margin-right: 10rpx;
			}
			
			input {
				flex: 1;
			}
			
			.close-icon {
				width: 30rpx;
				height: 30rpx;
				margin-left: 20rpx;
			}
		}
	}
	
	.section {
		padding: 30rpx;
		
		.header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20rpx;
			
			.title {
				font-size: 28rpx;
				color: #343434;
				font-weight: bold;
			}
			
			.subtitle {
				display: flex;
				align-items: center;
				font-size: 24rpx;
				color: #999;
				
				image {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
		
		.list {
			display: flex;
			flex-wrap: wrap;
			
			.item {
				background-color: #f5f5f7;
				padding: 10rpx 20rpx;
				font-size: 24rpx;
				color: #666;
				border-radius: 50rem !important;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				
				.name-image {
					width: 30rpx;
					height: 30rpx;
				}
			}
		}
	}
	
	.result {
		height: calc(100vh - 120rpx);
		/* #ifdef H5 */
		height: calc(100vh - 120rpx - 100rpx);
		/* #endif */
		overflow: hidden;
		
		.product {
			color: #333333;
			padding: 20rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 26rpx;
			
			.pro-image {
				width: 92rpx;
				height: 92rpx;
				margin: 0 20rpx;
			}
			
			.pro-price {
				font-weight: 500 !important;
			}
		}
	}
</style>
