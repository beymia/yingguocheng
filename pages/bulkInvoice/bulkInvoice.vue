<template>
  <view class="bulk_invoice">
    <view v-for="(invoice,index) in invoiceData"
          :key="index"
          @click="invoiceChange(index)"
          class="invoice_container">
        <view class="invoice_content">
          <view class="img">
            <image v-if="!invoice.check" src="../../static/images_t/bulkInvoice/select_false.png"></image>
            <image v-else="invoice.check" src="../../static/images_t/bulkInvoice/select_true.png"></image>
          </view>
          <view class="info">
            <text>開票金額：￥{{ invoice.payment_info }}</text>
            <text>訂單號：{{ invoice.id }}</text>
            <text>下單時間：{{ invoice.created_at }}</text>
          </view>
        </view>
    </view>
    <view class="invoice_foot">
      <view class="invoice_content">
        <view @click="clickSelectAll" class="select_all">
          <image v-if="!selectAll" src="../../static/images_t/bulkInvoice/select_false.png"></image>
          <image v-else="selectAll" src="../../static/images_t/bulkInvoice/select_true.png"></image>
          <text>全選</text>
        </view>
        <view class="select_count">
          <text>共￥{{ amount || '' }}</text>
          <text>{{ count || '' }}个订单</text>
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

export default {
  data() {
    return {
      invoiceData: [],
      amount:0,
      count:0,
      selectAll:false
    }
  },
  onLoad(options) {
    this.invoiceData = JSON.parse(options.invoice)
  },
  methods: {
    invoiceChange(i) {
      this.$set(this.invoiceData[i], 'check', !this.invoiceData[i].check)
      if(this.invoiceData[i].check){
        this.count++;
        this.amount +=  parseFloat(this.invoiceData[i].payment_info)
      }else{
        this.count--;
        this.amount -= parseFloat(this.invoiceData[i].payment_info)
      }
    },

    clickSelectAll(e) {
      this.amount = 0;
      this.count = 0;
      this.selectAll = !this.selectAll;
      this.invoiceData.forEach((item) => {
        if (this.selectAll) {item.check = true;
          this.amount += parseFloat(item.payment_info)
          this.count = this.invoiceData.length
        } else {
          item.check = false
        }
      })
    },

    // 跳转至发票详情页，并传递发票总金额
    navInvoiceInfo() {
      if(this.amount){
        uni.navigateTo({
          url: '/pages/invoiceInfo/invoiceInfo?invoiceAmount=' + this.amount
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
  watch:{
    count(value){
      this.selectAll = value === this.invoiceData.length;
    }
  }
}
</script>

<style lang="scss" scoped>

image{
  display: inline-block;
  width: 46rpx;
  height: 46rpx;
  vertical-align: middle;
  margin:  0 $spacing-lg;
}

.bulk_invoice {
  width: 100%;
  min-height: 100vh;
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

    .invoice_content{
      width: 100%;
      height: 200rpx;
      background-color: #FFFFFF;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      padding: $spacing-lg 0;
      box-sizing: border-box;

      .info{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: $font-size-sm;
        color: $font-color1;
      }
    }
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

        image{
          margin-right: 10rpx;
        }
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
