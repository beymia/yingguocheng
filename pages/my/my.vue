<template>
  <view class="profile">
    <!-- 头部背景 -->
    <view class="profile_head">
      <view class="head_bg">
        <image src="../../static/images_t/my/head_bg.png"></image>
      </view>
      <view class="head_logo">
        <text>英国城</text>
      </view>
    </view>
    <!-- 用户相关信息 -->
    <view class="profile_info">
      <view class="user_avatar">
        <image :src="userInfo.user_avatar"></image>
      </view>
      <view class="name_vip">
        <view class="name">
          <text>{{ userInfo.user_name }}</text>
          <text>LV.{{ userInfo.level }}</text>
        </view>
        <view class="privilege">
          <text>{{ userInfo.privilege_title }}</text>
          <view class="privilege_tip_text">
            <text>成為騎士會員享雙倍積分</text>
          </view>
        </view>
        <view class="user_money">
          <view class="integral">
            <text>{{ userInfo.integral }}</text>
            <text>積分商城</text>
          </view>
          <view class="">
            <text>{{userInfo.ticket_num}}</text>
            <text>優惠券</text>
          </view>
          <view>
            <text>{{userInfo.ticket_num}}</text>
            <text>錢包</text>
          </view>
          <view>
            <text>{{userInfo.ritual_park.length}}</text>
            <text>奶茶有禮</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 开通礼包 -->
    <view class="open_package">
      <view class="package_head">
        <text>開通禮包</text>
        <text>更多</text>
      </view>
      <view class="package_content">
        <view class="package_items">
          <view class="package_icon">
            <image src="../../static/images/my/free_drink.png"></image>
          </view>
					<text>星球贈飲券</text><text>X1</text>
        </view>
				<view class="package_items">
				  <view class="package_icon">
				    <image src="../../static/images/my/free_one.png"></image>
				  </view>
					<text>買壹贈壹券</text><text>X1</text>
				</view>
				<view class="package_items">
				  <view class="package_icon">
				    <image src="../../static/images/my/free_two.png"></image>
				  </view>
					<text>買二贈壹券</text><text>X2</text>
				</view>
				<view class="package_items">
				  <view class="package_icon">
				    <image src="../../static/images/my/free_food.png"></image>
				  </view>
					<text>買二贈壹券</text><text>X2</text>
				</view>
				<view class="package_items">
				  <view class="package_icon">
				    <image src="../../static/images/my/priority.png"></image>
				  </view>
					<text>優先券</text><text>X2</text>
				</view>
				<view class="package_items">
				  <view class="package_icon">
				    <image src="../../static/images/my/free_shipping.png"></image>
				  </view>
					<text>免運費券</text><text>X2</text>
				</view>
      </view>
    </view>

    <!-- 功能列表 -->
		<view class="fun_list">
				<view class="fun_items">
					<text class="items_name">會員碼</text>
					<text class="items_dec">門店掃碼積分、奶茶錢包和奶茶有禮支付</text>
					<image class="items.icon" src="../../static/images/my/right.png"></image>
				</view>
				<view class="fun_items">
					<text class="items_name">兌換中心</text>
					<text class="items_dec">兌換星球會員、優惠券和禮品卡</text>
					<image class="items.icon" src="../../static/images/my/right.png"></image>
				</view>
				<view class="fun_items">
					<text class="items_name">星球封面</text>
					<text class="items_dec"></text>
					<image class="items.icon" src="../../static/images/my/right.png"></image>
				</view>
				<view class="fun_items">
					<text class="items_name">聯系客服</text>
					<text class="items_dec"></text>
					<image class="items.icon" src="../../static/images/my/right.png"></image>
				</view>
				<view class="fun_items">
					<text class="items_name">消息中心</text>
					<text class="items_dec"></text>
					<image class="items.icon" src="../../static/images/my/right.png"></image>
				</view>
				<view class="fun_items">
					<text class="items_name">更多</text>
					<text class="items_dec"></text>
					<image class="items.icon" src="../../static/images/my/right.png"></image>
				</view>
		</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        id: "16001348270846061",
        user_avatar: "../../static/images_t/my/user_avatar.png",
        privilege_title: "騎士會員",
        integral: "0",
        balance: "0.00",
        level: "1",
        user_name: "張三",
        ticket_num: "1",
        ritual_park: [{
          goods_name: "买一赠一券",
          goods_num: "2",
          home_avatar: "http://host.dot_img.com/uploads/202009/16/160025394022724.jpg"
        }]
      }
    }
  },
  methods: {},
  components: {}
}
</script>

<style lang="scss" scoped>
  .profile{
    width: 100%;
    height: 100%;

    .profile_head{
      width: 100%;
      height: 550rpx;

    }
  }
</style>
