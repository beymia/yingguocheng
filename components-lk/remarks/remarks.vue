<template>
  <view class="remarks_container" @touchmove.stop.prevent = "touchmoveStop">
        <view class="remarks_content"
              :style="{'bottom':keyboardHeight+'px'}"
              @touchmove.stop.prevent = "touchmoveStop">
          <view class="remarks_head">
            <text>訂單備註</text>
            <uni-icons @click="$emit('close-remarks',remarksSelect)"
                       class="clear_remarks"
                       type="clear"
                       size="44"
                       color="#D0D0D0">
            </uni-icons>
          </view>
          <view class="remarks_options">
            <view class="custom_remarks">
              <!-- #ifdef APP-PLUS-->
              <textarea type="text"
                        focus
                        maxlength="80"
                        v-model="remarksInput">
              </textarea>
              <!-- #endif-->
              <!-- #ifdef MP-WEIXIN-->
              <textarea type="text"
                        maxlength="80"
                        fixed
                        :show-confirm-bar="false"
                        :adjust-position="false"
                        v-model="remarksInput">
              </textarea>
              <!-- #endif-->
            </view>
            <view class="preset">
              <text @touchend.prevent="selectRemarks(index,true)"
                  v-for="(content,index) in remarks"
                  :key="index">{{content}}</text>
            </view>
            <!--<view class="option" v-for="(content,index) in remarks" :key="index">
              <view class="options_title">
                <text>{{content}}：</text>
              </view>
              <view class="options_btn">
                <button @click="selectRemarks(index,false)"
                        :class="{'selected':selectArr.indexOf(content) === -1}"
                        plain>不需要</button>
                <button @click="selectRemarks(index,true)"
                        :class="{'selected':selectArr.indexOf(content) !== -1}"
                        plain>需要</button>
              </view>
            </view>-->
            <!--<view class="option" v-for="(content,index) in remarks" :key="index">
              <view class="options_title">
                <text>{{content}}：</text>
              </view>
              <view class="options_btn">
                <button @click="selectRemarks(index,false)"
                        :class="{'selected':selectArr.indexOf(content) === -1}"
                        plain>不需要</button>
                <button @click="selectRemarks(index,true)"
                        :class="{'selected':selectArr.indexOf(content) !== -1}"
                        plain>需要</button>
              </view>
            </view>-->
<!--            <view class="option">
              <view class="options_title">
                <text>纸巾：</text>
              </view>
              <view class="options_btn">
                <button @click="selectRemarks('paper',null)" :class="{'selected':!paper}" plain>不需要</button>
                <button @click="selectRemarks('paper','纸巾')" :class="{'selected':paper}" plain>需要</button>
              </view>
            </view>
            <view class="option">
              <view class="options_title">
                <text>糖包：</text>
              </view>
              <view class="options_btn">
                <button @click="selectRemarks('sugar',null)" :class="{'selected':!sugar}" plain>不需要</button>
                <button @click="selectRemarks('sugar','糖包')" :class="{'selected':sugar}" plain>需要</button>
              </view>
            </view>-->
            <view @click="$emit('close-remarks',remarksInput||selectArr.join())"
                  class="remarks_confirm">
              <button plain>確定</button>
            </view>
          </view>
        </view>
  </view>
</template>

<script>
import popUpLayer from "../popUpLayer/popUpLayer";
export default {
  name: "remarks",
  data() {
    return {
     selectIndex:0,
      selectArr:[],
      remarksInput:'',
      keyboardHeight:0,
    }
  },
  props:{
    remarks:{
      type:Array,
      default:()=>[]
    },
    remarksSelect:{
      type:String,
      default:''
    }
  },
  mounted(){
    //基本类型的深度拷贝
    // this.selectArr = Object.assign([],this.remarksSelect)
    this.remarksInput = this.remarksSelect
    // #ifdef MP-WEIXIN
    uni.onKeyboardHeightChange((res) => {
     this.$nextTick(()=>{
       console.log(res.height);
       this.keyboardHeight = res.height
     })
    })
    // #endif
  },
  methods: {
    selectRemarks(i, s) {
      this.remarksInput += this.remarks[i] +','
      // console.log(i);
      // let remarksContent= this.selectArr.indexOf(this.remarks[i])
      // if( remarksContent === -1){
      //   this.selectArr.push(this.remarks[i])
      // }else{
      //   let remarksIndex = this.selectArr.indexOf(this.remarks[i])
      //   this.selectArr.splice(remarksIndex, 1)
      // }
      // this.selectIndex = i;
      // console.log(i);
      // if (s) {
      //   this.selectArr.push(this.remarks[i])
      // }
      // else {
      //   let remarksIndex = this.selectArr.indexOf(this.remarks[i])
      //   this.selectArr.splice(remarksIndex, 1)
      // }
      // console.log(this.selectArr);
    },
    touchmoveStop(){},
  },
  components:{
    popUpLayer
  }
}
</script>

<style scoped lang="scss">
$remarks-spacing:50rpx;
button {
  width: 120rpx;
  height: 60rpx;
  border: none;
  background: #f5f5f7;
  border-radius: 10rpx;
  font-size: $font-size-sm;
  font-weight: $font-weight-base;
  padding: 0;
  color: $font-color3;
  margin-right: $spacing-lg;
  box-sizing: border-box;

  &.selected{
    background: rgba(23,161,255,0.1);
    border: 1rpx solid $main-color;
    color: $main-color;
  }
}
  .remarks_container{
    width: 100%;
    height: 100vh;
    position: fixed;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 1231321;

    .remarks_content{
      width: 100vw;
      height: 630rpx;
      background:#FFFFFF;
      border-radius: 20rpx 20rpx 0rpx 0rpx;
      overflow: hidden;
      position: absolute;
      bottom: 0;
      left:0;

      .remarks_head{
        width: 100%;
        height: 110rpx;
        font-size: $font-size-lg;
        font-weight: $font-weight-lg;
        color: $font-color1;
        position: relative;
        text-align: center;
        line-height: 110rpx;
        background: #f7f7f7;

        .clear_remarks{
          position: absolute;
          right: $spacing-lg;
          top: 0;
        }
      }
    }

    .remarks_options{
      width: 100%;
      height: 520rpx;
      display: flex;
      flex-direction: column;
      padding: 0 $remarks-spacing;
      box-sizing: border-box;

      .custom_remarks{
        height: 230rpx;
        padding: 10rpx;
        box-sizing: border-box;
        margin: 20rpx 0;
        border: 2rpx solid #ccc;
        overflow: hidden;
      }

      .preset{
        width: 100%;
        height: 60rpx;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: $font-size-base;

        text{
          display: block;
          padding:10rpx 20rpx;
          border: 1rpx solid #ccc;
        }

        .selected{
          background: rgba(23,161,255,0.1);
          border: 1rpx solid $main-color;
          color: $main-color;
        }
      }

      .option{
        width: 100%;
        display: flex;
        height: 60rpx;
        margin-top: $remarks-spacing;
        align-items: center;

        .options_title{
          font-size: $font-size-base;
          font-weight: $font-weight-lg;
          color: $font-color1;
          margin-right: $remarks-spacing;
        }
        .options_btn{
          display: flex;
        }
      }
    }
    .remarks_confirm{
      width: 650rpx;
      height: 82rpx;
      border-radius: 10rpx;
      margin-top: 60rpx;

      button{
        width: 100%;
        height: 100%;
        border: none;
        padding: 0;
        line-height: 82rpx;
        font-size: $font-size-base;
        color: #ffffff;
        background: $main-color;
      }
    }
  }
</style>