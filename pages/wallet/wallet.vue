<template>
  <view class="wallet">
    <view class="container">
      <view class="head">
        <text class="balance">可用余額</text>
        <view>
          <text class="symbol">￥</text>
          <text class="amount">{{ amount||'0' }}</text>
        </view>
        <text @click="navRecharge({page:'recharge'})" class="btn">立即充值</text>
      </view>
      <view class="options">
        <optionsList @options-click="navRecharge" :list="options"></optionsList>
      </view>
    </view>
  </view>
</template>

<script>
import optionsList from "../../components-lk/optionsList/optionsList";
import {sendCheckCode} from '../../request/api'
export default {
  data() {
    return {
      amount: '0.00',
      options: [{
        title: '掃碼支付',
        summary: '可使用錢包直接支付',
        icon: 'arrowright'
      }, {
        title: '消費記錄',
        icon: 'arrowright'
      }, {
        title: '重置交易密碼',
        icon: 'arrowright'
      },],
      rechargePwd:false,
      phone:''
    }
  },
  onLoad(options) {
    this.amount = options.wallet;
    // this.originPhone = getApp().globalData.userInfo.mobile;
    //TODO 测试使用手机号，生产环境需要从全局对象中获取
    this.originPhone = '15660088912'
    this.phone = this.originPhone.replace(/\d/g, function (value, index) {
      if (index >= 3 && index <= 7) {
        return 'x'
      } else {
        return value
      }
    })
  },
  methods: {
   async navRecharge(v){
      let {page} = v;
      switch (page){
        case '消費記錄':
          page = 'expensesRecord';
          break;
          case '掃碼支付':
            page = 'memberCode';
            break;
            case '重置交易密碼':
           await this.changePayPwd()
      }
      uni.navigateTo({
        url:  `/pages/${page}/${page}`
      })
    },
    changePayPwd(){
     let self = this;
      uni.showModal({
        title: '重置交易密碼',
        content: '短信驗證碼將發送已綁定手機\n' + this.phone,
        async success(o) {
          try {
            //點擊確定進入重置密碼頁面
            if (o.confirm) {
              uni.showLoading({
                title: '正在發送驗證碼'
              })
              //发送验证码
              let result = await sendCheckCode({mobile: self.originPhone})
              uni.navigateTo({
                url: '/pages/checkCode/checkCode?change=1',
                success() {
                  uni.hideLoading()
                }
              })
            }
          } catch (e) {
            console.log(e);
            uni.hideLoading();
            uni.showToast({
              title: '验证码发送失败',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  },
  components: {
    optionsList
  }
}
</script>

<style scoped lang="scss">
.wallet {
  width: 100%;
  height: 100%;
  padding-top: 100rpx;
  box-sizing: border-box;

.container{
  width: 100%;
  padding: 0 24rpx;
  box-sizing: border-box;

  .head{
    width: 100%;
    height: 174rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 154rpx;

    .balance{
      font-size: $font-size-lg;
      font-weight: $font-weight-lg;
      color: $font-color1;
    }
    .symbol{
      font-size: $font-size-lg;
      font-weight: $font-weight-lg;
      color: $font-color1;
    }
    .amount{
      font-size: 60rpx;
      font-weight: $font-weight-lg;
      color: $font-color1;
    }
    .btn{
      display: inline-block;
      width: 320rpx;
      height: 80rpx;
      background: $main-color;
      font-size: $font-size-base;
      color: #ffffff;
      text-align: center;
      line-height: 80rpx;
    }
  }

  .options {
    width: 100%;
    height: 360rpx;
  }
}
}
</style>
