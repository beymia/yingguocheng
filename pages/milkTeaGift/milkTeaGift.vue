<template>
  <view class="container">
    <!--    头部-->
    <view class="head">
      <view class="left">
        <text @click="activeFeat='buy'" :class="[activeFeat==='buy' ? 'active':'']">購買奶茶有裡</text>
      </view>
      <view class="right">
        <text @click="activeFeat='my'" :class="[activeFeat==='my' ? 'active':'']">我的奶茶有裡</text>
      </view>
    </view>
    <!--購買奶茶有禮-->
    <view v-if="activeFeat==='buy'" class="buy_foresee">
      <view class="content_list" v-for="list in foreseeList" :key="list.id">
        <view class="title">
          <text>{{ list.norm_name }}</text>
        </view>
        <scroll-view enable-flex :scroll-x="true" class="list">
          <view class="list_item"
                @click="navPage(list.child[im])"
                v-for="(foresee,im) in (list.child)"
                :key="im">
            <!-- TODO 替換圖片鏈接 foresee.worth_price-->
            <image :src="'../../static/images_t/milkTeaGift/img.png'"></image>
          </view>
        </scroll-view>
      </view>
    </view>
    <!--我的奶茶有礼-->
    <view v-else class="have_foresee">
      <myForeseePage :foresee="haveForesee"></myForeseePage>
    </view>
  </view>
</template>

<script>
import {
  milkList,
  myForesee,
  buyForesee,
  mutualRecord
} from "../../request/api";

import myForeseePage from './components/myForeseePage'
export default {
  data() {
    return {
      foreseeList: [
        {
          id: "16026672062842649",
          norm_name: "流心波波卡",
          child: [
            {
              id: "16026707252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },{
              id: "16026707252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },{
              id: "16026707252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },{
              id: "16026707252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },
          ]
        },{
          id: "16026672062842649",
          norm_name: "流心波波卡",
          child: [
            {
              id: "16026707252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },{
              id: "16026707252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },{
              id: "16026707252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },{
              id: "16026707252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },
          ]
        },{
          id: "16026672062842649",
          norm_name: "流心波波卡",
          child: [
            {
              id: "16026707252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },{
              id: "16026707252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },{
              id: "16026707252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },{
              id: "16026707252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },
          ]
        },{
          id: "16026672062842649",
          norm_name: "流心波波卡",
          child: [
            {
              id: "16026707252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },{
              id: "16026707252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },{
              id: "16026707252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },{
              id: "16026707252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },
          ]
        },{
          id: "16026672062842649",
          norm_name: "流心波波卡",
          child: [
            {
              id: "16026707252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },{
              id: "16026707252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },{
              id: "16026707252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },{
              id: "16026707252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },
          ]
        },
      ],
      activeFeat:'buy',
      haveForesee: [{
        id: "16027611616363589",
        worth_price: "60.00",
        home_avatar: "/uploads/202010/14/160267063599194.jpg"
      }, {
        id: "16027611616363589",
        worth_price: "60.00",
        home_avatar: "/uploads/202010/14/160267063599194.jpg"
      }, {
        id: "16027611616363589",
        worth_price: "60.00",
        home_avatar: "/uploads/202010/14/160267063599194.jpg"
      }, {
        id: "16027611616363589",
        worth_price: "60.00",
        home_avatar: "/uploads/202010/14/160267063599194.jpg"
      },]
    }
  },
  async mounted() {
    await this.getForesee()
  },
  methods: {
    //获取数据列表
    async getForesee() {
      // this.foreseeList = ((await milkList()).data || [])
    },
    //获取我的卡片
    async getMyForesee() {
    },
    //获取购买记录
    async getBuyRecord() {
    },
    //获取收送记录
    async getMutualRecord() {
    },
    //跳轉至預付卡詳情
    navPage(f){
      uni.navigateTo({
        url:'/pages/foreseeDetails/foreseeDetails?foresee='+ encodeURIComponent(JSON.stringify(f))
      })
    }
  },
  components:{
    myForeseePage
  }
}
</script>

<style lang="scss" scoped>
image{
  width: 300rpx;
  height: 200rpx;
  vertical-align: middle;
}
.container{
  width: 100%;
  min-height: 100%;
  
  .head{
    width: 100%;
    height: 120rpx;
    position: fixed;
    top: --status-bar-height;
    left: 0;
    z-index: 10;
    background: #FFFFFF;
    display: flex;
    justify-content: space-around;
    font-size: $font-size-lg;
    color: $font-color2;
    padding-top: 20rpx;
    line-height: 100rpx;

    text{
    display: inline-block;
    }

    .active{
      color: $font-color1;
      font-weight: $font-weight-lg;
      position: relative;
      height: 100%;

      &::after{
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        width: 80rpx;
        height: 4rpx;
        background: $font-color1;
        left: 50%;
        margin-left: -40rpx;
      }
    }
  }

  .buy_foresee{
    padding-top: 150rpx;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: $main-bg;

    .content_list{
      width: 100%;
      padding: 0 $spacing-base;
      box-sizing: border-box;

      .title{
        font-size: $font-size-base;
        color: $font-color1;
        margin-bottom: 10rpx;
      }

      .list{
        width: 100%;
        height: 230rpx;
        white-space: nowrap;

        .list_item{
          display: inline-block;
          width: 300rpx;
          margin-right: 20rpx;
        }
      }
    }
  }

  .have_foresee{
    padding-top: 150rpx;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: $main-bg;
  }
}
</style>
