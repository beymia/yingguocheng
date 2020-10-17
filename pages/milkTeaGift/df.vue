<template>
  <view class="container">
    <!--    头部-->
    <view class="head">
      <view class="left">
        <text @click="swiperChange" :class="[swiperIndex===0 ? 'active':'']">購買奶茶有裡</text>
      </view>
      <view class="right">
        <text @click="swiperChange" :class="[swiperIndex===1 ? 'active':'']">我的奶茶有裡</text>
      </view>
    </view>
    <swiper @change="toggleFeat"
            @animationfinish="isSlide = true"
            :style="{'height':swiperHeight}"
            :current="swiperIndex">
      <!--購買奶茶有禮-->
      <swiper-item class="buy_foresee">
        <view class="content_list" v-for="list in foreseeList" :key="list.id">
          <view class="title">
            <text>{{ list.norm_name }}</text>
          </view>
          <swiper next-margin="40rpx"
                  display-multiple-items="2"
                  enable-flex
                  :scroll-x="true"
                  class="list">
            <swiper-item class="list_item"
                         @click="navPage(list.child[im])"
                         v-for="(foresee,im) in (list.child)"
                         :key="im">
              <!-- TODO 替換圖片鏈接 foreseeList.worth_price-->
              <image :src="'../../static/images_t/milkTeaGift/img.png'"></image>
            </swiper-item>
          </swiper>
        </view>
      </swiper-item>
      <!--我的奶茶有礼-->
      <swiper-item class="have_foresee">
        <myForeseePage @buy-foreseeList="swiperChange" :foresee="haveForesee"></myForeseePage>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import {
  milkList,
  myForesee,
  buyForesee,
  mutualRecord
} from "../../request/api";

import swiperSwitch from "../../components-lk/swiperSwitch/swiperSwitch";
import myForeseePage from './components/myForeseePage'

export default {
  data() {
    return {
      foreseeList: [
        {
          id: "16022649",
          norm_name: "流心波波卡",
          child: [
            {
              id: "1602670752262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            }, {
              id: "1602670725262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            }, {
              id: "1602677252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            }, {
              id: "1602670725222564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },
          ]
        },  {
          id: "1602667262842649",
          norm_name: "流心波波卡",
          child: [
            {
              id: "1602670752262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            }, {
              id: "1602670725262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            }, {
              id: "1602677252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            }, {
              id: "1602670725222564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },
          ]
        }, {
          id: "1602662062842649",
          norm_name: "流心波波卡",
          child: [
            {
              id: "1602670725226254",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            }, {
              id: "160267252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            }, {
              id: "1602670725262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            }, {
              id: "160267072522664",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },
          ]
        }, {
          id: "160266762842649",
          norm_name: "流心波波卡",
          child: [
            {
              id: "16027252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            }, {
              id: "16026707262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            }, {
              id: "1602677252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            }, {
              id: "160267072564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },
          ]
        }, {
          id: "16026672842649",
          norm_name: "流心波波卡",
          child: [
            {
              id: "1602670762564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            }, {
              id: "1602670722564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            }, {
              id: "1602670725262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            }, {
              id: "160262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },
          ]
        }, {
          id: "160266842649",
          norm_name: "流心波波卡",
          child: [
            {
              id: "1602662564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            }, {
              id: "160262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            }, {
              id: "16026764",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            }, {
              id: "160252262564",
              card_name: "恰杯茶啵",
              home_avatar: "/uploads/202010/14/160267063599194.jpg",
              worth_price: "60"
            },
          ]
        },
      ],
      activeFeat: 'buy',
      haveForesee: [
        {
          id: "1602761166363589",
          worth_price: "60.00",
          home_avatar: "/uploads/202010/14/160267063599194.jpg"
        }, {
          id: "1602761616363589",
          worth_price: "60.00",
          home_avatar: "/uploads/202010/14/160267063599194.jpg"
        }, {
          id: "1602761161363589",
          worth_price: "60.00",
          home_avatar: "/uploads/202010/14/160267063599194.jpg"
        }, {
          id: "1602761161636589",
          worth_price: "60.00",
          home_avatar: "/uploads/202010/14/160267063599194.jpg"
        },],
      swiperIndex:0,
      swiperHeight:'',
      isSlide:true,
    }
  },
  async mounted() {
    await this.computeHeight()
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
    navPage(f) {
      uni.navigateTo({
        url: '/pages/foreseeDetails/foreseeDetails?foresee=' + encodeURIComponent(JSON.stringify(f))
      })
    },
    //swiper改变时触发
    swiperChange() {
      this.swiperIndex === 0
          ? this.swiperIndex = 1
          : this.swiperIndex = 0;
      this.isSlide = false;
    },
    //计算swiper组件的高度,兼容小程序异步调用
    async computeHeight(){
      this.swiperHeight='';
      //屏幕滚动至最顶部，如果屏幕在非顶部可能会导致无法获取组件的布局信息
      uni.pageScrollTo({
        scrollTop:0,
        duration:0,
      })
      let layout,
          footLayout;
      try{
        if(this.swiperIndex===0){
          layout = await this.getLayoutInfo('.content_list');
          this.swiperHeight = (this.foreseeList.length * layout.height + layout.top) + 'px'
        }else{
          if(this.haveForesee.length){
            /* #ifndef MP*/
            layout =await this.getLayoutInfo('.foresee_container');
            footLayout=await this.getLayoutInfo('.foot');
            this.swiperHeight = layout.height + layout.top + footLayout.height + 'px';
            /* #endif*/
            /* #ifdef MP*/
            layout =await this.getLayoutInfo('.have_foresee');
            this.swiperHeight = layout.height + 'px';
            /* #endif*/
          }else{
            this.swiperHeight = '100%';
          }
        }
      }catch (e) {
        this.swiperHeight = '100%';
      }
    },
    //swiper手动滑动切换展示板块
    toggleFeat(e){
      if(!this.isSlide) return;
      this.swiperChange()
      this.isSlide = true;
    }
  },
  watch:{
    async swiperIndex(){
      await this.computeHeight()
    }
  },
  components: {
    myForeseePage,
    swiperSwitch
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

  swiper{
    height: 100%;

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
          height: 200rpx;
          white-space: nowrap;
          margin-bottom: $spacing-lg;

          .list_item{
            display: inline-block;
            width: 300rpx;
          }
        }
      }
    }

    .have_foresee{
      padding-top: 150rpx;
      width: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      background-color: $main-bg;
    }
  }
}
</style>
