<template>
	<view>
		<view class="info">联系方式</view>
		<hr/>
		<view class="phone text">电话：17715378805</view>
		<view class="wechat text">微信：aki_kohaku</view>
		<view class="qq text">QQ ：1293628162</view>
		<view class="mail text">邮箱：i@kohaku.xin</view>
		<hr/>
		<view class="moreinfo text">或者直接点击下方与客服沟通，客服将在24小时内回复</view>
		<view class="contect" @click="">客服</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			click(){
				uni.navigateTo({
					url: '/pages/privateChat/privateChat?to=oROSF5rwGFoHUhpU4kqN-LU_k2hc'
				})
			}
		}
	}
</script>

<style>
	.info{
		font-size: 25px;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.text{
		margin-top: 3px;
		margin-bottom: 3px;
	}
	.contect{
		text-align: center;
		width: 100vw;
		height:10vh;
		background-color: #007AFF;
		font-size: 30px;
		padding-top: 20px;
		color: white;
	}
</style>
