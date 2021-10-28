<template>
	<view>
		<view>{{userID}}</view>
		<view>{{userName}}</view>
		<view @click="login()">id1</view>
		<view @click="login2()">id2</view>
		<view @click="connect()">连接</view>
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
				avatarUrl: ''
			}
		},
		onReady() {
			let that = this;
			that.userID = getApp().globalData.userID;
			that.userName = getApp().globalData.userName;
			that.avatarUrl = getApp().globalData.avaterUrl;
		},
		methods: {
			connect(){
				if (this.goEasy.getConnectionStatus() === 'disconnected') {
					getApp().globalData.imService = new IMService(this.goEasy, this.GoEasy);
					getApp().globalData.imService.connect(getApp().globalData.userID);
				}
			},
			login() {
				let that = this;
				getApp().globalData.userID = "08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a";
				getApp().globalData.userName = 'kohaku';
				getApp().globalData.avaterUrl = '';
				that.userID = getApp().globalData.userID;
				that.userName = getApp().globalData.userName;
				that.avatarUrl = getApp().globalData.avaterUrl;

			},
			login2() {
				let that = this;
				getApp().globalData.userID = '13451def';
				getApp().globalData.userName = 'idea';
				getApp().globalData.avaterUrl = '';
				that.userID = getApp().globalData.userID;
				that.userName = getApp().globalData.userName;
				that.avatarUrl = getApp().globalData.avaterUrl;
			}
		}
	}
</script>

<style>

</style>
