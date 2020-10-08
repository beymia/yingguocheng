<template>
	<view class="options">
	<!--	<view>
      <view class="fun_items">
        <text class="items_name">會員碼</text>
        <text class="items_dec">門店掃碼積分、奶茶錢包和奶茶有禮支付</text>
        <uni-icons style="display: inline-block;vertical-align: middle" type="arrowright" size="30" color="#cccccc"></uni-icons>
      </view>
      <view class="fun_items">
        <text class="items_name">兌換中心</text>
        <text class="items_dec">兌換星球會員、優惠券和禮品卡</text>
        <uni-icons style="display: inline-block;vertical-align: middle" type="arrowright" size="30" color="#cccccc"></uni-icons>
      </view>
      <view class="fun_items">
        <text class="items_name">星球封面</text>
        <text class="items_dec"></text>
        <uni-icons style="display: inline-block;vertical-align: middle" type="arrowright" size="30" color="#cccccc"></uni-icons>
      </view>
      <view class="fun_items">
        <text class="items_name">聯系客服</text>
        <text class="items_dec"></text>
        <uni-icons style="display: inline-block;vertical-align: middle" type="arrowright" size="30" color="#cccccc"></uni-icons>
      </view>
      <view class="fun_items">
        <text class="items_name">消息中心</text>
        <text class="items_dec"></text>
        <uni-icons style="display: inline-block;vertical-align: middle" type="arrowright" size="30" color="#cccccc"></uni-icons>
      </view>
      <view class="fun_items">
        <text class="items_name">更多</text>
        <text class="items_dec"></text>
        <uni-icons style="display: inline-block;vertical-align: middle" type="arrowright" size="30" color="#cccccc"></uni-icons>
      </view>
    </view>-->
    <optionsList :list="options"></optionsList>
	</view>
</template>

<script>
import optionsList from "../../../components-lk/optionsList/optionsList";
	export default {
		name: "options",
    data() {
      return {
        options: [{
          title: '會員碼',
          summary: '門店掃碼積分、奶茶錢包和奶茶有禮支付',
          icon: 'arrowright'
        }, {
          title: '兌換中心',
          summary: '兌換星球會員、優惠券和禮品卡',
          icon: 'arrowright'
        }, {
          title: '星球封面',
          icon: 'arrowright'
        }, {
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
    components:{
		  optionsList
    }
	}
</script>

<style scoped lang="scss">
.options{
  width: 100%;
  height: 590rpx;
  padding: 0 $spacing-lg;
  box-sizing: border-box;
}
</style>
