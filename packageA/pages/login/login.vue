<template>
	<view class="login-container">
		<view class="login-form">
		<u-form :model="form" ref="uForm" :error-type="errorArray">
					<u-form-item prop="phone" label-position="top">
						<u-input type="number" v-model="form.phone" len="11" placeholder="输入手机号"  @input="changeBtn"/>
						<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
								@change="codeChange" unique-key="page-login"></u-verification-code>
						<u-button size="mini" shape="circle" slot="right" type="default" @click="getCode">{{codeText}}</u-button>
					</u-form-item>
					<u-form-item  prop="code" label-position="top" >
						<u-input  type="number" v-model="form.code"  placeholder="输入短信验证码" @input="changeBtn"/>
					</u-form-item>
		</u-form>
		<view class="tips" @click="loginByPass">账号密码登录</view>
		</view>
		<view class="login-btn">
			<template v-if="disabled">
				<u-button type="primary"  shape="circle" :custom-style="btnStyle1" hover-class="none">登 录</u-button>
			</template>
			<template v-else>
				<u-button type="primary" shape="circle" :custom-style="btnStyle2" @click="login" :ripple="true" ripple-bg-color="#c0c4cc">登 录</u-button>
			</template>
			
			
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
				disabled:true,
				mer_id:'',
				form:{
					phone:'',
					code:''
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
					]
				},
				btnStyle1:{
					margin:'40rpx 0',
					background:'rgb(235,235,235)',
					height:'90rpx',
					color:'#FFFFFF'
				},
				btnStyle2:{
					margin:'40rpx 0',
					background:'linear-gradient(to right, #4293f4, #4276f4)',
					height:'90rpx'
				}
			}
		},
		methods:{
			onLoad(data){
				console.log(data)
				if(data.mer_id){
					this.mer_id = data.mer_id
				}
				
			},
			login(){
				this.$refs.uForm.validate(valid => {
								if (valid) {
									console.log('验证通过');
									this.$u.api.login({
										phone:this.form.phone,
										code:this.form.code,
										mer_id:this.mer_id
									}).then(res=>{
										if(res.code==200){
											//登录成功,修改登录状态
											this.$u.vuex('vuex_hasLogin', res.status);
											this.$u.vuex('vuex_token',res.data.token)
											//设置token
											//获取用户信息
											this.$u.api.getUserInfo().then(res=>{
												if(res.code == 200){
													this.$u.vuex('vuex_user',res.data)
												}
											})
											//提示登录成功，跳转首页,暂时
											let self = this
											this.$refs.uToast.show({
												title: '注册登录成功',
												callback:function(){
													//获取通过微信登录，获取用户openID
													uni.login({
														provider:'weixin',
														success(res) {
															if(res.errMsg == 'login:ok'){
																self.$u.api.getOpenId({
																	code:res.code
																}).then(res => {
																	if(res.code == 200){
																		self.$u.vuex('vuex_openId',res.data.openId)
																		self.$u.route({
																			    type:'navigateBack',
																		})
																	}
																})
															}
															
														}
													})
													
													
												} 
											})
										}else if(res.code==422){
											this.$refs.uToast.show({
												title: res.message,
												position:'top',
												type: 'defalut',
											})
										}
									})
								} else {
									console.log('验证失败');
								}
							});
			},
			codeChange(text) {
							this.codeText = text;
						},
			getCode(){
				let phone = this.form.phone;
				if(!this.$u.test.mobile(phone)){
					this.$refs.uToast.show({
										title: '请填写正确的手机号',
										position:'top',
										type: 'defalut',
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
			},
			changeBtn(){
				if(this.form.phone.length==11&&this.form.code.length==6){
					console.log('设置按钮')
					this.disabled = false
				}
			},
			wxlogin(){
				console.log('微信登录')
			    let self = this
			},
			loginByPass(){
				this.$u.route({
					url:'/packageA/pages/login/loginByPass'
				})
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
	.tips{
		color: #428BF4;
		font-size: 28rpx;
		text-align: right;
		margin-top: 30rpx;
	}
</style>
