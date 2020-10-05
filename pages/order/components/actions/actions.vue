<template>
	<view class="actions">
		<template v-if="!materialsBtn">
			<image src="/static/images/order/minus.png" class="minus-btn" v-if="number" @tap.stop="minus"></image>
			<view v-if="number" class="number">{{ number }}</view>
			<image src="/static/images/order/add.png" class="add-btn" @tap.stop="add"></image>
		</template>
		<template v-else>
			<view class="materials-box">
				<button type="primary" size="mini" class="materials-btn" @tap="$emit('materials')">選規格</button>
				<view class="number-badge" v-if="number">
					<view class="number">{{ number }}</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		name: 'Actions',
		props: {
			number: {
				type: Number,
				default: 0
			},
			materialsBtn: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			add() {
				this.$emit('add')
			},
			minus() {
				this.$emit('minus')
			}
		}
	}
</script>

<style lang="scss" scoped>
.actions {
	display: flex;
	align-items: center;

	.add-btn,
	.minus-btn {
		width: 44rpx;
		height: 44rpx;
	}

	.number {
		width: 44rpx;
		height: 44rpx;
		margin: 0 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 36rpx;
	}
	
	.materials-box {
		position: relative;
		display: flex;
		
		.materials-btn {
			border-radius: 22rpx;
			width: 110rpx;
			height: 44rpx;
			line-height: 44rpx;
			text-align: center;
			font-size: 22rpx;
			white-space: nowrap;
			padding: 0;
		}
		
		.number-badge {
			z-index: 4;
			position: absolute;
			right: -16rpx;
			top: -14rpx;
			background-color: #FFFFFF;
			border-radius: 100%;
			width: 1.1rem;
			height: 1.1rem;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.number {
				font-size: 20rpx;
				flex-shrink: 0;
				background-color: #007aff;
				color: #FFFFFF;
				width: 0.9rem;
				height: 0.9rem;
				line-height: 0.9rem;
				text-align: center;
				border-radius: 100%;
			}
		}
	}
}
</style>
