<template xmlns="">
  <view class="invoice_select">
    <view class="invoice_items invoice_type">
      <label>
        <text>發票類型</text>
        <input type="text" value="電子發票" disabled>
      </label>
    </view>
    <view class="invoice_items invoice_amount">
      <label>
        <text>發票金額</text>
        <input type="text" value="￥11.78" disabled>
      </label>
    </view>
    <view class="invoice_items invoice_method">
      <label>
        <text>開票方式</text>
        <radio-group>
          <radio color="#17A1FF" name="method">商品類別</radio>
          <radio color="#17A1FF" name="method">商品明細</radio>
        </radio-group>
      </label>
    </view>
    <view class="invoice_items invoice_look">
      <label>`
        <text>發票擡頭</text>
        <radio-group>
          <radio color="#17A1FF" name="look">個人</radio>
          <radio color="#17A1FF" name="look">單位</radio>
        </radio-group>
      </label>
    </view>
    <view class="invoice_items invoice_email">
      <label>
        <text>郵箱地址</text>
        <input type="text" placeholder="（必填）">
      </label>
    </view>

  </view>
</template>

<script>
export default {
  name: "invoiceSelect"
}
</script>

<style scoped lang="scss">
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
    border-bottom: 1rpx solid rgba(204, 204, 204,0.3);

    label {
      display: flex;
      font-size: 24rpx;
      color: #666666;

      text{
        margin-right: 80rpx;
        font-size: 24rpx;
        font-weight: 700;
      }
        input {
          height: 95rpx;
          width: 431rpx;
          line-height: 95rpx;
          font-size: 24rpx;
          color: #666666;
          box-sizing: border-box;
        }
      /* #ifdef H5*/
        /deep/.uni-radio-input{
          width: 34rpx !important;
          height: 34rpx !important;
          margin-right: 20rpx !important;
      }
      /* #endif*/

      radio-group {
        radio:nth-child(2){
          position: absolute;
          left: 405rpx;
        }
      }
    }
  }
  .invoice_email{
    border: none;
  }
}
</style>