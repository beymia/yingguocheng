<template>
  <view class="container">
    <!--    头部-->
    <view class="head">
      <view class="left">
        <text @click="clickSwitch(0)" :class="[swiperIndex===0 ? 'active':'']">{{ leftTitle }}</text>
      </view>
      <view class="right">
        <text @click="clickSwitch(1)" :class="[swiperIndex===1 ? 'active':'']">{{ rightTitle }}</text>
      </view>
    </view>
    <swiper :style="{'height':swiperHeight}"
            :current="swiperIndex"
            @change="toggleFeat"
            @animationfinish="switchEnd"
            class="swiper-wrap">
      <swiper-item class="swiper-slide left">
        <slot name="left"></slot>
      </swiper-item>
      <swiper-item class="swiper-slide right">
        <slot name="right"></slot>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      swiperHeight: '100%',
      swiperIndex: 0,
      isSlide: true,
      timer: null
    }
  },
  props: {
    leftTitle: {
      type: String,
      default: ''
    },
    rightTitle: {
      type: String,
      default: ''
    },
    leftLength: {
      type: Number,
      default: 0
    },
    rightLength: {
      type: Number,
      default: 0
    },
    leftName: String,
    rightName: String,
    assignIndex: {
      type: Number,
      default: 0
    },
    same: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    currentIndex() {
      if (typeof this.assignIndex === 'undefined') {
        return this.swiperIndex;
      } else {
        return this.assignIndex
      }
    }
  },
  //组件初始加载计算高度
  async mounted() {
    await this.computeHeight()
  },
  destroyed() {
    clearTimeout(this.timer)
  },
  methods: {
    //點擊切換
    clickSwitch(i) {
      this.swiperIndex = i;
      this.isSlide = false;
    },
    //swiper動畫結束之後出發
    switchEnd() {
      this.isSlide = true;
    },
    //swiper改变时触发
    swiperChange() {
      this.swiperIndex === 0
          ? this.swiperIndex = 1
          : this.swiperIndex = 0;
      this.isSlide = false;
    },
    //左右滑動切換
    toggleFeat() {
      //延遲觸發
        if (!this.isSlide) return;
        this.swiperChange()
    },

    //计算swiper组件的高度,兼容小程序异步调用
    async computeHeight() {
      this.swiperHeight = '';
      //屏幕滚动至最顶部，如果屏幕在非顶部可能会导致无法获取组件的布局信息
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 0,
      })
      let layout, h,diff;
      let windowH = uni.getSystemInfoSync().windowHeight;
      try {
        if (this.swiperIndex === 0) {
          layout = await this.getLayoutInfo(this.leftName);
          h = (this.leftLength * layout.height + layout.top)
        } else {
          if (this.same) {
            // #ifdef MP
             diff = await this.getLayoutInfo('.have_foresee >>> .foot')
            // #endif
            // #ifndef MP
            diff = await this.getLayoutInfo('.foot')
            // #endif
            h = diff.top + diff.height;
          }else{
            layout = await this.getLayoutInfo(this.rightName);
            h = (this.rightLength * layout.height + layout.top);
          }
        }
        h = h < windowH ? windowH : h;
        this.swiperHeight = h + 'px';
      } catch (e) {
        this.swiperHeight = windowH + 'px';
      }
    },
  },

  watch: {
    async swiperIndex() {
      await this.computeHeight()
    },
    async assignIndex() {
      await this.swiperChange()
      await this.computeHeight()
    }
  },
};
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
  .head{
    width: 100%;
    height: 120rpx;
    position: fixed;
    top: --status-bar-height;
    left: 0;
    z-index: 10;
    background: #FFFFFF;
    display: flex;
    justify-content: space-around;
    font-size: $font-size-lg;
    color: $font-color2;
    padding-top: 20rpx;
    line-height: 100rpx;

    text{
      display: inline-block;
    }

    .active{
      color: $font-color1;
      font-weight: $font-weight-lg;
      position: relative;
      height: 100%;

      &::after{
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        width: 80rpx;
        height: 4rpx;
        background: $font-color1;
        left: 50%;
        margin-left: -40rpx;
      }
    }
  }
  .swiper-wrap{
    height: 100%;
  }
}
</style>