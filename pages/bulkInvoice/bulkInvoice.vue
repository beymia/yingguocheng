<template>
  <view class="bulk_invoice">
    <view v-for="(invoice,index) in invoiceData"
          :key="index"
          class="invoice_container">
      <invoice :selectAll="clickSelectAll" @invoice-change="invoiceChange" :invoice="invoice"></invoice>
    </view>
    <view class="invoice_foot">
      <view class="invoice_content">
        <view @click="selectAll" class="select_all">
          <label>
            <radio :checked="isSelectAll" color="#17A1FF">全選</radio>
          </label>
        </view>
        <view class="select_count">
          <text>共￥{{ invoiceAmount }}</text>
          <text>{{ invoiceCount }}个订单</text>
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
      isSelectAll: false,
      invoiceData: [],
      invoiceAmount: 0,
      invoiceCount: 0,
      clickSelectAll:false
    }
  },
  onLoad(options) {
    this.invoiceData = JSON.parse(options.invoice)
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
      this.isSelectAll = this.invoiceCount === this.invoiceData.length
    },
    /*
    * 选中所有的发票条目，
    * 计算总金额和总数量，
    * 取消全选则全部归0
    * */
    selectAll() {
      this.isSelectAll = !this.isSelectAll;
      this.clickSelectAll = this.isSelectAll
      if (this.isSelectAll) {
        this.invoiceData.forEach((item) => {
          this.invoiceAmount += item.payment_info
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
      if(this.invoiceAmount){
        uni.navigateTo({
          url: '/pages/invoiceInfo/invoiceInfo?invoiceAmount=' + this.invoiceAmount
        })
      }else{
        uni.showToast({
          title:'没有选择订单',
          icon:'none',
          duration:2000
        })
      }
    }
  },
  components: {
    invoice
  }
}
</script>

<style lang="scss" scoped>
uni-page-body{
  height: 100%;
}
.bulk_invoice {
  width: 100%;
  height: 100%;
  background:$main-bg;

  .empty{
    width: 100%;
    height: 130rpx;
    background: $main-bg;
  }

  .invoice_container{
    width: 100%;
    padding:$spacing-lg $spacing-base 0 $spacing-base;
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
        margin-left: $spacing-base;
      }
      view:nth-child(2){
        flex: 1;
        text-align: right;
        line-height: inherit;
        padding: 20rpx $spacing-lg 17rpx 0;
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
