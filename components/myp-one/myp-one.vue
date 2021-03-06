<template>
  <view class="code-box">
    <view class="flex-box">
      <input
        :value="inputValue"
        :type="inputType"
        :focus="autoFocus"
        :maxlength="maxlength"
        class="hide-input"
        @input="getVal"
      />
      <block v-for="(item, index) in ranges" :key="index">
        <view
          :class="[
            'item',
            {
              active: codeIndex === item,
              middle: type === 'middle',
              bottom: type === 'bottom',
              box: type === 'box',
            },
          ]"
        >
          <view class="line" v-if="type !== 'middle'"></view>
          <view
            v-if="type === 'middle' && codeIndex <= item"
            class="bottom-line"
          ></view>
          <block v-if="isPwd && codeArr.length >= item">
            <text class="dot">.</text>
          </block>
          <block v-else> {{ codeArr[index] ? codeArr[index] : "" }}</block>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
// 支持使用 v-model
// 支持使用refs
export default {
  name: "mypOneInput",
  props: {
    // 支持外部提供，支持使用v-model
    // 支持通过value来做清空
    inputType: {
      type: String,
      default: "number",
    },
    value: {
      type: String,
      default: "",
    },
    //最大长度 4/6
    maxlength: {
      type: Number,
      default: 4,
    },
    //是否自动聚焦
    autoFocus: {
      type: Boolean,
      default: true,
    },
    //输入框的类型
    isPwd: {
      type: Boolean,
      default: false,
    },
    // middle-middle line, bottom-bottom line, box-square box
    type: {
      type: String,
      default: "bottom",
    },
  },
  watch: {
    maxlength: {
      immediate: true,
      handler: function (newV) {
        if (newV === 6) {
          this.ranges = [1, 2, 3, 4, 5, 6];
        } else {
          this.ranges = [1, 2, 3, 4];
        }
      },
    },
    value: {
      immediate: true,
      handler: function (newV) {
        if (newV !== this.inputValue) {
          this.inputValue = newV;
          this.toMakeAndCheck(newV);
        }
      },
    },
  },
  data() {
    return {
      inputValue: "",
      codeIndex: 1,
      codeArr: [],
      ranges: [1, 2, 3, 4],
    };
  },

  methods: {
    getVal(e) {
      const val = e.detail.value;
      this.inputValue = val;
      this.$emit("input", val);
      this.toMakeAndCheck(val);
    },
    toMakeAndCheck(val) {
      const arr = val.split("");
      this.codeIndex = arr.length + 1;
      this.codeArr = arr;
      if (this.codeIndex > Number(this.maxlength)) {
        this.$emit("finish", this.codeArr.join(""));
      }
    },
    // refs 时不再提供 v-model 支持
    // 支持使用refs来设置value
    // 没有提供数据保护与检测，自己在外面对数据进行检测保护
    set(val) {
      this.inputValue = val;
      this.toMakeAndCheck(val);
    },
    // 支持使用refs来清空
    clear() {
      this.inputValue = "";
      this.codeArr = [];
      this.codeIndex = 1;
    },
  },
};
</script>

<style scoped>
@keyframes twinkling {
  0% {
    opacity: 0.2;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0.2;
  }
}

.code-box {
  text-align: center;
}

.flex-box {
  display: flex;
  justify-content: center;
  position: relative;
}

.flex-box .hide-input {
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  text-align: left;
  z-index: 9;
  opacity: 1;
}

.flex-box .item {
  position: relative;
  width: 100rpx;
  height: 100rpx;
  margin-right: 18rpx;
  font-size: 28rpx;
  color: #333333;
  line-height: 100rpx;
}

.flex-box .item:last-child {
  margin-right: 0;
}

.flex-box .middle {
  border: none;
}

.flex-box .box {
  box-sizing: border-box;
  border: 2rpx solid #cccccc;
  border-radius: 6rpx;
  background-color: #eaeaea;
}

.flex-box .bottom {
  box-sizing: border-box;
  border-bottom: 1rpx solid #212121;
}

.flex-box .active {
  border-color: #17a1ff;
}

.flex-box .active .line {
  display: block;
}

.flex-box .line {
  display: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 2rpx;
  height: 40rpx;
  background: #333333;
  animation: twinkling 1s infinite ease;
}

.flex-box .dot {
  font-size: 80rpx;
  line-height: 40rpx;
}

.flex-box .bottom-line {
  height: 4px;
  background: #000000;
  width: 80%;
  position: absolute;
  border-radius: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
