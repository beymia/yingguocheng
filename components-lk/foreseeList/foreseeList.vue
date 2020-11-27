<template>
  <view class="foresee_container">
    <view class="have_list" v-for="have in list" :key="have.id">
      <image :src="have.home_avatar | filterImg"></image>
      <view class="attach">
        <text>￥{{ have.worth_price }}</text>
        <text @click="$emit('give-foresee',have)">贈送好友</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list:{
      type:Array,
      default:()=>[]
    }
  },
};
</script>

<style scoped lang="scss">
.foresee_container{
  .have_list{
    width: 100%;
    height: 400rpx;
    background: #ffffff;
    border-radius: 30rpx;
    margin-bottom: $spacing-lg;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .attach{
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $spacing-lg;
      box-sizing: border-box;
      font-weight: $font-weight-lg;

      text:nth-child(1){
        font-size: $font-size-lg + 4rpx;
        color: $font-color1;
      }
      text:nth-child(2){
        display: inline-block;
        width: 96rpx;
        height: 33rpx;
        font-size: $font-size-sm;
        color: $main-color;
      }
    }

    image{
      width: 100%;
      height: 300rpx;
      background: rgba(0,0,0,0);
      border-radius: 30rpx 30rpx 0rpx 0rpx;
    }
  }
}
</style>
