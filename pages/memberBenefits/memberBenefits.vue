<template>
  <view class="member_benefits">
    <!--頭部-->
    <view class="member_name">
      <view>{{ user.user_name }}</view>
      <view @click="navRecord">購買記錄</view>
    </view>
    <!--經驗值-->
    <view class="ex">
      <view class="img">
        <image mode="widthFix" src="../../static/images_t/memberBenefits/ex_bg.png"></image>
      </view>
      <view class="ex_info">
        <view class="level">
          <text>LV.{{ user.level }}</text>
          <uni-icons class="icon"
                     style="display: inline-block;vertical-align: middle"
                     type="info"
                     size="30"
                     color="#cccccc">
          </uni-icons>
        </view>
        <view class="progress">
          <view class="text">
            <text>當前星球經驗值{{ user.empiric }}/{{ user.n_empiric }}</text>
          </view>
          <view class="pro_com">
            <progress activeColor="#17a1ff"
                      backgroundColor="#f0f0f0"
                      active
                      :percent="exProgress">
            </progress>
          </view>
        </view>
      </view>
    </view>
    <view class="cut_off"></view>
    <!--礼包领取-->
    <view class="pack">
      <!--等级礼包-->
      <view class="level">
        <view class="title">
          <text>等級禮包</text>
          <!--          <text>根據購買日期，每月容易時間領取</text>-->
        </view>
        <view class="content">
          <options @recive-start="receiveStart" :list="level"></options>
        </view>
      </view>
      <view class="cut_off"></view>
      <!--月度礼包-->
      <view class="month">
        <view class="title">
          <text>每月權益禮包</text>
          <text>根據購買日期，每月同一時間領取</text>
        </view>
        <view class="content">
          <options @recive-start="receiveStart" :list="month"></options>
        </view>
      </view>
      <view class="cut_off"></view>
      <!--会员权益礼包-->
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
  levelPack,
  receiveLevel,
  monthPack,
  receivePack,
  interestsPark,
  receiveKnight, userSpace
} from "../../request/api";
import options from "./components/options";

const APP = getApp().globalData
//会员权益，开通会员后才可进入
export default {
  data() {
    return {
      user: {},
      exProgress: 0,
      level: [],
      month: [],
      interests: []
    }
  },
  async mounted() {
    this.user = APP.userInfo;

    if(this.user.level_title === '普通会员'){
      uni.showModal({
        title:'您還沒有開通會員',
        success(res){
          if(res.confirm){
            uni.redirectTo({
              url:'/pages/joinMember/joinMember'
            })
          }
        }
      })
    }

    //计算经验值进度条
    this.exProgress = (this.user.empiric / this.user.n_empiric) * 100
    //不相干的請求，同時發送
    await this.getPackData()
  },
  methods: {
    //获取礼包数据
    getPackData() {
      Promise.all([levelPack(), monthPack(), interestsPark()])
          .then(data => {
            this.level = data[0].data || [];
            this.month = data[1].data || [];
            this.interests = data[2].data || [];
            //接口数据没有标注礼包类型，手动添加
            this.level.forEach((item) => {
              item.type = 'level'
            })
            this.month.forEach((item) => {
              item.type = 'month'
            })
            this.interests.forEach((item) => {
              item.type = 'interests'
            })
          })
    },
    //领取礼包
    async receiveStart(e) {
      uni.showLoading({
        title: '領取中'
      })
      try {
        switch (e.type) {
          case 'level':
            await receiveLevel({park_id: e.id})
            break;
          case 'month':
            await receivePack({park_id: e.id})
            break;
          case 'interests':
            await receiveKnight({park_id: e.id})
        }
        this.customToast('領取成功')
        APP.userInfo = (await userSpace()).data
      } catch (e) {
        console.log(e);
        this.customToast('領取失敗')
      }
    },
    //跳轉購買記錄
    navRecord(){
      uni.navigateTo({
        url:'/pages/rechargeRecord/rechargeRecord'
      })
    },
  },
  components: {
    options
  }
}
</script>

<style lang="scss" scoped>
.member_benefits{
  width: 100%;
  padding:0 $spacing-base;
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
    margin-bottom: 40rpx;

    .img{
      width: 100%;
      height: 280rpx;
      overflow: hidden;
      position: relative;
      border-radius: 20rpx;

      image{
        width: 130%;
        height: 130%;
        vertical-align: middle;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
      }
    }

    .ex_info{
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

        .pro_com{
          width: 300rpx;
          height: 8rpx;
          background: #f5f5f5;
          border-radius: 4rpx;
          margin-top: 10rpx;
          overflow: hidden;

          progress{
            width: 300rpx;


            &.wx-progress-bar {
              height: 8rpx !important;
              border-radius: 4rpx !important;
            }
          }
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
