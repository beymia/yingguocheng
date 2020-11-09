<template>
  <view class="invoice_info">
    <view class="invoice_content">
      <form action="">
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
                <radio :checked="type ===2" color="#17A1FF" value="type"/>
                <text class="incoive_radio_text">商品類別</text>
              </label>
              <label @click="toggleInvoice('type',1)" class="invoice_radio">
                <radio :checked="type ===1" color="#17A1FF" value="detail"/>
                <text class="incoive_radio_text">商品明細</text>
              </label>
            </radio-group>
          </view>
          <view class="invoice_items invoice_look">
            <radio-group class="invoice_title">
              <text>發票擡頭</text>
              <label @click="toggleInvoice('lookUp',2)" class="invoice_radio">
                <radio :checked="lookUp ===2" color="#17A1FF" value="personal"/>
                <text class="incoive_radio_text">個人</text>
              </label>
              <label @click="toggleInvoice('lookUp',1)" class="invoice_radio">
                <radio :checked="lookUp ===1" color="#17A1FF" value="unit"/>
                <text class="incoive_radio_text">單位</text>
              </label>
            </radio-group>
          </view>

          <view class="invoice_items invoice_email">
            <label class="invoice_title">
              <text>抬頭內容</text>
              <input
                  v-model="lookUpContent"
                  type="text"
                  placeholder="（必填）">
            </label>
          </view>

          <view class="invoice_items invoice_email">
            <label class="invoice_title">
              <text>郵箱地址</text>
              <input v-model="email"
                     type="text"
                     placeholder="（必填）">
            </label>
          </view>

          <view class="invoice_items invoice_email">
            <label class="invoice_title">
              <text>個人識別號</text>
              <input
                  v-model="identify"
                  type="text"
                  placeholder="（單位申報必填）">
            </label>
          </view>

        </view>
      </form>
    </view>
    <view class="tips">
      <view class="tips_title">
        <text>温馨提示：</text>
      </view>
      <view class="tips_content">
        <text>應國家稅務局總局要求，您若開具增值稅普通發票，須同時提供企業擡頭及納稅人識別號，否則將無法用於企業報銷。</text>
      </view>
    </view>
    <view @click="invoicing" class="invoice_submit">
      <button class="submit_btn" plain>提交申請</button>
    </view>
  </view>
</template>

<script>
import {invoice} from "../../request/api";
//发票相关信息填写
export default {
  data() {
    return {
      invoiceAmount: 0,
      email: '',
      type: 1,
      lookUp: 1,
      lookUpContent: '',
      identify: ''
    }
  },
  onLoad(options) {
    this.invoiceAmount = options.invoiceAmount;
    this.orderId = options.id;
  },
  methods: {
    async invoicing() {
      let {email, type, lookUp, lookUpContent, identify} = this;

      //填寫不完整提示信息,發票抬頭為個人是抬頭內容可以不寫
      if (!email || !type || !lookUp || !lookUpContent || (lookUp === 1 && !identify)) {
        this.customToast('請填寫完整', false)
        return;
      }

      //驗證郵箱格式是否正確
      let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      this.$nextTick(async () => {
        if (!(reg.test(this.email))) {
          this.customToast('郵箱格式錯誤', false)
          return;
        }

        //驗證完成提交申請
        if (this.type && this.lookUp) {
          uni.showLoading({
            title: '申請中'
          })
          //接口所需信息
          let invoiceInfoObj = {
            order_id: this.orderId,
            invoice_title: lookUpContent,
            invoice_type: type,
            email_address: email,
            identify_id: identify
          }

          //个人抬头并且没有个人识别号删除个人识别号字段
          if (this.lookUp === 2 && !this.lookUpContent) {
            delete invoiceInfoObj.identify_id;
          }
          try {
            //申请开票，开票成功后跳转到订单页面
            await invoice(invoiceInfoObj)
            this.customToast('申請成功')
            uni.redirectTo({
              url: '/pages/orderForm/orderForm'
            })
          } catch (e) {
            this.customToast('申請失敗')
          }
        }
      })
    },
    //更改发票的一些信息
    toggleInvoice(t, v) {
      this[t] = v;
    },
  }
}
</script>

<style lang="scss" scoped>
uni-page-body {
  height: 100%;
}

.invoice_info {
  width: 100%;
  height: 100%;
  background: $main-bg;
  padding: $spacing-lg $spacing-base;
  box-sizing: border-box;

  .invoice_content {
    width: 100%;
    background: #FFFFFF;
    border-radius: 20rpx;
    padding: 0 $spacing-base;
    box-sizing: border-box;

    /* H5端改版单选框的默认样式*/
    /* #ifdef H5 | APP-PLUS*/
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
  }

  .tips {
    margin-top: $spacing-lg + 2rpx;
    font-size: $font-size-sm - 2rpx;
    color: $font-color3;
    box-sizing: border-box;


    .tips_title {
      margin-bottom: 20rpx;
    }

    /* #ifdef H5 | SPP-PLUS*/
    .tips_title {
      margin-bottom: 20rpx;
      transform: scale(0.9);
    }

    .tips_content {
      transform: scale(0.9);
    }

    /* #endif*/
  }

  /* #ifndef H5*/
  .tips {
    padding: 0 $spacing-lg;
  }

  /* #endif*/

  .invoice_submit {
    width: 702rpx;
    height: 78rpx;
    position: fixed;
    left: 0;
    bottom: 50rpx;
    margin-left: $spacing-base;

    .submit_btn {
      height: 100%;
      padding: 0;
      margin: 0;
      font-size: $font-size-base;
      color: #ffffff;
      background: $main-color;
      border: none
    }
  }
}
</style>
