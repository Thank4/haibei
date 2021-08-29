<template>
	<view class="wrap">
		<u-form :model="form" ref="uForm" label-width="150rpx">
				<u-form-item label="选择站点">
					<u-input v-model="form.site_name" input-align="right" type="select" :select-open="actionSheetShow" placeholder="请选择站点" @click="show = true"></u-input>
				</u-form-item>
				<u-form-item label="站点域名">
					<u-input v-model="form.domain_name" input-align="right" placeholder="请输入站点域名" @input="changeBtn"/>
					</u-form-item>
				<u-form-item label="账号">
					<u-input v-model="form.account" input-align="right" placeholder="请输入邮箱/会员名" @input="changeBtn" />
					</u-form-item>
				<u-form-item label="密码">
					<u-input v-model="form.password" input-align="right" placeholder="请输入密码" @input="changeBtn"/>
				</u-form-item>
			</u-form>
			<u-action-sheet :list="weblist" v-model="show" @click="actionSheetCallback"></u-action-sheet>
			
		<view class="login-btn">
			<template v-if="disabled">
				<u-button type="primary"  shape="circle" :custom-style="btnStyle1" hover-class="none">登 录</u-button>
			</template>
			<template v-else>
				<u-button type="primary" shape="circle" :custom-style="btnStyle2" @click="bindDomain" :ripple="true" ripple-bg-color="#c0c4cc">登 录</u-button>
			</template>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default{
		data() {
			return{
				form:{
					service:'',
					site_id:'',
					site_name:'',
					account:'',
					password:'',
					domain_name:'',
				},
				weblist:[
					
				],
				show: false,
				border: true,
				disabled:true,
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
		onLoad(data){
			this.form.service = data.name //设置服务商
			this.getAllSites()
		},
		methods:{
			actionSheetCallback(index) {
				uni.hideKeyboard();
				console.log(index)			
				this.form.site_id = this.weblist[index].id
				this.form.site_name = this.weblist[index].text

				
			},
			//获取全部站点
			getAllSites(){
				this.$u.api.getSites().then(res=>{
					let self = this
					if(res.code == 200){
						res.data.map(function(item){
							console.log(item)
							console.log(this)
							self.weblist.push({
								id:item.id,
								text:item.name
							})
						})
					
					}
					console.log(res)
				})
			},
			changeBtn(){
				console.log(this.form.domain_name)
				console.log(this.form.domain_name.length)
				if(this.form.domain_name.length>0&&this.form.account.length>0
				&&this.form.password.length>0){
					this.disabled = false
				}
			},
			//bindDomain
			bindDomain(){
				this.$u.api.bindDomain({
					account:this.form.account,
					password:this.form.password,
					domain_name:this.form.domain_name,
					site_id:this.form.site_id,
					service:this.form.service
				}).then(res=>{
					if(res.code == 200){
						let self = this
						this.$refs.uToast.show({
							title: res.message,
							position:'top',
							callback:function(){
								self.$u.route({
									type:'navigateBack'
								})
							}
						})	
					}
				})
				
			}
		}
	}
</script>

<style scoped>
	.wrap{
		margin: 0 58rpx 0 58rpx;
	}
	.login-btn{
		margin-top: 150rpx;
	}
</style>
