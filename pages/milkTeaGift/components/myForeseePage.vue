<template>
  <view class="my_foresee">
    <view v-if="!foresee.length" class="empty">
      <image src="../../../static/images_t/milkTeaGift/empty.png"></image>
      <text>暫無奶茶有禮卡</text>
      <button @click="$emit('buy-foreseeList',1)" plain>去購買奶茶有禮卡</button>
    </view>

    <view class="have_content" v-else>
      <foreseeList :list="foresee"></foreseeList>
    </view>

    <view class="foot">
      <text @click="navHistory('buy')">購買歷史</text>
      <text>|</text>
      <text @click="navHistory('mutual')">收送歷史</text>
    </view>
  </view>
</template>

<script>
import foreseeList from "../../../components-lk/foreseeList/foreseeList";
export default {
  name: "myForesee",
  props:{
    foresee:{
      type:Array,
      default:()=>[],
    }
  },
  methods:{
    navHistory(page){
      console.log(2);
      page += 'History';
      uni.navigateTo({
        url:`/pages/${page}/${page}`,
      })
    }
  },
  components:{
    foreseeList
  }
}
</script>

<style scoped lang="scss">
uni-page-body{
  height: 100%;
}
.my_foresee{
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: $spacing-base;
  box-sizing: border-box;

  .empty{
    margin-top: 200rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    text{
      display: inline-block;
      font-size: $font-size-sm;
      color: $font-color3;
      margin: 10rpx 0 30rpx 0 ;
    }

    image{
      width: 200rpx;
      height: 200rpx;
    }

    button{
      width: 320rpx;
      height: 80rpx;
      background: $main-color;
      font-size: $font-size-sm;
      border-radius: 4rpx;
      border: none;
      padding: 0;
      color: #FFFFFF;
      text-align: center;
      line-height: 80rpx;
      margin-bottom: 400rpx;
    }
  }

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

  .foot{
    width:100%;
    height: 100rpx;
    font-size: $font-size-sm;
    color: $font-color3;
    display: flex;
    justify-content: center;

    text:nth-child(2){
      margin: 0 $spacing-lg;
    }
  }
}
</style>