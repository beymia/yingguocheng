<template>
  <view class="customer_service" @click="hideKeyboard">
    <!--自定義導航欄-->
    <!--  <view class="head">
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
      </view>-->
    <!--聊天內容-->
    <view class="container" :style="{'margin-bottom':wxHeight + 'px'}">
      <!--歡迎語 & 時間-->
      <view class="tip">
        <text>{{ initTime }}</text>
        <text>品立高餐飲為您服務</text>
      </view>


      <!--具體聊天內容-->
      <view class="detail" >
        <view v-for="(msg, index) in chatList" :key="index">
          <view :class="[msg.type === 'server' ? 'left' : 'right']">
            <view class="left_item content">
              <text selectable v-if="msg.type === 'user'">{{ msg.msg }}</text>
              <image
                  :src="
                  msg.type === 'user'
                    ? wxUserInfo.avatarUrl ||
                      '../../static/images_t/my/user_avatar.png'
                    : '../../static/images_t/customerService/server.png'
                "
              >
              </image>
              <text selectable v-if="msg.type !== 'user'">{{ msg.msg }}</text>
            </view>
          </view>
        </view>
      </view>
      <!--      <view :style="{width:'100%',height:keyboardHeight + 'px'}"></view>-->
    </view>
    <!--用戶輸入框-->
    <view class="user_input" :style="{bottom:wxHeight + 'px'}">
      <!-- #ifdef APP-PLUS-->
      <textarea class="input_content"
                v-model="userMsg"
                :show-confirm-bar="false"
                :fixed="true"
                type="text"
      ></textarea>
      <!-- #endif-->
      <!-- #ifdef MP-WEIXIN-->
      <textarea class="input_content"
                v-model="userMsg"
                :fixed="true"
                :show-confirm-bar="false"
                :adjust-position="false"
                confirm-type="send"
                :confirm-hold="true"
                @confirm="sendMessage"
                type="text"
      ></textarea>
      <!-- #endif-->
      <button @touchend.prevent="sendMessage" plain>發送</button>
    </view>
    <view style="width: 100%;height: 300rpx"></view>
  </view>
</template>

<script>
import {sendMsg, receiveMsg} from "../../request/api";

const APP = getApp().globalData;
export default {
  data() {
    return {
      initTime: 0,
      chatList: [], //聊天记录存储
      chatId: "",
      userMsg: "",
      userInfo: "",
      wxUserInfo: {},
      serverId: "15984344337496191",
      wxHeight: 0,//微信小程序使用
      scrollTime: 200,
    };
  },
  async mounted() {
    this.chatList = uni.getStorageSync('chatList') || [];//离开时存储，进入时读取，应用首次进入时清空
    this.initTime = this.reDate(); //进入聊天室的时间
    this.userInfo = APP.userInfo; //用户信息
    this.wxUserInfo = APP.wxUserInfo; //小程序展示微信信息
    this.socketTimer = null; //心跳包的定时器
    this.reconnect = 0; //重连次数,3次后取消重连
    this.reconnecting = false; //重连状态,重连成功后拉取一次客服消息
    this.connecting = false;//socket连接状态,
    this.forwardMsg = ""; //缓存用户发送的消息,客服不在线时发送至服务器
    //绑定键盘高度变化时间
    uni.onKeyboardHeightChange(async (res) => {
      // #ifdef MP-WEIXIN
      this.wxHeight = res.height
      // #endif
      if (res.height) {
        this.keyboardTimer && clearTimeout(this.keyboardTimer)
        this.keyboardTimer = setTimeout(() => {
          this.getContentHeight(1);
        }, 80)
      }
    })
    try {
      //请求未读消息,并处理消息类型为 server
      await this.unReadServer();
      //建立webSocket连接
      await this.createSocket();
    } catch (e) {
      this.customToast("連接失敗了");
    }
  },

  methods: {
    //建立webSocket连接通道
    async createSocket() {
      try {
        //建立连接通道
        this.socket = await uni.connectSocket({
          url: "wss://api.plg.wugee.net:2000",
          success(res) {
            console.log(res,'建立连接');
          },
        });
        //开启相关事件监听
        await this.monitorEvent();
      } catch (e) {
        this.customToast("連接錯誤了");
      }
    },

    //监听socket事件
    monitorEvent() {
      //连接成功
      this.socket.onOpen(async (res) => {
        console.log('连接成功',res)
        try {
          uni.hideLoading();
          this.connecting = true;
          await this.socket.send({
            data: JSON.stringify({uid: this.userInfo.id, type: "login"}),
          });
          //链接成功后发送心跳包，确保和服务端始终处于连接状态
          await this.heartBeat();
          //重连成功后才重新拉去客服消息，正常链接流程不进行拉去
          this.reconnecting && (await this.unReadServer());
          this.reconnecting = false;
        } catch (e) {
          console.log(e);
        }
      });

      //连接失败
      this.socket.onError(async (res) => {
        console.log('连接失败',res);
        this.connecting = false;
        await this.socketError()
      });

      //监听关闭事件,客户端手动关闭socket
      this.socket.onClose(() => {
        this.socket && this.socket.close();
      });

      //接收服务器消息
      this.socket.onMessage(async ({data}) => {
        let self = this;
        let {code, msg, to_uid} = JSON.parse(data);
        //1001 = 客服不在线,转存消息
        if (code === 1001) {
          await sendMsg({msg: self.forwardMsg});
          console.log('1234')
          return;
        }

        this.chatList.push({msg: msg, type: "server"});

        if (msg && to_uid === this.userInfo.id) {
          this.chatList.push({msg: msg, type: "server"});
        }
        //消息接收完毕并且页面更新之后滚动页面至对应的位置
        this.$nextTick(() => {
          this.getContentHeight(self.scrollTime);
        });

      });
    },

    //发送用户消息
    async sendMessage() {
      let self = this;
      //空字符直接返回，不做处理
      if (!self.userMsg.trim()) return;
      //socket为null时websocket则连接失败,发送消息时手动抛出一个错误
      if (self.connecting) {
        self.chatList.push({msg: self.userMsg, type: "user"});
        await self.sendMsgSocket(self.userMsg);
        self.forwardMsg = self.userMsg;
        self.userMsg = "";
        //消息发送完成之后更新页面滚动的位置
        self.getContentHeight(self.scrollTime);
        return;
      }
      self.userMsg = "";
      self.customToast("網絡連接錯誤", false);
    },

    //socket发送消息 msg 有值是用户手动发送消息,没有值是发送心跳包
    sendMsgSocket(msg) {
      let sendMsg = {},
          self = this;
      if (msg) {
        sendMsg = {
          uid: self.userInfo.id,
          to_uid: self.serverId,
          msg,
          created_at: self.reDate(1),
          type: "send",
        };
      }
      else {
        sendMsg = {type: "ping"};
      }
      try {
        self.socket.send({
          data: JSON.stringify(sendMsg),
        });
      } catch (e) {
        msg && self.customToast("消息發送失敗了");
      }
    },

    //设置心跳包定时器
    async heartBeat() {
      //发送心跳包
      this.socketTimer = setInterval(async () => {
        await this.sendMsgSocket();
      }, 50000);
    },

    //websocket重連
    async socketError() {
      uni.showLoading({title: `正在嘗試重新連接...`, mask: true});
      clearInterval(this.socketTimer);
      this.reconnect++;
      this.connecting = false;
      if (this.reconnect < 3) {
        this.socket = null;
        await this.createSocket();
        this.reconnecting = true;
      }
      else {
        uni.hideLoading();
        this.customToast("重連失敗了");
        this.socket.close()
        this.socket = null;
        this.reconnecting = false;
      }
    },

    //拉取未读的客服消息
    async unReadServer() {
      let self = this;
      let historyMsg = (await receiveMsg()).data || [];
      historyMsg.forEach((item) => {
        if (item.msg && item.to_uid === self.userInfo.id) {
          self.chatList.push({msg: item.msg, type: "server"});
        }
      });
    },

    //将屏幕滚动至底部,(最新的消息始终处于可见状态)
    getContentHeight(time) {
      this.$nextTick(() => {
        uni.pageScrollTo({
          scrollTop: 99999999999,
          duration: time || 0,
        });
      });
    },

    //格式化时间
    reDate(full) {
      let date = new Date(),
          y = date.getFullYear(),
          m = (date.getMonth() + 1).toString().padStart(2, "0"),
          d = date.getDate().toString().padStart(2, "0"),
          h = date.getHours().toString().padStart(2, "0"),
          mm = date.getMinutes().toString().padStart(2, "0");
      return full
             ? `${y}-${m}-${d} ${h}:${mm}`
             : `${h}:${mm}`;
    },

    //ios点击空白隐藏键盘
    hideKeyboard() {
      uni.hideLoading()
    }
  },

  //页面卸载时关闭连接,将聊天记录存入本地storage
  onUnload() {
    this.socket.close();
    clearInterval(this.socketTimer);
    this.socket = null;
    uni.setStorageSync("chatList", this.chatList);
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
  box-sizing: border-box;
  overflow: hidden;

  .container {
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
      margin-bottom: $spacing-lg;

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

        image {
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
  }

  .user_input {
    width: 740rpx;
    height: 100rpx;
    padding-left: $spacing-base;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    position: fixed;
    bottom:0;

    .input_content {
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
}
</style>
