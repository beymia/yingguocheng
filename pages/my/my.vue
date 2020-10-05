<template>
	<view class="profile">
		<!-- 头部背景 -->
		<view class="profile_head">
			<view class="head_bg">
				<image mode="widthFix" src="https://ftp.bmp.ovh/imgs/2020/10/8c6c3cfa0054d546.png"></image>
			</view>
			<view class="head_logo">
				<text>英国城</text>
			</view>
		</view>
		<view class="profile_content">
			<!-- 用户相关信息 -->
			<view class="profile_info">
				<userInfo @handler-click="navFitPage" :user="userInfo "></userInfo>
			</view>
			<!-- 开通礼包 -->
			<view @click="navFitPage('planetMember')" class="open_package">
				<giftPack></giftPack>
			</view>

			<!-- 功能列表 -->
			<view class="fun_list">
				<options @handler-click="navFitPage"></options>
			</view>
		</view>
		<view class="empty"></view>
	</view>
</template>

<script>
	import {
		userSpace
	} from '../../request/api'

	import userInfo from "./components/userInfo";
	import giftPack from "./components/giftPack";
	import options from "./components/options";

	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		async mounted() {
			this.userInfo = (await this.requestUserInfo()).data
			console.log(this.userInfo);
		},
		methods: {
			//请求用户信息
			async requestUserInfo() {
				return await userSpace({
					token: '测试使用'
				})
      },
      //跳转至积分商城
      navFitPage(page) {
        uni.navigateTo({
          url: `/pages/${page}/${page}`
        })
      }
    },
		components: {
			userInfo,
			giftPack,
			options
		}
	}
</script>

<style lang="scss" scoped>
	@mixin container($h) {
		width: 100%;
		min-height: $h;
		background: #ffffff;
		border-radius: 30rpx;
		margin-bottom: 30rpx;
	}

	uni-page-body {
		height: 100%;
	}

	.profile {
		width: 100%;
		min-height: 100%;
		background-color: $main-bg;

		.profile_head {
			width: 100%;
			height: 550rpx;
			text-align: center;
			background: #FFFFFF;

			.head_bg {
				width: 100%;
				height: 450rpx;
				position: relative;

				image {
					width: 100%;
					height: 450rpx;
					vertical-align: middle;
				}
			}

			.head_logo {
				width: 100%;
				text-align: center;
				position: absolute;
				top: 60rpx;

				text {
					font-size: $font-size-lg + 2rpx;
					font-weight: $font-weight-lg;
					color: $font-color1;
				}
			}
		}

		.profile_content {
			width: 100%;
			padding: 0 $spacing-base;
			box-sizing: border-box;
			position: relative;
			top: -100rpx;

			.profile_info {
				@include container(390rpx);
			}

			.open_package {
				@include container(380rpx)
			}

			.fun_list {
				@include container(590rpx)
			}
		}

		.empty {
			width: 100%;
			height: 1rpx;
		}
	}
</style>
