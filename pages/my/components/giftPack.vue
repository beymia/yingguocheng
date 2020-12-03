<template>
	<view class="gift_pack">
		<view class="package_head">
			<text>開通禮包</text>
      <text class="package_title" v-if="title">{{title}}</text>
			<text v-else>更多</text>
		</view>
		<view class="package_content">
        <!-- TODO 礼包数据需要从用户数据接口获取-->
				<view class="items" v-for="(pack,index) in giftPack" :key="index">
					<view class="icon_exception package_icon">
						<image :src="pack.home_avatar | filterImg"></image>
					</view>
					<view class="package_title">
						<text>{{pack.goods_name}}</text>
						<text>X{{pack.goods_num}}</text>
					</view>
				</view>
      <view class="items" v-for="(empty,index) in computeLength" :key="index+'po'">
      </view>

<!--				<view class="items">
					<view class="package_icon">
						<image src="../../../static/images/my/free_one.png"></image>
					</view>
					<view class="package_title">
						<text>買壹贈壹券</text>
						<text>X1</text>
					</view>
				</view>
				<view class="items">
					<view class="package_icon">
						<image src="../../../static/images/my/free_two.png"></image>
					</view>
					<view class="package_title">
						<text>買二贈壹券</text>
						<text>X2</text>
				</view>
			</view>
				<view class="items">
					<view class="package_icon">
						<image src="../../../static/images/my/free_food.png"></image>
					</view>
					<view class="package_title">
						<text>買二贈壹券</text>
						<text>X2</text>
					</view>
				</view>
				<view class="items">
					<view class="package_icon">
						<image src="../../../static/images/my/priority.png"></image>
					</view>
					<view class="package_title">
						<text>優先券</text>
						<text>X2</text>
					</view>
				</view>
        <view class="items">
          <view class="package_icon">
            <image src="../../../static/images/my/priority.png"></image>
          </view>
          <view class="package_title">
            <text>優先券</text>
            <text>X2</text>
          </view>
        </view>
        <view class="items">
          <view class="package_icon">
            <image src="../../../static/images/my/priority.png"></image>
          </view>
          <view class="package_title">
            <text>優先券</text>
            <text>X2</text>
          </view>
        </view>
				<view class="items">
					<view class="package_icon">
						<image src="../../../static/images/my/free_shipping.png"></image>
					</view>
					<view class="package_title">
						<text>免運費券</text>
						<text>X2</text>
					</view>
				</view>

      <view class="items" v-for="(empty,index) in computeLength" :key="index">
      </view>-->


			</view>
		</view>
</template>

<script>
	export default {
		name: "giftPack",
    props:{
		  title:{
		    type:[String,Number],
        default:0
      },
      giftPack:{
		    type:Array,
        default:()=>[]
      }
    },
    computed:{
      computeLength() {
        let l = this.giftPack.length;
        if (l === 3) {
          return 0
        }
        if (l > 3) {
          let count = 2;
          while (count * 3 < l){
            count++;
          }
          return count * 3 - l;
        }
        if (l < 3) {
          return 3 - l
        }
      },
    }
	}
</script>

<style scoped lang="scss">
	.gift_pack {
		width: 100%;
		min-height: 380rpx;
		padding: $spacing-lg;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: $font-size-sm;
		color: $font-color1;
    overflow:hidden;

		.package_head {
			height: 90rpx;
			width: 100%;
			display: flex;
			justify-content: space-between;
			font-size: $font-size-base;
      align-items: flex-start;

      text{
        display: inline-block;
        height: 40rpx;
        line-height: 40rpx;
      }

      .package_title{
        font-size: $font-size-sm - 2rpx;
        color: $font-color3;
        margin-right: auto;
        margin-left: 10rpx;
      }
		}

		.package_content {
			flex-grow: 1;
			display: flex;
      flex-wrap: wrap;
			justify-content: space-between;

				.items {
					flex: 1;
          min-width:167rpx;
          margin-bottom: 37rpx;
					display: flex;
					flex-direction: column;
					text-align: center;
					align-items: center;
					.package_icon {
						image {
							width: 46rpx;
							height: 47rpx;
							vertical-align: middle;
              margin-bottom: 10rpx;
						}
					}

          .package_title{
            text:nth-child(2){
              color:$main-color
            }
          }
					.icon_exception {
						image {
							width: 43rpx;
							height: 58rpx;
						}
					}
				}
		}
	}
</style>
