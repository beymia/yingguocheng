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
             <text>当前星球经验值{{user.empiric}}/{{user.n_empiric}}</text>
            </view>
          <progress activeColor="#17a1ff"
                    backgroundColor="#f0f0f0"
                    :percent="exProgress">
          </progress>
        </view>
      </view>
    </view>
    <view class="cut_off"></view>
    <!--礼包领取-->
    <view class="pack">
      <view class="month">
        <view class="title">
          <text>每月登記權益</text>
          <text>根據購買日期，每月容易時間領取</text>
        </view>
        <view class="content">
          <options @recive-start="receiveStart" :list="month"></options>
        </view>
      </view>
      <view class="cut_off"></view>
      <view class="knight">
        <view class="title">
          <text>{{ user.level_title }}權益</text>
          <text>{{ user.level_title }}有效期內可以使用</text>
        </view>
        <view class="content">
          <options @recive-start="receiveStart" :list="interests"></options>
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
import options from "./components/options";
const APP = getApp().globalData
export default {
  data() {
    return {
      user:{},
      exProgress:0,
      month:[],
      interests:[]
    }
  },
  async mounted() {
    this.user = APP.userInfo;
    this.exProgress = (this.user.empiric / this.user.n_empiric) * 100
    //不相干的兩個請求，同時發送
    Promise.all([await monthPack(), await interestsPark()])
        .then(value => {
          this.month = value[0].data;
          this.interests = value[1].data
          this.month.forEach((item) => {
            item.type = 'month'
          })
          this.interests.forEach((item) => {
            item.type = 'interests'
          })
        }).catch(e => {
      console.log(e);
      this.customToast('出現了錯誤', false)
    })
  },
  methods: {
   async receiveStart(e){
     uni.showLoading({
       title: '領取中'
     })
     if (e.type === 'month') {
       try {
         await receivePack({park_id: e.id})
         this.customToast('領取成功')
       } catch (e) {
         console.log(e);
         this.customToast('領取失敗')
       }
     } else if (e.type === 'interests') {
       try {
         await receiveKnight({park_id: e.id})
         this.customToast('領取成功')
       } catch (e) {
         console.log(e);
         this.customToast('領取失敗')
       }
     }
   },
  },
  components:{
    options
  }
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
    margin-bottom: 60rpx;

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
      margin: 35rpx 0;

      text:nth-child(2){
        font-size: $font-size-sm -+ 2rpx;
        font-weight: $font-weight-base;
        color: $font-color3;
        margin-left: 10rpx;
      }
    }
  }
}
.cut_off{
  width: 100vw;
  height: $spacing-lg;
  background-color: #F5F6F8;
  margin-left: -$spacing-lg;
}
</style>
