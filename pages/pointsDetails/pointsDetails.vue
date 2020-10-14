<template>
  <view class="points_details">
    <noMoreData v-if="!spliceData||spliceData.length===0"></noMoreData>
    <view v-else
          class="content"
          v-for="(d,index) in spliceData"
          :key="index">
      <view class="head">{{ d.name }}</view>
      <view class="details">
        <view v-for="(p,i) in d.data"
              :key="p.id"
             :class="['item',i!== d.data.length-1?'borderBottom':'']">
          <view>
            <view>
              <text>原有：{{ p.current_price }}</text>
              <text>剩余：{{ p.surplus_price }}</text>
            </view>
            <view>
              <text>{{ p.created_at }}</text>
            </view>
          </view>
          <view>
            <text>{{
                p.consume_status === '扣款'
                    ? '-' + p.consume_price
                    : '+' + p.consume_price
              }}
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {pointsDetails} from "../../request/api";

export default {
  data() {
    return {
      details:[],
      page:1
    }
  },
  async mounted() {
    this.token = getApp().globalData.userToken;
    this.details = (await pointsDetails({
      page: this.page,
    })).data;

  },
  computed: {
    spliceData() {
      console.log(this.details);
      let spliceObj = {},
          temp = []
      this.details.forEach((item, index) => {
        temp = item.created_at.split('/');
        item.name = `${temp[0]}年${temp[1]}月`;
        if(!(spliceObj[item.name])){
          spliceObj[item.name] = {
            name:item.name,
            data:[]
          };
        }
        spliceObj[item.name].data.push(item)
      })
      return spliceObj
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.points_details {
  width: 100%;
  min-height: 100vh;
  background-color: $main-bg;
  padding: 0 $spacing-base;
  box-sizing: border-box;

  .content{
    width: 100%;
    font-size: $font-size-sm - 2rpx;
    color: $font-color1;

    .head{
      height: 90rpx;
      padding:$spacing-lg 0;
      box-sizing: border-box;
    }

    .details{
      width:100%;
      background-color: #FFFFFF;
      padding: 0 20rpx;
      box-sizing: border-box;
      border-radius: 20rpx;

      .item{
        width: 100%;
        height: 124rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &.borderBottom{
          border-bottom: 1rpx solid rgba(204,204,204,.4);
        }

        view:nth-child(1){
          font-size: $font-size-sm;
          color: $font-color1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          view:nth-child(2){
            font-size:$font-size-sm - 4rpx;
            color: $font-color3;
          }
        }

        view:nth-child(2){
          font-size: $font-size-sm;
          color: $main-color;
        }
      }
    }
  }
}
</style>
