<template>
  <view class="empty">{{title}}</view>
</template>

<script>
export default {
  name: "noMoreData",
  props:{
    title:{
      type:String,
      default:'沒有更多的數據了~~~'
    }
  }
}
</script>

<style scoped lang="scss">
.empty {
  width: 100vw;
  height: 90vh;
  line-height: 60vh;
  position: fixed;
  top: 0;
  left:0;
  text-align: center;
}
</style>