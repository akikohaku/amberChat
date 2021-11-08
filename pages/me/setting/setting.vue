<template>
	<view>
		<!-- <image src="https://pic.kohaku.xin/images/2021/11/04/E0BCC1534078250CC7D4B911A6820073.gif"></image> -->
		<view class="me-head">
			<view class="me-head-pic">
				<image :src="avatarUrl" @tap="chooseImage()"></image>
			</view>
			<view class="me-head-id">
				{{userName}}
			</view>
			<view class="me-head-wave-1"></view>
			<view class="me-head-wave-2"></view>
		</view>
		<view class="text">聊天背景</view>
		<view class="uni-list">
			<radio-group @change="radioChange">
				<label
					:class="item.value===current?'uni-list-cell uni-list-cell-pd select':'uni-list-cell uni-list-cell-pd'"
					v-for="(item, index) in colorsec" :key="colorsec.text">
					<view>
						<radio class="radiobox" :value="item.text" :checked="index === current"
							style="transform:scale(0.7)" color="#A4AAFF" />
					</view>
					<view class="itemtext">{{item.text}}</view>
					<view class="colorbox" :style="'background:'+color[item.value].value"></view>
				</label>
			</radio-group>
		</view>
		<kps-image-cutter @ok="onok" @cancel="oncancle" :url="tempurl" :fixed="false" :width="200" :height="200"
			:blob="true">
		</kps-image-cutter>
	</view>
</template>

<script>
	import kpsImageCutter from "@/components/ksp-image-cutter/ksp-image-cutter.vue";
	export default {
		components: {
			kpsImageCutter
		},
		data() {
			return {
				tempurl:'',
				current: 0,
				backgroundimg:'',
				isavatarsaved:true,
				formData: {
					value: 0,
					hobby: [1]
				},
				colorsec: [{
					text: '默认',
					value: 0
				}, {
					text: '羊皮纸',
					value: 1
				}, {
					text: '暗黑',
					value: 2
				}, {
					text: '巧克力',
					value: 3
				}, {
					text: '自定义',
					value: 4
				}],
				color: [{
					text: '默认',
					value: '#f5f5f5'
				}, {
					text: '羊皮纸',
					value: '#F8F4E9'
				}, {
					text: '暗黑',
					value: '#333333'
				}, {
					text: '巧克力',
					value: '#DDAF99'
				}, {
					text: '自定义',
					value: 0
				}]
			}
		},
		onShow() {
			this.avatarUrl = getApp().globalData.avaterUrl;
			this.userName = getApp().globalData.userName;
		},
		methods: {
			chooseImage() {
				uni.chooseImage({
					success: (res) => {
						// 设置url的值，显示控件
						this.tempurl = res.tempFilePaths[0];
					}
				});
			},
			onok(ev) {
				this.backgroundimg=this.tempurl;
				this.tempurl = "";
				this.isavatarsaved = false;
				var that = this;
				uniCloud.uploadFile({
					filePath: that.backgroundimg,
					cloudPath: getApp().globalData.openID + ".jpg",
					onUploadProgress: function(progressEvent) {
						console.log(progressEvent);
					},
					success(res) {
						console.log(res);
						that.backgroundimg = res.fileID;
						// getApp().globalData.avaterUrl = that.avatarUrl;
						that.isavatarsaved = ture;
						// uni.showModal({
						// 	title:"上传成功！",
						// 	content: "",
						// 	confirmText: "好耶！",
						// 	showCancel:false,
						// 	success: function(res) {

						// 	}
						// })
					},
					fail(res) {
						uni.showModal({
							title: "欸？",
							content: "上传失败了\n这合理吗？",
							confirmText: "啊这",
							showCancel: false,
							success: function(res) {

							}
						})
					},
				});
			},
			oncancle() {
				// url设置为空，隐藏控件
				this.tempurl = "";
			},
			radioChange(evt) {
				for (let i = 0; i < this.colorsec.length; i++) {
					if (this.colorsec[i].text === evt.detail.value) {
						this.current = i;
						if (i == 4) {
							this.chooseImage();
						}
						break;
					}
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #f5f5f5;
	}

	.colorbox {
		margin-top: 10px;
		margin-left: 5px;
		width: 85vw;
		height: 10px;
		display: block;
	}

	.select {
		background-color: #f3f3f3;
	}

	.itemtext {
		display: inline-block;
	}

	.radiobox {

		float: left;
		display: inline-block;
	}

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
		/* border: 2px solid #000000; */
		border-radius: 40px;

	}

	.me-head-pic image {
		width: 80px;
		height: 80px;
		/* 		width: 100%;
		height: 100%; */
		/* border: 2px solid #000000; */
		/* background-color: #ffffff; */
		border-radius: 50px;
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
		animation: wave2 250s alternate infinite;
	}

	@keyframes wave2 {
		from {
			left: -50px;
		}

		to {
			left: -3500px;
		}
	}

	.uni-list {
		background-color: #FFFFFF;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-bottom: 100px;
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
		width: 100vw;
		position: relative;
		display: inline-block;
		/* flex-direction: row; */
		justify-content: space-between;
		align-items: center;
	}

	.uni-list-cell-hover {
		background-color: #eee;
	}

	.uni-list-cell-pd {
		padding: 8rpx 30rpx 15rpx;
	}

	.uni-list-cell {
		justify-content: flex-start
	}

	.uni-list-cell-left {
		white-space: nowrap;
		font-size: 34rpx;
		font-weight: 600;
		padding: 10px 30rpx;
	}

	.uni-list-cell-left-2 {
		display: inline-flex;
		white-space: nowrap;
		font-size: 34rpx;
		font-weight: 600;
		padding: 10px 30rpx;
	}

	.uni-list-cell-db,
	.uni-list-cell-right {
		position: absolute;
		left: 110px;
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
