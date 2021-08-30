<template>
	<view class="login-container">
		<view class="login-form">
		<u-form :model="form" ref="uForm" :error-type="errorArray">
					<u-form-item  prop="phone" label-position="top">
						<u-input v-model="form.phone" type="number" @input="onInput" placeholder="输入手机号" />
						<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
								@change="codeChange" unique-key="page-login"></u-verification-code>
						<u-button size="mini" shape="circle" slot="right" type="default" @click="getCode">{{codeText}}</u-button>
					</u-form-item>
					<u-form-item  prop="code" label-position="top">
						<u-input v-model="form.code"  placeholder="输入短信验证码"/>
					</u-form-item>
					<u-form-item  prop="password" label-position="top">
						<u-input v-model="form.password" type="password" placeholder="输入密码"/>
					</u-form-item>
					<u-form-item  prop="confirmPassword" label-position="top">
						<u-input v-model="form.confirmPassword" type="password" placeholder="确认密码"/>
					</u-form-item>
		</u-form>
		</view>
		<view class="login-btn">
			<u-button type="primary" shape="circle" :custom-style="btnStyle1" @click="login" :ripple="true" ripple-bg-color="#c0c4cc">确定</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data(){
			return{
				codeText:'获取验证码',
				seconds: 60,
				errorArray:['message','border-bottom'],
				form:{
					phone:'',
					code:'',
					password:'',
					confirmPassword:''
				},
				rules:{
					phone : [
						{
							required:true,
							message:'请输入手机号',
							trigger: ['change','blur'],
						},
						{
								validator: (rule, value, callback) => {
									return this.$u.test.mobile(value);
								},
								message: '请输入正确的手机号'
							},
					],
					code: [
						{
							required:true,
							message:'请输入验证码',
							trigger:['blur']
						}
					],
					password: [
						{
							required:true,
							message:'请输入密码',
							trigger:['blur']
						},
					],
					confirmPassword: [
						{
							required:true,
							message:'请再次输入密码',
							trigger:['blur']
						},
						{
							validator: (rule, value, callback) => {
								console.log(value)
								console.log(this.form.password)
								if(value!==this.form.password){
									return false
								}else{
									return true
								}
							},
							message: '两次密码输入不一致'
						}
					]
				},
				btnStyle1:{
					'margin':'40rpx 0',
					'height':'90rpx'
				},
				btnStyle2:{
					'margin':'40rpx 0',
					'height':'90rpx'
				}
			}
		},
		onShow(){
			this.form.phone = this.vuex_user.phone
		},
		methods:{
			login(){
				console.log('登录')
				let self = this
				this.$refs.uForm.validate(valid => {
								if (valid) {
									console.log('验证通过');
									this.$u.api.changePassword({
										code:this.form.code,
										phone:this.form.phone,
										password:this.form.password,
										confirm_password:this.form.confirmPassword
									}).then(res => {
										
										self.$refs.uToast.show({
												title: '密码更换成功',
												position:'top',
												callback:function(){
													self.$u.route({
														 type:'navigateBack',
													})
												}
										})
										
										
									})
								} else {
									console.log('验证失败');
								}
							});
			},
			 onInput(e) {
				 console.log(e)
				 setTimeout(() => { this.form.phone = e }, 0)

			            },
			codeChange(text) {
							this.codeText = text;
						},
			getCode(){
				let phone = this.form.phone;
				if(!this.$u.test.mobile(phone)){
					this.$refs.uToast.show({
										title: '请填写正确的手机号',
										type: 'warning',
					})
				}else{
					if(this.$refs.uCode.canGetCode) {
										// 模拟向后端请求验证码
										uni.showLoading({
											title: '正在获取验证码'
										})
										setTimeout(() => {
											this.$u.api.sendCode({
												phone:phone
											}).then(res=>{
												console.log(res)
												if(res.code===200){
													uni.hideLoading();
													// 这里此提示会被this.start()方法中的提示覆盖
													this.$u.toast('验证码已发送');
													// 通知验证码组件内部开始倒计时
													this.$refs.uCode.start();
												}
											})
											
										}, 1000);
									} else {
										this.$u.toast('倒计时结束后再发送');
									}
				}
			
			},
			end() {
				//this.$u.toast('倒计时结束');
			},
			start() {
				//this.$u.toast('倒计时开始');
			}
		    
		},
		onReady() {
				this.$refs.uForm.setRules(this.rules);
			}
	}
</script>

<style>
	.login-container{
		width: 90%;
		margin: 0 auto;
	}
	.login-form{
		margin-top: 50rpx;
	}
	.login-btn{
		margin-top: 150rpx;
	}
</style>
