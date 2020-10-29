<template>
  <view class="container">
    <swiperSwitch
        leftTitle="購買奶茶有禮"
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
            <swiper
                next-margin="40rpx"
                enable-flex
                :scroll-x="true"
                class="list">
              <swiper-item
                  class="list_item"
                  @click="navPage(list.child[im])"
                  v-for="(foresee, im) in list.child"
                  :key="im">
                <image :src="foresee.home_avatar | filterImg"></image>
              </swiper-item>
            </swiper>
          </view>
        </view>
      </template>
      <template v-slot:right>
        <!--我的奶茶有礼-->
        <view class="have_foresee">
          <myForeseePage
              @buy-foreseeList="assignIndex++"
              @give-start="giveInfo"
              :foresee="haveForesee"
          ></myForeseePage>
        </view>
      </template>
    </swiperSwitch>

    <!--赠送好友-->
    <view v-if="isGive" class="give" @touchmove.prevent.stop="catchTouch">
      <view class="mark">
        <view class="content">
          <uni-icons
              @click="closeGive"
              class="icon"
              type="close"
              size="40"
              color="#cccccc"
          >
          </uni-icons>
          <view class="title">贈送好友</view>
          <input
              v-model="givePhone"
              type="number"
              maxlength="11"
              placeholder="請輸入贈送好友手機號"
          />
          <button @click="giveStart">確定贈送</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  foreseeList,
  myForesee,
  giveForesee, userSpace,
} from "../../request/api";

import swiperSwitch from "../../components-lk/swiperSwitch/swiperSwitch";
import myForeseePage from "./components/myForeseePage";

const APP = getApp().globalData;
//奶茶有禮
export default {
  data() {
    return {
      haveForesee: [],//拥有的
      foreseeList: [],//可购买列表
      activeFeat: "buy",//活跃板块
      assignIndex: 0,
      givePhone: "",//赠送手机号
      isGive: false,
      giveForeseeId: ''
    };
  },

  //如果isForeseeBuy为true，则用户购买了新的预付卡，重新获取预付卡信息
  async onShow() {
    if (APP.isForeseeBuy) {
      try{
        await this.getForesee()
        APP.isForeseeBuy = false;
        APP.userInfo = (await userSpace()).data
        console.log(APP.isForeseeBuy);
      }catch (e) {
        this.customToast('信息更新可能延遲',false)
      }
    }
  },

  async mounted() {
    await this.getForesee();
  },
  methods: {
    getForesee() {
      let self = this;
      Promise.all([foreseeList(), myForesee()])
          .then(value => {
            self.foreseeList = (value[0].data || [])
            self.haveForesee = (value[1].data || [])
          })
          .catch(err => {
            console.log(err);
            this.customToast('出現了錯誤')
          })
    },
    //跳轉至預付卡詳情
    navPage(f) {
      uni.navigateTo({
        url:
            "/pages/foreseeDetails/foreseeDetails?foresee=" +
            encodeURIComponent(JSON.stringify(f)),
      });
    },

    //在弹出赠送框后阻止滑动的空数组
    catchTouch() {},
    //展示赠送框，并存储赠送的预付卡ID
    giveInfo(e) {
      this.isGive = true;
      this.giveForeseeId = e.id;
    },
    //點擊贈送好友
    async giveStart() {
      let self = this;
      //手机号位数不对直接返回
      if (self.givePhone.length !== 11) {
        self.customToast("手機號不正確");
        self.givePhone = "";
        return;
      }

      uni.showLoading({
        title: "赠送中",
      });

      self.isGive = false;
      try {
        await giveForesee({
          card_id: self.giveForeseeId,
          mobile: self.givePhone,
        })
        self.customToast("贈送成功");
        self.givePhone = "";
        //赠送成功后重新获取预付卡信息和用户信息
        await self.getForesee()
        self.haveForesee.length--;
        APP.userInfo = (await userSpace()).data
      } catch (e) {
        self.givePhone = '';
        self.customToast('赠送失败')
      }
    },
    //取消贈送
    closeGive() {
      this.isGive = false;
      this.givePhone = "";
    },
  },
  components: {
    myForeseePage,
    swiperSwitch,
  },
};
</script>

<style lang="scss" scoped>
image {
  width: 300rpx;
  height: 200rpx;
  vertical-align: middle;
}
.container {
  width: 100%;
  min-height: 100%;
  background-color: $main-bg;

  swiper {
    height: 100%;

    .buy_foresee {
      //margin-top: 150rpx;
      width: 100%;
      display: flex;
      flex-direction: column;
      background-color: $main-bg;
      box-sizing: border-box;
      padding: $spacing-base 0;
      /* #ifdef H5 | APP-PLUS*/
      padding: $spacing-base;
      /* #endif*/

      .content_list {
        width: 100%;
        /* #ifdef MP*/
        padding: 0 $spacing-base;
        box-sizing: border-box;
        /* #endif*/

        .title {
          font-size: $font-size-base;
          color: $font-color1;
          margin-bottom: 10rpx;
        }

        .list {
          width: 100%;
          height: 200rpx;
          white-space: nowrap;
          margin-bottom: $spacing-lg;

          .list_item {
            display: inline-block;
            width: 300rpx;
          }
        }
      }
    }

    .have_foresee {
      //margin-top: 150rpx;
      width: 100%;
      //min-height: 100%;
      display: flex;
      flex-direction: column;
      background-color: $main-bg;
    }
  }
  .give {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 13;

    .mark {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.35);
      z-index: 12;

      .content {
        width: 480rpx;
        height: 330rpx;
        background: #ffffff;
        border-radius: 20rpx;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: $font-size-base;
        font-weight: $font-weight-lg;
        color: $font-color1;
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon {
          position: absolute;
          right: 20rpx;
          top: 20rpx;
        }

        .title {
          margin: 50rpx 0 $spacing-lg 0;
        }

        input {
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

        button {
          width: 150rpx;
          height: 58rpx;
          background: $main-color;
          border-radius: 4rpx;
          padding: 0;
          line-height: 58rpx;
          font-size: $font-size-sm;
          font-weight: $font-weight-base;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
