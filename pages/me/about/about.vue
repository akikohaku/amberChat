<template>
	<view>
		<uni-section title="匹配模式" sub-title="How it works" type="line"></uni-section>
		<view class="border">
			<text class="info-content">{{text1}}</text>
		</view>
		<uni-section title="用户须知" sub-title="User instructions" type="line"></uni-section>
		<view class="border">
			<text class="info-content">{{text2}}</text>
		</view>
		<uni-section title="关于本系统" sub-title="About" type="line"></uni-section>
		<view class="border">
			<text class="info-content">{{text3}}</text>
		</view>
		<view class="copyright">Copyright © by kohaku. All rights reserved.</view>
	</view>
</template>

<script>
	import UniSection from '@/components/uni-section/uni-section.vue'
	export default {
		components: {
			UniSection
		},
		data() {
			return {
				text1:'这个匹配系统的模型采用相似度进行计算，用户设置的爱好将作为超空间的一个向量，两个用户之间的向量形成了一个超空间角，通过计算这个角的余弦值来代表相似度。\n'
				+'每次匹配将先从被匹配列表查找自己是否被同一事件内的用户匹配，如果没有那么将从正在匹配的人中间抽取5人，取这5人中余弦值最大的一人作为匹配结果，并将对方放入待匹配列表，这基本能保证同时匹配时两两匹配。\n'
				+'如果没有正在匹配的人，那么将从最近两天登录过的用户中抽取10人，取10人中余弦值最高的作为匹配结果，当然已经匹配过并进入聊天的人会被排除，以避免重复匹配。\n'
				+'如果你收到了一条匹配通知，但是进入后没有看到任何新消息，那么代表对方匹配到你并进入聊天室后没有给你发送任何消息，这种情况下聊天不会被记录下来，但是下次也不会再匹配到对方。\n'
				+'当然，所有匹配的前提是性别与匹配设置相符，例如当你设置性别为男，匹配选项为仅限异性时，你匹配到的只能是性别为女并且匹配设置为仅限异性、男或无所谓的人，被别人匹配到时也同理，不会匹配到违背你匹配设置的人。\n'
				+'你如果不想再被匹配到，那么只要将个人资料中的被匹配设置为拒绝即可。\n'
				+'这套算法能较高概率的保证匹配双方至少能有相似的爱好并具有较好的稳定性，不过后续依然会对算法进行优化。',
				text2:'本系统中所有用户资料均不会用于其他用途，仅用于匹配算法以及聊天。\n'
				+'在法律允许的范围内，您可以自由使用本系统。\n'
				+'禁止将本系统用于任何违法用途，我方不承担由于您的错误使用导致的一切后果，并且保留追究权利。\n'
				+'使用本系统则默认您遵守这些协定。',
				text3:'本系统遵守GPL v2.0协议，并受该协议保护。'
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
		background-color: #f8f8f8;
	}
	.info-content {
		font-size: 14px;
		line-height: 20px;
		padding: 10px;
		color: #3b4144;
		text-align: justify;
	}
	.border{
		padding-left: 15px;
		padding-right: 15px;
	}
	.copyright{
		font-size: 12px;
		text-align: center;
		margin-top: 60px;
		margin-bottom: 40px;
		color: #808080;
	}
</style>
