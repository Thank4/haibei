<template>
	<view class="wrap">
		<view class="labelTitle">请绑定持卡人本人的银行卡</view>
		<view class="item">
		<u-form-item label="卡号" label-width="150"><u-input v-model="form.number" /></u-form-item></view>
		<view class="labelTitle">请填写银行卡信息</view>
		<view class="item">
		<u-form-item label="持卡人" label-width="150"><u-input v-model="form.number" placeholder="请输入完整的姓名" /></u-form-item>
		</view>
		<view class="item">
		<u-form-item label="开户行" label-width="150"><u-input type="textarea" v-model="form.number" placeholder="请输入开户行" /></u-form-item>
		</view>
		<u-gap height="20" bg-color="#F8F8F8"></u-gap>
		<view class="item">
		<u-form-item label="手机号" label-width="150"><u-input v-model="form.number" placeholder="请输入银行预留手机号" /></u-form-item>
		</view>
		
		<view class="clause">
			<u-radio-group v-model="value">
				<u-radio shape="square">已阅读并同意<text class="clauseColor">《相关条款》</text></u-radio>
			</u-radio-group>
		</view>
		
		<view class="btn"><u-button type="primary">下一步</u-button></view>
		<u-modal
		v-model="tips" 
		:show-title="false" 
		content="是否放弃添加银行卡？"
		:show-confirm-button="true"
		:show-cancel-button="true"
		confirm-text="是"
		@confirm= "cancle"
		></u-modal>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tips:false
			}
		},
		onUnload(){
			console.log('页面返回')
			this.tips = true
		}
	}
</script>

<style>
	page{
		background: #F8F8F8;
	}
	.labelTitle{
		font-size: 28rpx;
		color: #333333;
		padding-left: 32rpx;
		line-height: 80rpx;
		height: 80rpx;
		
	}
	.item{
		background-color: #FFFFFF;
		padding:0 30rpx;
	}
	.clause{
		margin-top: 566rpx;
		margin-left: 36rpx;
	}
	.clauseColor{
		color:#428BF4
	}
	.btn{
		margin: 64rpx 40rpx 0;
	}
</style>
