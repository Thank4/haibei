<template>
	<view>
		
		<view class="labelTitle">选择IP地址</view>
		<view class="choose">
			<u-cell-item bg-color="#FFF" title="地址" :title-style="{'margin-left':'30rpx'}" :value="area" @click="show = true">
			</u-cell-item>
		</view>
		<view class="labelTitle">选择绑定平台</view>
		<view class="list">
			<u-cell-item bg-color="#FFF" title="YouTube"  value="设置" :title-style="{'margin-left':'30rpx'}"  @click="showModal('YouTube')">
				<u-icon slot="icon" name="../../../static/icon/youtube_icon.png" size="50"></u-icon>
			</u-cell-item>
			<u-cell-item bg-color="#FFF" title="facebook"  value="设置" :title-style="{'margin-left':'30rpx'}"  @click="showModal('facebook')">
				<u-icon slot="icon" name="../../../static/icon/facebook_icon.png" size="50"></u-icon>
			</u-cell-item>
			<u-cell-item bg-color="#FFF" title="Twitter"  value="设置" :title-style="{'margin-left':'30rpx'}"  @click="showModal('Twitter')">
				<u-icon slot="icon" name="../../../static/icon/twitter_icon.png" size="50"></u-icon>
			</u-cell-item>
			<u-cell-item bg-color="#FFF" title="pinterest"  value="设置" :title-style="{'margin-left':'30rpx'}" @click="showModal('pinterest')">
				<u-icon slot="icon" name="../../../static/icon/pinterest_icon.png" size="50"></u-icon>
			</u-cell-item>
			<u-cell-item bg-color="#FFF" title="linkedin"  value="设置" :title-style="{'margin-left':'30rpx'}" @click="showModal('linkedin')">
				<u-icon slot="icon" name="../../../static/icon/linkedin_icon.png" size="50"></u-icon>
			</u-cell-item>
			<u-cell-item bg-color="#FFF" title="vimeo"  value="设置" :title-style="{'margin-left':'30rpx'}"  @click="showModal('vimeo')">
				<u-icon slot="icon" name="../../../static/icon/vimeo_icon.png" size="50"></u-icon>
			</u-cell-item>
			<u-cell-item bg-color="#FFF" title="tiktok"  value="设置" :title-style="{'margin-left':'30rpx'}"  @click="showModal('tiktok')">
				<u-icon slot="icon" name="../../../static/icon/tiktok_icon.png" size="50"></u-icon>
			</u-cell-item>
			<u-cell-item bg-color="#FFF" title="veoh"  value="设置" :title-style="{'margin-left':'30rpx'}"  @click="showModal('veoh')">
				<u-icon slot="icon" name="../../../static/icon/veoh_icon.png" size="50"></u-icon>
			</u-cell-item>
	    </view>
		
		<view class="submit">
			<u-button type="primary" shape="circle" @click="submit">确定</u-button>
		</view>
		<u-action-sheet :list="pricesList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
		<u-toast ref="uToast" />
		<u-popup v-model="modal" mode="bottom">
					  <view class="modalTitle">
					      {{modalTitle}}
					  </view>
					  <view class="modalDesc">
						  请填写您的账号
					  </view>
					  <view class="modalInput">
						  <u-input 
						  v-model="modalValue"
						  height="102"
						  :custom-style="{'font-size':'28rpx','background':'#F5F5F5','padding-left':'44rpx'}"
						   placeholder="请输入平台账号" />
					  </view>
					  <view class="modalBtn">
					  <u-button type="primary" shape="circle" :custom-style="confirmBtn" @click="setAccount">确定</u-button>
					  </view>
	    </u-popup>
		<u-toast ref="uToast" />
		
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
				pricesList:[],
				modalTitle:'',
				modalValue:'',
				modal:false,
				show:false,
				area:'', //选择地区名称
				ip_code:'', //选择地区代码
				name:'ip1', //新建IP名称
				platform:[
					{
						name:"YouTube",
						account:'',
						password:''
					},
					{
						name:"facebook",
						account:'',
						password:''
					},
					{
						name:"Twitter",
						account:'',
						password:''
					},
					{
						name:"pinterest",
						account:'',
						password:''
					},
					{
						name:"linkedin",
						account:'',
						password:''
					},
					{
						name:"vimeo",
						account:'',
						password:''
					},
					{
						name:"tiktok",
						account:'',
						password:''
					},
					{
						name:"veoh",
						account:'',
						password:''
					},
				]
				
				
			}
		},
		onLoad(data) {
			this.name = data.name
			console.log(this.name)
			this.init()
		},
		methods:{
			init(){
				this.$u.api.getIpAgentList().then(res => {
					console.log(res)
					let self = this
					if(res.code == 200){
						console.log(res.data.ip_arr)
						for(let i in res.data.ip_arr){
							self.pricesList.push({
								name:res.data.ip_arr[i]['name'],
								price:res.data.ip_arr[i]['price'],
								area:res.data.ip_arr[i]['area'],
								text:res.data.ip_arr[i]['area'],
								subText:res.data.ip_arr[i]['price'],
							})
							
						}
					}
				})
			},
			actionSheetCallback(index) {
				uni.hideKeyboard();		
				this.area = this.pricesList[index].text
				this.ip_code = this.pricesList[index].name
			},
			showModal(name){
				console.log(name)
				this.modal = true
				this.modalTitle = name
				let self = this
				this.platform.map(function(item){
					if(item.name == name){
						self.modalValue = item.account
					}
				})
			},
			setAccount(){
				console.log(this.modalValue)
				if(!this.modalValue){
					this.$refs.uToast.show({
						title: '请填写平台账号',
						type: 'primary',
						duration: '2300'
					})
					return
				}
				let self = this
				this.platform.map(function(item,index){
					console.log(item.name)
					console.log(self.modalTitle)
					if(item.name == self.modalTitle){
						self.platform[index]['account'] = self.modalValue
						self.modal = false
						self.modalValue = ''
					}
				})
				console.log(this.platform)
			},
			submit(){
				if(!this.area){
					this.$refs.uToast.show({
						title: '请选择区域',
					})
					return
				}
				this.$u.api.addIpAgent({
					name:this.name,
					ip_id:0,
					area:this.ip_code,
					platform:JSON.stringify(this.platform)
				}).then(res=>{
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
		background: #F6F6F8;
	}
</style>
<style scoped>
	.labelTitle{
			 height: 64rpx;
			 padding-left: 32rpx;
			 justify-content: center;
			 align-items: flex-start;
			 display: flex;
			 flex-direction: column;
	}
	.list{
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
		background-color: #FFFFFF;
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
