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
					<u-tabs :list="list" :is-scroll="true" :current="current" @change="change">
					</u-tabs>
				</view>
			</u-col>
			<u-col span="2">
					<u-icon name="plus-circle" size="50rpx" :customStyle="{'margin-top':'18rpx'}" @click="uploadVideo"></u-icon>  <!-- old @click="showTab" -->
			</u-col>
		</u-row>
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
			<!-- 按钮组合-->
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
		<view class="tab-content" v-if="VideoList.length>0">
			<view class="item" v-for="item in VideoList">
				<view class="cover-img">
					<!-- <u-image width="100%" height="361rpx" :src="item.preview"></u-image> -->
					 <video  class="viedoBox"
					      id="myVideo" 
					      :src="item.url" 
					      binderror="videoErrorCallback" 
					      controls
						  show-mute-btn
						  page-gesture
					      bindenterpictureinpicture='bindVideoEnterPictureInPicture'
					      bindleavepictureinpicture='bindVideoLeavePictureInPicture'
					    ></video>
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
										{{item.likes ? item.like : 0 }}</view>
								</u-col>
							</u-row>
				</view>
			</view>
		    <u-loadmore :status="status" />
		</view>
		<view v-else>
			
			<u-empty  
			margin-top="300"
			icon-size="400rpx"
			text="该分类下没有视频"  
			src="../../../static/icon/emptyVideo_icon.png">
			<u-button slot="bottom" type="primary" size="mini" @click="uploadVideo()">上传视频</u-button>
			</u-empty>
		</view>
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
					pageSize:3,
					status:'loadmore'
	

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
                this.$u.api.getVideosAll({
                	parent_id:parent_id,
                	category_id:category_id,
                	page:page,
                	limit:limit
                }).then(res=>{
                	if(res.code == 200){
                		if(res.data.length>0){
							this.VideoList = this.VideoList.concat(res.data)
							res.current_page >= res.last_page ? this.status = 'nomore':'loadmore'
						}else{
							this.status = 'nomore'
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
			}

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
		width: 677rpx;
		height: 360rpx;
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
