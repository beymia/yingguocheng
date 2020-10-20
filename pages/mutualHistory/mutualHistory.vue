<template>
  <view class="mutual">
    <swiperSwitch leftTitle="收到的"
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
        },{
          home_avatar: "/uploads/202010/14/160267063599194.jpg",
          worth_price: "60.00",
          to_uid_name: "LPQNRDnL0DKdhnbn"
        },{
          home_avatar: "/uploads/202010/14/160267063599194.jpg",
          worth_price: "60.00",
          to_uid_name: "LPQNRDnL0DKdhnbn"
        },{
          home_avatar: "/uploads/202010/14/160267063599194.jpg",
          worth_price: "60.00",
          to_uid_name: "LPQNRDnL0DKdhnbn"
        },{
          home_avatar: "/uploads/202010/14/160267063599194.jpg",
          worth_price: "60.00",
          to_uid_name: "LPQNRDnL0DKdhnbn"
        },{
          home_avatar: "/uploads/202010/14/160267063599194.jpg",
          worth_price: "60.00",
          to_uid_name: "LPQNRDnL0DKdhnbn"
        },{
          home_avatar: "/uploads/202010/14/160267063599194.jpg",
          worth_price: "60.00",
          to_uid_name: "LPQNRDnL0DKdhnbn"
        },],
      // #ifdef MP
      swiperName:'.mutual>>>.mutual_list',
      // #endif
      // #ifndef MP
      swiperName : '.mutual_list',
      // #endif

    }
  },
  components:{
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
