<template>
	<view class="customer_service">
		<!--自定義導航欄-->
		<view class="head">
			<uni-icons @click="toBack" style="display: inline-block;vertical-align: middle" type="arrowleft" size="40" color="#333333"></uni-icons>
			<view class="head_title">
				<text>品立高餐飲</text>
				<text>客服會話</text>
			</view>
		</view>
		<!--聊天內容-->
		<view class="content">
			<!--歡迎語 & 時間-->
			<view class="tip">
				<text>{{ initTime }}</text>
				<text>品立高餐飲為您服務</text>
			</view>

			<!--具體聊天內容-->
      <view class="detail">
        <view v-for="(msg,index) in chatList" :key="index">
          <view :class="[msg.type==='server'?'left':'right']">
            <view class="left_item content">
              <text v-if="msg.type==='user'">{{msg.msg}}</text>
              <image  :src="msg.type==='user'?'../../static/images_t/my/user_avatar.png' : '../../static/images_t/customerService/server.png'"></image>
              <text v-if="msg.type!=='user'">{{msg.msg}}</text>
            </view>
          </view>
        </view>
			</view>
		</view>
		<!--用戶輸入框-->
		<view class="user_input">
			<input v-model="userMsg" type="text" />
			<button @click="sendMessage" plain>發送</button>
		</view>
		<view class="empty"></view>
	</view>
</template>

<script>
import {initChat,sendMsg,receiveMsg} from "../../request/api";

export default {
	data() {
		return {
			initTime: 0,
      chatList:[],
      chatId:'',
      userMsg:'',
      chatStart:false,
		};
	},
async	mounted() {
	  try {
	    let result = uni.getStorageSync('chat');
	    result && (this.chatList = result)
      this.chatId = (await initChat()).data.room_id;
      let date = new Date(),
          h = (date.getHours() + '').padStart(2, '0'),
          m = (date.getMinutes() + '').padStart(2, '0');
      this.initTime = h + ':' + m;
    }catch (e){
      this.customToast('出現了錯誤',false)
      console.log(e);
    }
	},
	methods: {
	  //发送用户消息
   async sendMessage(){
     //空字符直接返回，不做处理
     if(!(this.userMsg.trim())) return;
      this.chatList.push({
        msg:this.userMsg,
        type:'user'
      })
      try{
        await sendMsg({
          msg:this.userMsg,
          rid:this.chatId
        })
        this.userMsg = '';
        this.chatStart = true;
      } catch (e){
        console.log(e);
        this.customToast('出現了錯誤',false)
      }
    },
    //接收消息
   async receiveMessage(){
     let msg = (await receiveMsg()).data.msg
     return {msg,type:'server'}
   },
		toBack() {
			uni.navigateBack();
		},
	},
  //页面不可见或者卸载时清楚定时器
  onHide(){
    console.log(1)
	  clearInterval(this.timer)
  },
  onUnload(){
	  //頁面卸載時在聊天記錄存入本地storage
    uni.setStorageSync('chat',this.chatList)
	  clearInterval(this.timer)
  },
  watch: {
    chatStart(value) {
      if (value) {
        this.timer = setInterval(async () => {
          this.chatList.push(await this.receiveMessage())
        }, 2000)
      }
    }
  }
};
</script>

<style scoped lang="scss">
uni-page-body {
	min-height: 100%;
	background: $main-bg;
}

image {
	width: 70rpx;
	height: 70rpx;
	border-radius: 50%;
}

.customer_service {
	width: 100%;
	min-height: 100%;
	background: $main-bg;
	padding-top: 128rpx;
	box-sizing: border-box;

	.head {
		width: 100%;
		height: 128rpx;
		background: #ffffff;
		font-size: $font-size-lg;
		font-weight: $font-weight-lg;
		color: $font-color1;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		/* #ifdef MP | APP-PLUS*/
		padding-top: 47rpx;
		box-sizing: border-box;
		/* #endif*/
		.head_title {
			margin-left: 14rpx;

			text {
				display: block;
			}

			text:nth-child(2) {
				font-size: $font-size-sm - 2rpx;
				font-weight: $font-weight-base;
				color: $font-color3;
			}
		}
	}

	.tip {
		width: 100%;
		height: 170rpx;
		font-size: $font-size-sm - 2rpx;
		color: $font-color3;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;

		text:nth-child(2) {
			margin-top: $spacing-lg;
		}
	}

	.left,
	.right {
		width: 100%;
		font-size: $font-size-sm;
		color: $font-color1;
		margin-bottom: 10rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 $spacing-lg;
		box-sizing: border-box;

		.content {
			height: 80rpx;
			display: flex;
			align-items: center;

			text {
				width: auto;
				height: 60rpx;
				background: $main-color;
				line-height: 60rpx;
				color: #ffffff;
				padding: 0 $spacing-lg;
				box-sizing: border-box;
				border-radius: 10rpx;
				margin-left: $spacing-lg;
			}
		}
	}

	.right {
		align-items: flex-end;
		.content {
			text {
				margin-left: 0;
				margin-right: $spacing-lg;
			}
		}
	}

	.user_input {
		width: 740rpx;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		padding-left: $spacing-base;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #ffffff;

		input {
			width: 548rpx;
			height: 80rpx;
			border-radius: 10rpx;
			background-color: #ffffff;
			padding: 0 10rpx;
			box-sizing: border-box;
		}
		button {
			width: 140rpx;
			height: 80rpx;
			background-color: $main-color;
			border: none;
			font-size: $font-size-sm;
			color: #ffffff;
			line-height: 80rpx;
			border-radius: 10rpx;
		}
	}
	.empty {
		width: 100%;
		height: 200rpx;
	}
}
</style>
