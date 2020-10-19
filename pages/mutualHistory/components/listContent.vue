<template>
  <view class="container">
    <view v-for="(content,index) in list"
          :key="index"
          class="mutual_list">
      <!--TODO 需要替换图片地址 imgSrc + content.home_avatar-->
      <image src="../../../static/images_t/milkTeaGift/img.png"></image>
      <view class="mutual_info">
        <text>￥{{content.worth_price}}</text>
        <view class="info">
          <image src="../../../static/images_t/my/user_avatar.png"></image>
          <text>{{content.to_uid_name}}</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
      redirect: true
    }
  },
};
</script>

<style scoped lang="scss">

.container{
  width: 100%;
  padding:$spacing-base ;
  box-sizing: border-box;

  .mutual_list{
    width: 100%;
    height: 400rpx;
    display: flex;
    flex-direction: column;

    image{
      width: 100%;
      height: 300rpx;
    }

    .mutual_info{
      width: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: $font-size-lg + 4rpx;
      font-weight:$font-weight-lg;
      color: $font-color1;

      .info{
        font-size: $font-size-sm;
        font-weight: $font-weight-base;
        display: flex;

        image{
          width: 44rpx;
          height: 44rpx;
          border-radius:50%;
          margin-right: 10rpx;
        }
      }
    }
  }
}
</style>