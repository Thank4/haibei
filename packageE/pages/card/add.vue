<template>
	<view class="wrap">
		<u-form :model="form" ref="uForm" :error-type="errorArray">
		<view class="labelTitle">请绑定持卡人本人的银行卡</view>
		<view class="item">
		<u-form-item label="卡号" label-width="150" prop="bank_card"><u-input v-model="form.bank_card" placeholder="输入银行卡号"/></u-form-item></view>
		<view class="labelTitle">请填写银行卡信息</view>
		<view class="item">
		<u-form-item label="持卡人" label-width="150" prop="bank_account"><u-input v-model="form.bank_account" placeholder="请输入完整的姓名" /></u-form-item>
		</view>
		<view class="item">
		<u-form-item label="开户行" label-width="150" prop="bank_name"><u-input type="textarea" v-model="form.bank_name" placeholder="请输入开户行" /></u-form-item>
		</view>
		<u-gap height="20" bg-color="#F8F8F8"></u-gap>
		<view class="item">
		<u-form-item label="手机号" label-width="150" prop="bank_phone">
			<u-icon slot="right" name="info-circle" color="#09BB07" size="32rpx"></u-icon>
			<u-input v-model="form.bank_phone" placeholder="请输入银行预留手机号" />
		</u-form-item>
		</view>
		</u-form>
		
		<view class="clause">
			<u-checkbox-group >
						<u-checkbox  
							v-model="agree" 
						>已阅读并同意<text class="clauseColor">《相关条款》</text></u-checkbox>
					</u-checkbox-group>
		</view>
		
		<view class="btn"><u-button type="primary" @click="setBank">下一步</u-button></view>
		<u-modal
		v-model="tips" 
		:show-title="false" 
		content="是否放弃添加银行卡？"
		:show-confirm-button="true"
		:show-cancel-button="true"
		confirm-text="是"
		@confirm= "cancle"
		></u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tips:false,
				form:{
					bank_name:'',
					bank_account:'',
					bank_card:'',
					bank_phone:''
				},
				agree:false,
				errorArray:['message','border-bottom'],
				rules: {
						bank_card: [
							{ 
								required: true, 
								min:16,
								max:20,
								message: '请输入正确的银行卡号', 
								// 可以单个或者同时写两个触发验证方式 
								trigger: ['change','blur'],
							}
						],
						bank_account: [
							{
								required: true, 
								message: '请输入完整的姓名', 
								trigger: ['change','blur']
							}
						],
						bank_name: [
							{ 
								required: true, 
								message: '请输入开户行', 
								// 可以单个或者同时写两个触发验证方式 
								trigger: ['change','blur'],
							}
						],
						bank_phone: [
							{
								required:true,
								message:'请输入银行预留手机号',
								trigger: ['change','blur'],
							},
							{
									validator: (rule, value, callback) => {
										return this.$u.test.mobile(value);
									},
									message: '请输入正确银行预留手机号'
								},
						]
						
					}
			}
		},
		onReady() {
				this.$refs.uForm.setRules(this.rules);
	    },
		onUnload(){
			console.log('页面返回')
			this.tips = true
		},
		methods:{
			setBank(){
				console.log('设置')
				this.$refs.uForm.validate(valid => {
								if (valid) {
									if(!this.agree){
										this.$refs.uToast.show({
											title: '请先阅读并同意协议',
											
										})
										return
									}
									this.$u.api.setBankData(this.form).then(res => {
										if(res.code == 200){
											this.$refs.uToast.show({
												title:'添加成功',
												url: '/packagesE/pages/clause/apply',
											})
										}
									})
									
								}
							});
			}
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
