<template>
  <view class="options_list">
    <view class="head" v-if="head">
      <slot name="head"></slot>
    </view>

    <view class="items">
      <view class="list_item"
            v-for="(option,index) in list"
            :key="index"
            @click="$emit('options-click',{page:option.title})">
        <text class="title">{{ option.title }}</text>
        <text v-if="option.summary" class="summary">{{ option.summary }}</text>
        <text v-if="option.right" class="right">{{ option.right }}</text>
        <uni-icons v-if="option.icon"
                   class="icon"
                   style="display: inline-block;vertical-align: middle"
                   :type="option.icon"
                   size="30"
                   color="#cccccc">
        </uni-icons>
      </view>
    </view>

    <view class="foot" v-if="foot">
      <slot name="foot"></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: "optionsList",
  props: {
    //列表数据
    list: {
      type: Array,
      required: true
    },
    //头部插槽
    head: {
      type: Boolean,
      default: false,
    },
    //尾部插槽
    foot: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  .options_list{
    width: 100%;
    height: 100%;

    .items{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .list_item{
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title{
          font-size: $font-size-base;
          color: $font-color1;
        }

        .summary{
          font-size: $font-size-sm;
          color: #cccccc;
          margin-left: auto;
        }

        .icon{
          margin-left: 10rpx;
        }
      }
    }
  }
</style>