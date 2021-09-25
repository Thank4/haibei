<template>
	<view class="wrap">
		<view class="labelTitle">请选择到账银行卡</view>
		<view class="card_num">
		<u-cell-group>
			<u-cell-item 
			:title="defaultCard['bank_name']+'（'+ defaultCard['bank_card']+'）'" 
			bg-color="#FFFFFF"
			:titleStyle="{'fontSize':'34rpx','color':'#000000'}"
			hover-class="none"
			@click = "chooseCard"
			></u-cell-item>
		</u-cell-group>
		</view>
		<view class="tips">确认账户后，资金将直接打入对方账户，无法退回。</view>
		<u-form :model="form" ref="uForm" :error-type="errorArray" label-width="180" :labelStyle="{'fontSize':'32rpx'}">
		<view class="labelTitle">身份验证</view>
		<view class="form">	
				<u-form-item label="手机号码" prop="phone"><u-input v-model="form.phone" disabled placeholder="请输入手机号"/>
				<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
				@change="codeChange" unique-key="page-login"></u-verification-code>
				<view class="codeText" slot="right" type="default" @click="getCode">{{codeText}}</view>
				</u-form-item>
				<u-form-item label="验证码" prop="code"><u-input v-model="form.code" placeholder="输入验证码" /></u-form-item>
			
		</view>
		<view class="labelTitle">提现金额</view>
		<view class="sum">
			<u-form-item label="¥" prop="total_fee" label-width="100" :labelStyle="{'fontSize':'64rpx'}"><u-input v-model="form.total_fee" placeholder="≥2000元且为100整数" /></u-form-item>
		</view>
		</u-form>
		<view class="tips">最大可提现金额：{{total}}<text class="txall" @click="setTotal">全部提现</text></view>
		<view class="txBtn"><u-button type="primary" :customStyle="txBtn" @click="apply">提现</u-button></view>
		<view class="agreement">点击"提现"即视为您同意贝予科技<text class="agreementColor">《用户协议》</text></view>
		<u-popup v-model="modal" border-radius="32" mode="bottom">
			<view class="modal-title">选择银行卡</view>
			<u-cell-group>
				<u-radio-group v-model="defalut" @change="radioGroupChange">
							
					<u-cell-item  :title="item.bank_name+'（'+ item.bank_card +'）'" :arrow="false" v-for="item in cardList" @click=check(item.id)>
						<u-radio slot="right-icon" :name="item.id"></u-radio>
					</u-cell-item>
					</u-radio-group>
					<u-cell-item icon="plus" title="使用新卡提现" @click="add"></u-cell-item>
			</u-cell-group>
			
			<view class="confirmBtn"><u-button type="primary" :customStyle="{'height':'100rpx'}" @click="checkCard">确定</u-button></view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default{
		data(){
			return{
				codeText:'获取验证码',
				seconds: 60,
				txBtn:{
					width:'670rpx',
					height:'100rpx',
					
				},
				modal:false,
				cardList:[],
				defaultCard:{},
				defalut:'',
				form:{
					phone:'',
					code:'',
					total_fee:''
				},
				total:0,
				errorArray:['message','border-bottom'],
				rules: {
						phone: [
							{ 
								required: true, 
								message: '请输入手机号', 
								// 可以单个或者同时写两个触发验证方式 
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
								required: true, 
								message: '请输入验证码', 
								trigger: ['change','blur']
							}
						],
						total_fee:[
							{
								required: true, 
								message: '请输入提现金额', 
								trigger: ['change','blur']
							},
							{
								validator: (rule, value, callback) => {
									console.log(value)
									console.log(this.total)
									if(Number(value) > Number(this.total)){
										return false
									}else{
										return true
									}
								},
								message: '提现金额大于可提现金额'
							}
						]
						
					}
			}
		},
		onLoad(data){
			this.total = data.total
			this.init()
		},
		methods:{
			init(){
				console.log(this.form.phone = this.vuex_user.phone)
				this.$u.api.getBankList().then(res=>{
					console.log(res)
					this.cardList = res.data
					let self = this
					this.cardList.map(function(item){
						if(item.is_default){
							self.defaultCard = item
							self.defalut = item.id
							return
						}
					})
				})
			},
			chooseCard(){
				this.modal = true
			},
			check(id){
				console.log(id)
				this.defalut = id
			},
			checkCard(){
				let self = this
				this.cardList.map(function(item){
					if(item.id == self.defalut){
						self.defaultCard = item
						self.defalut = item.id
						self.modal = false
						return
					}
				})
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
			add(){
				this.$u.route({
					url:'/packageE/pages/card/add'
				})
			},
			apply(){
				this.$refs.uForm.validate(valid => {
								if (valid) {
									console.log('验证成功')	
									console.log(this.form)
									console.log(this.defaultCard)
									this.$u.api.setIncome({
										money:this.form.total_fee,
										phone:this.form.phone,
										code:this.form.code,
										bank_id:this.defaultCard.id
									}).then(res =>{
										if(res.code == 200){
											if(res.data.status == 422){
												this.$refs.uToast.show({
													title: res.data.desc,
												})
												return
											}
											
											this.$u.route({
												url:'/packageE/pages/status/ing',
												params:{
													money:res.data.money,
													bank_card:res.data.bank_card,
													bank_name:res.data.bank_name
												}
											})
										}
									})
								}
							});
			},
			setTotal(){
				this.form.total_fee = this.total
			},
			onReady() {
					this.$refs.uForm.setRules(this.rules);
			},
		}
	}
</script>

<style lang="scss">
	page{
		background:#F8F8F8;
		.wrap{
			.labelTitle{
				font-size: 28rpx;
				color: #333333;
				padding-left: 32rpx;
				line-height: 80rpx;
				height: 80rpx;
			}
			.tips{
				color: #8F9BB3;
				margin: 16rpx 0 0 20rpx;
				font-size: 24rpx;
			}
			.form{
				background: #FFFFFF;
				padding: 0 24rpx;
			    .codeText{
					color:#428BF4 ;
				}
			}
			.sum{
				background: #FFFFFF;
				padding-left: 46rpx;
			}
			.txall{
				margin-left: 44rpx;
				color: #428BF4;
			}
			.txBtn{
				margin-top: 164rpx;
			}
			.agreement{
				font-size: 24rpx;
				color: #999999;
				margin-top: 242rpx;
				text-align: center;
				.agreementColor{
					color:#428BF4 ;
				}
			}
			.modal-title{
				color: #333333;
				text-align: center;
				margin: 20rpx auto 24rpx;
			}
			.confirmBtn{
				margin: 60rpx auto 132rpx;
				padding:0 32rpx;
			}
		}
	}
	
</style>
