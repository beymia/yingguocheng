<template>
  <view class="join_member">
    <!--頭部-->
    <view class="top">
      <giftPack title="開通/續費星球會員後，立刻發放"></giftPack>
    </view>
    <!--中間-->
    <view class="center">
      <view class="items" >
        <text class="title">每月等級權益</text>
<!--        <text class="summary">根據購買日期，每月同壹時間發放</text>-->
      </view>
      <view class="items" v-for="(park,index) in monthPark" :key="index">
      <text class="options">{{park.goods_name}}</text>
      <text class="month">x{{park.goods_num}}/月</text>
    </view>
<!--      <view class="items" >-->
<!--        <text class="options">滿35減3券</text>-->
<!--        <text class="month">x1/月</text>-->
<!--      </view>-->
<!--      <view>-->
<!--        <text class="options">滿60減5券</text>-->
<!--        <text class="month">x1/月</text>-->
<!--      </view>-->
<!--      <view>-->
<!--        <text class="options">整單9折</text>-->
<!--        <text class="month">x1/月</text>-->
<!--      </view>-->
<!--      <view>-->
<!--        <text class="options">每月28號會員日消費額外贈送5%積分</text>-->
<!--        <text class="icon">特权</text>-->
<!--      </view>-->

      <!--剔除此功能-->
<!--      <view class="other">-->
<!--        <button plain>查看其他等級權益</button>-->
<!--        <uni-icons class="arrow_right"-->
<!--                   style="display: inline-block;vertical-align: middle;"-->
<!--                   type="arrowright"-->
<!--                   size="26"-->
<!--                   color="#333333">-->
<!--        </uni-icons>-->
<!--      </view>-->

    </view>

    <!--底部-->
    <view class="bottom">
      <view  class="items" >
        <text class="title">星球會員權益</text>
        <text class="summary">星球會員有效期內可使用</text>
      </view>

      <view class="items" v-for="(park,index) in interestsPark" :key="index">
        <text class="options">{{park.goods_name}}</text>
<!--        <text class="icon icon_red">免排隊，優先制作</text>-->
        <text class="month">x{{park.goods_num}}</text>
      </view>
<!--      <view class="items" >-->
<!--        <text class="options">生日贈飲券</text>-->
<!--        <text class="icon icon_red">免排隊，優先制作</text>-->
<!--        <text class="month">x1</text>-->
<!--      </view>-->
<!--      <view class="items" >-->
<!--        <text class="options">星球會員開通紀念日贈飲券</text>-->
<!--        <text class="month">x1</text>-->
<!--      </view>-->
<!--      <view class="items" >-->
<!--        <text class="options">5.28會員日贈飲券</text>-->
<!--        <text class="month">x1</text>-->
<!--      </view>-->
<!--      <view class="items" >-->
<!--        <text class="options">積分經驗值漲速翻倍</text>-->
<!--        <text class="icon">特权</text>-->
<!--      </view>-->
    </view>

    <!--会员协议-->
    <view class="protocol">
      <button @click="summaryStatus = !summaryStatus" class="protocol_btn">
      </button>
      <uni-icons @click="summaryStatus = !summaryStatus"
                 v-if="summaryStatus"
                 type="checkmarkempty"
                 size="32"
                 class="summary_status"
                 color="#17A1FF">
      </uni-icons>
      <view class="protocol_content">
        <text>同意</text>
        <text>《會員服務協議》</text>
      </view>
    </view>
    <!--费用支付-->
    <view class="payment">
      <view class="select_type">
        <uni-icons size="40"
                   class="icon_up"
                   color="#333333"
                   @click="selectType"
                   type="arrowup">
        </uni-icons>
        <text @click="selectType" v-if="memberInfo[joinType]"  class="type">{{ memberInfo[joinType].level_name }}</text>
        <text>總價：</text>
        <text v-if="memberInfo[joinType]" class="type_amount">{{ memberInfo[joinType].recharge_money }}元/{{ memberInfo[joinType].expired_time }}月</text>
      </view>
      <button @click="paymentMember" plain>支付</button>
    </view>

    <!--占位使用-->
    <view class="empty"></view>
  </view>
</template>

<script>
import giftPack from "../my/components/giftPack";
import optionsList from "../../components-lk/optionsList/optionsList";

import {memberRechargeInfo, joinMember, userSpace} from "../../request/api";
const APP = getApp().globalData
export default {
  data() {
    return {
      memberInfo: [],
      summaryStatus: false,
      monthPark:[],
      interestsPark:[],
      joinType:0,
    }
  },
  async mounted() {
    this.monthPark = APP.userInfo.month_park;
    this.interestsPark = APP.userInfo.interests_pack;
    try {
      this.memberInfo = (await memberRechargeInfo()).data
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async paymentMember() {
      let self = this;
      if(!this.summaryStatus){
        this.customToast('请仔细阅读协议',false);
        return;
      }
      uni.showLoading({
        title:'开通中...'
      })
      try{
        //請求接口獲取支付信息
        let orderInfo = (await joinMember({
          level_id:this.memberInfo[this.joinType].id
        })).data

        //开始支付
        await self.utilPayment(orderInfo);
        //支付成功执行
        await self.joinSuccess()
      } catch (e) {
        console.log(e);
        this.customToast('开通失敗')
      }
    },
    //开通成功，重新获取会员信息，并且跳转会员权益页面
    async joinSuccess() {
      this.customToast('开通成功')
      APP.userInfo = (await userSpace()).data;
      // TODO 测试修改数据
      APP.userInfo.user_name = '成功开通了会员';
      console.log(APP.userInfo.user_name);
      //开通成功后跳转到会员权益页面
      uni.redirectTo({
        url:'/pages/memberBenefits/memberBenefits'
      })
    },
    //選擇開通類型
    selectType(){
      let itemList = [],
          self= this;
      this.memberInfo.forEach((item)=>{
        itemList.push(item.level_name)
      });
      uni.showActionSheet({
        itemList,
        success(index){
          self.joinType = index.tapIndex;
        }
      })
    }
  },
  components: {
    giftPack,
    optionsList
  }
}
</script>

<style lang="scss" scoped>
//字体通用样式
.title{
  font-size: $font-size-base;
  color: $font-color1;
}

.summary{
  font-size: $font-size-sm - 2rpx;
  color: $font-color3;
}

.options{
  font-size: $font-size-base;
  color: $font-color1;
}

.month{
  font-size: $font-size-sm;
  color: $main-color;
}

.icon{
  width: 50rpx;
  height: 24rpx;
  background: $main-color;
  border-radius: 12rpx 12rpx 12rpx 0rpx;
  font-size: 14rpx;
  color: #ffffff;
  text-align: center;
  line-height: 24rpx;


  &.icon_red{
    width: 150rpx;
    background-color: #e25e5c;
  }
}

@mixin container($h) {
  width: 100%;
  min-height: $h;
  background: #ffffff;
  border-radius: 30rpx;
  margin-bottom: 30rpx;
}

.join_member{
  width: 100%;
  min-height: 100%;
  padding: $spacing-lg $spacing-base;
  box-sizing: border-box;
  background-color:#F5F6F8 ;

  .top{
    @include container(380rpx)
  }

  .center{
    @include container(130rpx);

  /*  .other{
      height: 28rpx;
      align-self: center;

      button{
        height: 100%;
        padding: 0;
        border: none;
        font-size: $font-size-base - 4rpx;
        color:$font-color1;
        line-height: 28rpx;
        margin-right: 10rpx;
      }

      .arrow_right {
        line-height: 34rpx;
      }
    }*/
  }

  .bottom{
    @include container(130rpx);
    margin-bottom: 0;
  }

  .center,.bottom{
    display: flex;
    flex-direction: column;
    padding: $spacing-lg $spacing-lg 0 $spacing-lg;
    box-sizing: border-box;

    view{
      display: flex;
      justify-content: space-between;

      .summary,.icon{
        margin-right: auto;
        margin-left: 10rpx;
      }
    }

    .items{
      margin-bottom: $spacing-lg;
    }
  }

  .protocol{
    width: calc(100% + 48rpx);
    min-height: 70rpx;
    display: flex;
    background-color: #FFFFFF;
    margin-left: -24rpx;
    padding:0 $spacing-base;
    box-sizing: border-box;
    align-items: center;
    position: fixed;
    bottom: 98rpx;


    .protocol_btn{
      width: 32rpx;
      height: 32rpx;
      background: #ffffff;
      border: 1rpx solid #cccccc;
      border-radius: 4rpx;
      padding: 0;
      margin-right: $spacing-lg;
    }

    .summary_status{
      position: absolute;
      left: 24rpx;
    }

    .protocol_content{
      display: inline-block;
      font-size: $font-size-sm;
      color: $font-color1;

      text:nth-child(2){
        color:$main-color
      }
    }
  }

  .payment{
    width: calc(100% + 48rpx);
    height: 98rpx;
    background: #ffffff;
    border-top: 1rpx solid #cccccc;
    padding: 0 $spacing-base;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    margin-left: -$spacing-base;

    //text:nth-child(1){
    //  font-size: $font-size-sm;
    //  color: $font-color1;
    //}
    //
    //text:nth-child(2){
    //  font-size: $font-size-lg + 2rpx;
    //  font-weight: $font-weight-lg;
    //  color: $main-color;
    //  margin-right: auto;
    //}

    .select_type{
      flex: 1;
      display: flex;
      align-items: center;
      font-size: $font-size-sm;
      color: $font-color1;

      .type_amount,.type{
        font-size: $font-size-lg + 2rpx;
        font-weight: $font-weight-lg;
        color: $main-color;
      }
      .type{
        margin:  0 10rpx;
      }

      .icon_up{
        margin-right: 10rpx;
      }
    }

    button{
      width: 200rpx;
      height: 98rpx;
      background: $main-color;
      border: none;
      font-size: $font-size-base;
      color: #ffffff;
      padding: 0;
      text-align: center;
      line-height: 98rpx;
    }
  }

  .empty{
    width: 100%;
    height: 138rpx;
  }
}
</style>
