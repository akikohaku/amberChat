<template>
	<view class="chatInterface" ref='chatInterface'>

		<view class="scroll-view" ref="scrollview">
			<view class="all-history-loaded">
				{{allHistoryLoaded ? '已经没有更多的历史消息' : '下拉获取历史消息'}}
			</view>
			<!--已经收到的消息-->
			<view v-for="(message,index) in messages" :key="message.messageId">
				<!--时间显示，类似于微信，隔5分钟不发言，才显示时间-->
				<view class="time-lag">
					{{renderMessageDate(message, index)}}
				</view>
				<view class="message-item" :class="{'self' : message.senderId == (currentUser && currentUser.uuid)}">
					<view class="avatar" v-if="message.senderId != (currentUser && currentUser.uuid)">
						<image :src="friend.avatar"></image>
					</view>
					<view class="avatar" v-else>
						<image :src="currentUser.avatar"></image>
					</view>
					<view class="content">
						<b class="pending" v-if="message.status == 'sending'"></b>
						<b class="send-fail" v-if="message.status == 'fail'"></b>
						<view v-if="message.type == 'text'" v-html="renderTextMessage(message)"></view>
						<image class="image-content" v-if="message.type == 'image'" :src="message.payload.url"
							:data-url="message.payload.url" @click="showImageFullScreen" mode="widthFix"></image>
						<view class="video-snapshot" v-if="message.type == 'video'"
							:data-url="message.payload.video.url" @click="playVideo">
							<image :src="message.payload.thumbnail.url" mode="aspectFit"></image>
							<view class="video-play-icon"></view>
						</view>
						<GoEasyAudioPlayer v-if="message.type =='audio'" :src="message.payload.url"
							:duration="message.payload.duration" />
						<!-- <view class="custom-message" v-if="message.type == 'order'">
							<view class="title">
								<image src="../../static/images/dingdan.png"></image>
								<text>自定义消息</text>
							</view>
							<view class="custom-message-item">编号：{{message.payload.number}}</view>
							<view class="custom-message-item">商品: {{message.payload.goods}}</view>
							<view class="custom-message-item">金额: {{message.payload.price}}</view>
						</view> -->
					</view>
				</view>
			</view>
		</view>
		<view class="action-box" ref='actionbuttomout' v-if="!video.visible">
			<view class="action-top" ref='actiontop'>
				<!-- <view :class="[audio.visible ? 'record-icon record-open':'record-icon']" @click="switchAudioKeyboard"></view> -->
				<view class="record-input" @touchstart="onRecordStart" @touchend="onRecordEnd" v-if="audio.visible">
					{{audio.recording ? '松开发送' : '按住录音'}}
				</view>
				<view class="message-input" v-else>
					<!-- GoEasyIM最大支持3k的文本消息，如需发送长文本，需调整输入框maxlength值 -->
					<textarea type="text" rows="1" maxlength="1000" v-model="content" @focus="messageInputFocusin()"
						onscroll="this.rows++;"></textarea>
				</view>
				<view class="file-icon emoji-icon" @click="showEmoji"></view>
				<view class="file-icon more-icon" @click="showMore"></view>
				<view class="send-message-btn" ref='sendmessagebtn' @click="sendTextMessage">发送</view>
			</view>
			<!--展示表情列表-->
			<scroll-view class="action-bottom-out" scroll-y="true" v-if="emoji.show">
				<view class="action-bottom" v-if="emoji.show" style="justify-content: space-around">
					<image class="emoji-item" v-for="(emojiItem, emojiKey, index) in emoji.map" :key="index"
						:src="emoji.url + emojiItem" @click="selectEmoji(emojiKey)"></image>
				</view>
			</scroll-view>

			<!--更多-->
			<view class="action-bottom" v-if="more.show">
				<view class="more-item" @click="sendImage">
					<image src="../../static/images/tupian.png"></image>
					<text>图片</text>
				</view>
				<view class="more-item" @click="sendVideo">
					<image src="../../static/images/shipin.png"></image>
					<text>视频</text>
				</view>
				<!-- 				<view class="more-item" @click="showCustomMessageForm">
					<image src="../../static/images/zidingyi.png"></image>
					<text>自定义消息</text>
				</view> -->
			</view>
		</view>
		<view class="record-loading" v-if="audio.recording"></view>
		<video v-if="video.visible" :src="video.url" id="videoPlayer"
			@fullscreenchange="onVideoFullScreenChange"></video>
	</view>
</template>

<script>
	import GoEasyAudioPlayer from "../../components/GoEasyAudioPlayer/GoEasyAudioPlayer";
	import EmojiDecoder from "../../lib/EmojiDecoder";
	const recorderManager = uni.getRecorderManager();

	export default {
		name: "privateChat",
		components: {
			GoEasyAudioPlayer,
		},
		data() {
			let emojiUrl = 'https://zhoukaiwen.com/img/icon/emojj1/';
			let emojiMap = {
				"[微笑]": "1.png",
				"[生气]": "2.png",
				"[坏笑]": "3.png",
				"[难受]": "4.png",
				"[困]": "5.png",
				"[偷看]": "6.png",
				"[难过]": "7.png",
				"[斜眼]": "8.png",
				"[委屈]": "9.png",
				"[害羞]": "10.png",
				"[裂开]": "11.png",
				"[偷笑]": "12.png",
				"[痛苦]": "13.png",
				"[白眼]": "14.png",
				"[丑]": "15.png",
				"[哇哇哭]": "16.png",
				"[笑嘻嘻]": "17.png",
				"[盯着你]": "18.png",
				"[啊哈]": "19.png",
				"[吃瓜]": "20.png",
				"[哦吼]": "21.png",
				"[哭死]": "22.png",
				"[打脸]": "23.png",
				"[斗鸡眼]": "24.png",
				"[发呆]": "25.png",
				"[憨笑]": "26.png",
				"[无语]": "27.png",
				"[鸡贼]": "28.png",
				"[大无语]": "29.png",
				"[哭吐了]": "30.png",
				"[呲牙笑]": "31.png",
				"[奸笑]": "32.png",
				"[啊啊啊]": "33.png",
				"[哈嘿]": "34.png",
				"[惊讶]": "35.png",
				"[指你]": "36.png",
				"[可爱型]": "37.png",
				"[快哭了]": "38.png",
				"[抠鼻屎]": "39.png",
				"[酷酷]": "40.png",
				"[笑汗]": "41.png",
				"[算命]": "42.png",
				"[红脸坏笑]": "43.png",
				"[委屈死了]": "44.png",
				"[爆炸]": "45.png",
				"[吐了]": "46.png",
				"[么么哒]": "47.png",
				"[吐血]": "48.png",
				"[面无表情]": "49.png",
				"[捂嘴吐]": "50.png",
				"[斜眼看]": "51.png",
				"[花痴]": "52.png",
				"[被打]": "53.png",
				"[瞌睡]": "54.png",
				"[冥想]": "55.png",
				"[俏皮]": "56.png",
				"[戳手委屈]": "57.png",
				"[端庄]": "58.png",
				"[emmm]": "59.png",
				"[欢呼]": "60.png",
				"[笑哭了]": "61.png",
				"[抱抱]": "62.png",
				"[闭眼笑]": "63.png",
				"[捂嘴微笑]": "64.png",
				"[笑哭2]": "65.png",
				"[笑嘻嘻]": "66.png",
				"[笑露齿]": "67.png",
				"[阴脸笑]": "68.png",
				"[问号脸]": "69.png",
				"[拜拜]": "70.png",
				"[难受2]": "71.png",
				"[傻笑2]": "72.png",
				"[爆炸2]": "73.png",
				"[二哈]": "74.png",
				"[二哈吐舌]": "75.png",
				"[狗狗笑哭]": "76.png",
				"[狗狗绿帽]": "77.png",
				"[狗狗张嘴]": "78.png",
				"[狗狗绿扇]": "79.png",
				"[狗狗]": "80.png",
				"[猫咪]": "81.png",
				"[牛啊]": "82.png",
				"[爱心]": "83.png",
				"[心裂开]": "84.png",
				"[玫瑰花]": "85.png",
				"[枯萎]": "86.png",
				"[棒]": "87.png",
				"[差]": "88.png",
				"[红药]": "89.png",
				"[绿药]": "90.png",
				"[抱拳]": "91.png",
				"[ok]": "92.png",
				"[pk]": "93.png",
				"[绿帽子]": "94.png",
				"[菜刀]": "95.png"

			};
			return {
				//聊天文本框
				content: '',
				friend: null,
				currentUser: null,
				friendid:'',
				//已经接收到的消息
				messages: [],
				//已经加载完所有历史消息
				allHistoryLoaded: false,

				//定义表情列表
				emoji: {
					url: emojiUrl,
					map: emojiMap,
					show: false,
					decoder: new EmojiDecoder(emojiUrl, emojiMap),
				},
				more: { //更多按钮
					show: false
				},
				audio: {
					//语音录音中
					recording: false,
					//录音按钮展示
					visible: false
				},
				video: {
					visible: false,
					url: '',
					context: null
				}
			}
		},
		onReady() {
			this.video.context = uni.createVideoContext('videoPlayer', this);
			// https://uniapp.dcloud.io/api/ui/navigationbar?id=setnavigationbartitle
			var theme=uni.getStorageSync('theme');
			console.log(theme);
			if(theme===''){
				//do nothing
			}else{
				this.$refs.chatInterface.$el.style.backgroundColor=theme.color1;
				this.$refs.actiontop.$el.style.backgroundColor=theme.color2;
				this.$refs.sendmessagebtn.$el.style.backgroundColor=theme.color3;
				this.$refs.sendmessagebtn.$el.style.color=theme.color1;
				this.$refs.actionbuttomout.$el.style.backgroundColor=theme.color2;
				
			}

		},
		onShow() {
			this.more.show = false;
			this.emoji.show = false;
			this.scrollToBottom();
			// var theme=uni.getStorageSync('theme');
			// console.log(theme);
			// if(theme===''){
			// 	//do nothing
			// }else{
			// 	this.$refs.chatInterface.$el.style.backgroundColor=theme.color1;
			// 	this.$refs.actiontop.$el.style.backgroundColor=theme.color2;
			// 	this.$refs.sendmessagebtn.$el.style.backgroundColor=theme.color3;
			// 	this.$refs.sendmessagebtn.$el.style.color=theme.color1;
			// 	this.$refs.actionbuttomout.$el.style.backgroundColor=theme.color2;
				
			// }
			
		},
		onLoad(options) {
			var that = this;
			let imService = getApp().globalData.imService;
			this.currentUser = uni.getStorageSync('currentUser');
			//聊天对象
			let friendId = options.to;
			this.friendid=friendId;
			console.log(friendId);

			//从服务器获取最新的好友信息
			uni.request({
				method: 'GET',
				url: 'https://wechat.api.kohaku.xin:11731/getuserbyid',
				data: {
					openID: friendId,
				},

				success(res) {
					console.log(res.data);
					that.friend = {
						uuid: res.data.uuid,
						name: res.data.name,
						avatar: res.data.avater
					}
					console.log('onLoad friend - ', that.friend);
					that.scrollToBottom();
					//监听新消息

					uni.setNavigationBarTitle({
						title: that.friend.name
					});

				}
			})
			// this.friend = imService.findFriendById(friendId);
			this.messages = imService.getPrivateMessages(friendId);
			imService.onNewPrivateMessageReceive = (friendId, message) => {
				if (friendId === this.friend.uuid) {
					//聊天时，收到消息标记为已读
					this.markPrivateMessageAsRead(friendId);
					//收到新消息，是滚动到最底部
					thia.scrollToBottom();
				}
			};
			// var onUserPresence = function(event) {
			// 	//被监听的用户有上线或者下线行为，就会触发本方法
			// 	//单聊用户上下线event示例
			// 	// {
			// 	//     "time": 1592807533798,
			// 	//     "action": "online",
			// 	//     "id": "user002",
			// 	//     "data": {"avatar":"/images/Avatar-2.png","name":"Wallace"}
			// 	// }
			// 	console.log("online/offline event:" + JSON.stringify(event));
			// };
			// //接受用户上下线状态变化
			// this.goEasy.im.on(this.GoEasy.IM_EVENT.USER_PRESENCE, onUserPresence);
			// var userIds = [friendId];
			// this.goEasy.im.subscribeUserPresence({
			// 	userIds: userIds,
			// 	onSuccess: function() {
			// 		console.log("Subscribe user presence successfully.");
			// 	},
			// 	onFailed: function(error) { //连接失败
			// 		console.log("Failed to subscribe user presence, code:" + error.code + " content:" + error
			// 			.content);
			// 	}
			// });
			//每次进入聊天页面，总是滚动到底部
			this.scrollToBottom();
			// 录音监听器
			this.initRecorderListeners();
			//收到的消息设置为已读
			if (this.messages.length !== 0) {
				this.markPrivateMessageAsRead(friendId);
			}
		},
		onPullDownRefresh(e) {
			this.loadMoreHistoryMessage();
		},
		onUnload() {
			//退出聊天页面之前，清空页面传入的监听器
			let imService = getApp().globalData.imService;
			if (imService) {
				imService.onNewPrivateMessageReceive = (friendId, message) => {};
			}
		},
		methods: {
			//渲染文本消息，如果包含表情，替换为图片
			//todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
			renderTextMessage(message) {
				console.log(message.payload.text);
				return '<span class="text-content">' + this.emoji.decoder.decode(message.payload.text) + '</span>'
			},
			//像微信那样显示时间，如果有几分钟没发消息了，才显示时间
			//todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
			renderMessageDate(message, index) {
				if (index === 0) {
					return this.formatDate(message.timestamp)
				} else {
					if (message.timestamp - this.messages[index - 1].timestamp > 5 * 60 * 1000) {
						return this.formatDate(message.timestamp)
					}
				}
				return '';
			},
			initRecorderListeners() {
				// 监听录音开始
				recorderManager.onStart(() => {
					this.audio.recording = true;
				});
				//录音结束后，发送
				recorderManager.onStop((res) => {
					this.audio.recording = false;
					let audioMessage = this.goEasy.im.createAudioMessage({
						to: {
							id: this.friend.uuid,
							type: this.GoEasy.IM_SCENE.PRIVATE,
							data: {
								name: this.friend.name,
								avatar: this.friend.avatar
							}
						},
						file: res,
						onProgress: function(progress) {
							console.log(progress)
						},
						notification: {
							title: this.currentUser.name + '发来一段语音',
							body: '[语音消息]' // 字段最长 50 字符
						}
					});
					this.sendMessage(audioMessage);
				});
				// 监听录音报错
				recorderManager.onError(function(res) {
					console.log("录音报错：", res);
				})
			},
			sendMessage(message) {
				let toId = message.to.id;
				let imService = getApp().globalData.imService;
				let localHistory = imService.getPrivateMessages(toId);
				localHistory.push(message);
				var userIds = [this.friendid];
				let that=this;
				this.goEasy.im.hereNow({
					userIds: userIds, //每次查询最多不超过50个
					onSuccess: function(result) {
						// result示例
						// {
						//     "code": 200,
						//     "content": [
						//         {"id": "user001","data": {"name":"Mattie"}},
						//         {"id": "user002","data": {"name":"Jack"}},
						//         {"id": "user003","data": {"name":"Mike"}}"
						//     }]
						// };    
						console.log("Query online user list successfully, result:\n " + JSON.stringify(
						result));
						console.log(result.content[0]);
						if(result.content[0]==undefined){
							//发送离线消息
							uni.request({
								method: 'GET',
								url: 'https://wechat.api.kohaku.xin:11731/offlinemessage',
								data: {
									openid: that.friendid,
								},
							
								success(res) {
							
								}
							})
							
						}
					},
					onFailed: function(error) { //连接失败
						console.log("Failed to mark as read, code:" + error.code + " content:" + error
						.content);
					}
				});
				this.goEasy.im.sendMessage({
					message: message,
					onSuccess: function(message) {
						console.log("发送成功.", message);
					},
					onFailed: function(error) {
						console.log("发送失败:", error);
					}
				});
			},
			sendTextMessage() { //发送消息
				if (this.content.trim() !== '') {
					let body = this.content;
					if (this.content.length >= 50) {
						body = this.content.substring(0, 30) + "...";
					}
					let textMessage = this.goEasy.im.createTextMessage({
						text: this.content,
						to: {
							id: this.friend.uuid,
							type: this.GoEasy.IM_SCENE.PRIVATE,
							data: {
								name: this.friend.name,
								avatar: this.friend.avatar
							}
						},
						notification: {
							title: this.currentUser.name + '发来一段文字',
							body: body
						}
					});
					this.sendMessage(textMessage);
				}
				this.scrollToBottom();
				this.content = "";
			},
			loadMoreHistoryMessage() { //历史消息
				let self = this;
				let lastMessageTimeStamp = Date.now();
				let lastMessage = this.messages[0];
				if (lastMessage) {
					lastMessageTimeStamp = lastMessage.timestamp;
				}
				let currentLength = this.messages.length;
				this.goEasy.im.history({
					userId: self.friend.uuid,
					lastTimestamp: lastMessageTimeStamp,
					onSuccess: function(result) {
						//获取本地记录
						let imService = getApp().globalData.imService;
						let localHistory = imService.getPrivateMessages(self.friend.uuid);
						//添加加载的记录到本地记录尾部
						let messages = result.content;
						for (let i = messages.length - 1; i >= 0; i--) {
							localHistory.unshift(messages[i]);
						}
						if (localHistory.length === currentLength) {
							self.allHistoryLoaded = true;
						}
						self.messages = localHistory;
						uni.stopPullDownRefresh();
					},
					onFailed: function(error) {
						//获取失败
						if (error.code === 401) {
							console.log("获取历史消息失败,默认不开通，付费应用，可以在我的应用->查看详情，高级功能里自助开通");
						} else {
							console.log("获取历史消息失败, code:" + error.code + ",错误信息:" + error.content);
						}
						uni.stopPullDownRefresh();
					}
				});
			},
			//语音录制按钮和键盘输入的切换
			switchAudioKeyboard() {
				this.audio.visible = !this.audio.visible;
				if (uni.authorize) {
					uni.authorize({
						scope: 'scope.record'
					})
				}
			},
			onRecordStart() {
				try {
					recorderManager.start();
				} catch (e) {
					uni.showModal({
						title: '录音错误',
						content: '请在app和小程序端体验录音，Uni官方明确H5不支持getRecorderManager, 详情查看Uni官方文档'
					});
				}
			},
			onRecordEnd() {
				try {
					recorderManager.stop();
				} catch (e) {
					console.log(e)
				}
			},
			sendVideo() { //发送文件
				uni.chooseVideo({
					success: (res) => {
						let videoMessage = this.goEasy.im.createVideoMessage({
							to: {
								id: this.friend.uuid,
								type: this.GoEasy.IM_SCENE.PRIVATE,
								data: {
									name: this.friend.name,
									avatar: this.friend.avatar
								}
							},
							file: res,
							onProgress: function(progress) {
								console.log(progress)
							},
							notification: {
								title: this.currentUser.name + '发来一个视频',
								body: '[视频消息]' // 字段最长 50 字符
							}
						});
						this.sendMessage(videoMessage);
					}
				})
			},
			sendImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						let imageMessage = this.goEasy.im.createImageMessage({
							to: {
								id: this.friend.uuid,
								type: this.GoEasy.IM_SCENE.PRIVATE,
								data: {
									name: this.friend.name,
									avatar: this.friend.avatar
								}
							},
							file: res,
							onProgress: function(progress) {
								console.log(progress)
							},
							notification: {
								title: this.currentUser.name + '发来一张图片',
								body: '[图片消息]' // 字段最长 50 字符
							}
						});
						this.sendMessage(imageMessage);
					}
				});
			},
			showImageFullScreen(e) {
				var imagesUrl = [e.currentTarget.dataset.url];
				uni.previewImage({
					urls: imagesUrl
				});
			},
			playVideo(e) {
				this.video.visible = true;
				this.video.url = e.currentTarget.dataset.url;
				this.$nextTick(() => {
					this.video.context.requestFullScreen({
						direction: 0
					});
					this.video.context.play();
				});
			},
			onVideoFullScreenChange(e) {
				//当退出全屏播放时，隐藏播放器
				if (this.video.visible && !e.detail.fullScreen) {
					this.video.visible = false;
					this.video.context.stop();
				}
			},
			messageInputFocusin() {
				this.more.show = false;
				this.emoji.show = false;
				setTimeout(() => {
					this.$refs.scrollview.$el.style.margin = "0 0 0 0";
					this.scrollToBottom();
				}, 400)

			},
			showEmoji() {
				if (!this.emoji.show) {
					this.$refs.scrollview.$el.style.margin = "0 0 170px 0";
					this.scrollToBottom();
				} else {
					this.$refs.scrollview.$el.style.margin = "0 0 0 0";
					this.scrollToBottom();
				}
				this.emoji.show = !this.emoji.show;
				this.more.show = false;
				// var theme=uni.getStorageSync('theme');
				// console.log(theme);
				// if(theme===''){
				// 	//do nothing
				// }else{

				// 	this.$refs.actionbuttomout.$el.style.backgroundColor=theme.color2;
					
				// }
			},
			showMore() {
				if (!this.more.show) {
					this.$refs.scrollview.$el.style.margin = "0 0 170px 0";
					this.scrollToBottom();
				} else {
					this.$refs.scrollview.$el.style.margin = "0 0 0 0";
					this.scrollToBottom();
				}
				this.more.show = !this.more.show;

				this.emoji.show = false
				// var theme=uni.getStorageSync('theme');
				// console.log(theme);
				// if(theme===''){
				// 	//do nothing
				// }else{
				
				// 	this.$refs.actionbuttomout.$el.style.backgroundColor=theme.color2;
					
				// }
			},
			selectEmoji(emojiKey) {
				this.content += emojiKey
			},
			showCustomMessageForm() {
				let to = {
					id: this.friend.uuid,
					name: this.friend.name,
					avatar: this.friend.avatar,
					type: this.GoEasy.IM_SCENE.PRIVATE
				};
				uni.navigateTo({
					url: '../customMessage/customMessage?to=' + JSON.stringify(to)
				});
			},
			scrollToBottom() {
				this.$nextTick(function() {
					uni.pageScrollTo({
						scrollTop: 2000000,
						duration: 10
					})
				});
			},
			markPrivateMessageAsRead(friendId) {
				this.goEasy.im.markPrivateMessageAsRead({
					userId: friendId,
					onSuccess: function() {
						console.log('标记为已读成功')
					},
					onFailed: function(error) {
						console.log(error);
					}
				});
			}
		}
	}
</script>

<style>
	page {
		background: #F5F5F5;
	}

	.chatInterface {
		background-color: #F5F5F5;
		height: auto;
		min-height: 100vh;
	}

	.emoji-item {
		height: 50rpx;
		width: 50rpx;
		/* display: inline-block; */
	}

	.chatInterface .scroll-view {
		/* height: auto; */
		padding-left: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
		-webkit-overflow-scrolling: touch;
		padding-bottom: 120rpx;

	}

	.chatInterface .scroll-view .all-history-loaded {
		font-size: 24rpx;
		height: 90rpx;
		line-height: 90rpx;
		width: 100%;
		text-align: center;
		color: grey;
	}

	.chatInterface .scroll-view .message-item {
		max-height: 400rpx;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		overflow: hidden;
		display: flex;
	}

	.chatInterface .scroll-view .message-item.self {
		overflow: hidden;
		display: flex;
		justify-content: flex-start;
		flex-direction: row-reverse;
	}

	.chatInterface .scroll-view .message-item .avatar {
		width: 100rpx;
		height: 100rpx;
		margin-right: 20rpx;
		flex-shrink: 0;
		flex-grow: 0;
		border-radius: 40rpx;
	}

	.chatInterface .scroll-view .message-item .avatar image {
		width: 100%;
		height: 100%;
		border-radius: 25px;
	}

	.chatInterface .scroll-view .message-item.self .avatar {
		margin-left: 20rpx;
		margin-right: 0;
	}


	.chatInterface .scroll-view .content {
		font-size: 34rpx;
		line-height: 44rpx;
		max-height: 400rpx;
		display: flex;
		align-items: center;
		justify-content: right;
		text-align: right;
	}

	.chatInterface .scroll-view .content .image-content {
		padding: 16rpx;
		border-radius: 12rpx;
		width: 300rpx;
		height: 300rpx;
	}

	.chatInterface .scroll-view .content .text-content {
		padding: 16rpx;
		border-radius: 12rpx;
		color: #ffffff;
		background: #618DFF;
		/* word-break: break-all; */

		word-break: normal;
		text-align: left;
		vertical-align: center;
		display: block;
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	.chatInterface .scroll-view .content .text-content img {
		width: 50rpx;
		height: 50rpx;
	}

	.chatInterface .scroll-view .content .red-packet {
		background-color: orange;
		color: #FFFFFF;
		font-size: 30rpx;
		width: 400rpx;
		height: 150rpx;
		border-radius: 10rpx;
		line-height: 80rpx;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.chatInterface .scroll-view .content .red-packet image {
		width: 70rpx;
		height: 80rpx;
	}

	.chatInterface .scroll-view .content .pending {
		background: url("../../static/images/pending.gif") no-repeat center;
		background-size: 30rpx;
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
		flex-grow: 0;
		flex-shrink: 0;
	}

	.chatInterface .scroll-view .content .send-fail {
		background: url("../../static/images/failed.png") no-repeat center;
		background-size: 30rpx;
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
		flex-grow: 0;
		flex-shrink: 0;
	}

	.chatInterface .action-box {

		display: flex;
		backdrop-filter: blur(0.27rpx);
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		flex-direction: column;
		background-color: #F5F5F5;
	}

	.chatInterface .action-box .action-top {
		display: flex;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		backdrop-filter: blur(0.27rem);
		height: 80rpx;
		background: #F0F0F0;
		width: 100%;
	}

	.chatInterface .action-box .action-top .record-icon {
		font-size: 32rpx;
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background: url("../../static/images/record-appearance-icon.png") no-repeat center;
		background-size: 50%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}

	.chatInterface .action-box .action-top .file-icon {
		background: url("../../static/images/video.png") no-repeat center;
		background-size: 70%;
		color: #9D9D9D;
		position: relative;
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}

	.chatInterface .action-box .record-icon.record-open {
		background: url("../../static/images/jianpan.png") no-repeat center;
		background-size: 70%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}

	.chatInterface .action-box .action-top .img-video {
		background: url("../../static/images/file.png") no-repeat center;
		background-size: 73%;
	}

	.chatInterface .action-box .action-top .emoji-icon {
		background: url("/static/images/biaoqing.png") no-repeat center;
		background-size: 90%;
	}

	.chatInterface .action-box .action-top .more-icon {
		background: url("/static/images/jiahao.png") no-repeat center;
		background-size: 70%;
	}

	.chatInterface .action-box .action-bottom .more-item {
		display: inline-flex;
		flex-direction: column;
		width: 150rpx;
		height: 150rpx;
		margin-right: 20rpx;
		align-items: center;
	}

	.chatInterface .action-box .action-bottom .more-item image {
		height: 100rpx;
		width: 100rpx;
	}

	.chatInterface .action-box .action-bottom .more-item text {
		font-size: 20rpx;
		text-align: center;
		line-height: 50rpx;
	}

	.chatInterface .action-box .action-top .record-input {
		width: 460rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 12rpx;
		font-size: 28rpx;
		background: #cccccc;
		color: #ffffff;
		text-align: center;
	}

	.chatInterface .action-box .action-top .message-input {
		border-radius: 30rpx;
		background: #FEFEFE;
		height: 80rpx;
		align-items: center;
		justify-content: center;
	}

	.message-input {
		margin-left: 15rpx;
		display: table-cell;
		vertical-align: middle;
	}

	.chatInterface .action-box .action-top .message-input input {
		width: 480rpx;
		height: 80rpx;
		line-height: 80rpx;
		padding-left: 20rpx;
		font-size: 28rpx;
	}

	.chatInterface .action-box .action-top .message-input textarea {
		padding-top: 20rpx;
		width: 450rpx;
		height: 60rpx;
		line-height: 40rpx;
		padding-left: 20rpx;
		font-size: 28rpx;
		outline: none;
		overflow: hidden;
	}

	.chatInterface .action-box .action-top .send-message-btn {
		font-size: 30rpx;
		margin-top: 10rpx;
		text-align: center;
		/* padding-left: 18rpx; */
		margin-right: 10rpx;
		width: 100rpx;
		line-height: 57rpx;
		height: 60rpx;
		color: #ffffffdd;
		/* border: 1px solid #A4AAFF; */
		background-color: #A4AAFF;
		border-radius: 10rpx;
	}

	.action-bottom-out {
		-webkit-overflow-scrolling: touch;
		height: 300rpx;

		box-sizing: border-box;
		background-color: #F0F0F000;
	}

	.chatInterface .action-bottom {
		height: 300rpx;
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #F0F0F000;
		/* display: flex; */

	}

	.chatInterface .action-bottom image {
		width: 70rpx;
		height: 70rpx;
		display: inline-block;

	}


	.chatInterface .record-loading {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 300rpx;
		height: 300rpx;
		margin: -150rpx -150rpx;
		background: #262628;
		background: url("../../static/images/recording-loading.gif") no-repeat center;
		background-size: 100%;
		border-radius: 40rpx;
	}

	.chatInterface .img-layer {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000000;
		z-index: 9999;
		padding: 6rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.chatInterface .img-layer uni-image {
		height: 100% !important;
	}

	.chatInterface .img-layer {
		height: 100% !important;
		width: 100% !important;
	}


	.chatInterface .content .file-content .file-info {
		height: 0.5rem;
		width: 1.5rem;
		display: flex;
		flex-direction: column;
		padding: 0 0.1rem;
	}

	.chatInterface .content .file-content .file-info .title {
		height: 0.3rem;
		line-height: 0.3rem;
		overflow: hidden;
		font-size: 0.16rem;
		padding: 0;
		white-space: nowrap;
		text-overflow: ellipsis;
		word-break: break-all;
		color: #262628;
		text-align: left;
	}

	.chatInterface .content .file-content .file-info .size {
		font-size: 0.14rem;
		height: 0.2rem;
		line-height: 0.2rem;
		padding: 0;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		color: #999999;
		text-align: left;
	}

	.chatInterface .video-snapshot {
		position: relative;
		height: 300rpx;
		max-width: 400rpx;
		background: #000000;
	}

	.chatInterface .video-snapshot image {
		max-height: 300rpx;
		max-width: 400rpx;
	}

	.chatInterface .video-snapshot video {
		max-height: 300rpx;
		max-width: 400rpx;
	}

	.chatInterface .video-snapshot .video-play-icon {
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		border-radius: 20rpx;
		background: url("../../static/images/play.png") no-repeat center;
		background-size: 100%;
		top: 50%;
		left: 50%;
		margin: -20rpx;
	}

	.chatInterface .group-icon {
		right: 20rpx;
		width: 60rpx;
		height: 60rpx;
		top: 14rpx;
		position: fixed;
		right: 20rpx;
		top: 120rpx;
		background-color: #C4C4C4;
		z-index: 2;
		border-radius: 60rpx;
	}

	.uni-toast {
		background-color: #ffffff !important;
	}

	.time-lag {
		font-size: 20rpx;
		text-align: center;
	}

	.chatInterface .custom-message {
		width: 400rpx;
		height: 260rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: flex-start;
		box-sizing: border-box;
		padding: 10rpx 30rpx;
		border: 1px solid rgba(0, 0, 0, 0.05);
		box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
		border-radius: 20rpx;
	}

	.chatInterface .custom-message .title {
		width: 100%;
		display: flex;
		align-items: center;
		font-size: 30rpx;
	}

	.chatInterface .custom-message .title image {
		width: 40rpx;
		height: 40rpx;
	}

	.chatInterface .custom-message .custom-message-item {
		text-align: left;
		font-size: 28rpx;
		overflow: hidden;
		width: 100%;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
