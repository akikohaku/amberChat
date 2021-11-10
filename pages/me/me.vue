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
		<view class="me-menu">
			<view class="me-menu-item" @click="toprofile()">编辑个人资料</view>
			<view class="me-menu-item" @click="toset()">聊天设置</view>
			<view class="me-menu-item" @click="tocontact()">问题反馈</view>
			<view class="me-menu-item red" @click="cleancache()">清除缓存</view>
			
			<!-- <view class="me-menu-item red">登出</view> -->
			<view class="me-menu-line"></view>
			<view class="me-menu-item" @click="login1()">id1</view>
			<view class="me-menu-item" @click="login2()">id2</view>
		</view>

				<hr/>
		<view>{{userID}}</view>
		<view>{{userName}}</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left-2">
				id
			</view>
			<view class="uni-input-wrapper">

				<input class="uni-input" v-model="userID" maxlength="30" placeholder="" />
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left-2">
				昵称
			</view>
			<view class="uni-input-wrapper">

				<input class="uni-input" v-model="userName" maxlength="10" placeholder="最大输入长度为10" />
			</view>
		</view>
		<view @click="connect()">连接</view>
		<view class="login" @click="setid()">设定id</view>
		<view class="login" @click="loginmain()">登录</view>
	</view>
</template>

<script>
	var jweixin = require('../../static/jweixin.js')
	import IMService from "../../lib/imservice";
	export default {
		data() {
			return {
				userID: '',
				userName: '',
				avatarUrl: '',
				codeurl: '',
				code: '',
				accessToken: '',
				openid: '',
				username: '',
				headImage: '',
				

			}
		},
		onReady() {
			let that = this;
			that.userID = getApp().globalData.userID;
			that.userName = getApp().globalData.userName;
			that.avatarUrl = getApp().globalData.avaterUrl;
		},
		onload(){
			
		},
		onShow() {
			if(!getApp().globalData.islogin){
				this.loginmain();
			}
			
			let that = this;
			that.userID = getApp().globalData.userID;
			that.userName = getApp().globalData.userName;
			that.avatarUrl = getApp().globalData.avaterUrl;
		},
		methods: {
			toset() {
				uni.navigateTo({
					url: '/pages/me/setting/setting'
				});
			},
			tocontact(){
				uni.navigateTo({
					url: '/pages/me/report/report'
				});
			},
			setid() {
				let that = this;
				if (that.userID != "" && that.userName != "") {
					getApp().globalData.userID = that.userID;
					getApp().globalData.userName = that.userName;
					getApp().globalData.avaterUrl = '/static/images/Avatar-1.png';
					that.userID = getApp().globalData.userID;
				}

			},
			connect() {
				if (this.goEasy.getConnectionStatus() === 'disconnected') {
					getApp().globalData.imService = new IMService(this.goEasy, this.GoEasy);
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
			},
			toprofile() {
				uni.navigateTo({
					url: '/pages/me/editprofile/editprofile'
				});
			},
			login1() {
				let that = this;
				getApp().globalData.userID = "08c0a6ec-a42b";
				getApp().globalData.userName = 'Mattie';
				getApp().globalData.avaterUrl = '/static/images/Avatar-1.png';
				that.userID = getApp().globalData.userID;

			},
			login2() {
				let that = this;
				getApp().globalData.userID = '3bb179af-bcc5';
				getApp().globalData.userName = 'Wallace';
				getApp().globalData.avaterUrl = '/static/images/Avatar-2.png';
				that.userID = getApp().globalData.userID;
			},
			getCode() {
				this.code = '';
				let origin =
				'https://chat.nanju.work/#/pages/me/me'; //网页授权的回调域名，这里设置的是本地端口
				let urlNow = encodeURIComponent(origin); //处理域名
				let scope = "snsapi_userinfo"; //弹框显示授权
				let appid = "";
				this.code = this.codeurl;
				// 截取code
				if (this.code == null || this.code === '') { //未授权qu授权
					let url =
						`https://open.weixin.qq.com/connect/oauth2/authorize?
							appid=${appid}&redirect_uri=${urlNow}&
							response_type=code&scope=${scope}&
							state=123#wechat_redirect`;
					window.location.href = url;
				}
			},
			getUrlCode() { // 截取url中的code方法
				var url = location.search;
				var theRequest = new Object();
				if (url.indexOf("?") != -1) {
					var str = url.substr(1);
					var strs = str.split("&");
					for (var i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
					}
				}
				return theRequest;
			},


			codecreated() {
				this.codeurl = this.getUrlCode().code; //获取code
				this.getCode();
			},
			cleancache(){
				uni.showModal({
					title:"不好！",
					content: "您似乎是要清除缓存\n这合理吗？",
					confirmText: "合理！",
					cancelText:"不对！",
					success: function(res) {
						if (res.confirm) {
							uni.clearStorage();
							uni.showToast({
								title: "EXEC_CLEAN"
							})
						}
					}
				})
				
			},
			loginmain() {
				let ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
					console.log("检测到微信浏览器");
					var openid=uni.getStorageSync('openid');
					console.log(openid);
					console.log(openid.data);
					console.log(openid.id);
					if(openid.id==undefined){
						this.codecreated();
						var url = "https://wechat.api.kohaku.xin:11731/weixinlogin?code=" + this.code;
						let that = this;
						uni.request({
							url: url,
							success(res) {
								console.log("请求到了", res);
								
								getApp().globalData.userID = res.data.data.openid;
								getApp().globalData.avaterUrl = res.data.data.headimgurl;
								getApp().globalData.userName = res.data.data.nickname;
								uni.setStorageSync('openid', {
									id:res.data.data.openid,
									name:res.data.data.nickname,
									avatar:res.data.data.headimgurl
									});
								// console.log("用户id", useropenId);
								// console.log("用户头像", avatarUrl);
								// console.log("用户名称", username);
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
												getApp().globalData.bematch = res.data.bematch;
												getApp().globalData.besendmatch=res.data.besendmatch;
												getApp().globalData.besendmessage=res.data.besendmessage;
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
												getApp().globalData.islogin=true;
												if (getApp().globalData.pre === '[]') {
													uni.showModal({
														title:"哇哦！",
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
							}
						})
					}else{
						getApp().globalData.userID=openid.id;
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
										getApp().globalData.bematch = res.data.bematch;
										getApp().globalData.besendmatch=res.data.besendmatch;
										getApp().globalData.besendmessage=res.data.besendmessage
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
												title:"哇哦！",
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
					}
					
				} else {
					// uni.showModal({
					// 	title:"啊哦？",
					// 	content: "只支持在微信登录哟",
					// 	showCancel: false,
					// 	confirmText: "好吧qwq",
					// 	success: function(res) {
					// 	}
					// })
					// return;
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
									getApp().globalData.bematch = res.data.bematch;
									getApp().globalData.besendmatch=res.data.besendmatch;
									getApp().globalData.besendmessage=res.data.besendmessage
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
											title:"哇哦！",
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
				}

			}
		}
	}
</script>

<style>
	
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
		margin-left: 45px;
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

	.me-menu {
		margin-top: 20px;
	}

	.me-menu-item {
		padding-top: 11px;
		padding-left: 20px;
		padding-bottom: 9px;
		font-size: 17px;
	}

	.me-menu-item::before {
		content: '';
		height: 1px;
		width: 100vw;
		position: absolute;
		left: 0px;
		margin-top: -8px;
		background-color: #00000011;
	}

	.me-menu-line {
		content: '';
		height: 1px;
		width: 100vw;
		background-color: #00000011;
	}

	.red {
		color: red;
	}

	.login {
		width: 100vw;
		height: 50px;
		/* position: absolute; */
		/* bo.loginttom: 0rpx; */
		text-align: center;
		padding-top: 10px;
		font-size: 60rpx;
		background-color: orange;
		color: white;

	}
</style>
