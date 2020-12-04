<script>
// #ifdef APP-PLUS
import APPUpdate from "./js_sdk/zhouWei-APPUpdate/APPUpdate/index";
// #endif
// import getSocket from "@/u";


export default {
  globalData: {
    userToken: null, //用戶token
    userInfo: {}, //用户基本信息
    isLoginBox: false, //用户登录引导框,微信需弹出授权窗口
    isAuth: true,//用户是否已经授权，微信小程序
    wxUserInfo: {},//getUserInfo获取到的用户信息，微信小程序
    goodsPayment: {}, //订单的结算信息
    coupon: 0, //使用的優惠券信息
    isForeseeBuy: false,//用户购买预付卡的表示，为true时重新获取用户拥有的预付卡
	socket:null,
	getSocket:null,
  },
  onLaunch: async function () {
    //应用初次启动时从缓存中读取用户token
    this.globalData.userToken = uni.getStorageSync("token");
    console.log("App Launch");
    //进入应用时删除历史聊天记录
    uni.removeStorageSync('chatList')
    // #ifdef MP-WEIXIN
    //判断用户是否授权获取相关信息，已经授权直接存在userInfo中
    let self = this;
    await uni.getUserInfo({
      provider: 'weixin',
      success(res) {
        console.log(res.userInfo);
        self.globalData.wxUserInfo = res.userInfo;
        self.globalData.isAuth = true;
      },
      fail() {
        self.globalData.isAuth = false
      },
    })
    // #endif

    // #ifdef APP-PLUS
    APPUpdate();
    // #endif
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
  font-family: uniicons;
  src: url('/static/uni.ttf');
}

/* #endif */
.page {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  font-family: 'PingFang SC', 'Microsoft Yahei';
}

.container {
  width: 702 rpx;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

image {
  width: 100%;
  height: 100%;
  display: block;
}

/* #ifdef APP-PLUS ||MP-WEIXIN */

page {
  height: 100%;
}

checkbox .wx-checkbox-input {
  width: 42 rpx !important;
  height: 42 rpx !important;
  border-radius: 50%;
}

checkbox .wx-checkbox-input.wx-checkbox-input-checked {
  width: 46 rpx !important;
  height: 46 rpx !important;
  border-radius: 50%;
  background: #17A1FF;
  color: #fff !important;
  border: none;
}

radio .wx-radio-input {
  width: 34 rpx !important;
  height: 34 rpx !important;
  padding: 0 !important;
}

progress .wx-progress-bar {
  height: 30 rpx !important;
  border-radius: 15 rpx !important;
}

progress .wx-progress-inner-bar {
  border-radius: 15 rpx !important;
}

/* #endif */
.align-items-center {
  align-items: center;
}

.d-flex {
  display: flex;
}

uni-page-body, uni-view, uni-scroll-view, uni-text, uni-image, uni-textarea, uni-button, uni-swiper, uni-swiper-item, uni-input {
  box-sizing: border-box;
}

button {
  font-size: 26 rpx;
  border-radius: 4 rpx;
  margin: 0;

  &:after {
    border: 0;
  }

  &[type='primary'] {
    background-color: $main-color;

    &[plain] {
      background-color: #FFFFFF;
      border: 2 rpx solid $main-color;;
      color: $main-color;
    }

    &.button-hover {
      background-color: rgba($color: $main-color, $alpha: 0.6);
    }
  }

}
</style>