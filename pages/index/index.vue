<template>
	<view class="content" @touchmove.stop.prevent="moveHandle">
		<view class="star-box">
			<view class='star twinkle-star-1'></view>
			<view class='star twinkle-star-2'></view>
			<view class='star twinkle-star-3'></view>
			<view class='star twinkle-star-4'></view>
			<view class='star twinkle-star-5'></view>
			<view class='star twinkle-star-6'></view>
			<view class='star twinkle-star-7'></view>
			<view class='star twinkle-star-8'></view>
			<view class='star twinkle-star-9'></view>
			<view class="line line-1"></view>
			<view class="line line-2"></view>
			<view class="line line-3"></view>
			<view class="line line-4"></view>
			<view class="line line-5"></view>
			<view class="line line-6"></view>
			<view class="line line-7"></view>
			<view class="line line-8"></view>
			<view class="line line-9"></view>
		</view>
		<view class="matching">
			<view class="matching-circle" ref='matchingcircle'></view>
			<view class="mfx-main">
				<view class="mfz" ref="mfz">
					<view class="r1"></view>
					<view class="r2"></view>

					<view class="z1"></view>
					<view class="z2"></view>
				</view>

				<view class="mfz1" ref="mfz2">
					<view class="r3"></view>
					<view class="r4"></view>

					<view class="z3"></view>
					<view class="z4"></view>
				</view>
			</view>

		</view>
		<view class="match-friendimg">
			<image :src="avatar" @click="chatClick()" ref="matchfriendimg"></image>
		</view>
		<view class="match-info" ref="matchinfo">轻触头像进入聊天</view>
		<view class="button-start" @click="matchClick()">
			<view class="button-block" ref='buttonstart'></view>
			<view class="button-block-3" ref='buttonstart3'></view>
			<view class="button-1" ref='buttoncontent1'>
				开始
			</view>
			<view class="button-2" ref='buttoncontent2'>
				匹配
			</view>
			<view class="button-onprocess" ref='buttoncontent3'>
				取消匹配
			</view>
			<view class="button-block-2" ref='buttonstart2'></view>
			<view class="button-block-4" ref='buttonstart4'></view>
			<view class="button-block-5" ref='buttonstart5'></view>
			<view class="button-wait" ref='buttonwait'></view>
		</view>
	</view>
</template>

<script>
	import IMService from "../../lib/imservice";
	export default {
		data() {
			return {
				title: 'Hello',
				avatar: '',
				isclicked: false,
				toid: '',
				isconform: false
			}
		},
		onLoad() {

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
								getApp().globalData.bematch = res.data.bematch;
								getApp().globalData.besendmatch=res.data.besendmatch;
								getApp().globalData.besendmessage=res.data.besendmessage
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
		onshow() {
			this.isconform = false;
			if (this.goEasy.getConnectionStatus() === 'disconnected') {
				getApp().globalData.imService = new IMService(this.goEasy, this.GoEasy);
				getApp().globalData.imService.connect(getApp().globalData.userID);
			}
			if (!getApp().globalData.islogin) {
				uni.showToast({
					title: "未登录",
					icon: 'error'
				})
				uni.switchTab({
					url: '/pages/me/me'
				});
			}
		},
		methods: {
			chatClick() {
				let that = this;

				that.$refs.mfz.$el.style.display = 'none';
				that.$refs.mfz2.$el.style.display = 'none';
				that.$refs.buttoncontent3.$el.style.height = '0px';
				that.$refs.buttonwait.$el.style.opacity = '0';
				that.$refs.buttonstart.$el.style.width = '40px';
				that.$refs.buttonstart3.$el.style.height = '40px';
				that.$refs.buttonstart2.$el.style.height = '45px';
				that.$refs.buttonstart2.$el.style.margin =
					'65px 0 0 255px';
				that.$refs.buttonstart4.$el.style.width = '45px';
				that.$refs.buttonstart4.$el.style.margin =
					'105px 0 0 215px';
				that.$refs.buttonstart5.$el.style.width = '40px';
				that.$refs.buttoncontent1.$el.style.width = '50px';
				that.$refs.buttoncontent2.$el.style.height = '110px';
				that.$refs.matchingcircle.$el.style.opacity = '0';
				that.$refs.matchfriendimg.$el.style.opacity = '0';
				that.$refs.matchinfo.$el.style.opacity = '0';
				that.isclicked = false;
				if (this.toid != '') {
					this.enterChat(this.toid);
				}

			},
			enterChat(uuid) { //进入私聊
				let path = '/pages/privateChat/privateChat?to=' + uuid;
				uni.request({
					method: 'GET',
					url: 'https://wechat.api.kohaku.xin:11731/startchat',
					data: {
						openid: getApp().globalData.userID,
						toopenid: uuid
					},
					success(res) {
						uni.request({
							method:'GET',
							url:'https://wechat.api.kohaku.xin:11731/Weixinhuifu',
							data:{
								openid:uuid
							},
							success(res){
								
							}
						})
						uni.navigateTo({
							url: path
						})
					}
				})

			},
			matchClick() {
				this.isconform = false;
				if (this.goEasy.getConnectionStatus() === 'disconnected') {
					uni.switchTab({
						url: 'pages/me/me'
					});
					return;
				}
				if (getApp().globalData.userID == '') {
					uni.showModal({
						title:"欸？",
						content: "您好像还没有登录？！",
						confirmText: "啊这",
						showCancel:false,
						success: function(res) {
							
						}
					})
					uni.switchTab({
						url: '/pages/me/me'
					});
					return;
				}
				if (getApp().globalData.pre == '[]') {
					uni.showModal({
						title:"欸？",
						content: "您好像还没有设置爱好？",
						confirmText: "啊这",
						showCancel:false,
						success: function(res) {
							
						}
					})
					uni.switchTab({
						url: '/pages/me/me'
					});
					return;
				}
				if (getApp().globalData.sex == 'u') {
					uni.showModal({
						title:"欸？",
						content: "您好像还没有设置性别？",
						confirmText: "啊这",
						showCancel:false,
						success: function(res) {
							
						}
					})
					uni.switchTab({
						url: '/pages/me/me'
					});
					return;
				}
				var openid = uni.getStorageSync('openid');
				let that = this;
				if (!this.isclicked) {
					if (openid.name == getApp().globalData.userName || openid.avatar == getApp().globalData.avaterUrl) {
						uni.showModal({
							title: "等等！",
							content: "您似乎使用的是微信的昵称或头像\n这值得吗？",
							confirmText: "这就改掉！",
							cancelText: "值得！",
							success: function(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/me/editprofile/editprofile'
									});
									that.isconform = true;

								} else {
									that.isconform = false;
									that.match();
								}
							}
						})
					}else{
						that.match();
					}
				}else{
					this.match();
				}

			},
			match() {
				if (!this.isclicked && !this.isconform) {
					console.log("clicked");
					console.log(this.goEasy.getConnectionStatus());
					uni.request({
						method: 'GET',
						url: 'https://wechat.api.kohaku.xin:11731/startmatch',
						data: {
							openid: getApp().globalData.userID,
						},
						success(res) {
							console.log(res);
						}
					})
					this.$refs.buttonstart.$el.style.width = '270px';
					this.$refs.buttonstart3.$el.style.height = '120px';
					this.$refs.buttonstart2.$el.style.height = '120px';
					this.$refs.buttonstart2.$el.style.margin = '-10px 0 0 255px';
					this.$refs.buttonstart4.$el.style.width = '270px';
					this.$refs.buttonstart4.$el.style.margin = '105px 0 0 -10px';
					this.$refs.buttonstart5.$el.style.width = '0px';
					this.$refs.buttoncontent1.$el.style.width = '0px';
					this.$refs.buttoncontent2.$el.style.height = '0px';
					this.$refs.matchingcircle.$el.style.opacity = '100';
					this.$refs.mfz.$el.style.display = 'block';
					this.$refs.mfz2.$el.style.display = 'block';
					setTimeout(() => {
						if (this.isclicked && !this.isconform) {
							this.$refs.buttoncontent3.$el.style.height = '100px';
							this.$refs.buttonwait.$el.style.opacity = '100';
						}
					}, 400)
					setTimeout(() => {
						let that = this;
						if (this.isclicked && !this.isconform) {
							uni.request({
								method: 'GET',
								url: 'https://wechat.api.kohaku.xin:11731/match',
								data: {
									openid: getApp().globalData.userID
								},
								success(res) {
									console.log(res);
									var friendid = res.data.uuid;
									that.toid = friendid;
									if (res.data.uuid != '') {
										uni.request({
											method: 'GET',
											url: 'https://wechat.api.kohaku.xin:11731/getuserbyid',
											data: {
												openID: friendid,
											},

											success(res) {
												if (that.isclicked && !that.isconform) {
													console.log(res.data);
													that.avatar = res.data.avater;
													that.$refs.matchfriendimg.$el.style.opacity =
														'100';
													that.$refs.matchinfo.$el.style.opacity = '100';
													that.$refs.buttonwait.$el.style.opacity = '0';
												}

											}
										})
									} else {
										//匹配失败
										uni.showModal({
											title: "诶？",
											content: "匹配失败了\n好像是这样的？",
											showCancel: false,
											confirmText: "(´；ω；｀)",
											success: function(res) {
												uni.request({
													method: 'GET',
													url: 'https://wechat.api.kohaku.xin:11731/stopmatch',
													data: {
														openid: getApp().globalData.userID,
													},
													success(res) {
														console.log(res);
													}
												})
												this.$refs.buttoncontent3.$el.style.height = '0px';
												this.$refs.buttonwait.$el.style.opacity = '0';
												setTimeout(() => {
													
														this.$refs.mfz.$el.style.display = 'none';
														this.$refs.mfz2.$el.style.display = 'none';
														this.$refs.buttonstart.$el.style.width = '40px';
														this.$refs.buttonstart3.$el.style.height = '40px';
														this.$refs.buttonstart2.$el.style.height = '45px';
														this.$refs.buttonstart2.$el.style.margin = '65px 0 0 255px';
														this.$refs.buttonstart4.$el.style.width = '45px';
														this.$refs.buttonstart4.$el.style.margin = '105px 0 0 215px';
														this.$refs.buttonstart5.$el.style.width = '40px';
														this.$refs.buttoncontent1.$el.style.width = '50px';
														this.$refs.buttoncontent2.$el.style.height = '110px';
														this.$refs.matchingcircle.$el.style.opacity = '0';
														this.$refs.matchfriendimg.$el.style.opacity = '0';
														this.$refs.matchinfo.$el.style.opacity = '0';
													
												}, 400)
												this.isclicked = false;
											}
										})
									}

								}
							})
						}




					}, 6000)
					this.isclicked = true;
				} else {
					uni.request({
						method: 'GET',
						url: 'https://wechat.api.kohaku.xin:11731/stopmatch',
						data: {
							openid: getApp().globalData.userID,
						},
						success(res) {
							console.log(res);
						}
					})
					this.$refs.buttoncontent3.$el.style.height = '0px';
					this.$refs.buttonwait.$el.style.opacity = '0';
					setTimeout(() => {
						if (!this.isclicked && !this.isconform) {
							this.$refs.mfz.$el.style.display = 'none';
							this.$refs.mfz2.$el.style.display = 'none';
							this.$refs.buttonstart.$el.style.width = '40px';
							this.$refs.buttonstart3.$el.style.height = '40px';
							this.$refs.buttonstart2.$el.style.height = '45px';
							this.$refs.buttonstart2.$el.style.margin = '65px 0 0 255px';
							this.$refs.buttonstart4.$el.style.width = '45px';
							this.$refs.buttonstart4.$el.style.margin = '105px 0 0 215px';
							this.$refs.buttonstart5.$el.style.width = '40px';
							this.$refs.buttoncontent1.$el.style.width = '50px';
							this.$refs.buttoncontent2.$el.style.height = '110px';
							this.$refs.matchingcircle.$el.style.opacity = '0';
							this.$refs.matchfriendimg.$el.style.opacity = '0';
							this.$refs.matchinfo.$el.style.opacity = '0';
						}
					}, 400)
					this.isclicked = false;
				}
			},
			moveHandle() {}
		}
	}
</script>

<style>
	@font-face {
		font-family: 'Source Han Serif CN Light';
		src: url(../../static/lite.css);
	}

	.match-friendimg {

		width: 100vw;
		height: 80px;
		position: absolute;

	}

	.match-friendimg image {
		opacity: 0;
		display: inline-flex;
		margin-top: 190px;
		width: 80px;
		height: 80px;
		border: 1px solid #ffffff99;
		transition: all .5s ease-in-out;
		border-radius: 40px;
	}

	.match-info {
		opacity: 0;
		/* display: inline-flex; */
		position: absolute;
		color: white;
		width: 100vw;
		margin-top: 390px;
		text-align: center;
		transition: all .5s ease-in-out;
		animation: textsw 3s alternate infinite ease-in-out;
	}

	@keyframes textsw {
		0% {
			color: #ffffff;
		}

		50% {
			color: #ffffff99;
		}

		100% {
			color: #FFFFFF;
		}
	}

	.content {
		width: 100vw;
		height: 100vh;
		background-color: black;
		background-image: url(https://pic.kohaku.xin/images/2021/11/10/_18624a9941d20d9a81b65e201b54999f_73587.jpg);
		background-size: 100% auto;
		background-repeat: no-repeat;
		text-align: center;
	}

	.button-start {
		margin: 65vh auto;
		width: 250px;

		height: 100px;
		display: inline-flex;
		transition: all .5s ease-in-out;
	}

	.matching-circle {
		display: none;
		opacity: 0;
		content: '';
		width: 100px;
		height: 100px;
		border: 4rpx solid #007AFF;
		position: absolute;
		border-radius: 50px;
		margin-top: 175px;
		margin-left: -50px;


		transition: all 0.5s ease-in-out;
		animation: circleborder 5s alternate infinite;
	}

	@keyframes circleborder {
		0% {}

		50% {
			box-shadow: 0px 0px 20px white;
		}

		100% {}
	}

	.button-wait {
		content: '';
		width: 20px;
		height: 2px;
		background-color: white;
		opacity: 0;
		position: absolute;
		margin-top: 90px;
		margin-left: 20px;
		transition: all 0.5s ease-in-out;
		animation: wait 3s alternate infinite ease-in-out;
	}

	@keyframes wait {
		0% {
			margin-left: 20px;
		}

		50% {
			width: 50px;
		}

		100% {
			margin-left: 210px;
		}
	}

	/* 	.button-start:hover > .button-block{
		width: 540rpx;
	}
	.button-start:hover > .button-block::before{
		height: 240rpx;
	}
	.button-start:hover > .button-block-2::before{
		width: 540rpx;
		margin-left: -530rpx;
		margin-top: 230rpx;
	}
	.button-start:hover > .button-block-2{
		height: 240rpx;
		margin-top: -20rpx;
	} */

	/* 	.button-start::before{
		content: '';
		background-color: white;
		height: 5rpx;
		width: 80rpx;
		position: absolute;
		margin-left: 25rpx;
		margin-top: 100rpx;
		transition: all .5s ease-in-out;
	} */
	.button-block-5 {
		content: '';
		background-color: white;
		height: 2px;
		width: 40px;
		position: absolute;
		margin-left: 17px;
		margin-top: 50px;
		transition: all .5s ease-in-out;
	}

	.button-block {
		content: '';
		background-color: white;
		height: 2px;
		width: 45px;
		position: absolute;
		margin-top: -5px;
		margin-left: -10px;
		transition: all .5s ease-in-out;
	}

	.button-block-3 {
		content: '';
		background-color: white;
		height: 45px;
		width: 2px;
		position: absolute;
		margin-top: -10px;
		margin-left: -5px;
		transition: all .5s ease-in-out;
	}

	.button-block-2 {
		content: '';
		background-color: white;
		height: 40px;
		width: 2px;
		position: absolute;
		margin-left: 255px;
		margin-top: 70px;
		transition: all .5s ease-in-out;
	}

	.button-block-4 {
		content: '';
		background-color: white;
		height: 2px;
		width: 40px;
		position: absolute;
		margin-left: 220px;
		margin-top: 105px;
		transition: all .5s ease-in-out;
	}

	.button-1 {
		width: 50px;
		font-family: 'Source Han Serif CN Light';
		color: white;
		font-size: 35px;
		padding-left: 20px;
		line-height: 50px;
		overflow: hidden;
		text-align: left;
		transition: all .5s ease-in-out;
	}

	.button-2 {
		margin-top: -20px;
		margin-left: 55px;
		font-family: 'Source Han Serif CN Light';
		color: white;
		position: absolute;
		width: 250px;
		height: 110px;
		font-size: 90px;
		overflow: hidden;
		text-align: left;
		transition: all .5s ease-in-out;
	}

	.button-onprocess {
		margin-top: 5px;
		margin-left: 20px;
		font-family: 'Source Han Serif CN Light';
		color: white;
		position: absolute;
		width: 250px;
		height: 0px;
		font-size: 54px;
		overflow: hidden;
		text-align: left;
		transition: all .5s ease-in-out;
	}

	.star-box {
		width: 250px;
		height: 200px;
		position: absolute;
		margin: 90px auto;
	}

	/* star styling */

	.star {
		position: absolute;
		box-shadow: 0 0 3px #fff;
		border-radius: 50%;
	}

	.twinkle-star-1 {
		width: 4px;
		height: 5px;
		left: 30%;
		top: 64%;
		background: #a6b8ff;
		-webkit-animation: twinkle 0.5s alternate infinite;
		animation: twinkle 0.5s alternate infinite;
		-webkit-animation-delay: 1.61404s;
		animation-delay: 1.61404s;
	}

	.twinkle-star-2 {
		left: 3%;
		top: 65%;
		width: 4px;
		height: 4px;
		background: #f4ccbf;
		-webkit-animation: twinkle 0.5s alternate infinite;
		animation: twinkle 0.5s alternate infinite;
		-webkit-animation-delay: 4.09091s;
		animation-delay: 4.09091s;
	}

	.twinkle-star-3 {
		background: #aaccff;
		width: 3px;
		height: 3px;
		right: 27%;
		top: 32%;
		-webkit-animation: twinkle 0.75s alternate infinite;
		animation: twinkle 0.75s alternate infinite;
		-webkit-animation-delay: 1.77143s;
		animation-delay: 1.77143s;
	}

	.twinkle-star-4 {
		width: 7px;
		height: 7px;
		left: 70%;
		top: 46%;
		background: #ffc8ee;
		-webkit-animation: twinkle 0.5s alternate infinite;
		animation: twinkle 0.5s alternate infinite;
		-webkit-animation-delay: 1.55357s;
		animation-delay: 1.55357s;
	}

	.twinkle-star-5 {
		background: #a4aaff;
		width: 4px;
		height: 4px;
		left: 30.5%;
		top: 43.5%;
		-webkit-animation: twinkle 0.75s alternate infinite;
		animation: twinkle 0.75s alternate infinite;
		-webkit-animation-delay: 0.88462s;
		animation-delay: 0.88462s;
	}

	.twinkle-star-6 {
		background: #a6b8ff;
		width: 2px;
		height: 2px;
		right: 19.5%;
		top: 58.5%;
		-webkit-animation: twinkle 0.5s alternate infinite;
		animation: twinkle 0.5s alternate infinite;
		-webkit-animation-delay: 0.66s;
		animation-delay: 0.66s;
	}

	.twinkle-star-7 {
		background: #a6b8ff;
		width: 6px;
		height: 7px;
		right: 19%;
		top: 77%;
		-webkit-animation: twinkle 0.75s alternate infinite;
		animation: twinkle 0.75s alternate infinite;
		-webkit-animation-delay: 0.03279s;
		animation-delay: 0.03279s;
	}

	.twinkle-star-8 {
		background: #ffccaa;
		width: 3px;
		height: 3px;
		right: 10%;
		top: 20.5%;
		-webkit-animation: twinkle 0.5s alternate infinite;
		animation: twinkle 0.55s alternate infinite;
		-webkit-animation-delay: 1.77143s;
		animation-delay: 1.77143s;
	}

	.twinkle-star-9 {
		background: #ffaaff;
		width: 3px;
		height: 3px;
		right: 5%;
		top: 29%;
		-webkit-animation: twinkle 0.3s alternate infinite;
		animation: twinkle 0.3s alternate infinite;
		-webkit-animation-delay: 1.77143s;
		animation-delay: 1.77143s;
	}

	/* line styling */

	.line {
		width: 1px;
		height: 1px;
		position: absolute;
		background: rgba(246, 218, 230, 0.65);
		-webkit-animation: line 7s alternate infinite;
		animation: line 7s alternate infinite;
		-webkit-animation-delay: 1s;
		animation-delay: 1s;
	}

	.line-1 {
		height: 108px;
		transform: rotate(102deg);
		top: 44%;
		left: 55.5%;
	}

	.line-2 {
		height: 50px;
		transform: rotate(89deg);
		top: 52.5%;
		left: 16.5%;
	}

	.line-3 {
		height: 64px;
		transform: rotate(58deg);
		top: 39%;
		left: 17%;
	}

	.line-4 {
		height: 27px;
		transform: rotate(2deg);
		top: 48%;
		left: 30.5%;
	}

	.line-5 {
		height: 17px;
		transform: rotate(8deg);
		top: 35.5%;
		right: 28%;
	}

	.line-6 {
		height: 19px;
		transform: rotate(135deg);
		top: 49%;
		left: 75.5%;
	}

	.line-7 {
		height: 22px;
		transform: rotate(1deg);
		top: 62.5%;
		right: 19.5%;
	}

	.line-8 {
		height: 34px;
		transform: rotate(63deg);
		top: 17.5%;
		right: 19%;
	}

	.line-9 {
		height: 11px;
		transform: rotate(320deg);
		top: 22.5%;
		right: 7.5%;
	}

	/* the keyframes! */

	@keyframes twinkle {
		0% {
			opacity: .45;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes line {
		0% {
			opacity: .5;
		}

		20% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	.mfx-main {
		position: absolute;
		margin-left: -190px;
		width: 500px;
		height: 500px;
		display: inline-flex;
	}

	.mfz>*,
	.mfz1>* {
		box-shadow: 0px 0px 8px #ffff00, 0px 0px 8px #ffff00 inset;
	}

	.mfz {
		display: none;
		position: absolute;
		top: 125px;
		left: 81px;
		opacity: 0.8;
		transform: scale(0.7);
	}

	.r1,
	.r2 {
		border: 3px solid #fff;
		border-radius: 100%;
		position: absolute;
	}

	.r1 {
		/* 小圆 */
		width: 300px;
		height: 300px;
		/* clip-path: polygon(x y,x y,x y....) */
		animation: r1 1s linear;
		-webkit-animation: r1 1s linear;
	}

	.r2 {
		width: 320px;
		height: 320px;
		top: -10px;
		left: -10px;
		transform: rotate(200deg);
		animation: r1 1s linear;
		-webkit-animation: r1 1s linear;
	}

	/* 正方形 */
	.z1,
	.z2 {
		width: 210px;
		height: 210px;
		border: 3px solid #fff;
		box-shadow: 0px 0px 8px #ffff00, 0px 0px 8px #ffff00 inset;
		position: absolute;
		left: 45px;
		top: 45px;
	}

	.z1 {
		/* 20-4   4/20*/
		/* clip-path: polygon(x y,x y,x y....) */
		animation: z1 3s ease-in-out;
		-webkit-animation: z1 3s ease-in-out;
	}

	.z2 {
		transform: rotate(45deg);
		/* 24-20   20/24*/
		animation: z2 4s ease-in-out;
		-webkit-animation: z2 4s ease-in-out;

	}

	@-webkit-keyframes changeright {

		0% {
			-webkit-transform: rotateZ(0deg);
		}

		50% {
			-webkit-transform: rotateZ(180deg);
		}

		100% {
			-webkit-transform: rotateZ(360deg);
		}
	}

	.mfz1 {
		position: absolute;
		display: none;
		top: 88px;
		left: 45px;
		opacity: 0.3;
		transform: scale(0.7);

		/* -webkit-animation:changeright 6s linear infinite; */
	}

	.r3,
	.r4 {
		border: 3px solid #fff;
		border-radius: 100%;
		position: absolute;
	}

	.r3 {
		/* 小圆 */
		width: 450px;
		height: 450px;
		top: -22px;
		left: -22px;
		/* clip-path: polygon(x y,x y,x y....) */
		animation: r1 1s linear;
		-webkit-animation: r1 1s linear;
	}

	.r4 {
		width: 480px;
		height: 480px;
		top: -36px;
		left: -36px;
		transform: rotate(200deg);
		animation: r1 1s linear;
		-webkit-animation: r1 1s linear;
	}

	/* 正方形 */
	.z3,
	.z4 {
		width: 315px;
		height: 315px;
		border: 3px solid #fff;
		position: absolute;
		left: 45px;
		top: 45px;
	}

	.z3 {
		/* 20-4   4/20*/
		/* clip-path: polygon(x y,x y,x y....) */
		animation: z1 3s ease-in-out;
		-webkit-animation: z1 3s ease-in-out;
	}

	.z4 {
		transform: rotate(45deg);
		/* 24-20   20/24*/
		animation: z2 4s ease-in-out;
		-webkit-animation: z2 4s ease-in-out;
	}

	@-webkit-keyframes r1 {
		0% {
			clip-path: polygon(50% 0%, 50% 0, 50% 0, 50% 0, 50% 0);
		}

		25% {
			clip-path: polygon(50% 0%, 100% 0, 100% 50%, 100% 50%, 100% 50%);
		}

		50% {
			clip-path: polygon(50% 0%, 100% 0, 100% 100%, 50% 100%, 50% 100%);
		}

		75% {
			clip-path: polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 50%);
		}

		100% {
			clip-path: polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 0);
		}
	}

	@keyframes r1 {
		0% {
			clip-path: polygon(50% 0%, 50% 0, 50% 0, 50% 0, 50% 0);
		}

		25% {
			clip-path: polygon(50% 0%, 100% 0, 100% 50%, 100% 50%, 100% 50%);
		}

		50% {
			clip-path: polygon(50% 0%, 100% 0, 100% 100%, 50% 100%, 50% 100%);
		}

		75% {
			clip-path: polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 50%);
		}

		100% {
			clip-path: polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 0);
		}
	}



	@keyframes z1 {
		0% {
			opacity: 0;
		}

		20% {
			opacity: 0;
		}

		20.1% {
			opacity: 1;
			clip-path: polygon(0 0, 0 0, 0 0);
		}

		30% {
			clip-path: polygon(0 0, 100% 0, 100% 2%);
		}

		40% {
			clip-path: polygon(100% 0, 100% 100%, 98% 100%);
		}

		50% {
			clip-path: polygon(100% 100%, 0 100%, 0 98%);
		}

		60% {
			clip-path: polygon(0 100%, 0 0%, 2% 0);
		}

		60.001% {
			clip-path: polygon(0 0, 0 0, 0 0, 0 0);
		}

		70% {
			clip-path: polygon(0 0, 100% 0, 100% 2%, 100% 2%);
		}

		80% {
			clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 100%);
		}

		90% {
			clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
		}

		100% {
			clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0);
		}
	}

	@-webkit-keyframes z1 {
		0% {
			opacity: 0;
		}

		20% {
			opacity: 0;
		}

		20.1% {
			opacity: 1;
			clip-path: polygon(0 0, 0 0, 0 0);
		}

		30% {
			clip-path: polygon(0 0, 100% 0, 100% 2%);
		}

		40% {
			clip-path: polygon(100% 0, 100% 100%, 98% 100%);
		}

		50% {
			clip-path: polygon(100% 100%, 0 100%, 0 98%);
		}

		60% {
			clip-path: polygon(0 100%, 0 0%, 2% 0);
		}

		60.001% {
			clip-path: polygon(0 0, 0 0, 0 0, 0 0);
		}

		70% {
			clip-path: polygon(0 0, 100% 0, 100% 2%, 100% 2%);
		}

		80% {
			clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 100%);
		}

		90% {
			clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
		}

		100% {
			clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0);
		}
	}


	@keyframes z2 {

		/* 20/24=0.833 */
		0% {
			opacity: 0;
		}

		83.5% {
			opacity: 0;
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(45deg);
		}
	}
</style>
