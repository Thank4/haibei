<template>
	<view class="wrap">
		<view class="title">
			<u-input v-model="title" placeholder="输入视频名称" :type="type" :border="border" @blur="trans('title')"/>
		</view>
		<u-row gutter="16">
			<u-col span="9">
				<view>
					<u-input v-model="desc" height="400" type="textarea" :clearable="false"  @blur="trans('desc')"
						placeholder="输入视频内容(....字内)" />
				</view>
			</u-col>
			<u-col span="3">
				<view>
					<u-image width="120rpx" height="126rpx" :src="preview"></u-image>
				</view>
			</u-col>
		</u-row>
		
		<u-cell-group>
			<u-form-item  prop="tags" label-position="top">
				<u-input v-model="tags" type="text"  placeholder="请输入网站标签" @blur="trans('tags')"/>
			</u-form-item>
				<!-- <u-cell-item  title="视频标签">
					<u-icon name="../../../static/icon/tag_icon.png" size="20" :custom-style="{'margin-right':'20rpx'}" slot="icon"></u-icon>
					<view slot="">
						<u-tag text="#女装" mode="plain" shape="circle" type="error" />
						<u-tag text="#男装" mode="plain" shape="circle" type="error" />
					</view>
				</u-cell-item> -->
		</u-cell-group>
		<view class="submit">
			<u-button type="primary" shape="circle" @click="submit">一键分发</u-button>
		</view>
		<u-toast ref="uToast" />

	</view>
</template>

<script>
	export default{
		data(){
			return{
				file_id:'',
				preview:'',
				title:'',
				title_en:'',
				desc:'',
				desc_en:'',
				tags:'',
				tags_en:'',
				type:'video',
				ip_id:'',
				package_id:''
			}
		},
		onLoad(data){
			if(!data.file_id){
				console.log('不合法')
				return
			}
			this.file_id = data.file_id
			this.preview = data.preview
			this.ip_id = data.ip_id
			data.package_id ? this.package_id = data.package_id :this.package_id  = 0
			
			console.log(this.file_id)
			console.log(this.preview)
			console.log(this.ip_id)
			console.log(this.package_id)
			
			
		},
		methods:{
			init(){
				
			},
			trans(name){ //失去焦点
				let self = this
				if(this[name]){ //不为空的时候，才去调用接口
					this.$u.api.trans({
						text:this[name]
					}).then(res => {
						if(res.code ==200){
							self[name+'_en'] = res.data.dst
						}
					})
				}
				
				
			},
			submit(){
				//验证
				let self = this
				if(!this.title){
					this.$refs.uToast.show({
						position:'top',
						title:'标题不能为空'
						})
						return
				}
				if(this.tags&&!this.tags_en){
					
					this.$u.api.trans({
						text:this.tags
					}).then(res => {	
						if(res.code ==200){
							self.tags_en = res.data.dst
						}
				})
				}
				console.log('验证通过');
				console.log(this.file_id)
				console.log(this.title)
				console.log(this.desc)
				console.log(this.tags)
				console.log(this.title_en)
				console.log(this.desc_en)
				console.log(this.tags_en)
				console.log(this.ip_id)
				console.log(this.vuex_openId)
				
				//TODO  一键分发,调起支付
				this.$u.api.share({
					file_id:this.file_id,
					title:this.title,
					desc:this.desc,
					tags:this.tags,
					title_en:this.title_en,
					desc_en:this.desc_en,
					tags_en:this.tags_en,
					type:'video',
					ip_id:this.ip_id,
					openId:this.vuex_openId,
					package_id:this.package_id
				}).then(res =>{
					if(res.code ==200){
						console.log(res.data.status,'查看状态')
						switch(Number(res.data.status)){
							case 1: //未付款,
							//TODO 微信小程序支付
							/***首次进来需要付费***/
							uni.setStorageSync('order_res', res.data);
							this.$u.route({
								url:'/packageE/pages/packages/pay',
								params:{
									file_id:this.file_id,
									title:this.title,
									desc:this.desc,
									tags:this.tags,
									title_en:this.title_en,
									desc_en:this.desc_en,
									tags_en:this.tags_en,
									type:'video',
									ip_id:this.ip_id,
									openId:this.vuex_openId,
									package_id:this.package_id,
								}
							})
							console.log(res.data)
							// uni.requestPayment({
							//     provider: 'wxpay',
							// 	timeStamp:res.data.prepay.timeStamp,
							// 	nonceStr:res.data.prepay.nonceStr,
							// 	package: res.data.prepay.package,
							// 	signType: res.data.prepay.signType,
							// 	paySign: res.data.prepay.paySign,
							//     success: function (response) {
							//         //支付成功回调,并跳转页面
							// 		self.$u.api.setShareHistory({
							// 			order_no:res.data.order_no
							// 		}).then(res =>{
							// 			if(res.code == 200){
							// 				//TODO 跳转支付成功页面，提示
							// 				self.$u.route('/packageB/pages/distribution/paySuccess')
							// 			}
							// 		})		
							//     },
							//     fail: function (err) {
							// 		console.log('失败回调订单号',res.data.order_no)
							// 		self.$u.api.cancelPay({
							// 			'order_no':res.data.order_no
							// 		}).then(res => {
							// 			//TODO,支付失败
							// 			self.$refs.uToast.show({
							// 				title: '支付失败,请重试',
							// 				type: 'error',
							
							// 			})
							// 		})
							//         console.log('fail:' + JSON.stringify(err));
							//     }
							// });
							/***  end ***/	
							break;
							case 2: //正常分发
							console.log(res)
							this.$refs.uToast.show({
								title: res.data.desc,
								isTab:true,
								url:'/pages/tabBar/distribute/distribute'
																						
							})
							break;
							case 3: //ip被封或不存在
							this.$refs.uToast.show({
								title: res.data.desc,
								type: 'error',
																						
							})
							break;
							case 4: //调用付款fail
							this.$refs.uToast.show({
								title: res.data.desc,
								type: 'error',
																						
							})
							break;
							case 5: //未到PC端进行配置
							this.$refs.uToast.show({
								title: res.data.desc,
								type: 'error',
							})
							default:
							console.log(res)
								
						}
					}
				})
				
			}
		}
	}
</script>

<style scoped>
	.wrap {
		margin: 50rpx 49rpx 0 49rpx;
	}
	.title{
		margin:0 0rpx 20rpx 10rpx;
	}
	.submit{
		margin: 152rpx 48rpx 0 48rpx;
	}
</style>
