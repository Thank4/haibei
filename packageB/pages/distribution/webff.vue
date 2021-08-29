<template>
	<view class="login-container">
		<view class="login-form">
		<u-form :model="form" ref="uForm" :error-type="errorArray">
					<u-form-item  prop="file_name" label-position="top">
						<u-input v-model="form.file_name" type="select" :select-open="actionSheetShow1" placeholder="请选择我的站点" @click="show = true"/>
					</u-form-item>
					<u-form-item  prop="title" label-position="top">
						<u-input v-model="form.title"  placeholder="请输入网站名称" @blur="trans('title')" />
					</u-form-item>
					<u-form-item  prop="desc" label-position="top">
						<u-input v-model="form.desc" type="textarea"  placeholder="请输入网站简介" @blur="trans('desc')"/>
					</u-form-item>
					<u-form-item  prop="tags" label-position="top">
						<u-input v-model="form.tags" type="text"  placeholder="请输入网站标签" @blur="trans('tags')"/>
					</u-form-item>
		</u-form>
		</view>
		<view class="login-btn">
			<u-button type="primary" shape="circle" :custom-style="btnStyle1" @click="submit" :ripple="true" ripple-bg-color="#c0c4cc">确定</u-button>
		</view>
		<u-action-sheet :list="list" v-model="show" @click="actionSheetCallback"></u-action-sheet>
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
				ip_id:'', //上级传递过来的
				form:{
					file_id:'',
					file_name:'',
					title:'',
					desc:'',
					tags:'',
					title_en:'',
					desc_en:'',
					tags_en:''
				},
				rules:{
					file_id : [
						{
							required:true,
							message:'请选择我的站点',
							trigger: ['change','blur'],
						}
					],
					title: [
						{
							required:true,
							message:'请输入网站名称',
							trigger:['blur']
						}
					],
					desc: [
						{
							required:true,
							message:'请输入网站简介',
							trigger:['blur']
						},
					],
					tags: [
						{
							required:true,
							message:'请输入网站标签',
							trigger:['blur']
						},
					],
					},
				btnStyle1:{
					'margin':'40rpx 0',
					'height':'90rpx'
				},
				btnStyle2:{
					'margin':'40rpx 0',
					'height':'90rpx'
				},
				show:false,
				list:[]
			}
		},
		onLoad(data){
			this.ip_id = data.ip_id
			this.init()
		},
		methods:{
			init(){
				this.$u.api.getSites().then(res =>{
					console.log(res)
					let self = this
					if(res.code == 200){
						res.data.map(function(item){
							self.list.push({
								id:item.id,
								text:item.name
							})
						})
						
					}
				})
			},
			submit(){
				console.log('登录')
				let self = this
				this.$refs.uForm.validate(valid => {
								if (valid) {
									if(!this.form.tags_en){ 
										let self = this
										this.$u.api.trans({
											text:this.form.tags
										}).then(res => {	
											if(res.code ==200){
												self.form.tags_en = res.data.dst
												
											
											
											}
										})
									}
								
								     //分发，调起支付
									 console.log('验证通过');
									 console.log(this.form.file_id)
									 console.log(this.form.title)
									 console.log(this.form.desc)
									 console.log(this.form.tags)
									 console.log(this.form.title_en)
									 console.log(this.form.desc_en)
									 console.log(this.form.tags_en)
									 console.log(this.ip_id)
									 console.log(this.vuex_openId)
									 //TODO  一键分发
									 let self = this
									 self.$u.api.share({
									 	file_id:this.form.file_id,
									 	title:this.form.title,
									 	desc:this.form.desc,
									 	tags:this.form.tags,
									 	title_en:this.form.title_en,
									 	desc_en:this.form.desc_en,
									 	tags_en:this.form.tags_en,
									 	type:'site',
									 	ip_id:this.ip_id,
									 	openId:this.vuex_openId
									 }).then(res =>{
									 	if(res.code ==200){
									 		switch(res.data.status){
									 			case 1: //未付款,
									 			//TODO 微信小程序支付
									 			console.log(res.data.prepay.timeStamp)
									 			
									 			uni.requestPayment({
									 			    provider: 'wxpay',
									 			    timeStamp:res.data.prepay.timeStamp,
									 			    nonceStr:res.data.prepay.nonceStr,
									 			    package: res.data.prepay.nonceStr,
									 			    signType: res.data.prepay.signType,
									 			    paySign: res.data.prepay.signType,
									 			    success: function (res) {
									 			        //支付成功回调,并跳转页面
									 					self.$u.api.setShareHistory().then(res =>{
									 						if(res.code == 200){
									 							//TODO 跳转支付成功页面，提示
									 							self.$u.route('/packageB/pages/distribution/paySuccess')
									 						}
									 					})
									 			    },
									 			    fail: function (err) {
									 					console.log('失败回调订单号',res.data.order_no)
									 					self.$u.api.cancelPay({
									 						'order_no':res.data.order_no
									 					}).then(res => {
									 						//TODO,支付失败
									 						self.$refs.uToast.show({
									 							title: '支付失败,请重试',
									 							type: 'error',
									 			
									 						})
									 					})
									 			        console.log('fail:' + JSON.stringify(err));
									 			    }
									 			});
									 			break;
									 			case 2: //正常分发
									 			this.$refs.uToast.show({
									 				title: 'ip被封或者是选择不存在的ip',
									 				type: 'success',
									 																		
									 			})
									 			break;
									 			case 3: //ip被封或不存在
									 			this.$refs.uToast.show({
									 				title: 'ip被封或者是选择不存在的ip',
									 				type: 'error',
									 																		
									 			})
									 			break;
									 			case 4: //调用付款fail
									 			this.$refs.uToast.show({
									 				title: '调起付款失败',
									 				type: 'error',
									 																		
									 			})
									 			break;
									 			default:
									 			console.log(res)
									 				
									 		}
									 	}
									 })
								} else {
									console.log('验证失败');
								}
							});
			},
			actionSheetCallback(index){
				this.form.file_name = this.list[index]['text']
				this.form.file_id = this.list[index]['id']
			},
			trans(name){ //失去焦点
				console.log(this.form[name])
				let self = this
				if(this.form[name]){ //不为空的时候，才去调用接口
					this.$u.api.trans({
						text:this.form[name]
					}).then(res => {
						if(res.code ==200){
							self.form[name+'_en'] = res.data.dst
						}
					})
				}
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
