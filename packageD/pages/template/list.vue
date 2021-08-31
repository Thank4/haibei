<template>
		<view class="wrap">
			
			<view class="empty" v-if="isEmpty">
				<view class="empty-img">
				<u-image src="../../../static/img/empty_web.png" width="500" height="500"></u-image>
				</view>
				<u-button shape="circle" :custom-style="copyBtn">
					<u-icon name="../../../static/icon/copy_icon.png" :custom-style="{'margin-right':'20rpx'}" size="39"></u-icon>www.seabeeksea..com</u-button>
				<view class="tips">复制链接请到PC端上传您的网站</view>
			</view>
			     
				<view v-for="(item,index) in weblist">
				<view class="item">
					<view class="cover-img">
						<u-image src="../../../static/img/web1.png" width="626" height="482"></u-image>
						<view class="title">
							{{item.name}}
						</view>
					</view>
					<view class="item-content">
						<view class="status">
							<u-row gutter="16">
										<u-col span="7" offset="1">
											<view>
												<view><u-icon name="../../../static/icon/eye_icon.png" size="30" :custom-style="{'margin-right':'19rpx'}"></u-icon>预览</view>
											</view>
											
										</u-col>
										<u-col span="4">
											<view>
												<view v-if="item.status==1">
													<u-icon name="../../../static/icon/plant_icon.png" size="30" :custom-style="{'margin-right':'19rpx'}"></u-icon>
													已发布
												</view>
												<view v-else-if="item.status==2">
													<u-icon name="../../../static/icon/plant_icon.png" size="30" :custom-style="{'margin-right':'19rpx'}"></u-icon>
													未发布
												</view>
											</view>
										</u-col>
							</u-row>
						</view>
						<view class="desc">
							<u-row gutter="5">
										<u-col span="3">
											<view>
												<view>类型：{{item.name}} |</view>
											</view>
											
										</u-col>
										<u-col span="3">
											<view>
												<view>视频数量：{{item.video_num?item.video_num:0}} |</view>
											</view>
											
										</u-col>
										<u-col span="3">
											<view>
												<view>LOGO：{{item.logo_url ? '已上传': '未上传' }} |</view>
											</view>
											
										</u-col>
										<u-col span="3">
											<view>
												<view v-if="item.status==1">
													域名:已设置
												</view>
												<view v-else-if="item.status==2">
													
													<u-button shape="circle" type="primary" hover-class="none"  :custom-style="unsetBtn">
														域名:未设置
													</u-button>
												</view>
											</view>
											
										</u-col>
							</u-row>
						</view>
					</view>
				</view>	
				</view> 
	</view>
</template>

<script>
	export default{
		data(){
			return{
				copyBtn:{
					width:'500rpx',
					height:'76rpx',
					background:'linear-gradient(to right, #4293f4, #4276f4)',
					fontSize:'34rpx',
					color:'#fff',
					marginTop:'80rpx'
				},
				list: [
					{
						name: '全部'
					},
					{
						name: '户外运动'
					},
					{
						name: '3C数码'
					},
					{
						name: '鞋'
					},
					{
						name: '衣服'
					}
				],
				isEmpty:true, //数据是否为空
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				unsetBtn:{
					background:"rgb(219,70,70)",
					color:"#fff",
					width:"130rpx",
					height:"35rpx",
					fontSize:"20rpx",
				    padding:"7rpx 9rpx 8rpx 9rpx",
					marginTop:"10rpx"
				},
				weblist:[]

			}
		},
		onLoad(){
			this.getList()
		},
		methods:{
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
			},
			transition({ detail: { dx } }) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({ detail: { current } }) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			getList(){
				this.$u.api.getSites().then(res=>{
					let self = this
					if(res.code == 200){
						if(res.data.length == 0 ){
							self.isEmpty = true
						}else{
							self.isEmpty = false
							this.weblist = res.data //这边暂时不考虑下拉加载
							
												
						}
					
					}
				})
			}
		}
	}
</script>
<style>
	
</style>
<style scoped>
	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}
	
	.empty{
		text-align: center;
	}
	.empty-img{
		width:500rpx;
		height:500rpx;
		margin:20rpx auto;
	}
	.tips{
		margin-top: 24rpx;
		color: #393C4C;
	}
	.labelTitle{
		height: 90rpx;
		line-height: 90rpx;
		padding-left: 30rpx;
		color: rgb(107,106,112);
	}
	.cell{
		background: #fff;
		margin: 0 30rpx 0 30rpx;
		padding:30rpx;
		border-radius: 20rpx;
	}
	.swiper-box {
		flex: 1;
	}
	.swiper-item {
		height: 100%;
	}
	.mbdzsubmit{
		margin: 152rpx 48rpx 0 48rpx;
	}
	.tips{
		margin-top: 28rpx;
		text-align: center;
		color: rgb(176,176,176);
	}
	.item{
		width:626rpx ;
		margin: 36rpx auto 0;
		box-shadow:0px 0px 18px #aaccff;
		border-radius:0 0 10rpx 10rpx; 
	}
	.cover-img{
	
	}
	.right-icon{
		color: #fff;
	}
	.title{
		text-align: center;
		height: 65rpx;
		line-height: 65rpx;
		background: rgba(0,0,0,.5) 
	}
	.item-content{
		background: rgb(52,130,237);
		color: #FFFFFF;
		border-radius:0 0 10rpx 10rpx; 
	}
	.status{
		height: 62rpx;
		line-height: 62rpx;
		font-size: 25rpx;
		
	}
	.desc{
		font-size: 20rpx;
		height: 57rpx;
		line-height: 57rpx;
	}
</style>
