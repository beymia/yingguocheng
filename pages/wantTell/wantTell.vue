<template>
  <view class="want_tell">
    <rich-text :nodes="tolkData"></rich-text>
  </view>
</template>

<script>
import {tolk} from "../../request/api";

export default {
  name: "wantTell",
  data(){
    return {
      tolkData:{}
    }
  },
  async mounted(){
    this.tolkData = (await tolk()).data
  },
}
</script>

<style lang="scss" scoped>
.want_tell{
  width: 100vw;
  min-height: 100vh;
  padding: 0 $spacing-lg;
  box-sizing: border-box;
}
</style>