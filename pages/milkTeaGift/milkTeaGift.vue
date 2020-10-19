<template>
  <view class="container">
    <swiperSwitch leftTitle="購買奶茶有禮"
                  rightTitle="我的奶茶有禮"
                  :assign-index="assignIndex"
                  @swiper-end="assignIndex = false">
      <template v-slot:left>
        <!--購買奶茶有禮-->
        <view class="buy_foresee">
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
        </view>
      </template>
      <template v-slot:right>
        <!--我的奶茶有礼-->
        <view class="have_foresee">
          <myForeseePage @buy-foreseeList="assignIndex++"
                         @give-start="giveInfo"
                         :foresee="haveForesee"></myForeseePage>
        </view>
      </template>
    </swiperSwitch>

    <!--赠送好友-->
    <view v-if="isGive" class="give" @touchmove.prevent.stop="catchTouch">
      <view class="mark">
        <view class="content">
          <uni-icons @click="closeGive"
                     class="icon"
                     type="close"
                     size="40"
                     color="#cccccc">
          </uni-icons>
          <view class="title">贈送好友</view>
          <input v-model="givePhone" type="number" maxlength="11" placeholder="請輸入贈送好友手機號">
          <button @click="giveStart">確定贈送</button>
        </view>
      </view>
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
      // haveForesee:[],
      activeFeat: 'buy',
      assignIndex:0,
      givePhone:'',
      isGive:false,
    }
  },
  async mounted() {
    await this.getForesee()
  },
  methods: {
    //获取数据列表
    async getForesee() {
      this.foreseeList = ((await milkList()).data || [])
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
    //贈送預付卡
    async giveForeseeStart(){},
    //跳轉至預付卡詳情
    navPage(f) {
      uni.navigateTo({
        url: '/pages/foreseeDetails/foreseeDetails?foresee=' + encodeURIComponent(JSON.stringify(f))
      })
    },

    catchTouch(){},
    giveInfo(){
      this.isGive = true;
    },
    //點擊贈送好友
    giveStart(){
      console.log(1);
      uni.showLoading({
        title:'請稍後'
      })
      try{
        if(this.givePhone.length!==11||isNaN(this.givePhone)){
          this.customToast('手機號不正確')
          this.givePhone = ''
          return
        }
        this.isGive = false;
        //TODO贈送邏輯處理

        this.customToast('贈送成功')
        this.givePhone = '';
      }catch (e){
        this.givePhone = ''
        this.customToast('贈送失敗')
      }
    },
    //取消贈送
    closeGive(){
      this.isGive = false;
      this.givePhone = '';
    },
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
  background-color: $main-bg;

swiper{
height: 100%;

  .buy_foresee{
    //margin-top: 150rpx;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: $main-bg;
    box-sizing: border-box;
    padding:$spacing-base 0;
    /* #ifdef H5 | APP-PLUS*/
    padding:$spacing-base;
    /* #endif*/

    .content_list{
      width: 100%;
      /* #ifdef MP*/
      padding: 0 $spacing-base;
      box-sizing:border-box;
      /* #endif*/

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
    //margin-top: 150rpx;
    width: 100%;
    //min-height: 100%;
    display: flex;
    flex-direction: column;
    background-color: $main-bg;
  }
}
  .give{
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index:13;

    .mark{
      width: 100%;
      height: 100%;
      background:rgba(0,0,0,.35);
      z-index: 12;

      .content{
        width: 480rpx;
        height: 330rpx;
        background: #ffffff;
        border-radius: 20rpx;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        font-size: $font-size-base;
        font-weight:$font-weight-lg;
        color: $font-color1;
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon{
          position: absolute;
          right: 20rpx;
          top: 20rpx;
        }

        .title{
          margin: 50rpx 0 $spacing-lg 0;
        }

        input{
          width: 330rpx;
          height: 54rpx;
          border: 1rpx solid #cccccc;
          font-size: $font-size-sm;
          font-weight: $font-weight-base;
          border-radius: 8rpx;
          padding: 0 10rpx;
          box-sizing: border-box;
          margin-bottom: 50rpx;
        }

        button  {
          width: 150rpx;
          height: 58rpx;
          background: $main-color;
          border-radius: 4rpx;
          padding: 0;
          line-height: 58rpx;
          font-size: $font-size-sm;
          font-weight: $font-weight-base;
          color: #FFFFFF;
        }
      }
    }
  }
}
</style>
