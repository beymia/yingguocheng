<template>
  <view class="member_benefits">
    <!--頭部-->
    <view class="member_name">
      <view>{{user.user_name}}</view>
      <view>購買記錄</view>
    </view>
    <!--經驗值-->
    <view class="ex">
      <image mode="widthFix" src="../../static/images_t/memberBenefits/ex_bg.png"></image>
      <view class="ex_info">
        <view class="level">
          <text>LV.{{user.level}}</text>
          <uni-icons class="icon"
                     style="display: inline-block;vertical-align: middle"
                     type="info"
                     size="30"
                     color="#cccccc">
          </uni-icons>
        </view>
        <view class="progress">
          <view class="text">
           <text>当前星球经验值50/300</text>
          </view>
          <progress activeColor="#17a1ff"
                    backgroundColor="#f0f0f0"
                    :percent="exProgress">
          </progress>
        </view>
      </view>
    </view>
    <!--礼包领取-->
    <view class="pack">
      <view class="month">
        <viwe class="title">
          <text>每月登記權益</text>
          <text>根據購買日期，每月容易時間領取</text>
        </viwe>
      </view>
      <view class="knight">
        <view class="title">
          <text>{{ user.level_title }}權益</text>
          <text>{{ user.level_title }}有效期內可以使用</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  monthPack,
  receivePack,
  interestsPark,
  receiveKnight
} from "../../request/api";

const APP = getApp().globalData
export default {
  data() {
    return {
      user:{},
      exProgress:20,
      month:[],
      interests:[]
    }
  },
 async mounted(){
    this.user = APP.userInfo;
      //不相干的兩個請求，同時發送
      Promise.all([await monthPack(),await interestsPark()])
          .then(value=>{
            console.log(value);
          }).catch(e=>{
        console.log(e);
        uni.showToast({
          title:'出現了錯誤',
          icon:'none',
          duration:2000
        })
      })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.member_benefits{
  width: 100%;
  padding:$spacing-base;
  box-sizing: border-box;

  .member_name{
    width: 100%;
    height: 113rpx;
    font-size: $font-size-lg;
    font-weight: $font-weight-lg;
    color: $font-color1;
    display: flex;
    justify-content: space-between;

    view:nth-child(2){
      width: 120rpx;
      height: 44rpx;
      border: 2rpx solid $main-color;
      border-radius: 4rpx;
      font-size: $font-size-sm - 2rpx;
      text-align: center;
      line-height: 40rpx;
      color: $main-color;
    }
  }

  .ex{
    width: 100%;
    height: 280rpx;
    position: relative;

    image{
      width: 110%;
      height: 280rpx;
      margin-left: -5%;
    }

    .ex_info{
      width: 100%;
      position: absolute;
      top: 50rpx;
      left: 50rpx;
      bottom: 50rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .level{
        font-size: $font-size-lg + 4rpx;
        font-weight: $font-weight-lg;
        color: $font-color1;
      }

      .progress{
        font-size: $font-size-sm;
        color: $font-color1;

        progress{
          width: 300rpx;
          height: 8rpx;
          background: #f5f5f5;
          border-radius: 4rpx;
          margin-top: 10rpx;
        }
      }
    }


  }

  .pack{

    .title{
      font-size: $font-weight-base;
      font-weight: $font-weight-lg;
      color: $font-color1;

      text:nth-child(2){
        font-size: $font-size-sm -+ 2rpx;
        font-weight: $font-weight-base;
        color: $font-color3;
      }
    }
  }
}
</style>
