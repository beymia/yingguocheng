<template>
  <view class="order_payment">
    <!--头部-->
    <view class="order_payment_head">
      <view :class="['name_method',goodsData.haul_method===2?'one_self':'']">
        <view class="shop_name">
          <text style="display: inline">{{ goodsData.shop_name }}</text>
          <uni-icons style="display: inline-block;vertical-align: middle"
                     type="arrowright"
                     size="35"
                     color="#333333">
          </uni-icons>
          <text v-if="goodsData.haul_method === 2">距離您{{ goodsData.distance }}km</text>
          <text v-else>{{ goodsData.contact_name }}({{ goodsData.contact_sex }}) {{ goodsData.contact_phone }}</text>
        </view>
        <view class="receiving_method">
          <view :class="[goodsData.haul_method === 2 ? 'active_method' : '']">
            <text>自取</text>
          </view>
          <view :class="['other_people',goodsData.haul_method === 1 ? 'active_method' : '']">
            <text>外賣</text>
          </view>
          <view :class="['shop',goodsData.haul_method === 3 ? 'active_method' : '']">
            <text>堂食</text>
          </view>
        </view>
      </view>
      <!--聯繫電話-->
      <view class="phone" v-if="goodsData.haul_method === 1">
        <view class="phone_input">
          <label>
            <text>聯系電話</text>
            <input maxlength="11" :value="userPhone" type="number">
          </label>
        </view>
        <button @click="autoFill" class="auto_fill" plain>自動填寫</button>
      </view>
    </view>
    <!--取茶时间-->
    <view class="order_time">
      <view class="time_title">
        <text>取茶時間</text>
      </view>
      <view class="order_progress">
        <text>前面</text>
        <text class="text_color">{{ goodsData.current_order }}單/{{ goodsData.current_cups }}杯</text>
        <text>制作中，</text>
        <text>預計</text>
        <text class="text_color">{{ goodsData.current_cups }}分鐘</text>
        <text>後取茶</text>
      </view>
      <view class="current_progress">
        <progress activeColor="#17a1ff" backgroundColor="#f0f0f0" :percent="computeProgress"></progress>
      </view>
    </view>
    <!--商品列表-->
    <view class="goods_list">
      <view class="list_detail">
        <view class="list_title">
          <text>商品列表</text>
        </view>
        <view v-for="(goods,index) in goodsData.goods_data" :key="index" class="goods_detail">
          <view class="goods_img">
            <image :src="goods.home_avatar"></image>
          </view>
          <view class="goods_info">
            <view class="goods_name">
              <text>{{ goods.goods_name }}</text>
            </view>
            <view class="goods_extra_info">
              <text class="goods_straw">{{ goods.norm }}</text>
            </view>
          </view>
          <view class="goods_amount">
            <text>￥{{ goods.goods_price }}</text>
            <text>x{{ goods.goods_num }}</text>
          </view>
        </view>
      </view>
      <!--附加服務-->
      <view class="attach_service">
        <view class="delivery_fee" v-if="goodsData.haul_method===1">
          <view class="left">
            <text>配送費</text>
          </view>
          <view class="right">
            <text>￥{{ goodsData.delivery_cost }}</text>
          </view>
        </view>
        <view class="service1">
          <block v-for="attachItem in attach" :key="attachItem.id">
            <view class="left">
              <view class="left_name">
                <text>{{ attachItem.attach_name }}</text>
                <text>推薦選擇</text>
              </view>
              <view class="left_des">
                <text></text>
              </view>
            </view>
            <view @click="addAttachFee(attachItem.id)" class="right">
              <label>
                <text>￥{{ attachItem.attach_price }}</text>
                <radio :checked="attachArr.indexOf(attachItem.id) !== -1" color="#17A1FF"/>
              </label>
            </view>
          </block>
        </view>
        <view class="service2">
          <view class="left">
            <text>優惠券</text>
            <text>券</text>
          </view>
          <view class="right">
            <view>
              <text v-if="!couponInfo.length">暫無可用</text>
              <text @click="navDiscount"
                    style="color:#17A1FF;"
                    v-if="couponInfo.length&&!discountAmount">{{ couponInfo.length }}個可用
              </text>
              <uni-icons @click="navDiscount"
                         v-if="!discountAmount"
                         style="display: inline-block;vertical-align: middle"
                         type="arrowright"
                         size="35"
                         color="#999999">
              </uni-icons>
            </view>
            <view v-if="discountAmount" class="discount">
              <view>【{{ discountAmount }}元抵用券】-￥{{ discountAmount }}</view>
              <image @click="discountAmount = 0" src="../../static/images/orderPayment/discount.png"></image>
            </view>
          </view>
        </view>
        <!--訂單備註-->
        <view class="service3">
          <view @click="isRemarks = !isRemarks" class="left">
            <text>備註</text>
          </view>
          <view @click="isRemarks = !isRemarks" class="right">
            <text class="remarks_content">{{remarksSelect}}</text>
<!--            <text v-if="remarksData.noContact">無接觸配送，</text>-->
<!--            <text v-if="remarksData.paper">纸巾，</text>-->
<!--            <text v-if="remarksData.sugar">糖包</text>-->
            <uni-icons style="display: inline-block;vertical-align: middle;position: absolute;top: 0;right: 0"
                       type="arrowright"
                       size="35"
                       color="#999999">
            </uni-icons>
          </view>
        </view>
      </view>
      <view class="count_amount">
        <text>共{{ goodsData.goods_data.length }}件商品，小計</text>
        <text>￥{{ totalAmount }}</text>
      </view>
    </view>
    <!--支付方式-->
    <view :class="['payment_method',goodsData.haul_method===1?'one_self':'']">
      <text>支付方式</text>
      <view>
        <image src="../../static/images/orderPayment/weixin_icon.png"></image>
        <text>微信支付</text>
      </view>
    </view>
    <!--底部-->
    <view class="payment_foot">
      <view class="payment_amount">
        <text>合計</text>
        <text>￥{{ totalAmount }}</text>
      </view>
      <view @click="startPay" class="payment_btn">
        <button plain>支付</button>
      </view>
    </view>
    <view class="empty"></view>
    <view v-if="isRemarks" class="remarks">
      <remarks
          :remarks="remarksArr"
          :remarksSelect="remarksSelect"
          @close-remarks="closeRemarks">
      </remarks>
    </view>
  </view>
</template>

<script>
import remarks from "../../components-lk/remarks/remarks";
import {createOrder, paymentAttach, paymentStart, usedCoupon} from "../../request/api";
import order from "../order/order";

const APP = getApp().globalData;
export default {
  data() {
    return {
      userPhone: '',
      isRemarks: false,
      remarksArr: ['無接觸配送', '紙巾', '糖包'],
      remarksSelect:'',//选中的备注
      discountAmount: 0,
      goodsPrice: 0,
      goodsData: [],
      attach: {},
      totalAmount: 0,
      attachArr: [],
      couponInfo: [],
      paymentStatus: false,//订单的支付状态，为true时禁止再次点击支付
    }
  },
  computed: {
    //計算取茶時間進度條
    computeProgress() {
      let {current_cups, current_order} = this.goodsData;
      return (current_order / current_cups) * 100;
    }
  },

  async onLoad() {
    this.goodsData = APP.goodsPayment;//订单整体数据
    this.goods_data = [];//订单单个商品的信息，创建订单时传递给后台的数据
    this.goodsId = ''//订单的单个商品的id,用户获取当前订单可使用的优惠券

    //獲取訂單傳參數據
    this.goodsData.goods_data.forEach((item, index) => {
      this.goodsId += item.id;
      this.goods_data.push({
        id: item.id,
        num: item.goods_num,
        norm: item.norm_id
      })
    });

    //订单总金额
    this.totalAmount = parseFloat(this.goodsData.payment_info)

    //獲取附加服務信息
    try {
      this.attach = (await paymentAttach()).data
    } catch (e) {
      console.log(e);
      this.attach = {}
    }

    //獲取可使用的優惠券信息
    try {
      let temp = (await usedCoupon({
        vehicle_method: this.goodsDatahaul_method,
        goods_id: this.goodsId,
        total_price: this.totalAmount
      })).data
      //優惠券返回一個對象，轉換為數組
      for (let key in temp) {
        if (temp.hasOwnProperty(key)) {
          this.couponInfo.push(temp[key])
        }
      }
    } catch (e) {
      console.log(e);
      this.couponInfo = [];
    }
  },
  onShow() {
    //页面展示时从全局对象中获取优惠券的金额
    if (APP.coupon.goods_quota) {
      this.discountAmount = APP.coupon.goods_quota;
    } else {
      this.discountAmount = 0;
      this.couponInfo = []
    }
  },
  onUnload() {
    this.paymentStatus = false;
    //页面卸载时清空优惠券金额
    APP.coupon = {};
  },
  methods: {
    //自動輸入手機號
    autoFill() {
      this.userPhone = APP.userInfo.mobile;
    },

    //訂單備註
    closeRemarks(remarks) {
      console.log(remarks);
      this.isRemarks = false;
      this.remarksSelect = remarks
    },
    //跳轉至優惠券
    navDiscount() {
      if (!this.couponInfo.length) return;
      uni.navigateTo({
        url: '/pages/discount/discount?couponInfo=' + encodeURIComponent(JSON.stringify(this.couponInfo))
      })
    },
    //使用附加服務
    addAttachFee(id) {
      let self = this;
      self.isAttach = !self.isAttach;
      self.attach.forEach((item) => {
        if (item.id === id) {
          if (self.isAttach) {
            self.totalAmount += parseFloat(this.attach[0].attach_price);
            self.attachArr.push(id)
          } else {
            self.totalAmount -= parseFloat(this.attach[0].attach_price)
            self.attachArr.splice(self.attachArr.indexOf(id), 1)
          }
        }
      })
    },
    //開始支付
    async startPay() {
      //订单为支付状态时再次点击支付直接返回
      if (this.paymentStatus) return;
      this.paymentStatus = true;
      let self = this;
      uni.showLoading({
        title: '請稍後'
      })
      //創建訂單
      let {shop_id, shop_name, address_id, haul_method} = self.goodsData;
      //傳參對象
      let paramsObj = {
        shop_id,//訂單id
        shop_name,
        address_id,
        haul_method,
        goods_data: this.goods_data,
        remake: '',
        attach_id: '',
        ticket_id: APP.coupon.id,
      }
      paramsObj.goods_data = JSON.stringify(paramsObj.goods_data)
      //訂單備註
      for (let key in self.remarksData) {
        if (self.remarksData.hasOwnProperty(key)) {
          if (self.remarksData[key]) {
            paramsObj.remake += (self.remarksData[key] + ',');
          }
        }
      }
      if (paramsObj.remake) {
        paramsObj.remake = paramsObj.remake.substr(0, paramsObj.remake.length - 1);
      }
      //附加信息
      if (self.attachArr.length) {
        self.attachArr.forEach((item) => {
          paramsObj.attach_id += item + ',';
        })
        paramsObj.attach_id = paramsObj.attach_id.substr(0, paramsObj.attach_id.length - 1);
      }
      //選填參數沒有值直接刪除
      for (let key in paramsObj) {
        if (paramsObj.hasOwnProperty(key)) {
          if (!paramsObj[key]) {
            delete paramsObj[key]
          }
        }
      }
      //创建订单
      // try {
      //    orderNum = (await createOrder(paramsObj)).data.order_id;
      //    orderInfo = (await paymentStart({order_id: orderNum, shop_id: paramsObj.shop_id})).data
      // } catch (e) {
      //   self.customToast('订单创建失败')
      //   console.log(e);
      //   return;
      // }
      //支付订单
      //发起微信支付
      try {
        let orderId = (await createOrder(paramsObj)).data.order_id;
        let orderInfo = (await paymentStart({order_id: orderId, shop_id: paramsObj.shop_id})).data
        console.log(1);
        await self.utilPayment(orderInfo)
        await self.paymentSuccess();
      } catch (e) {
        self.paymentStatus = false;
        console.log(e);
      }
    },
    //订单结算成功，跳转至订单页
    async paymentSuccess() {
      this.paymentStatus = false;
      this.customToast('结算成功');
      uni.switchTab({
        url: '/pages/orderForm/orderForm',
      })
    }
  },
  watch: {
    discountAmount(newAmount, oldAmount) {
      newAmount = parseFloat(newAmount);
      oldAmount = parseFloat(oldAmount)
      newAmount ? this.totalAmount -= newAmount : this.totalAmount += oldAmount;
    },
  },
  components: {
    remarks
  }
}
</script>

<style lang="scss" scoped>

.order_payment {
  width: 100%;
  height: 100%;
  background-color: #F7F7F7;
  color: $font-color1;
  font-weight: $font-weight-base;

  .order_payment_head {
    width: 100%;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 $spacing-base;
    box-sizing: border-box;

    .name_method {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &.one_self{
        border-bottom: 1rpx solid rgba(204, 204, 204, .5);
      }

      .shop_name {
        font-size: $font-size-lg + 2rpx;
        font-weight: $font-weight-lg;

        text:nth-child(3) {
          font-size: $font-size-sm + 2rpx;
          color: $font-color2;
          display: block;
          margin: 10rpx 0 $spacing-lg 0;
          font-weight: $font-weight-base;
        }
      }

      .receiving_method {
        width: 240rpx;
        height: 68rpx;
        background: #f6f6f6;
        border: 1rpx solid $main-color;
        border-radius: 34rpx;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: $font-size-sm;
        color: $main-color;

        view {
          flex: 1;
          text-align: center;
          width: 80rpx;
          height: 58rpx;
          line-height: 58rpx;

          &.active_method {
            background: $main-color;
            border-radius: 29rpx;
            color: #FFFFFF;
          }
        }
      }
    }

    .phone {
      width: 100%;
      height: 46rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: $spacing-lg + 4rpx 0;

      .phone_input {
        font-size: $font-size-base;
        color: $font-color1;

        label {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;

          input {
            font-size: $font-size-base;
            color: $font-color1;
            margin-left: 20rpx;
          }
        }
      }

      .auto_fill {
        width: 118rpx;
        height: 46rpx;
        background: #ffffff;
        border: 1rpx solid $main-color;
        border-radius: 6rpx;
        font-size: $font-size-sm;
        color: $main-color;
        padding: 0;
        margin: 0;
        line-height: 46rpx;
      }
    }
  }

  .order_time {
    width: 100%;
    min-height: 210rpx;
    margin-top: $spacing-base;
    background: #FFFFFF;
    padding: $spacing-lg $spacing-base;
    box-sizing: border-box;
    font-size: $font-size-base;
    color: $font-color1;
    display: flex;
    flex-direction: column;

    .order_progress {
      font-size: $font-size-sm;
      color: $font-color3;
      margin: 20rpx 0;

      .text_color {
        color: $main-color;
        font-size: $font-size-base
      }
    }

    .current_progress {
      width: 702rpx;
      height: 30rpx;
      background: #f0f0f0;
      border-radius: 15rpx;
      overflow: hidden;

      /* #ifdef H5 | APP-PLUS */
      /deep/ .uni-progress-bar {
        height: 30rpx !important;
      }

      /deep/.uni-progress-inner-bar {
        border-radius: 15rpx;
      }
      /* #endif*/
    }
  }

  .goods_list {
    width: 100%;
    padding: $spacing-lg $spacing-base;
    box-sizing: border-box;
    background: #FFFFFF;
    margin-top: $spacing-base;

    .list_detail {
      width: 100%;
      min-height: 220rpx;
      border-bottom: 1rpx solid rgba(204, 204, 204, .4);
      display: flex;
      flex-direction: column;
      box-sizing: border-box;

      .list_title {
        height: 40rpx;
        font-size: $font-size-base;
        color: $font-color1;
      }

      .goods_detail {
        width: 100%;
        margin-top: $spacing-lg;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        position: relative;

        .goods_img {
          margin-right: 20rpx;

          image {
            width: 120rpx;
            height: 120rpx;
            vertical-align: middle;
          }
        }

        .goods_info {
          align-self: center;

          .goods_name {
            font-size: $font-size-base;
            font-weight: $font-weight-lg;
            color: $font-color1;
            margin-bottom: 10rpx;
          }

          .goods_extra_info {
            height: 60rpx;
            font-size: $font-size-sm - 2rpx;
            color: $font-color3;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
          }
        }

        .goods_amount {
          min-width: 75rpx;
          height: 91rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: absolute;
          right: 0;
          text-align: center;

          text:nth-child(1) {
            font-size: $font-size-lg + 2rpx;
            font-weight: $font-weight-lg;
            color: $font-color1;
          }

          text:nth-child(2) {
            font-size: $font-size-sm;
            color: $font-color3;
          }
        }
      }
    }

    .attach_service {
      width: 100%;
      font-size: $font-size-sm;
      color: $font-color1;
      padding-top: $spacing-lg;
      box-sizing: border-box;

      .service1,
      .service2,
      .service3,
      .delivery_fee{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: $spacing-lg;

        .left {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        .right{
          position: relative;
        }
      }

      .service1 {
        .left {
          .left_name {
            align-self: flex-start;

            text:nth-child(2) {
              flex: 1;
              display: inline-block;
              width: 80rpx;
              height: 30rpx;
              background: $main-color;
              border-radius: 4rpx;
              color: #FFFFFF;
              font-size: $font-size-sm - 6rpx;
              text-align: center;
              line-height: 30rpx;
              margin-left: 10rpx;
              overflow: hidden;
              vertical-align: middle;
            }
          }

          .left_des {
            flex: 1;
            font-size: $font-size-sm - 2rpx;
            color: $main-color;
            padding-top: 10rpx;
          }
        }

        .right {
          height: 34rpx;
          font-size: $font-size-sm;
          color: $font-color1;

          text {
            margin-right: 10rpx;
          }

          /* #ifdef H5 | APP-PLUS*/
          /deep/.uni-radio-input {
            width: 34rpx;
            height: 34rpx;
            margin-right: 0;
          }

          /* #endif*/
        }
      }

      .service2,
      .service3 {
        .right {
          font-size: $font-size-sm;
          color: #cccccc;
        }
      }
      .service3{
        .right{
          color: $font-color1;
          align-self: flex-start;

          .remarks_content{
            display: block;
            max-width:400rpx;
            overflow:hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-right: 40rpx;
          }
        }
      }
      .service2{
        min-height: 46rpx;

        .left{
          position: relative;
          text:nth-child(2){
            width: 30rpx;
            height: 30rpx;
            background: $main-color;
            border-radius: 4rpx;
            font-size: $font-size-sm - 4rpx;
            color: #ffffff;
            text-align: center;
            line-height: 30rpx;
            position: absolute;
            left: 82rpx;
          }
        }

        .right{
          .discount{
            min-width: 254rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: center;

            view {
              min-width: 214rpx;
              height: 46rpx;
              border: 2rpx solid $main-color;
              border-radius: 23px;
              font-size: $font-size-sm - 4rpx;
              color: $main-color;
              line-height: 42rpx;
              text-align: center;
              box-sizing: border-box;
              margin-right: 10rpx;
            }

            image{
              width: 34rpx;
              height: 34rpx;
              vertical-align: middle;
            }
          }
        }
      }
    }

    .count_amount {
      width: 100%;
      text-align: right;
      height: 33rpx;
      font-size: $font-size-sm;
      color: $font-color1;

      text:nth-child(2) {
        font-size: $font-size-lg + 2rpx;
        font-weight: $font-weight-lg;
        vertical-align: middle;
      }
    }
  }

  .payment_method {
    width: 100%;
    height: 93rpx;
    background: #FFFFFF;
    font-size: $font-size-sm;
    color: $font-color1;
    padding: 0 $spacing-base;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &.one_self{
      margin-top: $spacing-lg;
    }

    view {
      display: flex;
      align-items: center;

      image {
        width: 29rpx;
        height: 25rpx;
        vertical-align: middle;
        margin-right: 10rpx;
      }
    }
  }

  .payment_foot {
    width: 100%;
    height: 97rpx;
    background: #ffffff;
    border-top: 1rpx solid #cccccc;
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;

    .payment_amount {
      font-size: $font-size-sm;
      color: $font-color1;
      line-height: 97rpx;
      margin-right: $spacing-lg;
      margin-left: 10rpx;

      text:nth-child(2) {
        font-size: $font-size-sm + 2rpx;
        font-weight: $font-weight-lg;
        color: $main-color;
      }
    }

    button {
      border: none;
      width: 200rpx;
      height: 97rpx;
      background: $main-color;
      font-size: $font-size-base;
      color: #ffffff;
      padding: 0;
      line-height: 97rpx;
      border-radius: 0;
    }
  }

  .empty {
    width: 100%;
    height: 96rpx;
  }
}
</style>
