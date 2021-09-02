<template>
	<view>
		
		<view class="labelTitle">选择IP地址</view>
		<template v-if="status == 4">
			<view class="choose">
				<u-cell-item bg-color="#FFF" title="地址" :title-style="{'margin-left':'30rpx'}" :value="area" @click="show = true">
				</u-cell-item>
			</view>
		</template>
		<template v-else>
			<view class="choose">
				<u-cell-item bg-color="#FFF" title="地址" :title-style="{'margin-left':'30rpx'}" :value="area" >
				</u-cell-item>
			</view>
		</template>
		
		
		<view class="labelTitle">选择绑定平台</view>
		<view class="list">
			<template v-if="platform.YouTube.status == 1">
				<u-cell-item bg-color="#FFF" title="YouTube"  value="未分发过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('YouTube')">
					<u-icon slot="icon" name="../../../static/icon/youtube_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			<template v-else-if="platform.YouTube.status == 2">
				<u-cell-item bg-color="#FFF" title="YouTube"  value="校验未通过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('YouTube')">
					<u-icon slot="icon" name="../../../static/icon/youtube_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			<template v-else-if="platform.YouTube.status == 3">
				<u-cell-item bg-color="#FFF" title="YouTube"  value="校验通过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('YouTube')">
					<u-icon slot="icon" name="../../../static/icon/youtube_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			<template v-else-if="platform.YouTube.status == 4">
				<u-cell-item bg-color="#FFF" title="YouTube"  value="ip被封" :title-style="{'margin-left':'30rpx'}"  @click="showModal('YouTube')">
					<u-icon slot="icon" name="../../../static/icon/youtube_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			<template v-else>
				<u-cell-item bg-color="#FFF" title="YouTube"  value="未设置" :title-style="{'margin-left':'30rpx'}"  @click="showModal('YouTube')">
					<u-icon slot="icon" name="../../../static/icon/youtube_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			
			
			<template v-if="platform.facebook.status == 1">
				<u-cell-item bg-color="#FFF" title="facebook"  value="未分发过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('facebook')">
					<u-icon slot="icon" name="../../../static/icon/facebook_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			<template v-else-if="platform.facebook.status == 2">
				<u-cell-item bg-color="#FFF" title="facebook"  value="校验未通过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('facebook')">
					<u-icon slot="icon" name="../../../static/icon/facebook_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			<template v-else-if="platform.facebook.status == 3">
				<u-cell-item bg-color="#FFF" title="facebook"  value="校验通过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('facebook')">
					<u-icon slot="icon" name="../../../static/icon/facebook_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			<template v-else-if="platform.facebook.status == 4">
				<u-cell-item bg-color="#FFF" title="facebook"  value="ip被封" :title-style="{'margin-left':'30rpx'}"  @click="showModal('facebook')">
					<u-icon slot="icon" name="../../../static/icon/facebook_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			<template v-else>
				<u-cell-item bg-color="#FFF" title="facebook"  value="未设置" :title-style="{'margin-left':'30rpx'}"  @click="showModal('facebook')">
					<u-icon slot="icon" name="../../../static/icon/facebook_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			
			<template v-if="platform.Twitter.status == 1">
				<u-cell-item bg-color="#FFF" title="Twitter"  value="未分发过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('Twitter')">
					<u-icon slot="icon" name="../../../static/icon/twitter_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			<template v-else-if="platform.Twitter.status == 2">
				<u-cell-item bg-color="#FFF" title="Twitter"  value="校验未通过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('Twitter')">
					<u-icon slot="icon" name="../../../static/icon/twitter_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			<template v-else-if="platform.Twitter.status == 3">
				<u-cell-item bg-color="#FFF" title="Twitter"  value="校验通过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('Twitter')">
					<u-icon slot="icon" name="../../../static/icon/twitter_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			<template v-else-if="platform.Twitter.status == 4">
				<u-cell-item bg-color="#FFF" title="Twitter"  value="ip被封" :title-style="{'margin-left':'30rpx'}"  @click="showModal('Twitter')">
					<u-icon slot="icon" name="../../../static/icon/twitter_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			<template v-else>
				<u-cell-item bg-color="#FFF" title="Twitter"  value="未设置" :title-style="{'margin-left':'30rpx'}"  @click="showModal('Twitter')">
					<u-icon slot="icon" name="../../../static/icon/twitter_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			
			<template v-if="platform.pinterest.status == 1">
				<u-cell-item bg-color="#FFF" title="pinterest"  value="未分发过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('pinterest')">
					<u-icon slot="icon" name="../../../static/icon/pinterest_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			<template v-else-if="platform.pinterest.status == 2">
				<u-cell-item bg-color="#FFF" title="pinterest"  value="校验未通过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('pinterest')">
					<u-icon slot="icon" name="../../../static/icon/pinterest_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			<template v-else-if="platform.pinterest.status == 3">
				<u-cell-item bg-color="#FFF" title="Twitter"  value="校验通过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('pinterest')">
					<u-icon slot="icon" name="../../../static/icon/pinterest_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			<template v-else-if="platform.pinterest.status == 4">
				<u-cell-item bg-color="#FFF" title="pinterest"  value="ip被封" :title-style="{'margin-left':'30rpx'}"  @click="showModal('pinterest')">
					<u-icon slot="icon" name="../../../static/icon/pinterest_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			<template v-else>
				<u-cell-item bg-color="#FFF" title="pinterest"  value="未设置" :title-style="{'margin-left':'30rpx'}"  @click="showModal('pinterest')">
					<u-icon slot="icon" name="../../../static/icon/pinterest_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			
			<template v-if="platform.linkedin.status == 1">
				<u-cell-item bg-color="#FFF" title="linkedin"  value="未分发过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('linkedin')">
					<u-icon slot="icon" name="../../../static/icon/linkedin_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			<template v-else-if="platform.linkedin.status == 2">
				<u-cell-item bg-color="#FFF" title="linkedin"  value="校验未通过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('linkedin')">
					<u-icon slot="icon" name="../../../static/icon/linkedin_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			<template v-else-if="platform.linkedin.status == 3">
				<u-cell-item bg-color="#FFF" title="linkedin"  value="校验通过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('linkedin')">
					<u-icon slot="icon" name="../../../static/icon/linkedin_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			<template v-else-if="platform.linkedin.status == 4">
				<u-cell-item bg-color="#FFF" title="linkedin"  value="ip被封" :title-style="{'margin-left':'30rpx'}"  @click="showModal('linkedin')">
					<u-icon slot="icon" name="../../../static/icon/linkedin_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			<template v-else>
				<u-cell-item bg-color="#FFF" title="linkedin"  value="未设置" :title-style="{'margin-left':'30rpx'}"  @click="showModal('linkedin')">
					<u-icon slot="icon" name="../../../static/icon/linkedin_icon.png" size="50"></u-icon>
				</u-cell-item>
			</template>
			
			
		<template v-if="platform.vimeo.status == 1">
			<u-cell-item bg-color="#FFF" title="vimeo"  value="未分发过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('vimeo')">
				<u-icon slot="icon" name="../../../static/icon/vimeo_icon.png" size="50"></u-icon>
			</u-cell-item>
		</template>
		<template v-else-if="platform.vimeo.status == 2">
			<u-cell-item bg-color="#FFF" title="vimeo"  value="校验未通过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('vimeo')">
				<u-icon slot="icon" name="../../../static/icon/vimeo_icon.png" size="50"></u-icon>
			</u-cell-item>
		</template>
		<template v-else-if="platform.vimeo.status == 3">
			<u-cell-item bg-color="#FFF" title="vimeo"  value="校验通过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('vimeo')">
				<u-icon slot="icon" name="../../../static/icon/vimeo_icon.png" size="50"></u-icon>
			</u-cell-item>
		</template>
		<template v-else-if="platform.vimeo.status == 4">
			<u-cell-item bg-color="#FFF" title="vimeo"  value="ip被封" :title-style="{'margin-left':'30rpx'}"  @click="showModal('vimeo')">
				<u-icon slot="icon" name="../../../static/icon/vimeo_icon.png" size="50"></u-icon>
			</u-cell-item>
		</template>
		<template v-else>
			<u-cell-item bg-color="#FFF" title="vimeo"  value="未设置" :title-style="{'margin-left':'30rpx'}"  @click="showModal('vimeo')">
				<u-icon slot="icon" name="../../../static/icon/vimeo_icon.png" size="50"></u-icon>
			</u-cell-item>
		</template>
		
		<template v-if="platform.tiktok.status == 1">
			<u-cell-item bg-color="#FFF" title="tiktok"  value="未分发过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('tiktok')">
				<u-icon slot="icon" name="../../../static/icon/tiktok_icon.png" size="50"></u-icon>
			</u-cell-item>
		</template>
		<template v-else-if="platform.tiktok.status == 2">
			<u-cell-item bg-color="#FFF" title="tiktok"  value="校验未通过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('tiktok')">
				<u-icon slot="icon" name="../../../static/icon/tiktok_icon.png" size="50"></u-icon>
			</u-cell-item>
		</template>
		<template v-else-if="platform.tiktok.status == 3">
			<u-cell-item bg-color="#FFF" title="tiktok"  value="校验通过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('tiktok')">
				<u-icon slot="icon" name="../../../static/icon/tiktok_icon.png" size="50"></u-icon>
			</u-cell-item>
		</template>
		<template v-else-if="platform.tiktok.status == 4">
			<u-cell-item bg-color="#FFF" title="tiktok"  value="ip被封" :title-style="{'margin-left':'30rpx'}"  @click="showModal('tiktok')">
				<u-icon slot="icon" name="../../../static/icon/tiktok_icon.png" size="50"></u-icon>
			</u-cell-item>
		</template>
		<template v-else>
			<u-cell-item bg-color="#FFF" title="tiktok"  value="未设置" :title-style="{'margin-left':'30rpx'}"  @click="showModal('tiktok')">
				<u-icon slot="icon" name="../../../static/icon/tiktok_icon.png" size="50"></u-icon>
			</u-cell-item>
		</template>
		
		<template v-if="platform.veoh.status == 1">
			<u-cell-item bg-color="#FFF" title="veoh"  value="未分发过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('veoh')">
				<u-icon slot="icon" name="../../../static/icon/veoh_icon.png" size="50"></u-icon>
			</u-cell-item>
		</template>
		<template v-else-if="platform.veoh.status == 2">
			<u-cell-item bg-color="#FFF" title="veoh"  value="校验未通过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('veoh')">
				<u-icon slot="icon" name="../../../static/icon/veoh_icon.png" size="50"></u-icon>
			</u-cell-item>
		</template>
		<template v-else-if="platform.veoh.status == 3">
			<u-cell-item bg-color="#FFF" title="veoh"  value="校验通过" :title-style="{'margin-left':'30rpx'}"  @click="showModal('veoh')">
				<u-icon slot="icon" name="../../../static/icon/veoh_icon.png" size="50"></u-icon>
			</u-cell-item>
		</template>
		<template v-else-if="platform.veoh.status == 4">
			<u-cell-item bg-color="#FFF" title="veoh"  value="ip被封" :title-style="{'margin-left':'30rpx'}"  @click="showModal('veoh')">
				<u-icon slot="icon" name="../../../static/icon/veoh_icon.png" size="50"></u-icon>
			</u-cell-item>
		</template>	
		<template v-else>
			<u-cell-item bg-color="#FFF" title="veoh"  value="未设置" :title-style="{'margin-left':'30rpx'}"  @click="showModal('veoh')">
				<u-icon slot="icon" name="../../../static/icon/veoh_icon.png" size="50"></u-icon>
			</u-cell-item>
		</template>
			
		</view>
		
		
		<template v-if="status == 4">
			<view class="submit">
				<u-button type="primary" shape="circle" @click="updateIp">修改</u-button>
			</view>
		</template>
		<template v-else>
			<view class="submit">
				<u-button type="primary" shape="circle" disabled="true">不可修改</u-button>
			</view>
		</template>
		
		
		<u-action-sheet :list="pricesList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
		<u-toast ref="uToast" />
		<u-popup v-model="modal" mode="bottom">
					  <view class="modalTitle">
					      {{modalTitle}}
					  </view>
					  <view class="modalDesc">
						  {{modalDesc}}
					  </view>
					  <view class="modalInput">
						  <u-input 
						  v-model="modalValue"
						  height="102"
						  :custom-style="{'font-size':'28rpx','background':'#F5F5F5','padding-left':'44rpx'}"
						  placeholder="请输入您的账号" />
					  </view>
					  <view class="modalBtn">
					  <u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="setAccount">确定</u-button>
					  </view>
		</u-popup>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				reviewBtn:{
					width:'111rpx',
					height:'45rpx',
					padding:'23rpx 50rpx 25rpx 50rpx',
					background:'rgb(217,233,253)',
					fontSize:'22rpx',
					color:'#4293F4',
					marginRight:'20rpx'
				},
				confirmBtn:{
					width: '630rpx',
					height: '100rpx',
					background: '#428BF4'
				},
				index:0,
				platform:[],
				area:'',
				status:'',
				ip_id:'',
				price:'',
				pricesList:[], //地区及价格列表
				show:false,
				modalTitle:'',
				modalDesc:'',
				modalValue:'',
				modal:false,
				modalIndex:'', //当前modal 指针
			}
		},
		onLoad(data){
			this.index = data.index
			this.init()
		},
		methods:{
			init(){
				this.$u.api.getIpAgentList().then(res => {
					console.log(res)
					if(res.code == 200){
						console.log(res.data.ip_agent[this.index])
						this.area = res.data.ip_agent[this.index]['area']
						this.status = res.data.ip_agent[this.index]['status']
						console.log('这个ip的状态'+this.status)
						this.ip_id = res.data.ip_agent[this.index]['id']
						this.price = res.data.ip_agent[this.index]['price']
						
						let self = this
						for(let i in res.data.ip_arr){
							console.log(this.area+'aaaaaaaaaaaaaaaa')
							if(res.data.ip_arr[i]['area'] == self.area){
								self.ip_code = res.data.ip_arr[i]['name']
							}
							self.pricesList.push({
								name:res.data.ip_arr[i]['name'],
								price:res.data.ip_arr[i]['price'],
								area:res.data.ip_arr[i]['area'],
								text:res.data.ip_arr[i]['area'],
								subText:res.data.ip_arr[i]['price'],
							})
							
						}
						this.platform = res.data.ip_agent[this.index]['platform']
					
					
					}
				})
			},
			actionSheetCallback(index) {	
				this.area = this.pricesList[index].text
				this.ip_code = this.pricesList[index].name
				console.log(this.area)
				console.log(this.ip_code)
			},
			editAccount(account,name){
				let self = this
				this.$u.api.addIpAgentOne({
					'account':account,
					'ip_id':this.ip_id,
					'platform':name
				}).then(res => {
					if(res.code ==200 ){
						self.$refs.uToast.show({
						title: '提交成功，等待审核',
					})
					}
				})
				console.log(this.ip_id)
				console.log(account)
				console.log(name)
			},
			showModal(value){ 
				console.log(value)
			    console.log(this.platform)
				console.log(this.platform[value].account)
				console.log(this.platform[value].status)
				
				this.modalTitle = value
				
				if(this.platform[value].status ==1){
					this.modal = true
					this.modalDesc = '待审核，此账号还未分发过'
					this.modalValue = this.platform[value].account
					// console.log(this.platform[value].id)
					// return
					// this.$u.api.updatePlatfrom({
					// 	id:this.platform[value].id,
		   //              account:this.modalValue
					// }).then(res => {
						
					// })
				}else if(this.platform[value].status ==2){
					this.modal = true
					this.modalDesc = '账号异常，请核对您的账号'
					this.modalValue = this.platform[value].account
					// console.log(this.platform[value].id)
					// return
				}else if(this.platform[value].status ==3){
					
				}else if(this.platform[value].status ==4){
					
				}else{
					this.modal = true
					this.modalDesc = '请填写您的账号'
					this.modalValue = this.platform[value].account
					
				}
				
				
				
			},
			setAccount(){
				if(!this.modalValue){
					this.$refs.uToast.show({
						title: '请填写平台账号',
						type: 'primary',
						duration: '2300'
					})
					return
				}
				if(this.platform[this.modalTitle].status == 1){
					this.$u.api.updatePlatfrom({
						id:this.platform[this.modalTitle].id,
						account:this.modalValue
								}).then(res => {
									let self = this
									if(res.code == 200){
										this.$refs.uToast.show({
											title: '修改成功',
											position:'top',
											callback:function(){
												self.modal = false
											}
										})	
									}
								})
				}else if(this.platform[this.modalTitle].status == 0){
					this.$u.api.addIpAgentOne({
					    ip_id:this.ip_id,
						platform:this.modalTitle,
						account:this.modalValue,
								}).then(res => {
									let self = this
									if(res.code == 200){
										this.$refs.uToast.show({
											title: res.message,
											position:'top',
											callback:function(){
												self.modal = false
											}
										})	
									}
								})
				}
				
				
			},
			updateIp(){
				console.log('修改')
				if(!this.area){
					this.$refs.uToast.show({
						title: '请选择区域',
					})
					return
				}
				console.log(this.platform)
				this.$u.api.upIpAgent({
					ip_id:this.ip_id,
					area:this.ip_code,
					platform:JSON.stringify(this.platform)
				}).then(res =>{
					if(res.code == 200){
						this.$refs.uToast.show({
							title: res.message,
							position:'top',
							back:true
						})	
					}
				})
			
				
			}
		}
	}
</script>

<style>
	page{
		
	}
</style>
<style scoped>
	.labelTitle {
	  height: 64rpx;
	  width: 750rpx;
	  justify-content: flex-end;
	  align-items: flex-start;
	  display: flex;
	  flex-direction: column;
	  padding: 0 0 8rpx 32rpx;
	}
	.info1 {
	  z-index: 53;
	  width: 138rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(187,187,187,1);
	  font-size: 28rpx;
	  font-family: PingFangSC-Medium;
	  white-space: nowrap;
	  line-height: 40rpx;
	  text-align: left;
	}

	.list{
		margin: 33rpx 46rpx 0 45rpx;
		background: rgb(246,246,248);
	}
	.cellIcon{
		float: left;
		margin-left: 33rpx;
		
	}
	.cellTitle{
		float: left;
		vertical-align: top;
		margin-left: 40rpx;
		height: 50rpx;
		line-height: 50rpx;
	}
	.cellRight{
		position: absolute;
		right: 0;
	}
	.collapse-content{
		background: #FFFFFF;
		padding-left: 10rpx;
	}
	.confirmBtn{
		margin: 27rpx auto 27rpx;
	}
	.ipTitle{
		margin: 50rpx 0 20rpx 40rpx;
		font-size: 28rpx;
		color: #393C4C;
	}
	.choose{
		margin: 0 45rpx 0 45rpx;
		background-color: rgb(246,246,248);
	}
	.submit{
		margin: 152rpx 48rpx 0 48rpx;
	}
	.modalTitle{
		color: #333333;
		font-size: 32rpx;
		text-align: center;
		margin:20rpx auto 24rpx;
	}
	.modalDesc{
		font-size: 24rpx;
		text-align: center;
		color: #CCCCCC;
	}
	.modalInput{
		width: 686rpx;
		height: 102rpx;
		background: #F5F5F5;
		border-radius: 16rpx;
		margin: 40rpx auto;
	}
	.modalBtn{
		width: 630rpx;
		margin:0 auto 128rpx;
	}
</style>
