<template>
	<view>
		<view class="labelTitle">选择要发布的平台</view>
		<view class="list">
		<u-collapse :item-style="itemStyle" @change="setStyle">
			<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/youtube_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> Youtube</view>
						<view class="cellRight">
							<u-checkbox-group>
							<u-checkbox name="Youtube" v-model="checked"  shape="circle"></u-checkbox>
							</u-checkbox-group>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[0].account" placeholder="请输入账号" height="100"/>
				</view>
			</u-collapse-item>
			<u-collapse-item title="facebook">
						<view slot="title-all">
								<view class="cellIcon">
								<u-icon name="../../../static/icon/facebook_icon.png" size="50"></u-icon>
								</view>
								<view class="cellTitle"> Facebook</view>
								<view class="cellRight">
									<u-checkbox-group>
									<u-checkbox name="Facebook" v-model="checked"  shape="circle"></u-checkbox>
									</u-checkbox-group>
								</view>
						</view>
				<view class="collapse-content">
					<u-input v-model="platform[1].account" placeholder="请输入账号" height="100"/>
				</view>
			</u-collapse-item>
			<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/twitter_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> Twitter</view>
						<view class="cellRight">
							<u-checkbox-group>
							<u-checkbox name="twitter" v-model="checked"  shape="circle"></u-checkbox>
							</u-checkbox-group>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[2].account" placeholder="请输入账号" height="100"/>
				</view>
			</u-collapse-item>
			<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/pinterest_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> Pinterst</view>
						<view class="cellRight">
							<u-checkbox-group>
							<u-checkbox name="pinterest" v-model="checked"  shape="circle"></u-checkbox>
							</u-checkbox-group>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[3].account" placeholder="请输入账号" height="100"/>
				</view>
				
			</u-collapse-item>
			<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/linkedin_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> Linkedin</view>
						<view class="cellRight">
							<u-checkbox-group>
							<u-checkbox name="Linkedin" v-model="checked"  shape="circle"></u-checkbox>
							</u-checkbox-group>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[4].account" placeholder="请输入账号" height="100"/>
				</view>
			</u-collapse-item>
			<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/vimeo_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> Vimeo</view>
						<view class="cellRight">
							<u-checkbox-group>
							<u-checkbox name="Vimeo" v-model="checked"  shape="circle"></u-checkbox>
							</u-checkbox-group>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[5].account" placeholder="请输入账号" height="100"/>
				</view>
			</u-collapse-item>
			<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/tiktok_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> Tiktok</view>
						<view class="cellRight">
							<u-checkbox-group>
							<u-checkbox name="Tiktok" v-model="checked"  shape="circle"></u-checkbox>
							</u-checkbox-group>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[6].account" placeholder="请输入账号" height="100"/>
				</view>
			</u-collapse-item>
			<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/veoh_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> Veoh</view>
						<view class="cellRight">
							<u-checkbox-group>
							<u-checkbox name="Veoh" v-model="checked"  shape="circle"></u-checkbox>
							</u-checkbox-group>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="platform[7].account" placeholder="请输入账号" height="100"/>
				</view>
			</u-collapse-item>
			
		</u-collapse>
	    </view>
		<view class="ipTitle">选择IP地址</view>
		<view class="choose">
			<u-form :model="form" ref="uForm" label-width="150rpx">
			<u-form-item label="选择站点">
				<u-input v-model="area" input-align="right" type="select" :select-open="actionSheetShow" placeholder="请选择站点" @click="show = true"></u-input>
			</u-form-item>
			</u-form>
		</view>
		<view class="submit">
			<u-button type="primary" shape="circle" @click="submit">确定</u-button>
		</view>
		<u-action-sheet :list="pricesList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
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
					width:'140rpx',
					height:'50rpx',
				},
				pricesList:[],
				show:false,
				area:'',
				name:'ip1',
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
				// platform:{
				// 	"YouTube": {
				// 		name:"YouTube",
				// 		account:""
				// 	},
				// 	"facebook":{
				// 		name:"facebook",
				// 		account:""
				// 	},
				// 	"Twitter":{
				// 		name:"Twitter",
				// 		account:""
				// 	},
				// 	"pinterest":{
				// 		name:"pinterest",
				// 		account:""
				// 	},
				// 	"linkedin":{
				// 		name:"linkedin",
				// 		account:""
				// 	},
				// 	"vimeo":{
				// 		name:"vimeo",
				// 		account:""
				// 	},
				// 	"tiktok":{
				// 		name:"tiktok",
				// 		account:""
				// 	},
				// 	"veoh":{
				// 		name:"veoh",
				// 		account:""
				// 	}
					
					
				// }
				
				
			}
		},
		onLoad(name) {
			this.name = name
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
			},
			setStyle(value){ 
				console.log(value)
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
					area:this.area,
					platform:JSON.stringify(this.platform)
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
	.labelTitle{
		margin:50rpx 0 0 51rpx;
		font-size: 28rpx;
		color: #393C4C;
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
</style>
