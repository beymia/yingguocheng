<template>
  <view class="customer_service">
    <!--自定義導航欄-->
    <view :style="{'top':headBarHeight}" class="head">
      <uni-icons @click="toBack"
                 style="display: inline-block;vertical-align: middle"
                 type="arrowleft"
                 size="40"
                 color="#333333">
      </uni-icons>
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
              <text v-if="msg.type==='user'">{{ msg.msg }}</text>
              <image
                  :src="msg.type==='user'
                  ?(wxUserInfo.avatarUrl||'../../static/images_t/my/user_avatar.png')
                  : '../../static/images_t/customerService/server.png'">
              </image>
              <text v-if="msg.type!=='user'">{{ msg.msg }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!--用戶輸入框-->
    <view class="user_input">
      <input maxlength="-1" v-model="userMsg" type="text"/>
      <button @click="sendMessage" plain>發送</button>
    </view>
    <view class="empty"></view>
  </view>
</template>

<script>
import {initChat, sendMsg, receiveMsg} from "../../request/api";

const APP = getApp().globalData
export default {
  data() {
    return {
      initTime: 0,
      chatList: [],
      chatId: '',
      userMsg: '',
      userInfo: '',
      wxUserInfo: {},
      headBarHeight:0,
      windowHeight:0,
    };
  },
  async mounted() {
    this.initTime = this.reDate()
    this.userInfo = APP.userInfo;
    this.wxUserInfo = APP.wxUserInfo;
    this.socketTimer = null;
    this.reconnect = 0;
    try {
      let self = this;
      //初始化聊天室
      await initChat()
      //请求未读消息
      let historyMsg = ((await receiveMsg()).data || [])
      historyMsg.forEach((item) => {
        if (item.msg && item.uid === self.userInfo.id) {
          self.chatList.push({
            msg: item.msg,
            type: 'server'
          })
        }
      })
      this.chatList.push({
        msg: ' timeout: 3000,',
        type:'server'
      })
      this.chatList.push({
        msg: 'kflksdjflkajsdlfkjiewjfoiwefoniohoi',
        type:'server'
      });
      console.log(this.chatList);
      //建立webSocket连接
      await this.createSocket()
    } catch (e) {
      console.log(e);
      this.customToast('連接失敗了')
    }

    //监听键盘高度变化
    uni.onKeyboardHeightChange((res)=>{
      console.log(res);
      this.headBarHeight = res.height + 'px';
    });
    //获取设备屏幕高度,计算多消息时屏幕滚动的距离
    this.windowHeight = uni.getSystemInfoSync().windowHeight;
    await this.getContentHeight()
  },

  methods: {
    //建立webSocket连接通道
    async createSocket() {
      let self = this;
      try {
        //建立连接通道
        this.socket = await uni.connectSocket({
          url: 'wss://api.plg.wugee.net:2000',
          success(res) {
            console.log(res);
          },
        })
        console.log(self.socket);
        //监听相关事件
        await self.monitorEvent()
      } catch (e) {
        this.customToast('连接出错')
      }
    },

    //监听socket事件
    monitorEvent() {
      //连接成功
      let self = this;
      this.socket.onOpen((res) => {
        console.log(res);
        console.log('连接成功,onSocketOpen')
        self.socket.send({
          data: JSON.stringify({uid: this.userInfo.id,type:'login'})
        })
        //连接成功发送心跳包
        this.setInterval()
      })


      //连接失败
      this.socket.onError(async (res) => {
        console.log(res);
        console.log('连接出现了错误,onSocketError');
        uni.showLoading({title: `正在嘗試重新連接...`, mask: true})
        clearInterval(this.socketTimer)
        this.reconnect++;
        if (this.reconnect < 3) {
          self.socket = null;
          await self.createSocket()
        } else {
          uni.hideLoading()
          self.customToast('重連失敗了')
          self.socket = null;
          uni.closeSocket()
        }
      })

      //监听关闭事件,客户端手动关闭socket
      this.socket.onClose(() => {
        this.socket && this.socket.close()
      })

      //接收服务器消息
      this.socket.onMessage(async ({data}) => {
        console.log('服务器消息对象是:' + data);
        data = JSON.parse(data);
        //1001 = 客服不在线,转存消息
        if (data.code === 1001) {
          await sendMsg({msg: self.userMsg})
          return;
        }

        if (data.msg && data.to_uid === self.userInfo.id) {
          self.chatList.push({msg: data.msg, type: 'server'})
        }
        this.$nextTick(async ()=>{
          await self.getContentHeight()
        })
      })
    },

    //发送用户消息
    async sendMessage() {
      //空字符直接返回，不做处理
      if (!(this.userMsg.trim())) return;

      if (!this.socket) {
        this.customToast('發送失敗')
        this.chatList.push({msg: this.userMsg, type: 'user', error: true})
        return;
      }

      this.chatList.push({msg: this.userMsg, type: 'user', error: false})

      try {
        await this.sendMsgSocket(this.userMsg)
        await this.getContentHeight()

        this.userMsg = '';
      } catch (e) {
        console.log(e);
        this.userMsg = '';
        this.customToast('出現了錯誤', false)
      }
    },

    //socket发送消息
    sendMsgSocket(msg) {
      console.log(msg);
      let sendMsg = {},
          self = this;
      if (msg) {
        sendMsg = {
          uid: self.userInfo.id,
          to_uid: '15984344337496191',
          msg: msg,
          created_at: self.reDate(1),
          type:'send'
        }
      } else {
        sendMsg = {type: 'ping'}
      }
      try {
        self.socket.send({
          data: JSON.stringify(sendMsg)
        })
      } catch (e) {
        self.customToast('消息發送失敗了')
      }
    },

    //设置心跳包定时器
    async setInterval() {
      //发送心跳包
      this.socketTimer = setInterval(async () => {
        await this.sendMsgSocket()
        console.log('心跳包发送成功')
      }, 50000)
    },

    //将屏幕滚动至最新消息处,(最新的消息始终处于可见状态)
    async getContentHeight(){
      let scrollHeight =((await this.getLayoutInfo('.customer_service')).height) - this.windowHeight
      console.log(scrollHeight);
      console.log((await this.getLayoutInfo('.customer_service')).height);
      console.log(this.windowHeight);
      uni.pageScrollTo({
        scrollTop:scrollHeight,
        duration:150
      })
    },

    //格式化时间
    reDate(full) {
      let date = new Date(),
          y = date.getFullYear(),
          m = (date.getMonth() + 1).toString().padStart(2, '0'),
          d = date.getDate().toString().padStart(2, '0'),
          h = date.getHours().toString().padStart(2, '0'),
          mm = date.getMinutes().toString().padStart(2, '0');
      return full ? `${y}-${m}-${d} ${h}:${mm}` : `${h}:${mm}`
    },

    //返回
    toBack() {
      uni.navigateBack();
    },
  },
  //页面不可见或者卸载时清楚定时器
  // onHide() {
  //   uni.closeSocket()
  //   console.log('关闭了连接')
  // },
  onUnload() {
    uni.closeSocket()
    clearInterval(this.socketTimer)
    this.socket = null;
    console.log('关闭了连接')
  },

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
    margin-bottom:$spacing-lg;

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
      max-width: 70%;
      min-height: 80rpx;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      overflow: hidden;
      margin-bottom: $spacing-lg;

      text {
        max-width: 75%;
        min-height: 60rpx;
        background: $main-color;
        color: #ffffff;
        padding: $spacing-base - 10rpx;
        box-sizing: border-box;
        border-radius: 10rpx;
        margin-left: $spacing-lg;
        word-break: break-all;
        display: flex;
        align-items: center;
      }

      image{
        align-self: flex-start;
      }
    }
  }

  .right {
    align-items: flex-end;
    .content {
      justify-content: flex-end;
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
