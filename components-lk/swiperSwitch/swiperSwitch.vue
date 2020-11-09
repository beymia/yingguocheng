<template>
  <view class="swiper_container">
    <!--    头部-->
    <view class="head">
      <view class="left">
        <text @click="clickSwitch(0)" :class="[tabIndex===0 ? 'active':'']">{{ leftTitle }}</text>
      </view>
      <view class="right">
        <text @click="clickSwitch(1)" :class="[tabIndex===1 ? 'active':'']">{{ rightTitle }}</text>
      </view>
    </view>
    <swiper :current="swiperIndex"
            class="swiper-wrap"
            @change="swiperChange">
      <swiper-item class="swiper-slide left">
        <scroll-view @scrolltolower="$emit('scroll-bottom','left')"
                     enable-flex
                     lower-threshold="0"
                     class="scroll_wrap"
                     scroll-y>
          <view>
            <slot name="left"></slot>
          </view>
        </scroll-view>
      </swiper-item>
      <swiper-item class="swiper-slide right">
        <scroll-view @scrolltolower="$emit('scroll-bottom','right')"
                     enable-flex
                     lower-threshold="0"
                     class="scroll_wrap"
                     scroll-y>
          <view>
            <slot name="right"></slot>
          </view>
        </scroll-view>
      </swiper-item>

    </swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      leftHeight: '100%',
      rightHeight: '100%',
      swiperIndex: 0,
      tabIndex: 0,
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
    assignIndex: {
      type: Number,
      default: 0
    },
  },
  methods: {
    //點擊切換
    clickSwitch(i) {
      this.swiperIndex = i;
      this.tabIndex = i;
    },
    //swiper改变时触发
    swiperChange(e) {
      this.tabIndex = e.detail.current;
      this.swiperIndex = e.detail.current;
      // this.computeHeight()
    },

    //计算swiper组件的高度,使用scroll-view替代，不需要計算
    // async computeHeight() {
    //   //屏幕滚动至最顶部，如果屏幕在非顶部可能会导致无法获取组件的布局信息
    //   // uni.pageScrollTo({
    //   //   scrollTop: 0,
    //   //   duration: 0,
    //   // })
    //   let layout, h, diff;
    //   let windowH = uni.getSystemInfoSync().windowHeight;
    //   try {
    //     if (this.tabIndex === 0) {
    //       layout = await this.getLayoutInfo(this.leftName);
    //       h = (this.leftLength * layout.height + layout.top)
    //       h = h < windowH ? windowH : h;
    //       this.leftHeight = h +'px';
    //     } else {
    //       if (this.same) {
    //         // #ifdef MP
    //         diff = await this.getLayoutInfo('.have_foresee >>> .foot')
    //         // #endif
    //         // #ifndef MP
    //         diff = await this.getLayoutInfo('.foot')
    //         // #endif
    //         h = diff.top + diff.height;
    //       } else {
    //         layout = await this.getLayoutInfo(this.rightName);
    //         h = (this.rightLength * layout.height + layout.top);
    //       }
    //       h = h < windowH ? windowH : h;
    //       this.rightHeight = h + 'px';
    //     }
    //   } catch (e) {
    //     this.leftHeight = windowH + 'px';
    //     this.rightHeight = windowH + 'px';
    //   }
    // },
  },

  watch: {
    // async tabIndex() {
    //   // await this.computeHeight()
    // },
    async assignIndex() {
      await this.swiperChange({detail:{current:0}})
      // await this.computeHeight()
    }
  },
};
</script>

<style lang="scss" scoped>
.swiper_container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .head{
    width: 100%;
    height: 120rpx;
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
    flex: 1;
    overflow: hidden;

    .scroll_wrap{
      height: 100%;
    }
  }
}
</style>