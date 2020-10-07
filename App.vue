<script>
export default {
  globalData: {
    goodsPayment: {},//訂單信息，訂單頁修改，結算頁獲取
    coupon: 0,//優惠券金額，
    userToken: null,//用戶token信息，獲取後存儲在本地storage中
	userAddresses:[],//用户收货地址
	edit_address_id:{},//当前编辑的收货地址id
	choosed_address:{},//用户选择的地址
  },
  onLaunch: function () {
    console.log('App Launch');
  },
  onShow: function () {
    console.log('App Show');
  },
  onHide: function () {
    console.log('App Hide');
  }
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
