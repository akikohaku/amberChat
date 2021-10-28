<template>
	<view>
		<view @click="login()">登录</view>
	</view>
</template>

<script>
	var jweixin = require('../../static/jweixin.js')
	export default {
		data() {
			return {
				userID: '',
				userName: '',
				avatarUrl: ''
			}
		},
		onReady() {

		},
		methods: {
			login() {
				// let that=this;
				// console.log('login');

				//     uni.login({
				//     	 provider: 'weixin',
				//     	  success: function (loginRes) {
				//     	    console.log(loginRes.authResult);
				//     	  },
				// 		  fail:function(err){
				// 			  console.log(err);
				// 		  }
				//     	// success() {
				//     	// 	uni.getUserInfo({
				//     	// 	      provider: 'weixin',
				//     	// 	      success: function (infoRes) {
				//     	// 	        console.log('用户昵称为：' + infoRes.userInfo.nickName);
				//     	// 			that.userID=infoRes.userInfo.openId;
				//     	// 			that.userName=infoRes.userInfo.nickName;
				//     	// 			that.avatarUrl=infoRes.userInfo.avatarUrl;
				//     	// 	      }
				//     	// 	    });
				//     	// }
				//     }) ;
				if (isWechat()) {
					let code = getUrlParam("code"); //是否存在code 截取code代码 授权会返回code需要截取链接中code
					let local = window.location.href;
					if (code == null || code === "") {
						//不存在就打开上面的地址进行授权
						window.location.href =
							`https://open.weixin.qq.com/connect/oauth2/authorize?appid=appid&redirect_uri=url&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`;
						//appid填写你的appid 	redirect_uri填写请求成功后回调地址						
					} else {
						that.code = code;
						//把code传给后端判断用户是否关注相对应的公众号
						uni.request({
							url: 'url',
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							data: {
								code: that.code
							},
							method: 'GET',
							success: (res) => {
								//201没有关注公众号 跳转关注页面
								if (res.data == 201) {
									window.location.href =
										`https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=wechatbiz#wechat_redirect`;
									//_biz的获取通过登录微信公众平台 在头像那里右击查看源码 找到 uin: "658565",uin_base64: ""，_biz的值等于uin_base64就可以了
								} else { //关注了可以进行下一步
									uni.request({
										url: 'url',
										header: {
											'content-type': 'application/x-www-form-urlencoded'
										},
										method: 'GET',
										success: (ti) => {

										}
									})
								}
							},
						})
					}
				} else {
					uni.showModal({
						title: '请在微信打开',
						content: '请在微信打开本网页'
					})
				}

			}
		}
	}
</script>

<style>

</style>
