<template>
  <view class="remarks_container">
      <view class="remarks_content">
        <view class="remarks_head">
          <text>訂單備註</text>
          <uni-icons class="clear_remarks" type="clear" size="44" color="#D0D0D0"></uni-icons>
        </view>
      </view>
  </view>
</template>

<script>
export default {
name: "remarks"
}
</script>

<style scoped lang="scss">
  .remarks_container{
    width: 100%;
    height:100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
    z-index: 999;

    .remarks_content{
      width: 100%;
      height: 630rpx;
      background:#FFFFFF;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 20rpx 20rpx 0rpx 0rpx;
      overflow: hidden;

      .remarks_head{
        width: 100%;
        height: 110rpx;
        font-size: $font-size-lg;
        font-weight: $font-weight-lg;
        color: $font-color1;
        position: relative;
        text-align: center;
        line-height: 110rpx;
        background: #f7f7f7;

        .clear_remarks{
          position: absolute;
          right: $order-spacing-lg;
          top: 0;
        }
      }
    }
  }
</style>