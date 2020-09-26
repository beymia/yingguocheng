<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
.page{
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	font-family: 'PingFang SC','Microsoft Yahei';
}
.container{
	width: 702rpx;
	height: 100%;
	margin: 0 auto;
	box-sizing: border-box;
}
image{
	width: 100%;
	height: 100%;
	display: block;
}

</style>
