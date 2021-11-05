<template>
    <scroll-view class="conversations" scroll-y="true">
		<view v-if="conversations.length !=0">
			<view class="scroll-item" v-for="(conversation, key) in conversations" :key="key" @click="navigateToChat(conversation)">
				<view class="item-head">
					<image :src="conversation.data.avatar" class="head-icon"></image>
					<view class="item-head_unread" v-if="conversation.unread">{{conversation.unread}}</view>
				</view>
				<view class="scroll-item_info">
					<view class="item-info-top">
						<text class="item-info-top_name">{{conversation.data.name}}</text>
						<view class="item-info-top_time">{{formatDate(conversation.lastMessage.timestamp)}}</view>
					</view>
					<view class="item-info-bottom">
						<view class="item-info-bottom-item" >
							<view class="item-info-top_content" v-if="conversation.lastMessage.type == 'text'">{{conversation.lastMessage.payload.text}}</view>
							<view class="item-info-top_content" v-else-if="conversation.lastMessage.type == 'video'">[视频消息]</view>
							<view class="item-info-top_content" v-else-if="conversation.lastMessage.type == 'audio'">[语音消息]</view>
							<view class="item-info-top_content" v-else-if="conversation.lastMessage.type == 'image'">[图片消息]</view>
							<view class="item-info-top_content" v-else-if="conversation.lastMessage.type == 'file'">[文件消息]</view>
							<view class="item-info-top_content" v-else-if="conversation.lastMessage.type == 'order'">[自定义消息:订单]</view>
							<view class="item-info-top_content" v-else>[[未识别内容]]</view>
							<view class="item-info-bottom_action" @click.stop="showAction(conversation)"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="no-conversation" v-else>
			当前没有会话
		</view>
		<view class="action-container" v-if="action.show">
			<view class="layer" @click="action.show = false"></view>
			<view class="action-box">
				<view class="action-item" @click="topConversation">{{action.conversation.top ? '取消置顶' : '置顶聊天'}}</view>
				<view class="action-item" @click="removeConversation">删除聊天</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import IMService from "../../lib/imservice.js";
	export default {
		name: "contacts",
		data () {
			return {
				unreadTotal : 0,
				conversations : [],
				action : {
					conversation : null,
					show : false
				}
			}
		},
		onShow () {
			let currentUser = uni.getStorageSync('currentUser');
			if(!currentUser){
				uni.switchTab({
						url:"/pages/me/me"
				})
				return;
			}
			if(this.goEasy.getConnectionStatus() === 'disconnected') {
				getApp().globalData.imService= new IMService(this.goEasy,this.GoEasy);
				getApp().globalData.imService.connect(currentUser);
			}
			uni.showLoading();
			//监听会话列表变化
			let self = this;
			this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, (content) => {
				self.renderConversations(content);
			});
			//加载会话列表
			this.goEasy.im.latestConversations({
				onSuccess: function (result) {
					let content = result.content;
					self.renderConversations(content);
					uni.hideLoading();
				},
				onFailed: function (error) {
					//获取失败
					uni.hideLoading()
					console.log("失败获取最新会话列表, code:" + error.code + " content:" + error.content);
				}
			});
		},
		onTabItemTap(){
			let currentUser = uni.getStorageSync('currentUser');
			if(!currentUser){
				uni.switchTab({
						url:"/pages/me/me"
				})
				return;
			}
			if(this.goEasy.getConnectionStatus() === 'disconnected') {
				getApp().globalData.imService= new IMService(this.goEasy,this.GoEasy);
				getApp().globalData.imService.connect(currentUser);
			}
			uni.showLoading();
			//监听会话列表变化
			
			let self = this;
			this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, (content) => {
				self.renderConversations(content);
			});
			//加载会话列表
			this.goEasy.im.latestConversations({
				onSuccess: function (result) {
					let content = result.content;
					self.renderConversations(content);
					uni.hideLoading();
					console.log(content);
				},
				onFailed: function (error) {
					//获取失败
					uni.hideLoading()
					console.log("失败获取最新会话列表, code:" + error.code + " content:" + error.content);
				}
			});
		},
		onReady() {
			var openid = uni.getStorageSync('openid');
			if (openid.id != undefined) {
				getApp().globalData.userID = openid.id;
				let that = this;
				uni.request({
					method: 'GET',
					url: 'https://wechat.api.kohaku.xin:11731/login',
					data: {
						openID: getApp().globalData.userID,
						username: getApp().globalData.userName,
						avater: getApp().globalData.avaterUrl
					},
		
					success(res) {
						// console.log(res.data.token);
						// getApp().globalData.token=res.data.token;
						uni.request({
							method: 'GET',
							url: 'https://wechat.api.kohaku.xin:11731/getprofile',
							data: {
								openid: getApp().globalData.userID
							},
		
							success(res) {
								console.log(res);
		
								getApp().globalData.userName = res.data.name;
								getApp().globalData.avaterUrl = res.data.avatar;
								getApp().globalData.sex = res.data.sex;
								getApp().globalData.pre = res.data.pre;
								getApp().globalData.tosex = res.data.tosex;
								that.userName = getApp().globalData.userName;
								that.avatarUrl = getApp().globalData.avaterUrl;
								if (that.goEasy.getConnectionStatus() === 'disconnected') {
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
								}
								if (getApp().globalData.pre === '[]') {
									uni.showModal({
										title: "哇哦！",
										content: "看来您是首次登录匿名聊天\n先来设置个人资料吧",
										showCancel: false,
										confirmText: "好耶！",
										success: function(res) {
											if (res.confirm) {
												uni.navigateTo({
													url: '/pages/me/editprofile/editprofile'
												});
											}
										}
									})
								}
								// getApp().globalData.token=res.data.token;
		
							}
						})
		
					}
				})
			} else {
				uni.showModal({
					title: "等等！",
					content: "您还没有登录吧？",
					confirmText: "这就去！",
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							uni.switchTab({
								url: '/pages/me/me'
							});
							return;
						}
					}
				})
			}
		},
		methods : {
			topConversation() {
				uni.showLoading({
					title:"加载中...",
					mask: true
				});
				let conversation = this.action.conversation;
				let failedDescription = conversation.top ? '取消置顶失败' : '置顶失败';
				this.action.show = false;
				if(conversation.type === this.GoEasy.IM_SCENE.PRIVATE){
					this.goEasy.im.topPrivateConversation({
						userId: conversation.userId,
						top: !conversation.top,
						onSuccess: function () {
							uni.hideLoading();
						},
						onFailed: function (error) {
							uni.hideLoading();
							uni.showToast({
								title: failedDescription,
								icon: "none"
							});
							console.log(error);
						}
					});
				}else {
					this.goEasy.im.topGroupConversation({
						groupId: conversation.groupId,
						top: !conversation.top,
						onSuccess: function () {
							uni.hideLoading();
						},
						onFailed: function (error) {
							uni.hideLoading();
							uni.showToast({
								title: failedDescription,
								icon: "none"
							});
							console.log(error);
						}
					});
				}
			},
			removeConversation() {
				uni.showModal({
					title: "等等！",
					content: "这一去便是永别\n您想好了吗？",
					confirmText: "是的！",
					cancelText: "不对！",
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title:"加载中...",
								mask: true
							});
							let failedDescription = "删除失败";
							let conversation = this.action.conversation;
							this.action.show = false;
							if(conversation.type === this.GoEasy.IM_SCENE.PRIVATE){
								this.goEasy.im.removePrivateConversation({
									userId: conversation.userId,
									onSuccess: function () {
										uni.hideLoading();
									},
									onFailed: function (error) {
										uni.hideLoading();
										uni.showToast({
											title: failedDescription,
											icon: "none"
										});
										console.log(error);
									}
								});
							}else {
								this.goEasy.im.removeGroupConversation({
									groupId: conversation.groupId,
									onSuccess: function () {
										uni.hideLoading()
									},
									onFailed: function (error) {
										uni.hideLoading();
										uni.showToast({
											title: failedDescription,
											icon: "none"
										});
										console.log(error);
									}
								});
							}
						} 
					}
				})
				
			},
			renderConversations(content){
				this.conversations = content.conversations || [];
				let unreadTotal = content.unreadTotal;
				console.log(this.conversations);
				this.setUnreadAmount(unreadTotal);
			},
			setUnreadAmount (unreadTotal) {
				this.unreadTotal = unreadTotal;
				if(this.unreadTotal > 0) {
					uni.setTabBarBadge({
						index: 1,
						text: this.unreadTotal.toString()
					});
				}else{
					uni.removeTabBarBadge({
						index: 1
					});
				}
			},
			navigateToChat (conversation) {
				let path = '/pages/privateChat/privateChat?to=' + conversation.userId

				uni.navigateTo({
					url: path
				});
			},
			showAction (conversation) {
				this.action.conversation = conversation;
				this.action.show = true;
			}
		}
	}
</script>

<style>
	page{ height: 100%; }
	.conversations{
		width: 750rpx;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		height: 100%;
	}
	.conversations .scroll-item{
		height: 152rpx;
		display: flex;
		align-items: center;
		padding-left: 32rpx;
	}
	.conversations .scroll-item .head-icon{
		width:100rpx;
		height: 100rpx;
		margin-right: 28rpx;
	}
	.conversations .scroll-item_info{
		height: 151rpx;
		width: 590rpx;
		padding-right: 32rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #EFEFEF;
	}
	.conversations .scroll-item_info .item-info-top{
		padding-top: 20rpx;
		height: 60rpx;
		line-height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
	}
	.conversations .item-info-top_name{
		font-size: 34rpx;
		color: #262628;
	}
	.conversations .item-info-top_time{
		font-size: 26rpx;
		color: rgba(179, 179, 179, 0.8);
		font-family: Source Han Sans CN;
	}
	.conversations .item-info-bottom{
		height: 40rpx;
		line-height: 40rpx;
		overflow: hidden;
	}
	.conversations .item-info-bottom-item{
		display: flex;
		justify-content: space-between;
	}
	.item-info-bottom .item-info-top_content{
		font-size: 30rpx;
		color: #b3b3b3;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		
	}

	.item-info-bottom .item-info-bottom_action{
		width:50rpx;
		height: 50rpx;
		font-size: 20rpx;
		background: url("../../static/images/action.png") no-repeat center;
		background-size: 28rpx 30rpx;
	}
	.no-conversation{
		width: 100%;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #9D9D9D;
	}
	.item-head{
		position: relative;
	}
	.item-head .item-head_unread{
		padding: 6rpx;
		background-color: #EE593C;
		color: #FFFFFF;
		font-size: 24rpx;
		line-height: 28rpx;
		border-radius: 24rpx;
		min-width: 24rpx;
		min-height: 24rpx;
		text-align: center;
		position: absolute;
		top:0;
		right: 15rpx;
	}
	.action-container{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.action-container .layer{
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(51, 51, 51, 0.5);
		width: 100%;
		height: 100%;
		z-index: 99;
	}
	.action-box{
		width: 400rpx;
		height: 240rpx;
		background: #ffffff;
		position: relative;
		z-index: 100;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.action-item{
		text-align: center;
		line-height: 120rpx;
		font-size: 34rpx;
		color: #262628;
		border-bottom: 1px solid #EFEFEF;

	}
</style>
