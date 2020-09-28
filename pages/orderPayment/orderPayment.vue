<template>
  <view class="order_payment">
    <!--头部-->
    <view class="order_payment_head">
      <view class="shop_name">
        <text>合肥正大廣場店 ></text>
        <text>距離您3.0km</text>
      </view>
      <view class="receiving_method">
        <view class="oneself">
          <text>自取</text>
        </view>
        <view class="other_people">
          <text>外賣</text>
        </view>
        <view class="shop">
          <text>堂食</text>
        </view>
      </view>
      <view class="phone">
        <view class="phone_input">
          <label>
            <input placeholder="聯系電話" type="number">
          </label>
        </view>
        <button class="auto_fill" plain>自動填寫</button>
      </view>
    </view>
    <!--取茶时间-->
    <view class="order_time">
      <view class="time_title">
        <text>取茶時間</text>
      </view>
      <view class="order_progress">
        <text>前面杯制作中，</text>
        <text class="text_color">11單/29</text>
        <text>預計</text>
        <text class="text_color">17分鐘</text>
        <text>後取茶</text>
      </view>
      <view class="current_progress">
        <progress percent="60"></progress>
      </view>
    </view>
    <!--商品列表-->
    <view class="goods_list">
      <view class="list_title">
        <text>商品列表</text>
      </view>
      <view class="list_detail">
        <view class="goods_img">
          <image></image>
        </view>
        <view class="goods_info">
          <view class="goods_name">
            <text>多肉芒芒甘露</text>
          </view>
          <view class="goods_extra_info">
            <text>常規吸管，</text>
            <text>冰沙(推薦)，</text>
            <text>標準杯(500ml)，</text>
            <text> 正常(推薦）</text>
          </view>
          <view class="goods_amount">
            <text>￥27</text>
            <text>x1</text>
          </view>
        </view>
      </view>
      <view class="attach_service">
        <view class="service1">
          <view class="left">
            <view class="left_name">
              <text> 正常(推薦）</text>
              <text>推薦選擇</text>
            </view>
            <view class="left_dev">
              <text>保冷保暖，鎖住新鮮口感</text>
            </view>
          </view>
          <view class="right">
            <label>
              <text>￥1.5</text>
              <radio/>
            </label>
          </view>
        </view>
        <view class="service2">
          <view class="left">
            <text>優惠券</text>
            <image></image>
          </view>
          <view class="right">
            <text>暫無可用 ></text>
          </view>
        </view>
        <view class="service3">
          <view class="left">
            <text>備註</text>
          </view>
          <view class="right">
            <text>不打包 ></text>
          </view>
        </view>
      </view>
      <view class="count_amount">
        <text>共1件商品</text>
        <text>小計￥27</text>
      </view>
    </view>
    <!--支付方式-->
    <view class="payment_method">
      <text>支付方式</text>
      <view>
        <image></image>
        <text>微信支付</text>
      </view>
    </view>
    <!--底部-->
    <view class="payment_foot">
      <view class="payment_amount">
        <text>合計</text>
        <text>￥27</text>
      </view>
      <view class="payment_btn">
        <button plain>支付</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      orderType: 'oneself'
    }
  },
  methods: {}
}
</script>

<style>

</style>
