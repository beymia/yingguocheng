<template>
  <!--只提供动画和背景图层，-->
  <view :style="{'z-index':floor}"  class="layer">
    <view class="masking" @click="$emit('mask-click')"></view>
    <view class="content">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: "popUpLayer",
  props:{
    floor:{
      type:Number,
      default:999999
    }
  },
  methods:{

  }
}
</script>

<style scoped lang="scss">
.layer {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 111111;

  .masking {
    width: 100%;
    height: 100%;
    position: relative;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    z-index: -1111;
  }

  .content{
    position:fixed;
    bottom: 0;
    left: 0;
  }
}
</style>