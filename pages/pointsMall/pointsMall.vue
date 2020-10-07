<template>
  <view class="points_mall">
    <!--頭部-->
    <view class="integral">
      <view class="integral_info">
        <text>可用積分</text>
        <text>{{ integral }}</text>
        <view class="spend">
          <text>積分明細</text>
          <text class="empty"></text>
          <text>兌換記錄</text>
        </view>
      </view>
      <view class="integral_img">
        <image src="../../static/images_t/pointsMall/package_img.png"></image>
      </view>
    </view>
    <!--積分商品-->
    <view class="integral_goods">
      <view class="head">
        <text :class="active==='GO'?'active_goods':''">GO會員專區</text>
        <text :class="active==='planet'?'active_goods':''">星球會員專區</text>
      </view>
      <view class="goods">
        <view class="goods_container">
          <!--商品條目-->
          <view class="goods_item" v-for="(goods,index) in convertList" :key="index">
            <view class="goods_img">
              <image :src="goods.home_avatar"></image>
            </view>
            <view class="goods_name">
              <text>{{ goods.goods_name }}</text>
            </view>
            <view class="goods_cost">
              <text>{{ goods.barter_integral }}</text>
              <text>積分</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {convert} from "../../request/api";

export default {
  data() {
    return {
      integral: 0,
      convertList: [],
      active: 'GO'
    }
  },
  onLoad(options) {
    this.integral = options.integral;
  },
  async mounted() {
    getApp().globalData.userToken = '1'
    this.token = getApp().globalData.userToken
    if (!this.token) return;
    this.convertList = await this.getConvertList(2)
  },
  methods: {
    async getConvertList(type) {
      return (await convert({token: this.token, type})).data
    }
  }
}
</script>

<style>

</style>
