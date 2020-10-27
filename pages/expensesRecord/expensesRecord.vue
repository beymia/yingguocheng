<template>
  <view class="points_details">
    <noMoreData v-if="!record||record.length === 0"></noMoreData>
    <view class="content"
          v-else
          v-for="(d,index) in spliceData"
          :key="index">
      <view class="head">{{ d.name }}</view>
      <view class="details">
        <view v-for="(p,i) in d.data"
              :key="p.id"
              :class="['item',i!== d.data.length-1?'borderBottom':'']">
          <view class="diff">
            <view>
              <text>原有：{{ p.current_price }}</text>
              <text>現有：{{ p.surplus_price }}</text>
            </view>
            <view class="time">
              <text>{{ p.created_at }}</text>
            </view>
          </view>
          <view class="amount">
            <text>{{
                p.consume_status === '充值'
                    ? '+' + p.consume_price
                    : '-' + p.consume_price
              }}
            </text>
            <text>{{ p.consume_type }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
//钱包余额消费记录
import { expensesRecord} from "../../request/api";

export default {
  data() {
    return {
      record: [],
      page: 1
    }
  },
  async mounted() {
    this.token = getApp().globalData.userToken;
    try {
      this.record = (await expensesRecord({page: this.page})).data
    } catch (e) {
      console.log(e);
      this.customToast('请求出错', false)
    }
  },
  computed: {
    //根据月份分割数组
    spliceData() {
      let spliceObj = {},
          temp = []
      this.record.forEach((item, index) => {
        temp = item.created_at.split('/');
        item.name = `${temp[0]}年${temp[1]}月`;
        if (!(spliceObj[item.name])) {
          spliceObj[item.name] = {
            name: item.name,
            data: []
          };
        }
        spliceObj[item.name].data.push(item)
      })
      return spliceObj
    }
  },

  //上拉加载更多
  async onReachBottom(){
    try{
      let data = (await expensesRecord({
        page:++this.page,
      })).data
      if(!data){
        --this.page;
        throw 1
      }
      this.record = this.record.concat(data)
      console.log(this.record);
    }catch (e) {
      this.customToast('没有更多数据了',false)
    }
  },
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

        .diff{
          font-size: $font-size-sm;
          color: $font-color1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          view:nth-child(1){
            display: flex;
            flex-direction: column;
          }

          view:nth-child(2){
            font-size:$font-size-sm - 4rpx;
            color: $font-color3;
          }
        }

        .amount{
          font-size: $font-size-sm;
          color: $main-color;

          text:nth-child(1){
            margin-right: 20rpx;
          }
        }
      }
    }
  }
}
</style>
