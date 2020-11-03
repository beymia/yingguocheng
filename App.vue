<script>
export default {
  globalData: {
    userToken: null, //用戶token
    userInfo: {}, //用户基本信息
    isLoginBox: true, //用户登录引导框,微信需弹出授权窗口
    isAuth:true,//用户是否已经授权，微信小程序
    wxUserInfo:{},//getUserInfo获取到的用户信息，微信小程序
    goodsPayment: {}, //订单的结算信息
    coupon: 0, //使用的優惠券信息
    isForeseeBuy:false,//用户购买预付卡的表示，为true时重新获取用户拥有的预付卡
    userAddresses: [], //用户收货地址
    edit_address_id: {}, //当前编辑的收货地址id
    choosed_address: {}, //用户选择的地址
  },
  onLaunch:async function () {
    //应用初次启动时从缓存中读取用户token
    this.globalData.userToken = uni.getStorageSync("token");
    console.log("App Launch");

    // #ifdef MP-WEIXIN
    //判断用户是否授权获取相关信息，已经授权直接存在userInfo中
    let self = this;
   await uni.getUserInfo({
      provider:'weixin',
      success(res){
        console.log(res.userInfo);
        self.globalData.wxUserInfo = res.userInfo;
        self.globalData.isAuth = true;
      },
      fail(){
        self.globalData.isAuth = false
      },
    })
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
  width: 702rpx;
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
  width: 42rpx !important;
  height: 42rpx !important;
  border-radius: 50%;
}

checkbox .wx-checkbox-input.wx-checkbox-input-checked {
  width: 46rpx !important;
  height: 46rpx !important;
  border-radius: 50%;
  background: #17A1FF;
  color: #fff !important;
  border: none;
}

radio .wx-radio-input {
  width: 34rpx !important;
  height: 34rpx !important;
  padding: 0 !important;
}

progress .wx-progress-bar {
  height: 30rpx !important;
  border-radius: 15rpx !important;
}

progress .wx-progress-inner-bar {
  border-radius: 15rpx !important;
}

/* #endif */
.align-items-center {
  align-items:center;
}

.d-flex {
  display: flex;
}

uni-page-body, uni-view, uni-scroll-view, uni-text, uni-image, uni-textarea, uni-button, uni-swiper, uni-swiper-item, uni-input {
  box-sizing: border-box;
}

button {
  font-size: 26rpx;
  border-radius: 4rpx;
  margin: 0;

  &:after {
    border: 0;
  }

  &[type='primary'] {
    background-color: $main-color;

    &[plain] {
      background-color: #FFFFFF;
      border: 2rpx solid $main-color;;
      color: $main-color;
    }

    &.button-hover {
      background-color: rgba($color: $main-color, $alpha: 0.6);
    }
  }

}
</style>