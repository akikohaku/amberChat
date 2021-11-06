<template>
	<view>
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
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left" @tap="chooseImage()">
					修改头像
				</view>


			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left-2">
					修改昵称
				</view>
				<view class="uni-input-wrapper">

					<input class="uni-input" v-model="userName" maxlength="10" placeholder="最大输入长度为10" />
				</view>
			</view>
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
			<view class="uni-list-cell">
				<view class="me-hobby">
					<view class="uni-list-cell-left">
						选择爱好
					</view>
					<!-- <view class="text">选中：{{JSON.stringify(formData.hobby)}}</view> -->
					<uni-data-checkbox class="me-hobby-list" mode="tag" multiple v-model="formData.hobby"
						:localdata="hobby">
					</uni-data-checkbox>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					匹配设置
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange2" :value="index2" :range="array2" range-key="name">
						<view class="uni-input">{{array2[index2].name}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="white"></view>
		<view class="upload" @click="uploadprofile">保存</view>
		<kps-image-cutter @ok="onok" @cancel="oncancle" :url="tempurl" :fixed="false" :width="200" :height="200"
			:blob="true">
		</kps-image-cutter>
	</view>
</template>

<script>
	import kpsImageCutter from "@/components/ksp-image-cutter/ksp-image-cutter.vue";
	import IMService from "../../../lib/imservice";
	export default {
		components: {
			kpsImageCutter
		},
		data() {
			return {
				avatarUrl: '',
				userName: '',
				tempurl: '',
				array: [{
					name: '未定义',
					value: 'u'
				}, {
					name: '男',
					value: 'm'
				}, {
					name: '女',
					value: 'f'
				}],
				index: 0,
				array2: [{
					name: '仅限异性',
					value: 'e'
				}, {
					name: '男',
					value: 'm'
				}, {
					name: '女',
					value: 'f'
				}],
				index2: 0,
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
					text: '体育',
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
				}, {
					text: '美食',
					value: 12
				}, {
					text: '数码',
					value: 13
				}, {
					text: '军事',
					value: 14
				}, {
					text: '宠物',
					value: 15
				}, {
					text: '娱乐',
					value: 16
				}, {
					text: '编程',
					value: 17
				}]
			}
		},
		onReady() {
			
		},
		onShow() {
			this.avatarUrl = getApp().globalData.avaterUrl;
			this.userName = getApp().globalData.userName;
			if (getApp().globalData.tosex === 'e') {
				this.index2 = 0;
			}
			if (getApp().globalData.tosex === 'm') {
				this.index2 = 1;
			}
			if (getApp().globalData.tosex === 'f') {
				this.index2 = 2;
			}
			
			if (getApp().globalData.sex === 'u') {
				this.index = 0;
			}
			if (getApp().globalData.sex === 'm') {
				this.index = 1;
			}
			if (getApp().globalData.sex === 'f') {
				this.index = 2;
			}
			if (getApp().globalData.pre != '') {
				this.formData.hobby = JSON.parse(getApp().globalData.pre);
			}

		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index = e.detail.value
			},
			bindPickerChange2: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index2 = e.detail.value
			},
			chooseImage() {
				uni.chooseImage({
					success: (res) => {
						// 设置url的值，显示控件
						this.tempurl = res.tempFilePaths[0];
					}
				});
			},
			onok(ev) {
				this.avatarUrl = ev.path.replace(/[\r\n]/g, "");
				console.log(this.avatarUrl);
				this.tempurl = "";
				uniCloud.uploadFile({
					filePath: this.avatarUrl,
					cloudPath: getApp().globalData.openID + ".jpg",
					onUploadProgress: function(progressEvent) {
						console.log(progressEvent);
					},
					success(res) {
						console.log(res);
						this.avatarUrl = res.fileID;
						getApp().globalData.avaterUrl = this.avatarUrl;
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
							title:"欸？",
							content: "上传失败了\n这合理吗？",
							confirmText: "啊这",
							showCancel:false,
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
			uploadprofile() {
				if (this.formData.hobby.length == 0) {
					uni.showModal({
						title:"欸？",
						content: "您好像还没有设置爱好？",
						confirmText: "啊这",
						showCancel:false,
						success: function(res) {
							
						}
					})
					return;
				}
				if (this.userName == "") {
					uni.showModal({
						title:"欸？",
						content: "您好像还没有设置昵称？",
						confirmText: "啊这",
						showCancel:false,
						success: function(res) {
							
						}
					})
					return;
				}
				if (this.avatarUrl == "") {
					uni.showModal({
						title:"欸？",
						content: "您好像还没有设置头像？",
						confirmText: "啊这",
						showCancel:false,
						success: function(res) {
							
						}
					})
					return;
				}
				if (this.index == 0) {
					uni.showModal({
						title:"欸？",
						content: "您好像还没有设置性别？",
						confirmText: "啊这",
						showCancel:false,
						success: function(res) {
							
						}
					})
					return;
				}
				let that = this;
				uni.request({
					method: 'GET',
					url: 'https://wechat.api.kohaku.xin:11731/updateprofile',
					data: {
						openid: getApp().globalData.userID,
						username: this.userName,
						sex: this.array[this.index].value,
						pre: JSON.stringify(this.formData.hobby),
						avatar: getApp().globalData.avaterUrl,
						tosex:this.array2[this.index2].value

					},

					success(res) {
						console.log(res);
						getApp().globalData.userName = that.userName;
						getApp().globalData.sex = that.array[that.index].value;
						getApp().globalData.pre = JSON.stringify(that.formData.hobby);
						getApp().globalData.tosex=that.array2[that.index2].value;
						if (that.goEasy.getConnectionStatus() === 'connected') {
							that.goEasy.disconnect({
								onSuccess: function() {
									getApp().globalData.imService = new IMService(that.goEasy, that
										.GoEasy);
									getApp().globalData.imService.connect({
										uuid: getApp().globalData.userID,
										avatar: getApp().globalData.avaterUrl,
										name: getApp().globalData.userName
									});
									uni.setStorageSync('currentUser', {
										uuid: getApp().globalData.userID,
										avatar: getApp().globalData.avaterUrl,
										name: getApp().globalData.userName
									});
								},
								onFailed: function(error) {
									uni.showToast({
										title: '断连失败',
										icon: "error"
									})
								}
							});

						}
						uni.showModal({
							title:"保存成功了！",
							content: "",
							confirmText: "好耶！",
							showCancel:false,
							success: function(res) {
								if(res.confirm){
									uni.switchTab({
										url:"/pages/index/index"
									})
								}
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
	.white{
		height: 20vh;
		width: 100vw;
	}
	.uni-input-wrapper {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		/* #endif */
		padding: 8px 13px;
		flex-direction: row;
		flex-wrap: nowrap;
		background-color: #FFFFFF;
	}

	.uni-input {
		display: inline-flex;
		height: 28px;
		line-height: 28px;
		font-size: 15px;
		padding: 0px;
		flex: 1;
		background-color: #FFFFFF;
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
		width: 100%;
		height: 100%;
		border: 2px solid #000000;
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
		margin-bottom: 20rpx;
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

	.upload {
		width: 100vw;
		height: 50px;
		position: fixed;
		bottom: 0rpx;
		text-align: center;
		padding-top: 10px;
		font-size: 60rpx;
		background-color: orange;
		color: white;

	}
</style>
