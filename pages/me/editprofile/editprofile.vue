<template>
	<view>
		<view class="me-head">
			<view class="me-head-pic">
				<image :src="avatarUrl"></image>
			</view>
			<view class="me-head-id">
				{{userName}}
			</view>
			<view class="me-head-wave-1"></view>
			<view class="me-head-wave-2"></view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					修改头像
				</view>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					性别
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
						<view class="uni-input">{{array[index].name}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="me-hobby">
			<view class="uni-list-cell-left">
				选择爱好
			</view>
			<!-- <view class="text">选中：{{JSON.stringify(formData.hobby)}}</view> -->
			<uni-data-checkbox class="me-hobby-list" mode="tag" multiple v-model="formData.hobby" :localdata="hobby">
			</uni-data-checkbox>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarUrl: '',
				userName: '',
				array: [{
					name: '未定义'
				}, {
					name: '男'
				}, {
					name: '女'
				}],
				index: 0,
				formData: {
					value: 1,
					hobby: []
				},
				hobby: [{
					text: '摄影',
					value: 0
				}, {
					text: '音乐',
					value: 1
				}, {
					text: '动漫',
					value: 2
				}, {
					text: '运动',
					value: 3
				}, {
					text: '文学',
					value: 4
				}, {
					text: '绘画',
					value: 5
				}, {
					text: '冒险',
					value: 6
				}, {
					text: '收集',
					value: 7
				}, {
					text: '游戏',
					value: 8
				}, {
					text: '手工',
					value: 9
				}, {
					text: '影视',
					value: 10
				}, {
					text: '舞蹈',
					value: 11
				}]
			}
		},
		onReady() {
			this.avatarUrl = getApp().globalData.avaterUrl;
			this.userName = getApp().globalData.userName;
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index = e.detail.value
			}
		}
	}
</script>

<style>
	.me-head {
		width: 100vw;
		height: 200px;
		text-align: center;
		background-image: url(https://pic.kohaku.xin/images/2021/10/29/-2020-07-10-151533-Small.png);
		background-size: 100% 100%;
	}

	.me-head-pic {
		margin-top: 5vh;
		display: inline-flex;
		width: 80px;
		height: 80px;
		border: 2px solid #000000;
		border-radius: 40px;
	}

	.me-head-pic image {
		width: 100%;
		height: 100%;
		border-radius: 40px;
	}

	.me-head-id {
		font-size: 20px;
		padding-top: 5px;
		font-weight: 400;
		color: #ffffff;
	}

	.me-head-wave-1 {
		height: 40px;
		background: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.5.1/img/Sakura/images/wave1.png) repeat-x;
		_filter: alpha(opacity=80);
		position: absolute;
		top: 160px;
		width: 1000%;
		left: 0px;
		z-index: 5;
		opacity: 1;
		transiton-property: opacity, bottom;
		transition-duration: .4s, .4s;
		animation: wave 250s alternate infinite;
	}

	@keyframes wave {
		from {
			left: 0px;
		}

		to {
			left: -2500px;
		}
	}

	.me-head-wave-2 {
		height: 35px;
		background: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.5.1/img/Sakura/images/wave1.png) repeat-x;
		_filter: alpha(opacity=80);
		position: absolute;
		top: 165px;
		width: 1000%;
		left: -50px;
		z-index: 5;
		opacity: 1;
		transiton-property: opacity, bottom;
		transition-duration: .4s, .4s;
		animation: wave2 300s alternate infinite;
	}

	@keyframes wave2 {
		from {
			left: -50px;
		}

		to {
			left: -3500px;
		}
	}

	.me-hobby::after {
		position: absolute;
		z-index: 10;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.me-hobby-list {
		margin-left: 30rpx;
	}

	.uni-list {
		background-color: #FFFFFF;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.uni-list:after {
		position: absolute;
		z-index: 10;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-list::before {
		position: absolute;
		z-index: 10;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-list-cell {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.uni-list-cell-hover {
		background-color: #eee;
	}

	.uni-list-cell-pd {
		padding: 22rpx 30rpx;
	}

	.uni-list-cell-left {
		white-space: nowrap;
		font-size: 34rpx;
		font-weight: 600;
		padding: 10px 30rpx;
	}

	.uni-list-cell-db,
	.uni-list-cell-right {
		flex: 1;
	}

	.uni-list-cell::after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 30rpx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-list .uni-list-cell:last-child::after {
		height: 0rpx;
	}

	.uni-list-cell-last.uni-list-cell::after {
		height: 0rpx;
	}

	.uni-list-cell-divider {
		position: relative;
		display: flex;
		color: #999;
		background-color: #f7f7f7;
		padding: 15rpx 20rpx;
	}

	.uni-list-cell-divider::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-list-cell-divider::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0rpx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-list-cell-navigate {
		font-size: 30rpx;
		padding: 22rpx 30rpx;
		line-height: 48rpx;
		position: relative;
		display: flex;
		box-sizing: border-box;
		width: 100%;
		flex: 1;
		justify-content: space-between;
		align-items: center;
	}

	.uni-list-cell-navigate {
		padding-right: 36rpx;
	}

	.uni-navigate-badge {
		padding-right: 50rpx;
	}

	.uni-list-cell-navigate.uni-navigate-right:after {
		font-family: uniicons;
		content: '\e583';
		position: absolute;
		right: 24rpx;
		top: 50%;
		color: #bbb;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	.uni-list-cell-navigate.uni-navigate-bottom:after {
		font-family: uniicons;
		content: '\e581';
		position: absolute;
		right: 24rpx;
		top: 50%;
		color: #bbb;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	.uni-list-cell-navigate.uni-navigate-bottom.uni-active::after {
		font-family: uniicons;
		content: '\e580';
		position: absolute;
		right: 24rpx;
		top: 50%;
		color: #bbb;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	.uni-collapse.uni-list-cell {
		flex-direction: column;
	}

	.uni-list-cell-navigate.uni-active {
		background: #eee;
	}

	.uni-list.uni-collapse {
		box-sizing: border-box;
		height: 0;
		overflow: hidden;
	}

	.uni-collapse .uni-list-cell {
		padding-left: 20rpx;
	}

	.uni-collapse .uni-list-cell::after {
		left: 52rpx;
	}

	.uni-list.uni-active {
		height: auto;
	}
</style>
