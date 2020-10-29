<template>
  <view class="more">
    <optionsList
        @options-click="navPage"
        height="100rpx"
        :border="true"
        :list="options"></optionsList>
  </view>
</template>

<script>
import optionsList from "../../components-lk/optionsList/optionsList";
export default {
  name: "more",
  data() {
    return {
      options: [{
        title: '個人資料',
        icon: 'arrowright'
      }]
    }
  },
  methods: {
    navPage(e) {
      let page = e.page
      switch (page) {
        case '個人資料':
          page = 'profile';
          break;
      }
      uni.navigateTo({
        url:`/pages/${page}/${page}`
      })
    }
  },
  components: {
    optionsList
  }
}
</script>

<style scoped lang="scss">
.more {
  width: 100%;
  padding: 0 $spacing-base;
  box-sizing: border-box;
}
</style>