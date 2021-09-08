<template>
	<view>
		
		<template v-if="vuex_hasLogin">
			
			<!-- 已经登录，并且PC端已经设置IP -->
			
			<view class="label">选择分发ip</view>
			<view class="list">
			<u-cell-group>
				<u-radio-group v-model="ip_id">
				<template v-for="(item,index) in cellList">
				<u-cell-item 
				bg-color="#FFF" 
				:title="item.name" 
				:arrow="false" 
				hover-class="none"
				:title-style="{'margin-left': '32rpx','font-size':'32rpx','color':'#333333','font-weight':''}" 
				:value="item.area" 
				:value-style="{'margin-right':'20rpx'}"
				>
					<u-radio :name="item.id" slot="right-icon"></u-radio>
				</u-cell-item>
				<view class="cellBar" @click="account(index)">
					<text class="setText">IP设置</text>
					<u-icon class="icon-right" name="arrow-right"></u-icon>
				</view>
				</template>
				</u-radio-group>
			</u-cell-group>
			</view>
			
			<!-- 新增ip -->
			
			<view class="addip" v-if="len<3">
				<u-cell-group>
					<u-cell-item bg-color="#FFF" title="新增IP" :title-style="{'margin-left':'30rpx'}" @click="addIp">
						<u-icon slot="icon" name="plus" size="36"></u-icon>
					</u-cell-item>
				</u-cell-group>
			</view>
			<!--end-->
			
		</template>
		
		
		<!-- 未登录显示组件-->
		 
		<view class="login" v-if="!vuex_hasLogin">
			<u-button shape="circle" :custom-style="btnStyle2" :ripple="true" ripple-bg-color="#88b9ff" @click="login">注册/登录</u-button>
			<p>体验一键分发功能，请先登录喔</p>
		</view>
		<!-- 未登录显示组件end -->
	
		<view class="label">分发内容选择</view>
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
						<u-image width="48" height="52" src="../../../static/icon/wzff_icon.png"></u-image>
						</view>
						<view class="text">网站分发</view> 
					</view>
				</u-col>
			</u-row>
		</view>
	     
		

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
					width:'211rpx',
					height:'71rpx',
					padding:'22rpx 48rpx 22rpx 48rpx',
					background:'rgb(217,233,253)',
					fontSize:'26rpx',
					color:'#4293F4',
					marginTop:"110rpx"
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
				index:'',
				ip_id:''
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
				if(!this.ip_id){
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
						ip_id: this.ip_id
					}
				});
			},
			webff(){
				console.log(this.ip_id)
				if(!this.vuex_hasLogin){
					this.$u.route('/packageA/pages/login/login');
					return
				}
				if(!this.ip_id){
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
						ip_id: this.ip_id
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
<style>
	page{
		background: #F6F6F8;
	}
</style>
<style scoped>
	.tips{
		font-size: 26rpx;
		margin-top: 140rpx;
		text-align: center;
	}
	.item{
		background:#FFFFFF;
		width: 322rpx;
		height: 132rpx;
		border-radius: 16rpx;
	}
	.cellBar{
		margin-bottom: 20rpx;
		background-color: #fff;
		height: 60rpx;
		line-height: 60rpx;
		color: #999999;
	}
	.setText{
		margin-left: 32rpx;
		font-size: 24rpx;
	}
	.icon-right{
		float: right;
		margin:12rpx 32rpx 16rpx 0;
	}
	.item_img{
		display: inline-block;
		margin: 40rpx 28rpx 40rpx 36rpx;
	}
	.text{
		display: inline-block;
		vertical-align: top;
		font-size: 36rpx;
		margin-top: 42rpx;
	}
	.label{
		 height: 64rpx;
		 padding-left: 32rpx;
		 justify-content: center;
		 align-items: flex-start;
		 display: flex;
		 flex-direction: column;
	}

	.content{
		margin: 0  32rpx;
	}
	.login{
		margin: 74rpx auto 0;
	}
	.login p{
		margin-top: 21rpx;
		text-align: center;
		color:#393C4C;
	}
	.addip{
		margin-top: 29rpx;
	}
	
	
</style>
