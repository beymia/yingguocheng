<template>
	<view class="options">
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
		<view @click="$emit('handler-click','customerService')" class="fun_items">
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
	</view>
</template>

<script>
	export default {
		name: "options"
	}
</script>

<style scoped lang="scss">
.options{
  width: 100%;
  min-height: 590rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 $spacing-lg;
  box-sizing: border-box;

  .fun_items{
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    font-size:$font-size-base;
    color: $font-color1;

    .items_dec{
      font-size: $font-size-sm;
      color: #cccccc;
      margin-left: auto;
      margin-right: 20rpx;
    }
  }
}
</style>
