<template>
	<view class="user_info">
		<!--用户的基本信息-->
		<view class="user_basic">
			<view class="user_avatar">
				<image v-if="wxUserInfo.avatarUrl" :src="wxUserInfo.avatarUrl"></image>
				<image v-else src="../../../static/images_t/my/user_avatar.png"></image>
			</view>
			<view class="name_vip">
				<view class="name">
					<text>{{ wxUserInfo.nickName || user.user_name }}</text>
					<text v-if="user.level">LV.{{ user.level }}</text>
				</view>
				<view class="privilege">
					<text @click="$emit('handler-click',{page:'joinMember'})">{{user.level_title}}</text>
					<view v-if="user.level_title === '普通会员'"
                @click="$emit('handler-click',{page:'joinMember'})"
                class="level_title">
						<text>成為騎士會員享雙倍積分</text>
						<uni-icons style="display: inline-block;vertical-align: middle" type="arrowright" size="18" color="#333333"></uni-icons>
					</view>
				</view>
			</view>
		</view>

		<view class="empty_border"></view>
    <!--用户资产信息-->
    <view class="user_assets">
      <view @click="$emit('handler-click',{page:'pointsMall',v:user.integral})">
        <text>{{ user.integral || 0 }}</text>
        <text>積分商城</text>
      </view>
      <view @click="$emit('handler-click',{page:'discount',v:user.ticket_num})">
        <text>{{ user.ticket_num || 0 }}</text>
        <text>優惠券</text>
      </view>
      <view @click="$emit('handler-click',{page:'wallet',v:user.balance})">
        <text>{{ user.balance || '0.00' }}</text>
        <text>錢包</text>
      </view>
      <view @click="$emit('handler-click',{page:'milkTeaGift'})">
        <text>{{user.foresee_num || 0}}</text>
        <text>奶茶有禮</text>
      </view>
    </view>
	</view>
</template>

<script>
const APP = getApp().globalData
	export default {
		name: "user",
    data(){
		  return {
		    baseImg:'/static/images_t/my/user_avatar.png',
        wxUserInfo:{}
      }
    },
		props: {
			user: {
				type: Object,
				required: true
			}
		},
    mounted(){
      this.wxUserInfo = APP.wxUserInfo;
	  console.log('this.wxUserInfo')
	  console.log(this.wxUserInfo)
    },
	}
</script>

<style scoped lang="scss">
	.user_info {
		width: 100%;
		height: 100%;
		padding:0 $spacing-lg + 10rpx $spacing-lg $spacing-lg;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		.user_basic {
			display: flex;
			margin-bottom: 40rpx;

			.user_avatar {
				width: 144rpx;
				height: 144rpx;
				border-radius: 50%;
        background-color: $main-color;
        overflow: hidden;
			}

			.name_vip {
				margin-left: $spacing-lg;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				font-size: $font-size-lg + 2rpx;
				font-weight: $font-weight-lg;
				color: $font-color1;

				.name {

					text:nth-child(2) {
						width: 68rpx;
						height: 34rpx;
						background: #ffffff;
						border: 2rpx solid #333333;
						border-radius: 6rpx;
						text-align: center;
						line-height: 34rpx;
						font-size: $font-size-sm - 2rpx;
						margin-left: 20rpx;
					}
				}

				.privilege {
					display: flex;
					align-items: center;

					.level_title {
						margin-left: 10rpx;
						width: 242rpx;
						height: 40rpx;
						background: #e9e9e9;
						border-radius: 20rpx;
						font-size: $font-size-sm - 6rpx;
						font-weight: $font-weight-base;
						text-align: center;
						line-height: 40rpx;
					}
				}
			}
		}

		.user_assets {
			margin-top: 40rpx;
			height: 80rpx;
			display: flex;
			font-size: $font-size-sm;
			color: $font-color1;
			justify-content: space-around;
			align-items: center;

			view {
				flex: 1;
				display: flex;
				flex-direction: column;
				text-align: center;
				justify-content: space-between;
			}
		}

		.empty_border {
			width: 100%;
			height: 1rpx;
			opacity: 0.5;
			border: 1rpx solid #cccccc;
			align-self: center;
		}
	}
</style>
