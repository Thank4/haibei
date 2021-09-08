<template>
	<view class="login-container">
		<view class="login-form">
		<u-form :model="form" ref="uForm" :error-type="errorArray">
					<u-form-item prop="phone" label-position="top">
						<u-input type="number" v-model="form.phone" len="11" placeholder="输入手机号"  @input="changeBtn"/>
					</u-form-item>
					<u-form-item  prop="password" label-position="top" >
						<u-input type="password" v-model="form.password"  placeholder="请输入密码" @input="changeBtn"/>
					</u-form-item>
		</u-form>
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
				errorArray:['message','border-bottom'],
				disabled:true,
				form:{
					phone:'',
					password:''
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
					password: [
						{
							required:true,
							message:'请输入密码',
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
			onLoad(){
				
			},
			login(){
				this.$refs.uForm.validate(valid => {
								if (valid) {
									this.$u.api.passwordLogin({
										phone:this.form.phone,
										password:this.form.password
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
												title: '登录成功',
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
																				delta:2
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
			changeBtn(){
				if(this.form.phone.length==11&&this.form.password.length>1){
					console.log('设置按钮')
					this.disabled = false
				}
			},
			wxlogin(){
				console.log('微信登录')
			    let self = this
				
				
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
