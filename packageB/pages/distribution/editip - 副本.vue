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
			</u-collapse-item>
			<u-collapse-item title="facebook">
						<view slot="title-all">
								<view class="cellIcon">
								<u-icon name="../../../static/icon/facebook_icon.png" size="50"></u-icon>
								</view>
								<view class="cellTitle"> Facebook</view>
								<view class="cellRight">
									<u-button shape="circle" :custom-style="reviewBtn">
										审核中
									</u-button>
								</view>
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
			</u-collapse-item>
			<u-collapse-item>
				<view slot="title-all">
						<view class="cellIcon">
						<u-icon name="../../../static/icon/pinterest_icon.png" size="50"></u-icon>
						</view>
						<view class="cellTitle"> Pinterst</view>
						<view class="cellRight">
							<u-checkbox-group>
							<u-checkbox name="Pinterst" v-model="checked"  shape="circle"></u-checkbox>
							</u-checkbox-group>
						</view>
				</view>
				<view class="collapse-content">
					<u-input v-model="value" placeholder="请输入账号" height="100"/>
					<u-input v-model="value" placeholder="请输入密码" height="100"/>
					<view class="confirmBtn"><u-button type="primary" shape="circle" :custom-style="confirmBtn">确认</u-button></view>
					<u-gap height="32" bg-color="#F4F5F6"></u-gap>
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
			</u-collapse-item>
			
		</u-collapse>
	    </view>
		<view class="ipTitle">选择IP地址</view>
		<view class="choose">
			<u-cell-group>
					<u-cell-item title="地址" value="请选择"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="submit">
			<u-button type="primary" shape="circle" disabled>确定</u-button>
		</view>
		
		
		
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
				index:0,
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
		onLoad(index){
			console.log(index)
		},
		methods:{
			init(){
				this.$u.api.getIpAgentList().then(res => {
					console.log(res)
					let self = this
					if(res.code == 200){
						console.log(res)
					}
				})
			},
			setStyle(value){ 
				console.log(value)
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
