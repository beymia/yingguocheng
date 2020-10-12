<template>
  <view class="profile">
    <!-- 头部背景 -->
    <view class="profile_head">
      <view class="head_bg">
        <image mode="widthFix" src="https://ftp.bmp.ovh/imgs/2020/10/8c6c3cfa0054d546.png"></image>
      </view>
      <view class="head_logo">
        <text>英国城</text>
      </view>
    </view>
    <view class="profile_content">
      <!-- 用户相关信息 -->
      <view class="profile_info">
        <userInfo @handler-click="navFitPage" :user="userInfo "></userInfo>
      </view>
      <!-- 开通礼包 -->
      <view @click="navFitPage({page:'joinMember'})" class="open_package">
        <giftPack></giftPack>
      </view>

      <!-- 功能列表 -->
      <view class="fun_list">
        <optionsList @options-click="navFitPage" :list="options"></optionsList>
      </view>
    </view>

    <!--兌換中心-->
    <view></view>

    <!-- #ifdef H5-->
    <view class="empty"></view>
    <!-- #endif-->
  </view>
</template>

<script>
import {
  userSpace
} from '../../request/api'

import userInfo from "./components/userInfo";
import giftPack from "./components/giftPack";
import optionsList from "../../components-lk/optionsList/optionsList";

const APP = getApp().globalData;

export default {
  data() {
    return {
      userInfo: {},
      options: [{
        title: '會員碼',
        summary: '門店掃碼積分、奶茶錢包和奶茶有禮支付',
        icon: 'arrowright'
      }, {
        title: '兌換中心',
        summary: '兌換星球會員、優惠券和禮品卡',
        icon: 'arrowright'
      },
      //   {
      //   title: '星球封面',
      //   icon: 'arrowright'
      // },
        {
        title: '聯系客服',
        icon: 'arrowright'
      }, {
        title: '消息中心',
        icon: 'arrowright'
      }, {
        title: '更多',
        icon: 'arrowright'
      }]
    }
  },
  async mounted() {
    APP.userToken = '測試使用';
    this.userToken = APP.userToken;
    if (this.userToken) {
      this.userInfo = (await this.requestUserInfo()).data;
      APP.userInfo = this.userInfo;
    }
  },
  methods: {
    //请求用户信息
    async requestUserInfo() {
      return await userSpace({
        token: '测试使用'
      })
    },
    //跳转至對應的頁面
    navFitPage(aims) {
      console.log(aims);
      //用户没有登录不做处理
      if (!this.userToken) {
        uni.showToast({
          title: '還沒有登錄',
          duration: 2000,
          icon: 'none'
        })
        return
      }
      let {page, v} = aims;
      switch (page) {
        case 'pointsMall':
          this.query = 'integral';
          break;
        case 'wallet':
          this.query = 'wallet';
          break;
        case '會員碼':
          // TODO 非頁面
            page = 'memberCode';
            this.query = 'user';
            APP.userInfo = this.userInfo
          break;
        case '兌換中心':
          // TODO 非頁面
          this.query = 'integral';
          page = 'pointsMall'
          v = this.userInfo.integral
          break;
          // case '星球封面':
          //   page = 'planetCover';
        //   break;
        case '聯系客服':
          page = 'customerService';
          break;
        case '消息中心':
          page = '';
          break;
        case '更多':
          page = 'more';
          break;
      }
      if (page === 'wallet') {
        if (!(APP.userInfo.has_pwd)) {
          uni.navigateTo({
            url: '/pages/setPassword/setPassword'
          })
          return;
        }
      }
      uni.navigateTo({
        url: `/pages/${page}/${page}?${this.query}=${v}`,
        complete(e){
          console.log(e);
        }
      })
    }
  },
  components: {
    userInfo,
    giftPack,
    optionsList
  }
}
</script>

<style lang="scss" scoped>
@mixin container($h) {
  width: 100%;
  height: $h;
  background: #ffffff;
  border-radius: 30rpx;
  margin-bottom: 30rpx;
}

uni-page-body {
  height: 100%;
}

.profile {
  width: 100%;
  padding-bottom: $spacing-lg;
  background-color: $main-bg;

  .profile_head {
    width: 100%;
    height: 550rpx;
    text-align: center;
    background: #FFFFFF;

    .head_bg {
      width: 100%;
      height: 450rpx;
      position: relative;

      image {
        width: 100%;
        height: 450rpx;
        vertical-align: middle;
      }
    }

    .head_logo {
      width: 100%;
      text-align: center;
      position: absolute;
      top: 60rpx;

      text {
        font-size: $font-size-lg + 2rpx;
        font-weight: $font-weight-lg;
        color: $font-color1;
      }
    }
  }

  .profile_content {
    width: 100%;
    padding: 0 $spacing-base;
    box-sizing: border-box;
    position: relative;

    .profile_info {
      @include container(390rpx - $spacing-lg);
      border-radius: 0 0 30rpx 30rpx;
    }

    .open_package {
      @include container(380rpx)
    }

    .fun_list {
      @include container(500rpx);
      margin-bottom: 0;
      padding: 0 $spacing-lg;
      box-sizing: border-box;
    }
  }
  .empty {
    width: 100%;
    height: 100rpx;
  }
}
</style>
