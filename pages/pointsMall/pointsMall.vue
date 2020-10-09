<template>
  <view class="points_mall">
    <!--頭部-->
    <view class="integral">
      <view class="integral_info">
        <text>可用積分</text>
        <text>{{ integral }}</text>
        <view class="spend">
          <text @click="navPage('pointsDetails')">積分明細</text>
          <view class="empty"></view>
          <text @click="navPage('exchangeRecord')">兌換記錄</text>
        </view>
      </view>
      <view class="integral_img">
        <image src="../../static/images_t/pointsMall/package_img.png"></image>
      </view>
    </view>

    <!--空的分割线-->
    <view class="separate"></view>
    <!--積分商品-->
    <view class="integral_goods">
      <view class="head">
        <text @click="active='GO'" :class="active==='GO'?'active_goods':''">GO會員專區</text>
        <text @click="active='planet'" :class="active==='planet'?'active_goods':''">星球會員專區</text>
      </view>
        <view class="goods_container">
          <!--商品條目-->
          <view class="goods_item"
                v-for="(goods,index) in convertList"
                :key="index">
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
          <view v-if="convertList.length % 2" class="empty"></view>
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
      GOList:[],
      planetList:[],
      active: 'GO'
    }
  },
  onLoad(options) {
    this.integral = options.integral;
  },
  async mounted() {
    //TODO: 生產環境需要刪除自定义的用户token
    getApp().globalData.userToken = '1'
    this.token = getApp().globalData.userToken
    if (!this.token) return;
    this.GOList = await this.getConvertList()
    this.convertList = this.GOList
  },
  methods: {
    //请求积分商品数据
    async getConvertList() {
      return (await convert({token: this.token, type: this.active === 'GO' ? 2 : 1})).data
    },
    //
    navPage(page){
      console.log(1);
      uni.navigateTo({
        url:`/pages/${page}/${page}`
      })
    }
  },
  watch: {
    async active(value) {
      if (!this.planetList.length) {
        this.planetList = await this.getConvertList();
      }
      if(value === 'GO'){
        this.convertList = this.GOList
      }else if(value ==='planet'){
        this.convertList = this.planetList
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .points_mall{
    width: 100%;
    min-height: 100%;
    padding: 0 $spacing-base;
    box-sizing: border-box;

    .integral{
      width: 100%;
      min-height: 280rpx;
      padding: 37rpx 0 56rpx 0;
      box-sizing: border-box;
      background:#FFFFFF;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .integral_info{
        height: 178rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size:$font-size-sm;
        color: $font-color1;

        text,.spend{
          flex: 1;
        }

        text:nth-child(2){
          font-size: $font-size-lg + 12rpx;
          font-weight: $font-weight-lg;
          margin-left: 35rpx;
        }

        .spend{
          width: 262rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .empty{
            width: 1rpx;
            height: 30rpx;
            background-color: $font-color1;
          }

          text:nth-child(3){
            text-align: right;
          }
        }
      }

      .integral_img{
        image{
          width: 220rpx;
          height: 195rpx;
          vertical-align:middle;
        }
      }
    }

    .separate{
     width: 100vw;
      height: 20rpx;
      background-color: #F5F6F8;
      margin-left:  -$spacing-base;
    }

    .integral_goods{
      width: 100%;
      padding-top: $spacing-lg;

      .head{
        height: 55rpx;
        font-size: $font-size-sm - 2rpx;
        color: $font-color3;
        display: flex;

        text:nth-child(2){
          margin-left: 50rpx;
        }

        .active_goods{
          font-size: $font-size-base;
          font-weight: $font-weight-lg;
          color: $main-color;
          position: relative;

          &:after{
            width: 98rpx;
            height: 5rpx;
            content: '';
            display: block;
            background: #17a1ff;
            border-radius: 3rpx;
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -49rpx;
          }
        }
      }

      .goods_container{
        width: 100%;
        margin-top: 50rpx;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        .goods_item{
          width: 290rpx;
          min-height: 280rpx;
          margin-bottom: 50rpx;

          image{
            width: 290rpx;
            height: 160rpx;
            vertical-align: middle;
            margin-bottom: 20rpx;
          }

          .goods_name{
            font-size:$font-size-base;
            font-weight: $font-weight-lg;
            color: $font-color1;
          }

          .goods_cost{
            font-size: $font-size-lg + 4rpx;
            color: $main-color;

            text:nth-child(2){
              font-size: $font-size-sm;
              color: $font-color3;
            }
          }
        }

        .empty{
          width: 290rpx;
          min-height: 280rpx;
          margin-bottom: 50rpx;
        }
      }
    }
  }
</style>
