<template>
  <view class="record">
    <noMoreData v-if="!record||record.length === 0"></noMoreData>
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
              <text>{{ p.goods_name }}</text>
            </view>
            <view>
              <text>{{ p.created_at }}</text>
            </view>
          </view>
          <view>
            <text>{{ '-' + p.barter_integral }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
//預付卡購買記錄
export default {
  data() {
    return {
      record: [],
    }
  },
  onLoad(options) {
    options.data
    ? this.record = JSON.parse(decodeURIComponent(options.data))
    : this.record = [];
  },
  computed: {
    //根据月份分离出对应的数据
    spliceData() {
      if (!this.record) return;
      let spliceObj = {},
          temp = []
      this.record.forEach((item) => {
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
}
</script>

<style lang="scss" scoped>
.record {
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
