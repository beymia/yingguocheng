<template>
  <view class="invoice">
    <checkbox-group
        :data-amount="invoice.payment_info" @change="handlerChange" class="invoice_box">
      <label>
        <checkbox :checked="selectAll"
                  @click.stop.prevent
                  :value="invoice.payment_info.toString()"
                  class="invoice_content">
          <view>
            <text>開票金額：￥{{ invoice.payment_info }}</text>
            <text>訂單號：{{ invoice.id }}</text>
            <text>下單時間：{{ invoice.created_at }}</text>
          </view>
        </checkbox>
      </label>
    </checkbox-group>
  </view>
</template>

<script>
	export default {
		props: {
			invoice: {
				type: [Array, Object],
				required: true
			},
      selectAll:{
			  type:Boolean,
        default:false
      }
		},
    methods:{
		  handlerChange(e){
        this.$emit('invoice-change',e)
      }
    }
	}
</script>

<style lang="scss" scoped>
	.invoice {
		width: 100%;
		height: 200rpx;
		font-size: $font-size-sm;
		font-weight: $font-weight-base;
		background: #fff;
		color: $font-color1;
		border-radius: 20rpx;
		padding: $spacing-lg;
		box-sizing: border-box;

		.invoice_box {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;

			label {
				width: 100%;
				height: 100%;

				.invoice_content {
					width: 100%;
					height: 140rpx;
					display: flex;

					view {
						height: 100%;
						margin-left: $spacing-lg;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
					}

					//改变uni-app默认的多选框样式
					/deep/ .uni-checkbox-input {
						width: 42rpx !important;
						height: 42rpx !important;
						border-radius: 50%;
					}

					/deep/ .uni-checkbox-input-checked {
						width: 46rpx !important;
						height: 46rpx !important;
						border-radius: 50%;
						background: $main-color;
						color: #fff !important;
						border: none;
					}
				}
			}
		}
	}
</style>
