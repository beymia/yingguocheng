<template>
  <view class="set_password">
    <view class="content">
      <view class="head_title">
        <text v-if="pwd.length !== 6">請設置交易密碼</text>
        <text v-else>請确认交易密碼</text>
        <text class="title_tip">為了您的資金安全，請先設置交易密碼</text>
      </view>
      <!--        <label v-for="(code,index) in 6" :key="index">-->
      <!--          <input class="pwd_content"-->
      <!--                 disabled-->
      <!--                 maxlength="1"-->
      <!--                 v-model="currentPwd[index]"-->
      <!--                 type="password">-->
      <!--        </label>-->
      <!--        <input focus-->
      <!--               @input="inputPwd"-->
      <!--               v-model="currentPwd"-->
      <!--               maxlength="6"-->
      <!--               class="empty_input"-->
      <!--               type="text">-->
      <oneInput :isBox="true"
                :is-pwd="true"
                :autoFocus="true"
                v-model="currentPwd"
                type="box"
                :maxlength="6">
      </oneInput>
    </view>
  </view>
</template>

<script>
import {setPwd, userSpace} from "../../request/api";
import oneInput from '../../components/myp-one/myp-one'
const APP =getApp().globalData;
export default {
  data() {
    return {
      pwd: '',
      currentPwd: ''
    }
  },
  watch: {
    async currentPwd(value) {
      if (!value) return;
      if (value.length === 6 && this.pwd.length === 6) {
        if (value === this.pwd) {
          uni.showLoading({
            title: '请稍后'
          });
          try {
            await setPwd({password: this.pwd, veify_pwd: value})
            APP.userInfo = (await userSpace()).data;
            uni.hideLoading()
            //登录成功重定向至钱包页面
            uni.redirectTo({
              url: '/pages/wallet/wallet'
            })
          } catch (e) {
            this.currentPwd = '';
            this.pwd = '';
            this.customToast('密碼設置失敗')
          }
        } else {
          this.customToast('密碼不一致')
          this.currentPwd = ''
          this.pwd = '';
        }
        return
      }
      if (value.length === 6) {
        this.pwd = value;
        this.currentPwd = '';
      }
    }
  },
  components: {
    oneInput
  }
}
</script>

<style scoped lang="scss">
.set_password{
  width: 100%;
  height: 100%;
  padding-top: 100rpx;
  box-sizing: border-box;

  .content{
    width: 606rpx;
    margin: 0 auto;

    .head_title{
      width: 100%;
      height: 88rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
      margin-bottom: 50rpx;

      text{
        font-size: $font-size-lg;
        font-weight: $font-weight-lg;
        color: $font-color1;
      }

      .title_tip{
        font-size: $font-size-sm;
        font-weight: $font-weight-base;
        color: $font-color3;
        margin-top: 10rpx;
      }


    }

    .password{
      display: flex;
      justify-content: space-between;
      align-items: center;
      //.pwd_content{
      //  width: 76rpx;
      //  height: 90rpx;
      //  background: #eaeaea;
      //  border-radius: 4rpx;
      //  text-align: center;
      //  z-index: -1;
      //}
      //
      //.empty_input{
      //  height: 90rpx;
      //  width: calc(100% + 200rpx);
      //  position: absolute;
      //  opacity: 0;
      //  z-index: 999;
      //  background-color: pink;
      //  margin-left: -200rpx;
      //}
    }
  }
}
</style>
