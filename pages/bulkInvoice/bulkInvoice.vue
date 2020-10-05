<template>
  <view class="bulk_invoice">
      <view v-for="(invoice,index) in invoiceData"
            :key="index"
            class="invoice_container">
        <invoice :invoice="invoice"></invoice>
      </view>
      <view class="invoice_foot">
        <view class="invoice_content">
          <view class="select_all">
            <label>
              <radio color="#17A1FF">全選</radio>
            </label>
          </view>
          <view class="select_count">
            <text>共￥16.14</text>
            <text>1个订单</text>
          </view>
          <navigator
              open-type="navigate"
              url="/pages/invoiceInfo/invoiceInfo"
              hover-class="none"
              class="next_stop">
            <text>下壹步</text>
          </navigator>
        </view>
      </view>
    <view class="empty"></view>
  </view>
</template>

<script>
import invoice from './../../components-lk/invoice/invoice'

export default {
  data() {
    return {
      isSelectAll:false,
      invoiceData: [
        {
          amount: '￥ 16.14',
          orderNumber: '**************337',
          orderDate: '2020-08-13 12:14'
        },
        {
          amount: '￥ 16.14',
          orderNumber: '**************337',
          orderDate: '2020-08-13 12:14'
        },
        {
          amount: '￥ 16.14',
          orderNumber: '**************337',
          orderDate: '2020-08-13 12:14'
        },
        {
          amount: '￥ 16.14',
          orderNumber: '**************337',
          orderDate: '2020-08-13 12:14'
        },
        {
          amount: '￥ 16.14',
          orderNumber: '**************337',
          orderDate: '2020-08-13 12:14'
        },
        {
          amount: '￥ 16.14',
          orderNumber: '**************337',
          orderDate: '2020-08-13 12:14'
        }
      ]
    }
  },
  methods: {},
  components: {
    invoice
  }
}
</script>

<style lang="scss" scoped>

.bulk_invoice {
  width: 100%;
  background: $order-bg;

  .empty{
    width: 100%;
    height: 130rpx;
    background: $order-bg;
  }

  .invoice_container{
    width: 100%;
    padding:$order-spacing-lg $order-spacing-base 0 $order-spacing-base;
    box-sizing: border-box;
  }
  .invoice_foot{
    width: 750rpx;
    height: 98rpx;
    background: #ffffff;
    position: fixed;
    bottom: 0;
    left: 0;

    .invoice_content{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      view{
        height: 100%;
        line-height: 98rpx;
      }
      view:nth-child(1){
        font-size: $font-size-sm;
        color: $font-color1;
        margin-left: $order-spacing-base;
      }
      view:nth-child(2){
        flex: 1;
        text-align: right;
        line-height: inherit;
        padding: 20rpx $order-spacing-lg 17rpx 0;
        box-sizing: border-box;
        color: $font-color1;

        text:nth-child(1){
          font-size: $font-size-sm;
          display: block;
        }
        text:nth-child(2){
          font-size: $font-size-sm - 4rpx;
        }
      }
     .next_stop{
        width: 200rpx;
        line-height: 98rpx;
        text-align: center;
        background: $main-color;
        font-size: $font-size-base;
        color: #FFFFFF;
      }
    }
  }
}
</style>
