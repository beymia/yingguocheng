<template>
  <view class="order_form">
    <headNav @nav-click="navDescription" :text="headNavText" :iconURL="headNAVIcon"></headNav>
    <!--展示页面切换 lk -->
    <view class="head_feat">
      <view @click="toggleFeat('current')"
            :class="['current',activeFeat === 'current'? 'active_feat':'']">
        <text>當前訂單</text>
      </view>
      <view @click="toggleFeat('history')"
            :class="['history',activeFeat === 'history' ? 'active_feat':'']">
        <text>歷史訂單</text>
      </view>
    </view>

    <!-- 無訂單展示的页面 用戶沒有登錄，或者登錄後訂單數據為空時展示-->
    <view v-if="isEmpty" class="empty_order">
      <view class="empty_img">
        <image src="../../static/images_t/orderForm/orderFormEmpty.png"></image>
      </view>
      <view class="empty_text">
        <text>您今天還沒有下單</text>
        <text>快去選擇一杯喜歡的茶吧</text>
      </view>
      <navigator class="go_order"
                 hover-class="none"
                 open-type="switchTab"
                 url="/pages/order/order">去點單
      </navigator>
      <!-- 測試 -->
    </view>

    <!-- 当前订单展示頁面 -->
    <view v-if="activeFeat==='current' && currentOrderForm.data.length " class="order_detail">
      <orderDetail @order-click="orderPayment" :orderFormData="currentOrderForm.data"></orderDetail>
    </view>

    <!-- 歷史訂單頁面 -->
    <view v-if="activeFeat==='history' && historyOrderForm.data.length " class="order_history">
      <view class="history_head">
        <view class="history_head_content">
          <view>
            <button @click="historyType='oneself'"
                    :class="{active_btn:historyType==='oneself'}"
                    plain>自提訂單
            </button>
            <button @click="historyType='takeaway'"
                    :class="{active_btn:historyType==='takeaway'}"
                    plain>外賣訂單
            </button>
          </view>
          <navigator hover-class="none"
                     open-type="navigate"
                     :url="`/pages/bulkInvoice/bulkInvoice?invoice=${JSON.stringify(invoiceData)}`">
            <image src="../../static/images/orderForm/invoice.png"></image>
            <button plain>批量開票</button>
          </navigator>
        </view>
      </view>
      <view>
        <noMoreData v-if="!sliceOrder.length"></noMoreData>
        <orderDetail v-else :orderFormData="sliceOrder"></orderDetail>
      </view>
    </view>

    <!--登录提示框-->
    <loginBox v-show="loginBoxShow" @close-login-box="hideLoginBox"></loginBox>
  </view>
</template>

<script>
import headNav from '../../components-lk/headNav/headNav.vue'
import orderDetail from '../../components-lk/orderDetail/orderDetail.vue'
import loginBox from "../../components-lk/loginBox/loginBox";

import {orderForm, paymentStart} from '../../request/api'

const APP = getApp().globalData

export default {
  data() {
    return {
      headNavText: '想對你說',
      headNAVIcon: 'email',
      activeFeat: 'current',
      empty: true,
      historyType: 'takeaway',
      currentOrderForm: {data: [], page: 1},
      historyOrderForm: {data: [], page: 1},
      oneSelfOrder: [],//自提订单
      takeawayOrder: [],//外賣订单
      invoiceData: [],//未开发票订单
      loginBoxShow: false,
      paymentStatus: false,//订单结算状态
    }
  },
  computed: {
    //分离出外賣订单，自提订单，未开发票订单
    sliceOrder() {
      this.empty = false;
      this.takeawayOrder = [];
      this.oneSelfOrder = [];
      this.invoiceData = [];
      this.historyOrderForm.data.forEach((item) => {
        if (item.haul_method === '外卖') {
          this.takeawayOrder.push(item)
        } else {
          this.oneSelfOrder.push(item)
        }
        //分离未开发票订单
        if (item.invoice_status === '1' && item.pay_status !== '已完成') {
          this.invoiceData.push(item)
        }
      });
      if (this.historyType === 'oneself') {
        return this.oneSelfOrder
      }
      return this.takeawayOrder
    },

    //判断是否展示空页面
    isEmpty() {
      if (this.activeFeat === 'current') {
        return !(this.currentOrderForm.data.length)
      } else if (this.activeFeat === 'history') {
        return !(this.historyOrderForm.data.length)
      }
    },
  },

  //页面每次展示重新获取token，请求重新请求订单数据
  async onShow() {
    this.loginBoxShow = APP.isLoginBox = false;
    if (APP.userToken) {
      this.loginBoxShow = APP.isLoginBox = false;
      this.token = APP.userToken
      try {
        await this.getData()
      } catch (e) {
        this.loginBoxShow = APP.isLoginBox = true;
      }
    } else {
      this.loginBoxShow = APP.isLoginBox = true;
    }
  },

  onHide() {
    this.paymentStatus = false;
  },

  methods: {
    //点击隐藏登陆引导框
    hideLoginBox() {
      this.loginBoxShow = APP.isLoginBox = false;
    },
    //请求数据
    async requestOrder(type, page) {
      return (await orderForm({type, page})).data;
    },

    //同时请求两种订单格式，没有值时设置空数组
    async getData() {
      uni.showLoading({
        title: '請稍後'
      })
      try {
        this.currentOrderForm.data = (await this.requestOrder(1, this.currentOrderForm.page) || [])
        this.historyOrderForm.data = (await this.requestOrder(2, this.historyOrderForm.page) || [])
        uni.hideLoading()
      } catch (e) {
        this.customToast('訂單信息獲取失敗')
      }
    },

    //切換展示頁
    toggleFeat(feat) {
      this.activeFeat = feat;
      if (feat === 'history') {
        this.headNavText = '英國城探秘'
        this.headNAVIcon = '';
      } else {
        this.headNavText = '想對你說'
        this.headNAVIcon = 'email'
      }
    },

    navDescription() {
      uni.navigateTo({
        url: '/pages/wantTell/wantTell'
      })
    },

    // 没有支付的订单，点击直接支付
    async orderPayment(g) {
      if (this.paymentStatus) return;
      this.paymentStatus = true;
      uni.showLoading({
        title: '结算中...'
      })
      let self = this,//缓存this
          order = g.order,//当前点击的订单
          orderInfo;//订单的预支付信息
      try {
        //获取订单预支付信息
        orderInfo = (await paymentStart({order_id: order.id, shop_id: order.shop_id,})).data
        //调起支付接口
        await self.utilPayment(orderInfo)
        //支付成功重新获取数据
        await self.getData()
        self.paymentStatus = false;
        self.customToast('结算成功')
      } catch (e) {
        self.paymentStatus = false;
        uni.hideLoading()
        console.log(e);
      }
    },
  },

  components: {
    headNav,
    orderDetail,
    loginBox
  }
}
</script>

<style lang="scss" scoped>
uni-page-body{
  min-height: 100%;
  background-color: $main-bg;
}
.order_form {
  width: 100%;
  background-color: $main-bg;
  min-height: 100%;

  .head_feat {
    width: 100%;
    height: 100rpx;
    background: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 1;
    position: sticky;
    /* #ifndef MP-WEXIN*/
    top: 168rpx;
    /* #endif*/
    /* #ifdef MP-WEIXIN*/
    top:128rpx;
    /* #endif*/
  ;

    .current,
    .history {
      font-size: $font-size-lg;
      font-weight: $font-weight-lg;
      text-align: left;
      color: $font-color1;
      line-height: 100rpx;
      box-sizing: border-box;

      &.active_feat {
        height: 100%;
        border-bottom: 4rpx solid #333;
      }
    }

  }

  .empty_order {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 228rpx;
    background-color: $main-bg;

    .empty_img {
      width: 264rpx;
      height: 264rpx;
      vertical-align: middle;
    }

    .empty_text {
      width: 264rpx;
      height: 126rpx;
      display: flex;
      flex-direction: column;
      font-size:  $font-size-sm;
      font-weight: $font-weight-base;
      text-align: center;
      color: $font-color3;
    }

    .go_order {
      width: 360rpx;
      height: 78rpx;
      border-radius: 6rpx;
      background: $main-color;
      font-size:  $font-size-base;
      font-weight: $font-weight-base;
      text-align: center;
      line-height: 78rpx;
      color: #ffffff;
      border: none;
    }
  }

  .order_detail,
  .order_history {
    /* #ifndef MP-WEIXN*/
    padding: 128rpx $spacing-base $spacing-lg $spacing-base;
    /* #endif*/
    /* #ifdef MP-WEIXIN*/
    padding: 128rpx $spacing-base $spacing-lg $spacing-base;
    /* #endif*/
  }

  .order_history {
    display: flex;
    flex-direction: column;
    /* #ifdef APP-PLUS*/
    padding-top:162rpx;
    /* #endif*/

    .history_head {
      width: 100%;
      height: 74rpx;

      .history_head_content {
        display: flex;
        height: 74rpx;
        align-items: flex-end;
        justify-content: space-between;

        view,navigator {

          button {
            width: 120rpx;
            height: 44rpx;
            border: none;
            font-size:  $font-size-sm - 2rpx;
            font-weight: $font-weight-base;
            color: $font-color2;
            text-align: center;
            line-height: 44rpx;
            padding: 0;
            margin: 0;

            &.active_btn {
              background: #fff;
              border-radius: 6rpx;
              color: $main-color;
            }
          }
        }

        view:nth-child(1) {
          width: 300rpx;
          display: flex;
          justify-content: space-between;
        }

        navigator {
          display: flex;
          line-height: 44rpx;
          align-items: center;

          image {
            width: 23rpx;
            height: 21rpx;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>
