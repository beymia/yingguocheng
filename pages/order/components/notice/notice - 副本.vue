<template>
	<view class="notice_page">
		<scroll-view scroll-y="true" class="notice_scroll" >
			<view class="mr60_con">
				<!-- 新聞列表開始 -->
					<view class="news_list">
						<view class="news" v-for="(news,news_index) in news_list" :key="news_index">
							<view class="icon">
								<image src="/static/images/order/blueBall.png" mode=""></image>
							</view>
							<view class="text">
								{{news}}
							</view>
						</view>
					</view>
				<!-- 新聞列表結束 -->
				<!-- 配送開始 -->
					<view class="other">
						<view class="title">
							配送
						</view>
						<view class="text" v-for="peisong_info in peisong_infos">
							{{peisong_info}}
						</view>
					</view>
				<!-- 配送結束 -->
				<!-- 門店信息開始 -->
					<view class="other">
						<view class="title">
							門店
						</view>
						<view class="text" v-for="mendian_info in mendian_infos">
							{{mendian_info}}
						</view>
					</view>
				<!-- 門店信息結束-->
			</view>
			
		</scroll-view>
	</view>
		

</template>

<script>
	export default{
		props:{
			news_list:{
				type: Array,
				default: []
			},
			peisong_infos:{
				type: Array,
				default: () => ['滿30起送',
					'配送費0元（晚上20:00後夜間配送加價）',
					'由提供配送服務，距門店3000m範圍內起送（配送範圍受地區、天氣等多方因素影響，以實際可配送距離為準）']
			},
			mendian_infos:{
				type:Array,
				default: () => ['地址：合肥市蜀山區安徽省合肥市經開區',
							'電話：0551-5666660',
							'營業時間：10:00~22:00',
							'外賣營業時間：10:00~22:00']
			}
		}
	}
</script>

<style lang="scss" scoped>
	.notice_page{
		flex: 1;
		overflow: hidden;
		padding: 6rpx 0 0 24rpx;
		.notice_scroll{
			height: 100%;
			.mr60_con{
				margin-right: 60rpx;
			}
		}
		.news_list{
			margin-bottom: 40rpx;
			.news{
				display: flex;
				margin-bottom: 20rpx;
				.icon{
					width: 24rpx;
					height: 35rpx;
					margin-right: 10rpx;
				}
				.text{
					flex: 1;
					font-size: 24rpx;
					line-height: 40rpx;
					color: #999999;
				}
			}
		}
		.other{
			margin-bottom: 50rpx;
			&:last-child{
				margin-bottom: 0;
			}
			.title{
				font-size: 32rpx;
				height: 45rpx;
				line-height: 40rpx;
				margin-bottom: 20rpx;
			}
			.text{
				font-size: 24rpx;
				line-height: 40rpx;
				color: #999999;
			}
		}
	}
	
</style>
