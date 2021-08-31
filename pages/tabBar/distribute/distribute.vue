<template>
	<view>
		
		<template v-if="vuex_hasLogin">
			
			<!-- 已经登录，并且PC端已经设置IP -->
			
			<view class="label">选择ip</view>
			
			
			<view class="list">
			<u-cell-group>
				<u-radio-group v-model="index" width ="160rpx">
					<template v-for="(item,index) in cellList">
					<u-gap height="32"></u-gap>
					<u-cell-item bg-color="#F4F5F6" title="ip1" :arrow="false"  :title-style="{'margin-left': '38rpx','font-size':'30rpx'}" >
						<u-image width="42" height="50" slot="icon" src="/static/icon/ip_icon.png"></u-image>
						<u-button type="primary" shape ="circle" :custom-style="edit" @click="account(index)">编辑</u-button>
						<u-radio :name="item.id" slot="right-icon">{{item.area}}</u-radio>
					</u-cell-item>
					</template>
				
					</u-radio-group>
			</u-cell-group>
			</view>
			
			<!-- 新增ip -->
			<view class="addip" v-if="len<3">
				<u-button shape="circle" :custom-style="addBtn" @click="addIp">
					<u-icon name="../../../static/icon/add_icon.png" :custom-style="{'margin-right':'20rpx'}" size="24"></u-icon>
					新增ip
				</u-button>
			</view>
			<!--end-->
			
		</template>
		
	
		<view class="labelTitle">一键分发</view>
		<view class="content">
			<u-row>
				<u-col span="6">
					<view class="item" @click="spff">
						<view class="item_img">
						<u-image width="47" height="47" src="../../../static/icon/spff_icon.png"></u-image>
						</view>
						<view class="text">视频分发</view>
					</view>
				</u-col>
				<u-col span="6">
					<view class="item" @click="webff">
						<view class="item_img">
						<u-image width="47" height="47" src="../../../static/icon/wzff_icon.png"></u-image>
						</view>
						<view class="text">网站分发</view>
					</view>
				</u-col>
			</u-row>
		</view>
	     
		 <!-- 未登录显示组件-->
		 
	    <view class="login" v-if="!vuex_hasLogin">
	    	<u-button shape="circle" :custom-style="btnStyle2" :ripple="true" ripple-bg-color="#88b9ff" @click="login">注册/登录</u-button>
	    	<p>体验一键建站功能，请先登录喔</p>
	    </view>
		<!-- 未登录显示组件end -->

		<u-toast ref="uToast" />
		
		<!-- ActionSheet 操作 -->
		<u-action-sheet :list="list" v-model="show"></u-action-sheet>
		<!--ActionSheet  end -->
		
		<!--TopTips-->
		<u-top-tips ref="uTips"></u-top-tips>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,        //ActionSheet
				list: [ {
							text: '本地上传'
						}, {
							text: '视频库' 
						}],
				itemStyle: {
				    background:"rgb(246,246,248)"
				},
				edit:{
					width:'100rpx',
					height:'50rpx',
					fontSize:'25rpx'
				},
				btnStyle:{
					width:'500rpx',
					height:'76rpx',
					padding:'25rpx 0 27rpx 0',
					background:'linear-gradient(to right, #4293f4, #4276f4)',
					fontSize:'30rpx',
					color:'#fff',
					marginTop:'133rpx'
				},
				btnStyle2:{
					width:'319rpx',
					height:'80rpx',
					padding:'23rpx 88rpx 25rpx 85rpx',
					background:'linear-gradient(to right, #4293f4, #4276f4)',
					fontSize:'34rpx',
					color:'#fff',
					marginTop:'179rpx'
				},
				addBtn:{
					width:'319rpx',
					height:'80rpx',
					padding:'23rpx 88rpx 25rpx 85rpx',
					background:'rgb(217,233,253)',
					fontSize:'34rpx',
					color:'#4293F4',
				},
				cellList:[] ,//ip列表
				len:0          ,//用于记录当前已经创建ip,限制3个\
				index:''
			}
		},
		onShow(){
			this.init()
		},
		methods: {
			init(){
				if(this.vuex_hasLogin){ //登录了，才去调用获取iplist
				this.$u.api.getIpAgentList().then(res =>{
					if(res.code == 200){
						this.cellList = res.data.ip_agent
						this.len = res.data.ip_agent.length
					}
					
				})
				}
			},
			spff(){
				if(!this.vuex_hasLogin){
					this.$u.route('/packageA/pages/login/login');
					return
				}
				if(!this.index){
					this.$refs.uTips.show({
						title: '请选择ip',
						type: 'primary',
						duration: '2300'
					})
					return
				}
				this.$u.route({
					url:'/packageB/pages/distribution/videos',
					params: {
						ip_id: this.index
					}
				});
			},
			webff(){
				if(!this.vuex_hasLogin){
					this.$u.route('/packageA/pages/login/login');
					return
				}
				if(!this.index){
					this.$refs.uTips.show({
						title: '请选择ip',
						type: 'primary',
						duration: '2300'
					})
					return
				}
				this.$u.route({
					url:'/packageB/pages/distribution/webff',
					params: {
						ip_id: this.index
					}
				});
				
			},
			login(){
				this.$u.route('/packageA/pages/login/login');
			},
			addIp(){
				console.log('执行')
				this.$u.route({
					url:'/packageB/pages/distribution/bindip',
					params: {
						name: 'ip'+(this.len+1)
					}
					});
			},
			account(index){ //去编辑ip
				this.$u.route({
					url:'/packageB/pages/distribution/editip',
					params: {
						index: index
					}
				});
			}
		}
	}
</script>

<style scoped>
	.tips{
		font-size: 26rpx;
		margin-top: 140rpx;
		text-align: center;
	}
	.item{
		background: rgb(241,245,254);
		width: 319rpx;
		height: 130rpx;
		border-radius: 15rpx;
	}
	.item_img{
		display: inline-block;
		margin: 49rpx 33rpx 39rpx 59rpx;
	}
	.text{
		display: inline-block;
		vertical-align: top;
		margin-top: 49rpx;
	}
	.label{
		margin: 50rpx 0 37rpx 49rpx;
	}
	.labelTitle{
		margin: 189rpx 0 37rpx 49rpx;
	}
	.content{
		margin: 0  46rpx;
	}
	.login{
		margin: 74rpx auto 0;
	}
	.login p{
		margin-top: 21rpx;
		text-align: center;
		color:#393C4C;
	}
	.list{
		margin: 0 45rpx 0 45rpx;
	}
	.addip{
		margin-top: 29rpx;
	}
</style>
