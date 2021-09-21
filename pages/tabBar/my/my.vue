<template>
	<view class="wrap">
		<view class="bg u-abso"></view>
		<view class="userinfo u-flex">
			<view class="avatar"><u-avatar src="" size="128"></u-avatar></view>
			<view class="info">
				<view class="phone">15151513445</view>
				<view class="isvip">年费会员</view>
			</view>
		</view>
		
		
		<view class="all">
				<view class="total">5000</view><view class="all-text">总收益（元）</view>
				<u-button type="primary" shape="circle" :customStyle="txBtn" @click="tx">提现</u-button>
			</view>
		<view class="other u-flex">
			<view class="u-flex-1">
				<view class="num">0</view>
				<view class="num-text">今日收益（元）</view>
			</view>
			<view class="u-flex-1">
				<view class="num">3000</view>
				<view class="num-text">当前余额（元）</view>
			</view>
			<view class="u-flex-1">
				<view class="num">2000</view>
				<view class="num-text">冻结金额（元）</view>
			</view>
			<view class="u-flex-1">
				<view class="num">2000</view>
				<view class="num-text">累计提现（元）</view>
			</view>
			
		</view>
		
		<template v-if="vuex_hasLogin">
		<view class="cellGroup">
			<u-cell-group :border="false">
					<u-cell-item title="我的钱包" :titleStyle="titleStyle" @click="wallet">
						<u-icon slot="icon" name="../../../static/icon/wallet_icon.png" size="48" :customStyle="iconStyle"></u-icon>
					</u-cell-item>
					<u-cell-item title="套餐信息" :titleStyle="titleStyle" @click="packages">
						<u-icon slot="icon" name="../../../static/icon/package_icon.png" size="48" :customStyle="iconStyle"></u-icon>
					</u-cell-item>
					<u-cell-item title="邀请好友" :titleStyle="titleStyle" @click="share">
						<u-icon slot="icon" name="../../../static/icon/share_icon.png" size="48" :customStyle="iconStyle"></u-icon>
					</u-cell-item>
					<u-cell-item title="客户信息" :titleStyle="titleStyle" @click="customer">
						<u-icon slot="icon" name="../../../static/icon/customer_icon.png" size="48" :customStyle="iconStyle"></u-icon>
					</u-cell-item>
					<u-cell-item title="定制需求" :titleStyle="titleStyle" @click="needs">
						<u-icon slot="icon" name="../../../static/icon/needs_icon.png" size="48" :customStyle="iconStyle"></u-icon>
					</u-cell-item>
					<u-cell-item title="视频库" :titleStyle="titleStyle" @click="videos">
						<u-icon slot="icon" name="../../../static/icon/videos_icon.png" size="48" :customStyle="iconStyle"></u-icon>
					</u-cell-item>
					<u-cell-item title="账号与安全" :titleStyle="titleStyle" @click="account">
						<u-icon slot="icon" name="../../../static/icon/account_icon.png" size="48" :customStyle="iconStyle"></u-icon>
					</u-cell-item>
			</u-cell-group>
		</view>
		<u-modal 
		v-model="showTXTips" 
		:show-title="false" 
		content="使用提现功能添加一张支持提现的银行卡"
		:show-confirm-button="true"
		:show-cancel-button="true"
		confirm-text="添加银行卡"
		@confirm= "addCard"
		></u-modal>
		</template>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				txBtn:{
					margin:'24rpx 0 0 248rpx',
					float:'left',
					width:'120rpx',
					height:'48rpx',
					fontSize:'24rpx',
					background:'rgba(242, 244, 255,0.1)',
					color:'rgba(255, 255, 255, 0.5)'
					
				},
				iconStyle:{
					marginRight:"20rpx"
				},
				titleStyle:{
					fontSize:'30rpx',
					color:'rgba(51, 51, 51, 1)'
				},
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
				},
				modalShow:false,
				showTXTips:true,
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
			wallet(){
				if(!this.vuex_hasLogin){
					this.$u.route('/packageA/pages/login/login');
				}else{
					this.$u.route({
								url: '/packageE/pages/wallet/index',	
						})
				}
			},
			share(){
				if(!this.vuex_hasLogin){
					this.$u.route('/packageA/pages/login/login');
				}else{
					this.$u.route({
								url: '/packageE/pages/share/index',	
						})
				}
			},
			packages(){
				if(!this.vuex_hasLogin){
					this.$u.route('/packageA/pages/login/login');
				}else{
					this.$u.route({
								url: '/packageE/pages/packages/index',	
						})
				}
			},
			login(){
				this.$u.route('/packageA/pages/login/login');
			},
			logout(){
				this.modalShow = true
				
			},
			clearLogin(){
				//注销，不做回调
				this.$u.vuex('vuex_hasLogin', false)
				this.$u.vuex('vuex_token', '') //用户token
				this.$u.vuex('vuex_user', {}) //用户信息
				this.$u.vuex('vuex_openId', '')//用户openId
				this.$u.route({
					url:'/packageA/pages/login/login'
				})
			},
			tx(){
				
			},
			addCard(){
				this.$u.route({
					url:'/packageE/pages/card/add'
				})
			}
		}
	}
</script>

<style>
	page{
		background: #F8F8F8;
	}
	.bg{
		background: #4270FF;
		width: 100%;
		height: 338rpx;
		z-index: -1;
	}
	.userinfo{
		z-index: 99;
	}
	.avatar{
		margin: 40rpx 0 0 32rpx;
	}
	.info{
		color: #FFFFFF;
		z-index: 99;
	}
	.phone{
		font-size: 28rpx;
		margin: 56rpx 0 0 16rpx;
	}
	.isvip{
		font-size: 24rpx;
		margin: 12rpx 0 0 16rpx;
	}
	.wallet{
		
	}
	.all{
		width: 686rpx;
		height: 96rpx;
		border-radius: 16rpx  16rpx  0px  0px  ;
		margin:34rpx auto 0;
		z-index: 99;
	    background: #557EFF;
		color: #FFFFFF;
	}
	.all-text{
		color: #FFFFFF;
		z-index: 99;
	}
	.total{
		float:left;
		margin:14rpx 0 16rpx 28rpx;
		font-size: 48rpx;
	}
	.all-text{
		float:left;
		font-size: 24rpx;
		margin:30rpx 0 32rpx 16rpx;
	}
	.other{
		background: #FFFFFF;
		border-radius: 0px  0px  16rpx  16rpx;
		width: 686rpx;
		height: 128rpx;
		margin: 0 auto;
	}
	.num{
		text-align: center;
		color: rgba(51, 51, 51, 1);
		font-size: 32rpx;
		font-weight: 500;
	}
	.num-text{
		text-align: center;
		font-size: 22rpx;
		margin-top: 16rpx;
		color: rgba(153, 153, 153, 1);
	}
	.cellGroup{
		background: #FFFFFF;
		width: 686rpx;
		margin: 20rpx auto 0;
		border-radius: 16rpx;
	}
	
</style>
