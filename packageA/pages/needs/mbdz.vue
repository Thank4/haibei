<template>
	<view>
		<view class="labelTitle">站点类型</view>
		<view class="cellCard">
		<u-cell-group >
			<u-radio-group v-model="template_type_name" @change="changeValue">
				<u-cell-item @click="select" :index="item.id" v-for="(item,index) in list" :title="item.name" :arrow="false">
					<u-radio :name="item.name" slot="right-icon"></u-radio>
				</u-cell-item>
	
			</u-radio-group>
		</u-cell-group>
		</view>
		<view class="labelTitle">如果您有参考图请上传，快捷设计出更符合您的需求</view>
		<view class="sitename">
				<u-cell-group>
					<u-upload :custom-btn="true" :action="action" :header="{'Access-Token':vuex_token}" max-count="1" @on-success="uploadSuccess">
					<u-cell-item  slot="addBtn" icon="../../../static/img/upload_icon.png" title="上传参考图" :arrow="false"></u-cell-item>
					</u-upload>
				</u-cell-group>
		</view>	
		<view class="labelTitle">请留下您的联系方式,便于我们进一步理解您的需求</view>
		<view class="sitename">
		<u-input v-model="contact"  :clearable="false" placeholder="请输入联系方式"   height="90" :border="border" />
		</view>
	
		<view class="mbdzsubmit">
			<u-button type="primary" shape="circle"  @click="submit">提交</u-button>
			<view class="tips"><u-icon name="info-circle" :custom-style="{'margin-right':'20rpx'}"  size="35"></u-icon>提交成功后会有专属客服与您联系</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default{
		data(){
			return{
				name:'模板定制',
				template_type_id:'',
				template_type_name:'',
				reference_picture:'',
				contact:'',
				list:[],
				action:'https://wechat.seabeek.cn/weapp/upFiles',
				
			}
		},
		onLoad(){
			this.init()
		},
		methods:{
			init(){
				this.$u.api.getTemplateTypeAll().then(res=>{
					if(res.code ==200 ){
						this.list = res.data
					}
				})
			},
			beforeUpload(){
				console.log('上传之前做的事')
			},
			changeValue(name){
				let self = this
				this.list.map(function(item){
					if(name == item.name){
						self.template_type_id = item.id
					}
				})
				//console.log(name)
			},
			select(event){
				let self = this
				this.list.map(function(item){
					if(event == item.id){
						self.template_type_name = item.name
						self.template_type_id = item.id
					}

				})
			},
			uploadSuccess(res){
				if(res.code == 200){
					this.reference_picture = res.data.res.path
				}
			},
			submit(){
				if(!this.template_type_id){
					this.$refs.uToast.show({
						title: '请选择站点类型',
						position:'top',
						callback:function(){
							return false
						}
					})
					return
				}
				//暂时只做站点类型的强制控制,其他不做强制
				this.$u.api.addCustom({
					name:this.name,
					template_type_id:this.template_type_id,
					reference_picture:this.reference_picture,
					contact:this.contact,
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

<style>
	page{
		background: rgb(246,246,246);
	}
	.labelTitle{
		height: 90rpx;
		line-height: 90rpx;
		padding-left: 30rpx;
		color: rgb(107,106,112);
	}
	.cellCard{
		background: #FFFFFF;
		margin:0 30rpx 0 30rpx;
		border-radius: 15rpx;
	}
	.sitename{
		background: #FFFFFF;
		margin:0 30rpx 0 30rpx;
		padding-left: 30rpx;
	}
	.mbdzsubmit{
		margin: 152rpx 48rpx 0 48rpx;
	}
	.tips{
		margin-top: 28rpx;
		text-align: center;
		color: rgb(176,176,176);
	}
</style>
