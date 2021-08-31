<template>
	<view>
		<view class="content">
			<image class="bg-set" src="../../../static/img/station_bg.png"></image>
			<view class="wrap">
					<u-row gutter="50">
						<u-col span="6">
							<view class="item" @click="mbxz()">
								<image class="item_img" src="../../../static/img/template_icon.png"></image>
								<p>模板选择</p>
							</view>
						</u-col>
						<u-col span="6">
							<view class="item" @click="spgl()">
								<image class="item_img" src="../../../static/img/video_icon.png"></image>
								<p>视频管理</p>
							</view>
						</u-col>
						<u-col span="6">
							<view class="item" @click="ymfw()">
								<image class="item_img" src="../../../static/img/domain_icon.png"></image>
								<p>域名服务</p>
							</view>
						</u-col>
						<u-col span="6">
							<view class="item" @click="wdwz()">
								<image class="item_img" src="../../../static/img/web_icon.png"></image>
								<p>我的网站</p>
							</view>
						</u-col>
					</u-row>
				</view>
		</view>
		
		<!-- 登录状态 -->
		<view v-if="vuex_hasLogin">
			<view class="login">
				<u-button shape="circle" type="primary" hover-class="none" :custom-style="domainBtn">{{vuex_pc_link}}</u-button>
				<u-button shape="circle" :custom-style="linkBtn" :ripple="true" ripple-bg-color="#88b9ff" @click="copy">获取链接</u-button>
				<p>您还没有使用一键建站，请登录PC端开始建站喔！</p>
			</view>
		</view>
		<view v-else>
		
			<view class="login">
				<u-button shape="circle" :custom-style="btnStyle" :ripple="true" ripple-bg-color="#88b9ff" @click="login">注册/登录</u-button>
				<p>体验一键建站功能，请先登录喔</p>
			</view>
		</view>
		<!-- 登录状态end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnStyle:{
					width:'320rpx',
					height:'80rpx',
					background:'linear-gradient(to right, #4293f4, #4276f4)',
					fontSize:'34rpx',
					color:'#fff'
				},
				domainBtn:{
					width:'529rpx',
					height:'80rpx',
					background:'rgb(246,246,248)',
					fontSize:'34rpx',
					color:'#393C4C',
					marginTop:'76rpx',
				},
				linkBtn:{
					width:'529rpx',
					height:'80rpx',
					background:'linear-gradient(to right, #4293f4, #4276f4)',
					marginTop:'20rpx',
					color:'#FFFFFF'
				}
				
			}
		},
		methods: {
			login(){
				this.$u.route('/packageA/pages/login/login');
			},
			mbxz(){
				if(!this.vuex_hasLogin){
					this.$u.route('/packageA/pages/login/login');
				}else{
				this.$u.route('/packageD/pages/template/select');
				}
			},
			spgl(){
				if(!this.vuex_hasLogin){
					this.$u.route('/packageA/pages/login/login');
				}else{
				this.$u.route('/packageA/pages/videos/index');
				}
			},
			ymfw(){
				if(!this.vuex_hasLogin){
					this.$u.route('/packageA/pages/login/login');
				}else{
				this.$u.route('/packageD/pages/domain/index');
				}
			},
			wdwz(){
				if(!this.vuex_hasLogin){
					this.$u.route('/packageA/pages/login/login');
				}else{
				this.$u.route('/packageD/pages/template/list');
				}
			},
			copy(){
				console.log(this)
				console.log(this.vuex_pc_link)
				uni.setClipboardData({
				    data:this.vuex_pc_link ,
				    success: function (res) {
						console.log(res)
				    },
					fail(err) {
						console.log(err)
					}
				});
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.content{
		width: 90%;
		margin: 124rpx auto 0;
	}
	.bg-set{
		position: absolute;
		width: 627rpx;
		height: 573rpx;
		top: 180rpx;
		z-index: -1;
	}
	.wrap {
		padding: 24rpx;
		width: 90%;
		margin: 0 auto;
	}
	.item{
		width: 210rpx;
		height: 300rpx;
		margin-bottom: 35rpx;
		border-radius: 20rpx;
		background: #fff;
		box-shadow:0px 0px 18px #aaccff;
	}
	.item_img{
		width: 100rpx;
		height: 102rpx;
		display: block;
		margin: 0 auto;
		padding-top: 76rpx;
		
	}
	.item p{
		margin-top: 53rpx;
		color: #393C4C;
		font-size: 26rpx;
		text-align: center;
	}

	.u-row {
		margin: 40rpx 0;
	}
	.login{
		margin: 74rpx auto 0;
	}
	.login p{
		margin-top: 21rpx;
		text-align: center;
		color:#393C4C;
	}
</style>
