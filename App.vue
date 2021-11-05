<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			text: 'text',
			imService : null,
			userID: '',
			userName: '',
			avaterUrl: '',
			sex:'u',
			pre:'',
			tosex:'e',
			islogin:false,
			token:0
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./static/style/chatInterface.css");
</style>
