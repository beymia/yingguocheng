<template>
	<view>
		<uni-transition :mode-class="['slide-bottom']" :show="!!cartNum" :styles="cartBarStyles">
			<view class="left">
				<template v-if="bagIconVisible">
					<view class="detail-action" @tap="details">
						<image src="/static/images/order/icon_shopping_bag.png" class="shopbag-btn"></image>
						<view class="badge">{{ cart_checked_num }}</view>
					</view>
				</template>
				<template v-else>
					<checkbox-group class="ck" @change="checkAllChange" >
						<label class="check_con">
								<checkbox value="all" :checked="is_checked_all" />
								<view class="select_all">
									全選
								</view>
						</label>
					</checkbox-group>
				</template>
				<view style="display: flex;flex-direction: column;">
					<view class="price">￥{{ cartPrice }}</view>
					<!-- <template v-if="orderType == 1">
						<text v-if="restMoney" style="font-size: 18rpx;color: #353535;margin-left: 5px;">滿￥{{choosedShop.detail.lowest_cost}}起送，還差￥{{restMoney}}元</text>
						<text v-else-if="choosedShop.detail.delivery_cost" style="font-size: 18rpx;color: #353535;margin-left: 5px;">另需配送費￥{{choosedShop.detail.delivery_cost}}元</text>
					</template> -->
					
				</view>
			</view>
			<button v-if="restMoney && orderType == 1" type="primary" class="right" >我選好了</button>
			<button v-else type="primary" class="right" @tap="pay">我選好了</button>
		</uni-transition>
		<cart-popup :cart="cart" ref="cartPopup" @add="add" @minus="minus" @clear="clear" @change="popChange" @checkboxChange="checkboxChange"></cart-popup>
	</view>
</template>

<script>
// import uniTransition from '@/components/uni-transition/uni-transition.vue'
import {mapState, mapMutations} from 'vuex'
import cartPopup from '../cart-popup/cart-popup.vue'

export default {
	name: 'cartBar',
	components: {
		// uniTransition,
		cartPopup
	},
	props: {
		cart: {
			type: Array,
			default: () => []
		},
		choosedShop:{
			type:Object,
			default:null
		}
	},
	computed: {
		...mapState(['orderType']),
		cartNum() { //计算购物车总数
			return this.cart.reduce((acc, cur) => acc + cur.number, 0)
		},
		cart_checked_num(){//计算选中商品数
			return this.cart.filter(item => item.is_checked).reduce((acc, cur) => acc + cur.number, 0)
		},
		cartPrice() {	//计算购物车总价
			return this.cart.filter(item => item.is_checked).reduce((acc, cur) => acc + cur.number * (cur.truePrice || cur.price), 0)
		},
		is_checked_all(){
			return Boolean(this.cart.length) && !(this.cart.findIndex(item => item.is_checked == false)+1);
		},
		restMoney(){
			if(this.choosedShop && this.choosedShop.detail){
				let m =Number(this.choosedShop.detail.lowest_cost) - this.cartPrice;
				console.log(m)
				if(m <= 0){
					return 0
				}else{
					return m
				}
			}
			
		}
		
	},
	data() {
		return {
			cartBarStyles: {
				'position': 'fixed',
				'bottom': 0,
				// #ifdef H5
				'bottom': 'var(--window-bottom)',
				// #endif
				'width': '100%',
				'z-index': '995',
				'height': '100rpx',
				'background-color': '#f0f0f1',
				'border-bottom': '2rpx solid #c8c7cc',
				'display': 'flex',
				'justify-content': 'space-between',
				'align-items': 'stretch',
			},
			bagIconVisible:true
		}
	},
	methods: {
		...mapMutations(['SET_ORDER_TYPE']),
		details() {
			this.$refs['cartPopup'].open()
			this.bagIconVisible=false
		},
		add(product) {
			this.$emit('add', {...product, number: 1})
		},
		minus(product) {
			this.$emit('minus', product)
		},
		clear() {
			this.$emit('clear')
			this.bagIconVisible=true
		},
		pay() {
			this.$emit('pay',this.cartPrice)
		},
		popChange(isshow){
			if(isshow){
				this.bagIconVisible=false
			}else{
				this.bagIconVisible=true
			}
		},
		checkAllChange(e){
			this.$emit("checkAllChange",e)
		},
		checkboxChange(e){
			this.$emit("checkboxChange",e)
		}
	},
	watch: {
		cartNum(val) {
			if(!val) {
				this.$refs['cartPopup'].close()
				this.bagIconVisible=true
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.left {
	display: flex;
	align-items: center;
	
	.ck{
		margin-left: 24rpx;
		.check_con{
			display: flex;
		align-items: center;
		margin-right: 10rpx;
		}
		//改变uni-app默认的多选框样式
		/deep/ .uni-checkbox-input {
			width: 50rpx !important;
			height: 50rpx !important;
			border-radius: 50%;
			transform: scale(.68);
			box-sizing: border-box;
		}
		
		/deep/ .uni-checkbox-input-checked {
			width: 50rpx !important;
			height: 50rpx !important;
			border-radius: 50%;
			background: $main-color;
			color: #fff !important;
			transform: scale(.68);
			border: none;
			box-sizing: border-box;
		}
		/deep/.uni-checkbox-input:hover{
			width: 50rpx !important;
			height: 50rpx !important;
			border-color: #d1d1d1 !important;
			transform: scale(.68);
			box-sizing: border-box;
		}
		.select_all{
			font-size: 24rpx;
			color: #333333;
		}
	}

	.detail-action {
		height: 100%;
		border-radius: 100%;
		background-color: #ffffff;
		box-shadow: 0 10rpx 10rpx 0 rgba($color: #c8c7cc, $alpha: 0.2);
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100rpx;
		height: 100rpx;
		margin-top: -20rpx;
		margin-right: 20rpx;
		margin-left: 20rpx;

		.shopbag-btn {
			width: 70rpx;
			height: 70rpx;
		}

		.badge {
			background-color: $main-color;
			font-size: 24rpx;
			color: #FFFFFF;
			line-height: 1rem;
			width: 1rem;
			text-align: center;
			border-radius: 100%;
			position: absolute;
			right: 0;
			top: 0;
		}
	}

	.price {
		font-size: 36rpx;
		font-weight: bold;
		color: $main-color;
	}
}

.right {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 70rpx;
	border-radius: 0 !important;
	font-size: 36rpx;
}
</style>
