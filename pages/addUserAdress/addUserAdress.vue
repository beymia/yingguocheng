<template>
	<view class="page">
		<view class="address-form">
			<list-cell padding="30rpx">
				<view class="form-item">
					<view class="label">聯繫人</view>
					<input type="text" v-model="form.contact_name" placeholder="請填寫收貨人的姓名" placeholder-class="placeholder"/>
				</view>
			</list-cell>
			<view class="border"></view>
			<list-cell padding="30rpx">
				<view class="form-item">
					<view class="label">性别</view>
					<view class="radio" @tap="form.contact_sex = 1">
						<image :src="form.contact_sex == 1 ? '/static/images/userAdress/round-black-selected.png' : '/static/images/userAdress/gouxuankuang.png' "></image>
						<view>先生</view>
					</view>
					<view class="radio" @tap="form.contact_sex = 2">
						<image :src="form.contact_sex == 2 ? '/static/images/userAdress/round-black-selected.png' : '/static/images/userAdress/gouxuankuang.png'"></image>
						<view>女士</view>
					</view>
				</view>
			</list-cell>
			<view class="border"></view>
			<list-cell padding="30rpx">
				<view class="form-item">
					<view class="label">手機號</view>
					<input type="number" maxlength="11" v-model="form.contact_phone" placeholder="請填寫收貨手機號碼" placeholder-class="placeholder"/>
				</view>
			</list-cell>
			<view class="border"></view>
			<list-cell padding="30rpx">
				<view class="form-item">
					<view class="label">收貨地址</view>
					<input type="text" @tap="chooseLocation" v-model="form.contact_address" placeholder="點擊選擇" placeholder-class="placeholder"/>
					<image src="/static/images/userAdress/icon_jump_black3.png" class="jump-icon"></image>
				</view>
			</list-cell>
			<view class="border"></view>
			<list-cell padding="30rpx">
				<view class="form-item">
					<view class="label">门牌号</view>
					<input type="text" v-model="form.contact_number" placeholder="例:B座6楼606室" placeholder-class="placeholder"/>
				</view>
			</list-cell>
			<view class="border"></view>
			
			<list-cell padding="30rpx" last>
				<view class="form-item">
					<view class="radio" @tap="form.default_status == 1 ? form.default_status =2 : form.default_status = 1">
						<image :src="form.default_status == 1 ? '/static/images/userAdress/round-black-selected.png' : '/static/images/userAdress/gouxuankuang.png'  "></image>
						<view>设为默认地址</view>
					</view>
				</view>
			</list-cell>
			<view class="border"></view>
		</view>
		
		<view class="save-btn">
			<button type="primary" @tap="save">保存</button>
		</view>
	</view>
</template>

<script>
	import listCell from '@/components-lk/list-cell/list-cell.vue'
	import {mapState, mapMutations} from 'vuex'
	import {address_add,address_edit} from '@/request/api_y.js'
	
	export default {
		components: {
			listCell
		},
		data() {
			return {
				form: {
					contact_name: '',
					contact_sex: 1,
					contact_phone: '',
					contact_address: '',
					contact_number: '',
					default_status: 2,
				},
				is_edit:false
			}
		},
		onLoad(options) {
			if(options.is_edit) {
				this.is_edit=true;
				uni.setNavigationBarTitle({
				    title: '修改地址'
				});
				this.form = getApp().globalData.edit_address;
				this.form.contact_sex == '先生' ? this.form.contact_sex=1 : this.form.contact_sex=2
			}
		},
		onUnload() {
		},
		computed:{
			...mapState(['userAddresses']),
		},
		methods: {
			...mapMutations(['SET_USER_ADDRESSES']),
			chooseLocation() {
				uni.chooseLocation({
					success: res => {
						const {errMsg, address, latitude, longitude, name} = res
						if(errMsg === "chooseLocation:ok") {
							console.log(res)
							/* this.form = Object.assign(
								this.form, 
								{contact_address: address, latitude, longitude, address: name},
							) */
							this.form.contact_address = address + name;
						}
					}
				})
			},
			async save(){
				if(!(this.form.contact_name && this.form.contact_sex && this.form.contact_phone &&this.form.contact_address &&this.form.contact_number)){
					uni.showModal({
						content:"請填寫完整信息！",
						showCancel:false
					})
					return
				}
				if(this.is_edit){
					await address_edit(this.form)
				}else{
					let res =await address_add(this.form)
					console.log(111)
					console.log(res)
					console.log(111)
				}
				uni.redirectTo({
					url:'/pages/userAdress/userAdress'
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.border{
		border-top: 1px solid #CCCCCC;
		opacity: 0.5;
		width: 690rpx;
		margin-left: 30rpx;
	}
.address-form {
	margin-top: 20rpx;
	
	.form-item {
		width: 100%;
		display: flex;
		align-items: center;
		
		.label {
			width: 160rpx;
		}
		
		input {
			flex: 1;
		}
		
		.jump-icon {
			width: 30rpx;
			height: 48rpx;
		}
		
		.radio {
			display: flex;
			margin-right: 50rpx;
			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 20rpx;
			}
		}
	}
}

.save-btn {
	padding: 0 30rpx;
	margin-top: 60rpx;
	
	button {
		width: 100%;
		font-size: 36rpx;
		border-radius: 10rpx;
	}
}
</style>
