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
		</view>
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
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				isclicked: false
			}
		},
		onLoad() {

		},
		methods: {
			matchClick() {
				if (!this.isclicked) {
					console.log("clicked");
					this.$refs.buttonstart.$el.style.width = '270px';
					this.$refs.buttonstart3.$el.style.height = '120px';
					this.$refs.buttonstart2.$el.style.height = '120px';
					this.$refs.buttonstart2.$el.style.margin = '-10px 0 0 255px';
					this.$refs.buttonstart4.$el.style.width = '270px';
					this.$refs.buttonstart4.$el.style.margin = '105px 0 0 -10px';
					this.$refs.buttonstart5.$el.style.width = '0px';
					this.$refs.buttoncontent1.$el.style.width = '0px';
					this.$refs.buttoncontent2.$el.style.height = '0px';
					this.$refs.buttoncontent3.$el.style.height = '100px';
					this.$refs.matchingcircle.$el.style.opacity='100';
					this.isclicked = true;
				} else {
					this.isclicked = false;
					this.$refs.buttonstart.$el.style.width = '40px';
					this.$refs.buttonstart3.$el.style.height = '40px';
					this.$refs.buttonstart2.$el.style.height = '45px';
					this.$refs.buttonstart2.$el.style.margin = '65px 0 0 255px';
					this.$refs.buttonstart4.$el.style.width = '45px';
					this.$refs.buttonstart4.$el.style.margin = '105px 0 0 215px';
					this.$refs.buttonstart5.$el.style.width = '40px';
					this.$refs.buttoncontent1.$el.style.width = '50px';
					this.$refs.buttoncontent2.$el.style.height = '100px';
					this.$refs.buttoncontent3.$el.style.height = '0px';
					this.$refs.matchingcircle.$el.style.opacity='0';
				}

			},
			moveHandle() {}
		}
	}
</script>

<style>
	@font-face {
		font-family: 'SSJian Song Xian Xi Ti';
		src: url(../../static/stylesheet.css);
	}

	.content {
		width: 100vw;
		height: 100vh;
		background-color: black;
		background-image: url(https://pic.kohaku.xin/images/2021/10/26/7.jpg);
		background-size: 100% auto;
		background-repeat: no-repeat;
	}

	.button-start {
		margin: 65vh 17vw;

		height: 200rpx;
		display: inline-flex;
		transition: all .5s ease-in-out;
	}
	.matching-circle{
		opacity:0;
		content: '';
		width: 200rpx;
		height: 200rpx;
		border: 4rpx solid #007AFF;
		position: absolute;
		border-radius: 100rpx;
		margin-top: 350rpx;
		margin-left: 270rpx;
		transition: all 0.5s ease-in-out;
		animation: circleborder 5s alternate infinite;
	}
	
	@keyframes circleborder{
		0%{}
		50%{box-shadow:0px 0px 20px white;}
		100%{}
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
		height: 5rpx;
		width: 80rpx;
		position: absolute;
		margin-left: 25rpx;
		margin-top: 100rpx;
		transition: all .5s ease-in-out;
	}

	.button-block {
		content: '';
		background-color: white;
		height: 5rpx;
		width: 90rpx;
		position: absolute;
		margin-top: -10rpx;
		margin-left: -20rpx;
		transition: all .5s ease-in-out;
	}

	.button-block-3 {
		content: '';
		background-color: white;
		height: 90rpx;
		width: 5rpx;
		position: absolute;
		margin-top: -20rpx;
		margin-left: -10rpx;
		transition: all .5s ease-in-out;
	}

	.button-block-2 {
		content: '';
		background-color: white;
		height: 80rpx;
		width: 5rpx;
		position: absolute;
		margin-left: 510rpx;
		margin-top: 140rpx;
		transition: all .5s ease-in-out;
	}

	.button-block-4 {
		content: '';
		background-color: white;
		height: 5rpx;
		width: 80rpx;
		position: absolute;
		margin-left: 440rpx;
		margin-top: 210rpx;
		transition: all .5s ease-in-out;
	}

	.button-1 {
		width: 100rpx;
		font-family: 'SSJian Song Xian Xi Ti';
		color: white;
		font-size: 80rpx;
		padding-left: 30rpx;
		line-height: 100rpx;
		overflow: hidden;
		transition: all .5s ease-in-out;
	}

	.button-2 {
		margin-top: -10rpx;
		margin-left: 100rpx;
		font-family: 'SSJian Song Xian Xi Ti';
		color: white;
		position: absolute;
		width: 500rpx;
		height: 200rpx;
		font-size: 220rpx;
		overflow: hidden;
		transition: all .5s ease-in-out;
	}

	.button-onprocess {
		margin-top: 40rpx;
		margin-left: 40rpx;
		font-family: 'SSJian Song Xian Xi Ti';
		color: white;
		position: absolute;
		width: 500rpx;
		height: 0rpx;
		font-size: 120rpx;
		overflow: hidden;
		transition: all .5s ease-in-out;
	}
	.star-box {
	    width: 250px;
	    height: 200px;
	    position: absolute;
	    margin: 0 auto;
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
</style>
