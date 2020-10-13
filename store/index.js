import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//为了方便测试，此处用vuex做全局数据
const store = new Vuex.Store({
	state: {
		orderType: 1,
		choosedShopId:'',
		shopList:[],
	},
	mutations: {
		SET_ORDER_TYPE(state, orderType) {
			state.orderType = orderType
		},
		SET_CHOOSED_SHOP_ID(state,choosedShopId){
			state.choosedShopId = choosedShopId
		},
		SET_SHOP_LIST(state,shopList){
			state.shopList = shopList
		}
		
	}
})

export default store
