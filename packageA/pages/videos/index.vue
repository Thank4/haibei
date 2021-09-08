<template>
	<view class="wrap">
		<!-- 搜索框功能 暂时隐藏 -->
		<!-- <view class="search">
		<u-search placeholder="输入关键词" v-model="keyword" :show-action="false" @focus="search"></u-search>
		</view> -->
		<!-- 搜索框功能 暂时隐藏 -->
		<u-row gutter="16">
			<u-col span="10">
				<view class="tab">
					<u-tabs-swiper ref="tabs" :list="list" bg-color="#fff"  active-color="#3377FF" :current="current" @change="change" :is-scroll="false" swiperWidth="750">
					</u-tabs-swiper>
				</view>
			</u-col>
			<u-col span="2">
					<u-icon name="plus-circle" size="50rpx" :customStyle="{'margin-top':'18rpx'}" @click="uploadVideo"></u-icon>  <!-- old @click="showTab" -->
			</u-col>
		</u-row>
		
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			
			<swiper-item class="swiper-item" v-for="item in list">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
					<!-- 网站数据 begin -->
					<view class="page-box">
						
						<view class="item" v-for="item in VideoList">
							<view class="cover-img" @click="play(item.url)">
								<image :src="item.preview" class="preview"></image>
								<view class="main2">
											<image src="../../../static/icon/play_icon.png" class="play"></image>
								</view>
								<!-- <video  class="viedoBox"
								      id="myVideo" 
								      :src="item.url" 
								      binderror="videoErrorCallback" 
								      controls
									  show-mute-btn
								      bindenterpictureinpicture='bindVideoEnterPictureInPicture'
								      bindleavepictureinpicture='bindVideoLeavePictureInPicture'
								    ></video> -->
							</view>
							<view class="item-title">
								{{item.name}}
							</view>
							<view class="coment">
								<u-row gutter="16">
											<u-col span="9">
												<view class="num">
													<u-icon name="../../../static/icon/read_icon.png" :custom-style="{'margin-right':'14rpx'}" width="37" height="31"></u-icon>
													{{item.play ? item.play:0}}
													</view>
											</u-col>
											<!-- <u-col span="3">
												<view>
													<u-icon name="../../../static/icon/pl_icon.png" :custom-style="{'margin-right':'14rpx'}" width="37" height="31">0</u-icon>
												</view>
											</u-col> -->
											<u-col span="3">
												<view class="num">
													<u-icon name="../../../static/icon/dz_icon.png" :custom-style="{'margin-right':'14rpx'}" width="37" height="31"></u-icon>
													{{item.likes ? item.likes : 0 }}</view>
											</u-col>
										</u-row>
							</view>
						</view>
						
						<view v-if="isEmpty">
							<u-empty  
							margin-top="300"
							icon-size="400rpx"
							text="该分类下没有视频"  
							src="../../../static/icon/emptyVideo_icon.png">
							<u-button slot="bottom" type="primary" size="mini" @click="uploadVideo()">上传视频</u-button>
							</u-empty>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	
		
		 <!-- 原一二级分类 begin -->
		 <u-popup v-model="show" mode="top">
		 	<view class="slot-content">
		 			<view class="labelTitle">一级分类</view>
		 			<u-row gutter="16">
		 						<u-col span="4">
		 							<u-button type="primary" hover-class="none" shape="circle" :custom-style="btnStyle2">默认按钮</u-button>
		 						</u-col>
		 						<u-col span="4">
		 							<u-button type="primary" hover-class="none" shape="circle" :custom-style="btnStyle">默认按钮</u-button>
		 						</u-col>
		 						<u-col span="4">
		 							<u-button type="primary" hover-class="none" shape="circle" :custom-style="btnStyle">默认按钮</u-button>
		 						</u-col>
		 						<u-col span="4">
		 							<u-button type="primary" hover-class="none" shape="circle" :custom-style="btnStyle">默认按钮</u-button>
		 						</u-col>
		 						<u-col span="4">
		 							<u-button type="primary" hover-class="none" shape="circle" :custom-style="btnStyle">默认按钮</u-button>
		 						</u-col>
		 						<u-col span="4">
		 							<u-button type="primary" hover-class="none" shape="circle" :custom-style="btnStyle">默认按钮</u-button>
		 						</u-col>
		 			</u-row>
		 			<view class="labelTitle">二级分类</view>
		 			<u-row gutter="16">
		 						<u-col span="4">
		 							<u-button type="primary" hover-class="none" shape="circle" :custom-style="btnStyle2">默认按钮</u-button>
		 						</u-col>
		 						<u-col span="4">
		 							<u-button type="primary" hover-class="none" shape="circle" :custom-style="btnStyle">默认按钮</u-button>
		 						</u-col>
		 						<u-col span="4">
		 							<u-button type="primary" hover-class="none" shape="circle" :custom-style="btnStyle">默认按钮</u-button>
		 						</u-col>
		 						<u-col span="4">
		 							<u-button type="primary" hover-class="none" shape="circle" :custom-style="btnStyle">默认按钮</u-button>
		 						</u-col>
		 						<u-col span="4">
		 							<u-button type="primary" hover-class="none" shape="circle" :custom-style="btnStyle">默认按钮</u-button>
		 						</u-col>
		 						<u-col span="4">
		 							<u-button type="primary" hover-class="none" shape="circle" :custom-style="btnStyle">默认按钮</u-button>
		 						</u-col>
		 			</u-row>
		 	</view>
			<view class="btnGroup">
				<u-row>
					<u-col span="6">
						<u-button type="primary" block hover-class="none" :custom-style="resetBtn" @click="reset">重置</u-button>
					</u-col>
					<u-col span="6">
						<u-button type="primary" block hover-class="none" :custom-style="confirmBtn" @click="confirm">确定</u-button>
					</u-col>
				</u-row>
				</view>
			</u-popup>
		 	<!-- 原一二级分类 end-->
	</view>
</template>

<script>
	export default{
		data(){
			return{
				level1:'', //当前选中一级分类
				level2:'', //当前选中二级分类
				btnStyle:{
					width:'197rpx',
					height:'58rpx',
					margin:'36rpx auto 0',
					padding:'40rpx 78rpx',
					fontSize:'25rpx',
					background:'rgb(243,243,243)',
					color:'black'
					},
				btnStyle2:{
					width:'197rpx',
					height:'58rpx',
					margin:'36rpx auto 0',
					padding:'40rpx 78rpx',
					fontSize:'25rpx',
					background:'rgb(217,233,253)',
					color:'rgb(66,147,244)'
					},
				resetBtn:{
					background:'#fff',
					color:'rgb(156,157,165)'
				},
				confirmBtn:{
					background:'#fff',
					color:'rgb(56,147,244)'
				},
				list: [
					{
						id: 0,
						name: '全部'
					}
					],
					VideoList:[],
					parent_id:0,
					category_id:0,
					current: 0,
					show:false,
					currentPage:1,
					pageSize:10,
					status:'loadmore',
					swiperCurrent:0,
					isEmpty:false
	

			}
		},
		onLoad(){
			this.init()
		},
		onReachBottom(){
			if(this.status == 'nomore'){
				return
			}
			this.status = 'loading'
			this.getVideoList(this.parent_id,this.category_id,++this.currentPage,this.pageSize)
		},
		methods:{
			init(){
				let self = this
				this.$u.api.getAllCategory().then(res=>{
					if(res.code == 200){
						if(res.data.length>0){
							res.data.map(function(item){
								self.list.push({
									id:item.category_id,
									name:item.name
								})
							})
							
						}
					}
				})
				//第一次进入页面
				this.getVideoList(this.parent_id,this.category_id,this.currentPage,this.pageSize)
			},
			getVideoList(parent_id,category_id,page,limit){
				
				uni.showLoading({title: '加载中'})
				this.VideoList = []
                this.$u.api.getVideosAll({
                	parent_id:parent_id,
                	category_id:category_id,
                	page:page,
                	limit:limit
                }).then(res=>{
                	if(res.code == 200){
                		if(res.data.length>0){
							this.VideoList = res.data
							res.current_page >= res.last_page ? this.status = 'nomore':'loadmore'
							this.isEmpty = false
							uni.hideLoading();
						}else{
							this.status = 'nomore'
							this.isEmpty = true
							uni.hideLoading();
						}
						
						
                		
                	}
                	console.log(res)
                })				
			},
			change(index) {
				this.current = index;
				console.log(this.list[index])
				this.parent_id = this.list[index]['id'] //这边其实获取category_id才是要传的parent_id ,而category_id 暂时都传0
				//切换分类的话，VideoList重置,当前页面数要置成第一页,loading修改成more
				this.VideoList = []
				this.currentPage = 1
				this.status = 'loadmore'
				this.getVideoList(this.parent_id,this.category_id,this.currentPage,this.pageSize)
			},
			showTab(){
				this.show = true
			},
			reset(){
				console.log('重置')
			},
			confirm(){
				this.show = false
			},
			play(data){
				console.log(data)
				this.$u.route({
					url:"/packageA/pages/videos/play",
					params:{
						url:data
					}
				})
			},
			search(){
				this.$u.route({
					url: '/packageA/pages/videos/search',	
				})
			},
			//上传本地视频
			uploadVideo(){
				this.$u.route({
					url:'/packageB/pages/distribution/entry'
				})
			},
			transition({ detail: { dx } }) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({ detail: { current } }) {
				this.isEmpty = false
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current
				this.parent_id = this.list[current]['id']
				this.getVideoList(this.parent_id,this.category_id,this.currentPage,this.pageSize)
			},

		}
	}
</script>

<style scoped lang="scss">
	.search{
		margin: 50rpx 50rpx 40rpx 50rpx;
	}
	.tab{
		margin-left: 30rpx;
		width: 600rpx;
	}
	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}
	.preview{
		position: absolute;
		width: 686rpx;
		height: 386rpx;
		border-radius: 16rpx;
	}
	.main2 {
	  z-index: 99;
	  width: 120rpx;
	  display: flex;
	  flex-direction: column;
	  padding-bottom: 108rpx;
	}
	.play {
	  width: 120rpx;
	  height: 120rpx;
	}
	.swiper-box {
		flex: 1;
	}
	.swiper-item {
		height: 100%;
	}
	.dropdown{}
	.tab-content{

	}
	.item{
		margin: 34rpx 55rpx 20rpx 44rpx;
	}
	.num{
		font-size: 35rpx;
		height: 31rpx;
		line-height: 31rpx;
		vertical-align: top;
	}
	.cover-img{
		height: 386rpx;
		border-radius: 16rpx;
		background-color: rgba(221,221,221,1);
		align-self: center;
		margin-top: 20rpx;
		width: 686rpx;
		justify-content: flex-end;
		align-items: center;
		display: flex;
		flex-direction: column;
	}
	.item-title{
		margin: 34rpx 0 30rpx 0;
	}
	.coment{
		
	}
	.slot-content{
		margin: 0 78rpx  0 78rpx;
	}
	.labelTitle{
		margin-top: 71rpx;
	}
	.btnGroup{
		margin-top: 86rpx;
	}
	.viedoBox{
		width:100%; 
		height:361rpx; 
	}
</style>
