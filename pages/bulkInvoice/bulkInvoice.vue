<template>
  <view class="bulk_invoice">
      <view v-for="(invoice,index) in invoiceData"
            :key="index"
            class="invoice_container">
        <invoice :selectAll = "isSelectAll" @invoice-change="invoiceChange" :invoice="invoice"></invoice>
      </view>
      <view class="invoice_foot">
        <view class="invoice_content">
          <view @click="selectAll" class="select_all">
            <label>
              <radio :checked="isSelectAll" color="#17A1FF">全選</radio>
            </label>
          </view>
          <view class="select_count">
            <text>共￥{{invoiceAmount}}</text>
            <text>{{invoiceCount}}个订单</text>
          </view>
          <view @click="navInvoiceInfo"
              class="next_stop">
            <text>下壹步</text>
          </view>
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
          amount: '16.14',
          orderNumber: '**************337',
          orderDate: '2020-08-13 12:14'
        },
        {
          amount: '16.14',
          orderNumber: '**************337',
          orderDate: '2020-08-13 12:14'
        },
        {
          amount: '16.14',
          orderNumber: '**************337',
          orderDate: '2020-08-13 12:14'
        },
        {
          amount: '16.14',
          orderNumber: '**************337',
          orderDate: '2020-08-13 12:14'
        },
        {
          amount: '16.14',
          orderNumber: '**************337',
          orderDate: '2020-08-13 12:14'
        },
        {
          amount: '16.14',
          orderNumber: '**************337',
          orderDate: '2020-08-13 12:14'
        }
      ],
      invoiceAmount:0,
      invoiceCount:0,
    }
  },
  methods: {
    invoiceChange(e) {
      /*
      * 发票条目发生改变时触发，
      * 增加或减少发票的总金额和总数量
      * */
      let amount = parseFloat(e.detail.value[0]);
      if (amount) {
        this.invoiceAmount += amount;
        this.invoiceCount++;
      } else {
        this.invoiceAmount -= parseFloat(e.target.dataset.amount)
        this.invoiceCount--;
      }
    },
    /*
    * 选中所有的发票条目，
    * 计算总金额和总数量，
    * 取消全选则全部归0
    * */
    selectAll() {
      this.isSelectAll = !this.isSelectAll
      if (this.isSelectAll) {
        this.invoiceData.forEach((item) => {
          this.invoiceAmount += parseFloat(item.amount)
          this.invoiceCount = this.invoiceData.length
        })
      } else {
        this.invoiceCount = 0;
        this.invoiceAmount = 0
      }
    },
    /*
    * 跳转至发票详情页，并传递发票总金额
    * */
    navInvoiceInfo() {
      uni.navigateTo({
        url: '/pages/invoiceInfo/invoiceInfo?invoiceAmount=' + this.invoiceAmount
      })
    }
  },
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
