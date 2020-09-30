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

    <!-- 無訂單展示的页面 lk-->
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
      <view @click="empty=false" style="width: 100%;height: 60rpx;background-color: pink; text-align: center;">有值页面
      </view>
    </view>

    <!-- 当前订单展示頁面 -->
    <view v-else-if="!empty&&activeFeat==='current'" class="order_detail">
      <orderDetail @order-click="orderPayment" :orderFormData="orderFormData"></orderDetail>
    </view>

    <!-- 歷史訂單頁面 -->
    <view v-else-if="!empty&&activeFeat==='history'" class="order_history">
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
                     url="/pages/bulkInvoice/bulkInvoice">
            <image src="../../static/images/orderForm/invoice.png"></image>
            <button plain>批量開票</button>
          </navigator>
        </view>
      </view>
      <view>
        <orderDetail :orderFormData="sliceOrder"></orderDetail>
      </view>
    </view>
  </view>
</template>

<script>
import headNav from '../../components-lk/headNav/headNav.vue'
import orderDetail from '../../components-lk/orderDetail/orderDetail.vue'
import api from '../../request/api'
export default {
  data() {
    return {
      headNavText: '想對你說',
      headNAVIcon: 'email',
      activeFeat: 'history',
      empty: true,
      historyType: 'takeaway',
      orderFormData: [{
        haul_method: '自提',
        shop_name: '合肥尚澤大都會店',
        pay_status: '製作中',
        goods: [{
          id: "15996445868596547",
          home_avatar: '../../static/images_t/orderForm/shop.png',
          goods_name: '多肉芒芒甘露',
          norm: '正常,标准甜',
          goods_num: 1,
          goods_price: 15
        },],
        created_at: '2020-08-18 12:14',
        payment_info: '￥15'
      },{
        haul_method: '自提',
        shop_name: '合肥尚澤大都會店',
        pay_status: '製作中',
        goods: [{
          id: "15996445868596547",
          home_avatar: '../../static/images_t/orderForm/shop.png',
          goods_name: '多肉芒芒甘露',
          norm: '正常,标准甜',
          goods_num: 1,
          goods_price: 15
        },],
        created_at: '2020-08-18 12:14',
        payment_info: '￥15'
      },{
        haul_method: '自提',
        shop_name: '合肥尚澤大都會店',
        pay_status: '待支付',
        goods: [{
          id: "15996445868596547",
          home_avatar: '../../static/images_t/orderForm/shop.png',
          goods_name: '多肉芒芒甘露',
          norm: '正常,标准甜',
          goods_num: 1,
          goods_price: 15
        },{
          id: "15996445868596547",
          home_avatar: '../../static/images_t/orderForm/shop.png',
          goods_name: '多肉葡萄冰棒',
          norm: '正常,不另外加糖',
          goods_num: 1,
          goods_price: 15
        },
        ],
        created_at: '2020-08-18 12:14',
        payment_info: '￥15'
      },
      ],
      historyData: [{
        haul_method: '自提',
        shop_name: '合肥尚澤大都會店',
        pay_status: '已完成',
        goods: [{
          id: "15996445868596547",
          home_avatar: '../../static/images_t/orderForm/shop2.png',
          goods_name: '多肉芒芒甘露',
          norm: '正常,标准甜',
          goods_num: 1,
          goods_price: 15
        },],
        created_at: '2020-08-18 12:14',
        payment_info: '￥15'
      },{
        haul_method: '外卖',
        shop_name: '合肥尚澤大都會店',
        pay_status: '已完成',
        goods: [{
          id: "15996445868596547",
          home_avatar: '../../static/images_t/orderForm/shop2.png',
          goods_name: '多肉芒芒甘露',
          norm: '正常,标准甜',
          goods_num: 1,
          goods_price: 15
        },],
        created_at: '2020-08-18 12:14',
        payment_info: '￥15'
      },{
        haul_method: '外卖',
        shop_name: '合肥尚澤大都會店',
        pay_status: '已完成',
        goods: [{
          id: "15996445868596547",
          home_avatar: '../../static/images_t/orderForm/shop2.png',
          goods_name: '多肉芒芒甘露',
          norm: '正常,标准甜',
          goods_num: 1,
          goods_price: 15
        },],
        created_at: '2020-08-18 12:14',
        payment_info: '￥15'
      },
      ],
      oneSelfOrder:[],
      takeawayOrder:[],
    }
  },
  computed:{
    /*
    * 将外卖订单和自提订单分割出来
    * 根据展示板块动态切换传递给展示组件的数据
    * */
    sliceOrder(){
      this.takeawayOrder = [];
      this.oneSelfOrder = [];
      this.historyData.forEach((item)=>{
        if(item.haul_method === '外卖'){
          this.takeawayOrder.push(item)
        }else{
          this.oneSelfOrder.push(item)
        }
      });
      if(this.historyType === 'oneself'){
        return this.oneSelfOrder
      }
      return this.takeawayOrder
    },
  },
  mounted() {
      api.orderForm()
    },
  methods: {
    toggleFeat(feat) {
      if(feat === 'history'){
        this.headNavText = '英國城探秘'
        this.headNAVIcon = ''
      }else{
        this.headNavText = '想對你說'
        this.headNAVIcon = 'email'
      }
      this.activeFeat = feat;
    },
    navDescription() {
      uni.navigateTo({
        url: '/pages/wantTell/wantTell'
      })
    },
    /*
   * 跳转至订单结算页面
   * */
    orderPayment(g) {
      getApp().globalData.goodsPaymeny = g.order.goods;
      console.log(g);
      uni.navigateTo({
        url: '/pages/orderPayment/orderPayment',
      })
    },
  },
  components: {
    headNav,
    orderDetail
  }
}
</script>

<style lang="scss" scoped>
uni-page-body{
  min-height: 100%;background-color: $order-bg;
}
.order_form {
  width: 100%;
  background-color: $order-bg;
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
    background-color: $order-bg;

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
    padding: 128rpx $order-spacing-base $order-spacing-lg $order-spacing-base;
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
