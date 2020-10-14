import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//为了方便测试，此处用vuex做全局数据
const store = new Vuex.Store({
	state: {
		orderType: 1,
		pintuanType:2,
		choosedShop:{
			"id": "15989536458951855",
			"shop_name": "天觀商城店",
			"shop_address": "安徽省合肥市蜀山区芙蓉路291号",
			"longitude": "117.2359925972313",
			"latitude": "31.78783487034122",
			"work_time": "10:0:00",
			"rest_time": "22:0:00",
			"current_order": "0",
			"current_cups": "0",
			"distance": 2.24
		},
		shopList:[{
			"id": "15992871171146972",
			"shop_name": "合肥百乐门广场店",
			"shop_address": "安徽省合肥市蜀山区",
			"longitude": "117.23594319042803",
			"latitude": "31.7816537753481",
			"work_time": "10:0:00",
			"rest_time": "22:0:00",
			"current_order": "0",
			"current_cups": "0",
			"distance": 1.74
		},
		{
			"id": "15989536458951853",
			"shop_name": "合肥正大广场店",
			"shop_address": "安徽省合肥市蜀山区芙蓉路291号",
			"longitude": "117.2359925972313",
			"latitude": "31.78783487034122",
			"work_time": "10:0:00",
			"rest_time": "22:0:00",
			"current_order": "0",
			"current_cups": "0",
			"distance": 2.24
		},{
			"id": "15992871171146974",
			"shop_name": "柏樹人家店",
			"shop_address": "安徽省合肥市蜀山区",
			"longitude": "117.23594319042803",
			"latitude": "31.7816537753481",
			"work_time": "10:0:00",
			"rest_time": "22:0:00",
			"current_order": "0",
			"current_cups": "0",
			"distance": 1.74
		},
		{
			"id": "15989536458951855",
			"shop_name": "天觀商城店",
			"shop_address": "安徽省合肥市蜀山区芙蓉路291号",
			"longitude": "117.2359925972313",
			"latitude": "31.78783487034122",
			"work_time": "10:0:00",
			"rest_time": "22:0:00",
			"current_order": "0",
			"current_cups": "0",
			"distance": 2.24
		}],
		cyShopList:[{
			"id": "15992871171146972",
			"shop_name": "合肥百乐门广场店",
			"shop_address": "安徽省合肥市蜀山区",
			"longitude": "117.23594319042803",
			"latitude": "31.7816537753481",
			"work_time": "10:0:00",
			"rest_time": "22:0:00",
			"current_order": "0",
			"current_cups": "0",
			"distance": 1.74
		},
		{
			"id": "15989536458951853",
			"shop_name": "合肥正大广场店",
			"shop_address": "安徽省合肥市蜀山区芙蓉路291号",
			"longitude": "117.2359925972313",
			"latitude": "31.78783487034122",
			"work_time": "10:0:00",
			"rest_time": "22:0:00",
			"current_order": "0",
			"current_cups": "0",
			"distance": 2.24
		}],
		
	},
	mutations: {
		SET_ORDER_TYPE(state, orderType) {
			state.orderType = orderType
		},
		SET_CHOOSED_SHOP(state,choosedShop){
			state.choosedShop = choosedShop
		},
		SET_SHOP_LIST(state,shopList){
			state.shopList = shopList
		},
		SET_CY_SHOP_LIST(state,cyShopList){
			state.cyShopList = cyShopList
		},
		SET_PINTUAN_TYPE(state,pintuanType){
			state.pintuanType = pintuanType
		}
		
	}
})

export default store
