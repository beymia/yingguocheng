<template>
  <view class="msg_center">
    <view v-if="!msgList.length" class="empty">
      <image src="../../static/images_t/messageCenter/msg_empty.png"></image>
      <text>消息列表为空</text>
    </view>
    <view v-else class="msg_content">
      <view class="msg_item"
            v-for="(msg,index) in msgList"
            :key="index">
        <text>{{ msg.msg_text }}</text>
        <text>{{ msg.created_at }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import {msgCenter} from "../../request/api";

export default {
  data() {
    return {
      msgList:[]
    }
  },
  async mounted(){
    this.msgList = (await msgCenter()).data;
    console.log(this.msgList);
  },
  methods: {}
}
</script>

<style scoped lang="scss">
uni-page-body{
  height: 100%;
  background-color: $main-bg;
}
.msg_center{
  width: 100%;
  background-color: $main-bg;

  .empty{
    font-size: $font-size-sm;
    color: $font-color3;
    padding-top: 254rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    image{
      width: 200rpx;
      height: 217rpx;
      margin-bottom: 20rpx;
    }
  }

  .msg_content{
    width: 100%;
    padding: 0 $spacing-base;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .msg_item{
      width: 100%;
      height: 130rpx;
      background: #ffffff;
      border-radius: 20rpx;
      margin-top: $spacing-lg;
      font-size: $font-size-sm;
      color: $font-color1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 30rpx 0 24rpx 20rpx;
      box-sizing: border-box;


      text:nth-child(2){
        font-size: $font-size-sm - 2rpx;
        color: $font-color3;
      }
    }
  }
}
</style>
