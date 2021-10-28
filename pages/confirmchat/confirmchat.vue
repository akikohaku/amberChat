<template>
	<view class="main">
		
		<uni-link class="link" v-bind:href="source+id" text="进入聊天"></uni-link>
		<view class="link" @click="enterChat('13451')">聊天2</view>
		<view @click="getre()">获取</view>
		<view>{{id}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				source:"https://chat.amberworks.net:3001/",
				id:''
			}
		},
		watch:{
			
		},
		methods: {
			enterChat (uuid) {//进入私聊
				let path = '../privateChat/privateChat?to=' + uuid;
				uni.navigateTo({
					url: path
				})
			},
			getre(){
				let that=this
				uni.request({
				  method: 'GET',
				  url: 'https://wechat.api.kohaku.xin:11731/user/getroom',
				  
				  success(res) {
				    console.log(res.data.id);
					that.id=res.data.id;
				  }
				})
			}
		}
	}
</script>

<style>
	.main{
		text-align: center;
	}
	.link{
		width: 200px;
		height: 70px;
		border: 2px solid orange;
		display: inline-flex;
		text-align: center;
		font-size: 50px;
		padding-top: 10px;
		padding-left: 40px;
		border-radius: 5px;
	}
</style>
