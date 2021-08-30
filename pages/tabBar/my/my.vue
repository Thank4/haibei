<template>
	<view class="wrap">
	<view class="bg">
		<u-image width="100%" height="330rpx" src="/static/img/my_bg.png"></u-image>
	</view>
	
	<template v-if="vuex_hasLogin">
		<view class="user">
			<u-row gutter="16">
						<u-col span="3">
							<view class="avatar">
								<u-avatar  src="../../../static/img/avator.png"></u-avatar>
							</view>
						</u-col>
						<u-col span="6">
							<view class="userinfo">
								<view class="username">默认昵称</view>
								<view class="phone">{{vuex_user.phone}}</view>
							</view>
						</u-col>
						<u-col span="3">
							<u-button shape="circle" :custom-style="btnStyle1" @click="logout">退出</u-button>
						</u-col>
					</u-row>
					</view>
					<view class="list">
						
					<u-cell-group>
							<u-gap height="32" bg-color="#F4F5F6"></u-gap>
							<u-cell-item  title="账号管理" @click="account" :title-style="{'margin-left': '38rpx','font-size':'30rpx'}" bgColor="none">
								<u-image width="41" height="39" slot="icon" src="/static/icon/zhgl_icon.png"></u-image>
							</u-cell-item>
							<u-gap height="32" bg-color="#F4F5F6"></u-gap>
							<u-cell-item title="客户信息" @click="customer" :title-style="{'margin-left': '38rpx','font-size':'30rpx'}" bgColor="none">
								<u-image width="41" height="39" slot="icon" src="/static/icon/khxx_icon.png"></u-image>
							</u-cell-item>
							<u-gap height="32" bg-color="#F4F5F6"></u-gap>
							<u-cell-item title="定制需求" @click="needs" :title-style="{'margin-left': '38rpx','font-size':'30rpx'}" bgColor="none">
								<u-image width="41" height="39" slot="icon" src="/static/icon/dzxq_icon.png"></u-image>
							</u-cell-item>
							<u-gap height="32" bg-color="#F4F5F6"></u-gap>
							<u-cell-item title="视频库" @click="videos" :title-style="{'margin-left': '38rpx','font-size':'30rpx'}" bgColor="none">
								<u-image width="41" height="39" slot="icon" src="/static/icon/spk_icon.png"></u-image>
							</u-cell-item>
					</u-cell-group>
					</view>
		
		
	</template>
		
	<template v-else>
		<view class="user">
			<u-row gutter="16">
						<u-col span="3">
							<view class="avatar">
								<u-avatar  src="../../../static/img/avator.png"></u-avatar>
							</view>
						</u-col>
						<u-col span="5">
							<view class="userinfo">
								<view class="username"></view>
								<view class="phone"></view>
							</view>
						</u-col>
						<u-col span="4">
							<u-button  shape="circle" :custom-style="btnStyle2" @click="login">注册/登录</u-button>
						</u-col>
					</u-row>
					</view>
					<view class="list">
						
					<u-cell-group>
							<u-gap height="32" bg-color="#F4F5F6"></u-gap>
							<u-cell-item  title="账号管理" @click="account" :title-style="{'margin-left': '38rpx','font-size':'30rpx'}" bgColor="none">
								<u-image width="41" height="39" slot="icon" src="/static/icon/zhgl_icon.png"></u-image>
							</u-cell-item>
							<u-gap height="32" bg-color="#F4F5F6"></u-gap>
							<u-cell-item title="客户信息" @click="customer" :title-style="{'margin-left': '38rpx','font-size':'30rpx'}" bgColor="none">
								<u-image width="41" height="39" slot="icon" src="/static/icon/khxx_icon.png"></u-image>
							</u-cell-item>
							<u-gap height="32" bg-color="#F4F5F6"></u-gap>
							<u-cell-item title="定制需求" @click="needs" :title-style="{'margin-left': '38rpx','font-size':'30rpx'}" bgColor="none">
								<u-image width="41" height="39" slot="icon" src="/static/icon/dzxq_icon.png"></u-image>
							</u-cell-item>
							<u-gap height="32" bg-color="#F4F5F6"></u-gap>
							<u-cell-item title="视频库" @click="videos" :title-style="{'margin-left': '38rpx','font-size':'30rpx'}" bgColor="none">
								<u-image width="41" height="39" slot="icon" src="/static/icon/spk_icon.png"></u-image>
							</u-cell-item>
					</u-cell-group>
					</view>
	</template>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				btnStyle1:{
					width:'146rpx',
					height:'63rpx',
					color:'rgb(66,147,244)',
					margin:'40rpx 0',
					background:'rgb(208,226,245)',
				},
				btnStyle2:{
					width:'200rpx',
					height:'60rpx',
					color:'rgb(66,147,244)',
					margin:'40rpx 0',
					background:'rgb(244,245,246)',
				}
			}
		},
		methods: {
			account(){
				if(!this.vuex_hasLogin){
					this.$u.route('/packageA/pages/login/login');
				}else{
					this.$u.route({
								url: '/packageA/pages/account/account',	
						})
				}
				
			},
			customer(){
				if(!this.vuex_hasLogin){
					this.$u.route('/packageA/pages/login/login');
				}else{
					this.$u.route({
								url: '/packageA/pages/customer/list',	
						})
				}
			},
			needs(){
				if(!this.vuex_hasLogin){
					this.$u.route('/packageA/pages/login/login');
				}else{
					this.$u.route({
								url: '/packageA/pages/needs/list',	
						})
				}
			},
			videos(){
				if(!this.vuex_hasLogin){
					this.$u.route('/packageA/pages/login/login');
				}else{
					this.$u.route({
								url: '/packageA/pages/videos/index',	
						})
				}
			},
			login(){
				this.$u.route('/packageA/pages/login/login');
			},
			logout(){
				//注销，不做回调
				this.$u.vuex('vuex_hasLogin', false)
				this.$u.vuex('vuex_token', '') //用户token
				this.$u.vuex('vuex_user', {}) //用户信息
				this.$u.vuex('vuex_openId', '')//用户openId
				this.$u.route({
					url:'/packageA/pages/login/login'
				})
			}
		}
	}
</script>

<style>
	page{
		background-color:  rgb(244,245,246);
	}
	
	.bg{
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
	}
	.user{
		margin-top: 200rpx;
		position: relative;
	}
	.avatar{
		margin-left: 61rpx;
	}
	.userinfo{
		color: #fff;
	}
	.phone{
		margin-top: 20rpx;
	}
	.list{
		margin: 0 31rpx;
	
	}
	.list ::v-deep .u-cell-item-box{
			background-color: none; 
	}
   .list ::v-deep .u-cell{ 
	border-radius: 10rpx; 
	background: #fff;
	   /* 	border-radius: 50rpx !important; */
	 }
	
	
</style>
