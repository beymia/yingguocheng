<template>
  <view :style="{'top': top +'%'}"  class="empty">{{title}}</view>
</template>

<script>
export default {
  name: "noMoreData",
  props:{
    title:{
      type:String,
      default:'沒有更多的數據了~~~'
    },
    top:{
      type:String,
      default: '50'
    }
  }
}
</script>

<style scoped lang="scss">
.empty {
  width: 100%;
  position: fixed;
  top: 50%;
  left:0;
  text-align: center;
}
</style>