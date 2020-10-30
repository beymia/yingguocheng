<template>
  <view class="profile">
    <!-- 头部背景 -->
    <view class="profile_head">
      <view class="head_bg">
        <image mode="widthFix" src="../../static/images_t/my/head_bg.png"></image>
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
        <giftPack :giftPack="userInfo.ritual_park"></giftPack>
      </view>

      <!-- 功能列表 -->
      <view class="fun_list">
        <optionsList @options-click="navFitPage" :list="options"></optionsList>
        <button open-type="contact">添加客服</button>
      </view>
    </view>

    <!--兌換中心-->
    <view></view>

    <!-- #ifdef H5-->
    <view class="empty"></view>
    <!-- #endif-->
    <loginBox v-if="loginBoxShow" @close-login-box="hideLoginBox"></loginBox>
  </view>
</template>

<script>
import {
  userSpace
} from '../../request/api'

import userInfo from "./components/userInfo";
import giftPack from "./components/giftPack";
import optionsList from "../../components-lk/optionsList/optionsList";
import loginBox from "../../components-lk/loginBox/loginBox";

const APP = getApp().globalData;
//用户信息
export default {
  data() {
    return {
      userInfo: {},
      options: [
          {
        title: '會員碼',
        summary: '門店掃碼積分、奶茶錢包和奶茶有禮支付',
        icon: 'arrowright'
      }, {
        title: '兌換中心',
        summary: '兌換星球會員、優惠券和禮品卡',
        icon: 'arrowright'
      },
        {
        title: '聯系客服',
        icon: 'arrowright'
      }, {
        title: '消息中心',
        icon: 'arrowright'
      }, {
        title: '更多',
        icon: 'arrowright'
      }],
      loginBoxShow:false,
    }
  },
  /**
   * 页面展示时判断的情况
   * 有 token 没有用户信息，请求接口获取用户信息
   * 有用户信息再次从全局对象中获取，防止信息偏差
   * token没有引导用户登录
   */
  async onShow() {
    if (APP.userToken) {
      APP.isLoginBox = false
      this.token = APP.userToken;
      if (APP.userInfo&&APP.userInfo.level) {
        this.userInfo = APP.userInfo;
      } else {
        try {
          await this.getUserInfo()
        } catch (e) {
          console.log(e);
          this.customToast('信息获取失败')
        }
      }
    }else{
      APP.isLoginBox = true;
    }
    this.loginBoxShow = APP.isLoginBox
  },

  methods: {
    //请求用户信息
   async getUserInfo(){
     uni.showLoading({
       title:'請稍後'
     })
     try{
       //token存在静默登录
       if (this.token) {
         this.userInfo = (await userSpace()).data;
         APP.userInfo = this.userInfo;
       }
       uni.hideLoading()
     }catch (e){
       this.customToast('需要登錄',false)
     }
    },
    //隐藏登陆引导框
    hideLoginBox(){
     this.loginBoxShow = APP.isLoginBox = false;
    },
    //跳转至對應的頁面
    navFitPage(aims) {
      //用户没有登录不做处理
      if (!this.token || !this.userInfo.user_name) {
        this.customToast('請先登錄',false)
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
            page = 'memberCode';
            this.query = 'user';
            APP.userInfo = this.userInfo
          break;
        case '兌換中心':
          //跳轉積分商城
          this.query = 'integral';
          page = 'pointsMall'
          v = this.userInfo.integral
          break;
        case '聯系客服':
          page = 'customerService';
          break;
        case '消息中心':
          page = 'messageCenter';
          break;
        case '更多':
          page = 'more';
          break;
      }
      //跳转至钱包页面，没有支付密码时跳转设置密码页面
      if (page === 'wallet') {
        if (!(APP.userInfo.pay_pwd)) {
          uni.navigateTo({
            url: '/pages/setPassword/setPassword'
          })
          return;
        }
      }

      //用户已经开通会员时跳转会员权益
      if(page === 'joinMember' && this.userInfo.level_title !=='普通会员'){
        uni.navigateTo({
          url:'/pages/memberBenefits/memberBenefits'
        })
        return;
      }

      //通用的链接跳转
      uni.navigateTo({
        url: `/pages/${page}/${page}?${this.query}=${v}`,
      })
    }
  },
  components: {
    userInfo,
    giftPack,
    optionsList,
    loginBox
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
