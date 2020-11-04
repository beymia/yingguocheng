<template>
  <view class="points_goods">
    <view class="goods_img">
      <image :src="goods.home_avatar | filterImg"></image>
    </view>
    <view class="description">
      <rich-text :nodes="goods.goods_detail" ></rich-text>
    </view>
    <view @click="redeemNow" class="btn">
      <button plain>立即兌換</button>
    </view>
    <view class="empty"></view>
  </view>
</template>

<script>
import {pointsGoodsDetail, redeemGifts, userSpace} from "../../request/api";

const APP = getApp().globalData
export default {
  data() {
    return {
      goods:{}
    }
  },
 async onLoad(options){
    try{
      this.goods = (await pointsGoodsDetail({goods_id:options.params})).data
    }catch (e) {
      console.log(e);
      this.customToast('詳情獲取失敗')
    }
  },
  methods: {
    async redeemNow(){
      //已有積分少於商品積分直接返回
      if(APP.userInfo.integral < this.goods.barter_integral) {
        this.customToast('積分不足',false)
        return
      }

     try{
       uni.showLoading({title:'兌換中'})
       await redeemGifts({goods_id:this.goods.id})
       APP.userInfo = (await userSpace()).data
       this.customToast('兌換成功')
     }catch (e){
       console.log(e);
       this.customToast('兌換失敗')
     }
    },
  }
}
</script>

<style lang="scss" scoped>
.points_goods{
  width: 100%;
  padding: 0 $spacing-base;
  box-sizing: border-box;

  .goods_img{
    width: 100%;
    height: 410rpx;
    margin-bottom: 45rpx;
    padding-top: 30rpx;

    image{
      width: 100%;
      vertical-align: middle;
    }
  }
  .btn{
    width: 702rpx;
    height: 78rpx;
    background: $main-color;
    border-radius: 10rpx;
    position: fixed;
    bottom: 40rpx;

    button{
      border: none;
      text-align: center;
      line-height: 78rpx;
      padding: 0;
      font-size: $font-size-base;
      color: #ffffff;
    }
  }

  .empty{
    width: 100%;
    height: 120rpx;
  }
}
</style>
