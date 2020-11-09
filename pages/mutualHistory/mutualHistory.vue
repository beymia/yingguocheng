<template>
  <view class="mutual">
    <swiperSwitch leftTitle="收到的"
                  rightTitle="送出的">
      <template v-slot:left>
        <noMoreData v-if="!receiveList.length"></noMoreData>
        <listContent v-else :list="receiveList"></listContent>
      </template>
      <template v-slot:right>
        <noMoreData v-if="!giveList.length"></noMoreData>
        <listContent v-else :list="giveList"></listContent>
      </template>
    </swiperSwitch>
  </view>
</template>

<script>
import swiperSwitch from "../../components-lk/swiperSwitch/swiperSwitch";
import listContent from "./components/listContent";
import {mutualRecord} from "../../request/api";
//预付卡赠送历史
export default {
  data() {
    return {
      giveList: [],
      receiveList: []
    }
  },
  mounted() {
    let self = this;
    Promise.all([mutualRecord({type: 1}), mutualRecord({type: 2})])
        .then(value => {
          self.giveList = (value[0].data || []);
          self.receiveList = (value[1].data || [])
        })
        .catch(err => {
          console.log(err);
          self.customToast('出現了錯誤')
        })
  },
  components: {
    swiperSwitch,
    listContent
  }
}
</script>

<style scoped lang="scss">
uni-page-body {
  height: 100%;
}

.mutual {
  width: 100%;
  height: 100%;
  background-color: $main-bg;
}
</style>
