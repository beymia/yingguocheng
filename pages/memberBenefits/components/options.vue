<template>
  <view class="container">
    <view class="content" v-for="(item,index) in list" :key="index">
      <view class="left">
        <text>{{ item.goods_name }}*{{ item.goods_num }}</text>
      </view>
      <view class="right">
        <view @click="$emit('receive-start',item)" v-if="item.receive_status===1" class="unused status">領取</view>
        <view v-else class="used status">已領取</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .content{
    width: 100%;
    height: 44rpx;
    display: flex;
    justify-content: space-between;
    font-size: $font-size-base;
    color: $font-color1;
    align-items: center;
    margin-bottom: $spacing-lg;

    .right{
      width: 80rpx;
      height: 44rpx;
      background: $main-color;
      border-radius: 22px;
      font-size: $font-size-sm - 2rpx;
      color: #ffffff;
      text-align: center;
      line-height: 44rpx;

      .used{
        width: 80rpx;
        height: 44rpx;
        background: #cccccc;
        border-radius: 22rpx;
      }
    }
  }
}
</style>
