<template>
  <view class="remarks_container">
    <popUpLayer>
      <template>
        <view class="remarks_content">
          <view class="remarks_head">
            <text>訂單備註</text>
            <uni-icons @click="$emit('close-remarks',0)" class="clear_remarks" type="clear" size="44"
                       color="#D0D0D0"></uni-icons>
          </view>
          <view class="remarks_options">
            <view class="option">
              <view class="options_title">
                <text>無接觸配送：</text>
              </view>
              <view class="options_btn">
                <button @click="selectRemarks('noContact',0)" :class="{'selected':!noContact}" plain>不需要</button>
                <button @click="selectRemarks('noContact',1)" :class="{'selected':noContact}" plain>需要</button>
              </view>
            </view>
            <view class="option">
              <view class="options_title">
                <text>纸巾：</text>
              </view>
              <view class="options_btn">
                <button @click="selectRemarks('paper',0)" :class="{'selected':!paper}" plain>不需要</button>
                <button @click="selectRemarks('paper',1)" :class="{'selected':paper}" plain>需要</button>
              </view>
            </view>
            <view class="option">
              <view class="options_title">
                <text>糖包：</text>
              </view>
              <view class="options_btn">
                <button @click="selectRemarks('sugar',0)" :class="{'selected':!sugar}" plain>不需要</button>
                <button @click="selectRemarks('sugar',1)" :class="{'selected':sugar}" plain>需要</button>
              </view>
            </view>
          </view>
        </view>
        <view @click="$emit('close-remarks',{noContact,paper,sugar})" class="remarks_confirm">
          <button plain>確定</button>
        </view>
      </template>
    </popUpLayer>
  </view>
</template>

<script>
import popUpLayer from "../popUpLayer/popUpLayer";
export default {
  name: "remarks",
  data() {
    return {
      noContact: true,
      paper: true,
      sugar: true,
    }
  },
  props:{
    remarks:{
      type:Object,
      default:()=>{}
    }
  },
  mounted() {
    this.noContact = this.remarks.noContact;
    this.paper = this.remarks.paper;
    this.sugar = this.remarks.sugar;
  },
  methods: {
    selectRemarks(t, v) {
      this[t] = v;
    },
  },
  components:{
    popUpLayer
  }
}
</script>

<style scoped lang="scss">
$remarks-spacing:50rpx;
button {
  width: 120rpx;
  height: 60rpx;
  border: none;
  background: #f5f5f7;
  border-radius: 10rpx;
  font-size: $font-size-sm;
  font-weight: $font-weight-base;
  padding: 0;
  color: $font-color3;
  margin-right: $spacing-lg;
  box-sizing: border-box;

  &.selected{
    background: rgba(23,161,255,0.1);
    border: 1rpx solid $main-color;
    color: $main-color;
  }
}
  .remarks_container{
    width: 100%;

    .remarks_content{
      width: 100vw;
      height: 630rpx;
      background:#FFFFFF;
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
          right: $spacing-lg;
          top: 0;
        }
      }
    }

    .remarks_options{
      width: 100%;
      height: 520rpx;
      display: flex;
      flex-direction: column;
      padding: 0 $remarks-spacing;
      box-sizing: border-box;

      .option{
        width: 100%;
        display: flex;
        height: 60rpx;
        margin-top: $remarks-spacing;
        align-items: center;

        .options_title{
          font-size: $font-size-base;
          font-weight: $font-weight-lg;
          color: $font-color1;
          margin-right: $remarks-spacing;
        }
        .options_btn{
          display: flex;


        }
      }
    }
    .remarks_confirm{
      width: 650rpx;
      height: 82rpx;
      border-radius: 10rpx;
      position: fixed;
      bottom: 38rpx;
      left: $remarks-spacing;

      button{
        width: 100%;
        height: 100%;
        border: none;
        padding: 0;
        line-height: 82rpx;
        font-size: $font-size-base;
        color: #ffffff;
        background: $main-color;
      }
    }
  }
</style>