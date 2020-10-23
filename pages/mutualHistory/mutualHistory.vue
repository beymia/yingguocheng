<template>
  <view class="mutual">
    <swiperSwitch @scrollBottom="loadMore"
                  leftTitle="收到的"
                  rightTitle="送出的">
      <template v-slot:left>
        <listContent :list="receiveList"></listContent>
      </template>
      <template v-slot:right>
        <listContent :list="giveList"></listContent>
      </template>
    </swiperSwitch>
  </view>
</template>

<script>
import swiperSwitch from "../../components-lk/swiperSwitch/swiperSwitch";
import listContent from "./components/listContent";
import {mutualRecord} from "../../request/api";

export default {
  data() {
    return {
      giveList: [
        {
          home_avatar: "/uploads/202010/14/160267063599194.jpg",
          worth_price: "60.00",
          to_uid_name: "LPQNRDnL0DKdhnbn"
        }],
      receiveList: [
        {
          home_avatar: "/uploads/202010/14/160267063599194.jpg",
          worth_price: "60.00",
          to_uid_name: "LPQNRDnL0DKdhnbn"
        }, {
          home_avatar: "/uploads/202010/14/160267063599194.jpg",
          worth_price: "60.00",
          to_uid_name: "LPQNRDnL0DKdhnbn"
        }, {
          home_avatar: "/uploads/202010/14/160267063599194.jpg",
          worth_price: "60.00",
          to_uid_name: "LPQNRDnL0DKdhnbn"
        }, {
          home_avatar: "/uploads/202010/14/160267063599194.jpg",
          worth_price: "60.00",
          to_uid_name: "LPQNRDnL0DKdhnbn"
        }, {
          home_avatar: "/uploads/202010/14/160267063599194.jpg",
          worth_price: "60.00",
          to_uid_name: "LPQNRDnL0DKdhnbn"
        }, {
          home_avatar: "/uploads/202010/14/160267063599194.jpg",
          worth_price: "60.00",
          to_uid_name: "LPQNRDnL0DKdhnbn"
        }, {
          home_avatar: "/uploads/202010/14/160267063599194.jpg",
          worth_price: "60.00",
          to_uid_name: "LPQNRDnL0DKdhnbn"
        },],
    }
  },
  // TODO 生产环境使用，待测试
/*  mounted() {
    let self = this;
    Promise.all([mutualRecord({type: 1}), mutualRecord({type: 2})])
        .then(value => {
          self.giveList = (value[0].data || []);
          self.receiveList = (value[1].data || [])
        })
        .catch(err => {
          console.log(err);
          self.customToast('出现了错误')
          self.giveList = [];
          self.receiveList = []
        })
  },*/
  components: {
    swiperSwitch,
    listContent
  }
}
</script>

<style scoped lang="scss">
uni-page-body{
  height: 100%;
}

.mutual{
  width: 100%;
  height: 100%;
  background-color: $main-bg;
}
</style>
