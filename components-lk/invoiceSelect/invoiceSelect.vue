<template xmlns="">
	<view class="invoice_select">
		<view class="invoice_items invoice_type">
			<label class="invoice_title">
				<text>發票類型</text>
				<input type="text" value="電子發票" disabled>
			</label>
		</view>
    <view class="invoice_items invoice_amount">
      <label class="invoice_title">
        <text>發票金額</text>
        <input type="text" :value="'￥'+invoiceAmount" disabled>
      </label>
    </view>
		<view class="invoice_items invoice_method">
			<radio-group class="invoice_title">
				<text>開票方式</text>
				<label @click="toggleInvoice('type',2)" class="invoice_radio">
					<radio :checked="type ===2" color="#17A1FF" value="type" />
					<text class="incoive_radio_text">商品類別</text>
				</label>
				<label @click="toggleInvoice('type',1)" class="invoice_radio">
					<radio :checked="type ===1" color="#17A1FF" value="detail" />
					<text class="incoive_radio_text">商品明細</text>
				</label>
			</radio-group>
		</view>
		<view class="invoice_items invoice_look">
			<radio-group class="invoice_title">
				<text>發票擡頭</text>
				<label @click="toggleInvoice('lookUp',2)" class="invoice_radio">
					<radio :checked="lookUp ===2" color="#17A1FF" value="personal" />
					<text class="incoive_radio_text">個人</text>
				</label>
				<label @click="toggleInvoice('lookUp',1)" class="invoice_radio">
					<radio :checked="lookUp ===1" color="#17A1FF" value="unit" />
					<text class="incoive_radio_text">單位</text>
				</label>
			</radio-group>
		</view>
		<view class="invoice_items invoice_email">
			<label class="invoice_title">
				<text>郵箱地址</text>
				<input @change="verifyEmail" v-model="email" type="text" placeholder="（必填）">
			</label>
		</view>
	</view>
</template>

<script>
	export default {
		name: "invoiceSelect",
    data(){
		  return {
        type:1,
        lookUp:1,
        email:'',
      }
    },
    props:{
		  //接收发票总金额，如果不是数字类型，或者转换数字类型失败直接报错
      invoiceAmount:{
        type:[Number,String],
        required:true,
        validator: function (value) {
          value = parseFloat(value)
          return typeof value === 'number'
        }
      }
    },
    methods:{
      toggleInvoice(t,v){
        this[t] =v;
      },
      verifyEmail() {
        this.$emit('user-email', {email: this.email, type: this.type, lookUp: this.lookUp})
      }
    }
  }
</script>

<style scoped lang="scss">
	/* H5端改版单选框的默认样式*/
	/* #ifdef H5*/
	/deep/.uni-radio-input {
		width: 34rpx !important;
		height: 34rpx !important;
		margin-right: 20rpx !important;
	}

	/* #endif*/

	.invoice_select {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;

		.invoice_items {
			width: 100%;
			height: 95rpx;
			line-height: 95rpx;
			border-bottom: 1rpx solid rgba(204, 204, 204, 0.3);

			.invoice_title {
				display: flex;
				font-size: $font-size-sm;
				color: $font-color1;

				text {
					margin-right: 80rpx;
					font-size: $font-size-sm;
					font-weight: $font-weight-lg;
				}

				input {
					height: 95rpx;
					width: 431rpx;
					line-height: 95rpx;
					font-size: $font-size-sm;
					color: $font-color2;
					box-sizing: border-box;
					font-weight: $font-weight-base;
				}
				
				.incoive_radio_text {
					font-weight: $font-weight-base;
					color: $font-color2;
				}
				.invoice_radio:nth-child(2){
					position: absolute;
					left:405rpx;
				}
			}
		}
	}
</style>
