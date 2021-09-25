<template>
	<view class="wrap">
		<view class="status-img">
			<u-image src="../../../static/img/dealing.png" width="186rpx" height="186rpx"></u-image>
		</view>
		<view class="status-text">提现处理中…</view>
		<view class="status-tips">尊敬的用户，稍后我们会有专属客服与您联系！</view>
		<u-line color="#EEEEEE" margin="60rpx 0 32rpx"  :hair-line="false"/>
		
		<u-cell-group :border="false">
				<u-cell-item  title="提现金额" :value="'¥'+money" :border-bottom="false" :arrow="false"></u-cell-item>
				<u-cell-item  title="到账银行卡" :value="bank_name+'('+bank_card+')'" :border-bottom="false" :arrow="false"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				bank_card:'',
				bank_name:'',
				money:''
			}
		},
		onLoad(data){
			console.log(data)
			this.bank_card = data.bank_card
			this.bank_name = data.bank_name
			this.money = data.money
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	page{
	    background: #F8F8F8;
	}
	.status-img{
		width: 186rpx;
		height: 186rpx;
		margin: 100rpx auto 0;
	}
	.status-text{
		color: #000000;
		font-size: 40rpx;
		text-align: center;
		margin-top: 50rpx;
	}
	.status-tips{
		font-size: 28rpx;
		color: #888888;
		margin-top:30rpx;
		text-align: center;
	}
</style>
