<template>
	<view class="notice_page">
		<scroll-view scroll-y="true" class="notice_scroll" >
			<view class="mr60_con">
				<!-- 新聞列表開始 -->
					<view class="news_list">
						<view class="news" v-for="(news,news_index) in scroll_ad" :key="news_index">
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
						<view class="text" >
							<rich-text :nodes="shop_detial"></rich-text>
						</view>
					</view>
				<!-- 配送結束 -->
				<!-- 門店信息開始 -->
					<view class="other">
						<view class="title">
							門店
						</view>
						<view class="text" >
							地址：{{choosed_shop.shop_address}}
						</view>
						<view class="text" >
							營業時間：{{choosed_shop.work_time+' - '}}{{choosed_shop.rest_time}}
						</view>
						<view class="text" >
							外賣營業時間：{{choosed_shop.work_time+' - '}}{{choosed_shop.rest_time}}
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
			choosed_shop:{
				type:Object,
				required:true
			}
		},
		mounted() {
			console.log("77777777777")
			console.log(this.choosed_shop)
		},
		computed:{
			scroll_ad(){
				if(this.choosed_shop && this.choosed_shop.detail)return this.choosed_shop.detail.scroll_ad
			},
			shop_detial(){
				if(this.choosed_shop && this.choosed_shop.detail)return this.choosed_shop.detail.shop_detial
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
