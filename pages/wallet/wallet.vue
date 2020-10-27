<template>
  <view v-if="reRender" class="wallet">
    <view class="container">
      <view class="head">
        <text class="balance">可用余額</text>
        <view>
          <text class="symbol">￥</text>
          <text class="amount">{{ amount || '0' }}</text>
        </view>
        <text @click="rechargeBox = true" class="btn">立即充值</text>
      </view>
      <view class="options">
        <optionsList @options-click="navRecharge" :list="options"></optionsList>
      </view>
    </view>

    <!--充值弹框-->
    <view v-if="rechargeBox" class="recharge">
      <view class="content">
        <view class="title">整數充值</view>
        <input v-model="rechargeAmount"
               type="text"
               placeholder="請輸入充值金額">
        <view class="btn">
          <button plain @click="rechargeBox = false">取消</button>
          <button plain @click="rechargeStart">充值</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import optionsList from "../../components-lk/optionsList/optionsList";
import {recharge, sendCheckCode, userSpace} from '../../request/api'

const APP = getApp().globalData;
export default {
  data() {
    return {
      amount: '0.00',
      options: [
        {
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
      rechargePwd: false,
      phone: '',
      rechargeBox: false,
      rechargeAmount: '',
      reRender: 1,//用戶充值後強制刷新頁面的條件
      paymentStatus: false,
    }
  },
  onShow() {
    this.amount = APP.userInfo.balance;
  },
  mounted() {
      this.amount = APP.userInfo.balance
    this.originPhone = APP.userInfo.mobile;
    //处理手机号展示形式
    this.phone = this.originPhone.replace(/\d/g, function (value, index) {
      if (index >= 3 && index <= 7) {
        return 'x'
      } else {
        return value
      }
    })
  },
  methods: {
    //导航到对应的页面
    async navRecharge(v) {
      let {page} = v;
      switch (page) {
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
        url: `/pages/${page}/${page}`
      })
    },
    //修改支付密码
    changePayPwd() {
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
              await sendCheckCode({mobile: self.originPhone})
              uni.redirectTo({
                url: '/pages/checkCode/checkCode?query=' + JSON.stringify({change: 1}),
                success() {
                  uni.hideLoading()
                }
              })
            }
          } catch (e) {
            console.log(e.data.msg);
            self.customToast('驗證碼發送失敗')
          }
        }
      })
    },

    //支付功能
    async rechargeStart() {
      if (this.paymentStatus) return;
      this.paymentStatus = true;
      let self = this;
      if (Number(this.rechargeAmount)) {
        this.rechargeBox = false;
        try {
          //获取支付信息
          let orderInfo = (await recharge({amount: this.rechargeAmount})).data;
          //开始支付
          await self.utilPayment(orderInfo);
          await self.paymentSuccess()
        } catch (e) {
          console.log(e);
          self.paymentStatus = false;
          self.rechargeAmount = '';
          self.customToast('充值失敗')
        }
      }
    },
    //支付成功
    async paymentSuccess(e) {
      console.log(e);
      this.paymentStatus = false;
      this.customToast('充值成功');
      this.rechargeAmount = '';
      //重新获取用户数据
      try {
        APP.userInfo = (await userSpace()).data
        this.amount = APP.userInfo.balance;
      } catch (e) {
        console.log(e);
      }
    },
  },
  //TODO 監視充值價格，為整數,生产环境需打开
  watch: {
    rechargeAmount(n, o) {
      let newStr = n.slice(o.length),
          newNum = parseInt(newStr)
      if (isNaN(newNum)) {
        this.rechargeAmount = '';
      }
    },
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
  .recharge{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.6);
    z-index: 1000000;

    .content{
      width: 480rpx;
      height: 330rpx;
      background: #ffffff;
      border-radius: 20rpx;
      position: absolute;
      left: 50%;
      margin-left: - 240rpx;
      top:50%;
      margin-top:-330rpx;
      text-align: center;

      .title{
        font-size: $font-weight-base;
        font-weight:$font-weight-lg;
        color: $font-color1;
        margin-top: 50rpx;
      }

      .btn{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        bottom: 48rpx;

        button{
          border:none;
          width: 150rpx;
          height: 58rpx;
          background: $main-color;
          border-radius: 4rpx;
          font-size: $font-size-sm;
          color: #ffffff;
          padding: 0;
        }
      }

      input{
        width: 330rpx;
        height: 54rpx;
        border: 1rpx solid #cccccc;
        border-radius: 8rpx;
        position: absolute;
        left: 50%;
        top: 120rpx;
        transform: translate(-50%,0);
        padding: 0 10rpx;
        box-sizing: border-box;
        text-align: left;
      }
    }
  }
}
</style>
