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
    <view v-if="empty" class="empty_order">
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
    <view v-if="activeFeat==='current'" class="order_detail">
      <orderDetail @order-click="orderPayment" :orderFormData="currentOrderForm.data"></orderDetail>
    </view>

    <!-- 歷史訂單頁面 -->
    <view v-if="activeFeat==='history'" class="order_history">
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
        <orderDetail :orderFormData="sliceOrder"></orderDetail>
      </view>
    </view>

    <!--登录提示框-->
    <loginBox v-if="!loginBoxShow" @close-login-box="loginBoxShow = true"></loginBox>
  </view>
</template>

<script>
import headNav from '../../components-lk/headNav/headNav.vue'
import orderDetail from '../../components-lk/orderDetail/orderDetail.vue'
import loginBox from "../../components-lk/loginBox/loginBox";

import {orderForm} from '../../request/api'

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
      takeawayOrder: [],//外卖订单
      invoiceData: [],//未开发票订单
      loginBoxShow: false,
    }
  },
  computed: {
    /*
    * 将外卖订单和自提订单分割出来
    * 根据展示板块动态切换传递给展示组件的数据
    * 訂單數據為空直接返回，不做處理
    * */
    sliceOrder() {
      if (!this.historyOrderForm.data || !this.historyOrderForm.data.length) return []
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
        if (item.invoice_status === '1') {
          this.invoiceData.push(item)
        }
      });
      if (this.historyType === 'oneself') {
        return this.oneSelfOrder
      }
      return this.takeawayOrder
    },
  },

  //頁面每次展示都重新獲取本地storage中的token值
  onShow() {
    this.token = APP.userToken;
  },

  mounted() {
    this.getOrderForm()
  },

  methods: {
    //獲取數據
    async getOrderForm() {
      this.token = getApp().globalData.userToken;
      //用戶登錄成功時再去獲取訂單信息
      if (this.token) {
        //token有值就隐藏登陆提示框
        this.loginBoxShow = true;
        try {
          let result = await this.requestOrder()
          console.log(result);
          if (!result) {
            console.log(1);
            this.empty = true;
            return
          }
          //如果没有接收到数据则展示订单为空
          this.empty = false;
          this.activeFeat === 'history' ? this.historyOrderForm = result : this.currentOrderForm = result
        } catch (e) {
          console.log(e)
          uni.showToast({
            title: '訂單獲取失敗',
            duration: 2000,
            icon: 'none'
          })
        }
      }
    },
    //请求数据，已经有数据后不再请求
    async requestOrder() {
      return (await orderForm({
        type: this.activeFeat === 'history' ? 2 : 1,
        page: this.activeFeat === 'history' ? this.historyOrderForm.page : this.currentOrderForm.page,
      })).data;
    },

    async toggleFeat(feat) {
      this.activeFeat = feat;
      if (feat === 'history') {
        this.headNavText = '英國城探秘'
        this.headNAVIcon = '';
        //第一页的数据只请求一次
        if (!this.historyOrderForm.data.length) {
          this.historyOrderForm.data = await this.requestOrder()
        }
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

    // 跳转至订单结算页面
    orderPayment(g) {
      getApp().globalData.goodsPayment = g.order;
      uni.navigateTo({
        url: '/pages/orderPayment/orderPayment',
      })
    },
  },

  watch:{
    activeFeat(){}
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
    z-index: 999;
    position: sticky;
    top: 128rpx;
  ;

    .current,
    .history {
      width: 128rpx;
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
    padding: 128rpx $spacing-base $spacing-lg $spacing-base;
  }

  .order_history {
    display: flex;
    flex-direction: column;

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
