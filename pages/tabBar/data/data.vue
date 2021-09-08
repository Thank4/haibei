<template>
	<view class="wrap">
		<template v-if="vuex_hasLogin">
			<!-- login状态 -->
			<!-- <view class="data">
				<u-empty text="当前暂无数据请到PC端建站" src="../../../static/img/empty_box.png" icon-size="200" margin-top="61" mode="list"></u-empty>
			</view>	 -->	
			<view class="data">		
				<view class="charts">
					<view class="changeType">
					<view class="u-tabs-box">
						<u-tabs-swiper ref="tabs" :list="list" bg-color="#fff"  active-color="#3377FF" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
					</view>
					</view>
					<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
						<swiper-item class="swiper-item">
							<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
								<!-- 网站数据 begin -->
								<view class="page-box">
									<view class="chart1">
									<!-- 不使用组件原来的样式，自己复制组件修改 -->
									<u-subsectiondiy 
									:list="time" 
									:animation="false" 
									active-color="rgb(223,112,71)" 
									height="50" 
									font-size="25" 
									mode="subsection" 
									:current="0"
									@change="changeTab"
									>
									</u-subsectiondiy>
									<view class="charts-box">
									 <qiun-data-charts
									    type="tline"
									    :chartData="chartData"
										:inScrollView="true"
										:opts="opts1"
									    background="none"
									  />
									</view>
									</view>
									
								
								<!-- 两个饼状图 -->
								<view>
								<u-row gutter="16">
									<u-col span="6">
										<view class="chart2">
										<view class="charts-box2">
										<qiun-data-charts 
										type="pie" 
										:opts="opts2"
										:inScrollView="true"
										:chartData="userData"/>
										</view>
										</view>
									</u-col>
									<u-col span="6">
										<view class="chart3">
										<view class="charts-box2">
										<qiun-data-charts 
										type="pie"
										:opts="opts3"
										:inScrollView="true"
										:chartData="fromData" />
										</view>
										</view>
									</u-col>
								</u-row>
									
								</view>
								<!-- 两个饼状图 -->
								</view>
								<!-- 网站数据 end -->
							</scroll-view>
						</swiper-item>
						<swiper-item class="swiper-item">
							<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
								<view class="page-box">
							    <!-- 自定义 tab -->
								<u-tabs :list="levelTwo"  :active-item-style="activeStyle" :show-bar="false" height="48rpx" gutter="40" :is-scroll="true" :current="current1" @change="change1"></u-tabs>
									
								<view class="labelTitle">筛选视频数据</view>
								<view>
									<u-form label-width="180rpx">
									<u-form-item label="数据来源">
										<u-input v-model="platform" input-align="left" type="select" :select-open="actionSheetShow1" placeholder="选择数据平台" @click="openShow1()"></u-input>
									</u-form-item>
									<u-form-item label="选择视频">
										<u-input v-model="file_name" input-align="left" type="select" :select-open="actionSheetShow2" placeholder="视频名称" @click="openShow2"></u-input>
									</u-form-item>
									</u-form>
								</view>
								<view class="labelTitle">数据图表</view>
								<view class="chart1" v-show="videoChart">
									<view class="charts-box">
									 <qiun-data-charts 
									 type="mix" 
									 :inScrollView="true"
									 :opts="opts4" 
									 :chartData="otherData"/>
									</view>
								</view>
								</view>
							</scroll-view>
						</swiper-item>
					</swiper>
				</view>
				<u-action-sheet :list="platformList" v-model="show1" @click="actionSheetCallback1" @close="cancelSheet"></u-action-sheet>
				<u-action-sheet :list="VideoList" v-model="show2" @click="actionSheetCallback2" @close="cancelSheet" :mask-close-able="false"></u-action-sheet>
			
			</view>	
			<!-- login状态 end-->
		</template>
		<template v-else>
			<!-- 未登录状态 -->
				<view class="labelTitle">我的网站数据</view>
				<view class="login">
					<u-button shape="circle" :custom-style="loginBtn" @click="login">
						注册/登录
					</u-button>
					<view class="tips">请登录后查看我的网站数据~</view>
				</view>
				<!-- 未登录状态end -->
		</template>
	
	
		<!--YouTube 榜单 begin -->
		<view class="rank" v-if="rankData.YouTube.length>0">
		   <u-cell-group :border="false">
				<u-cell-item  title="Youtube热榜" :arrow="false" :border-bottom="false">
					<u-icon slot="icon" name="../../../static/icon/youtube_icon.png" size="30" :custom-style="{'margin-right':'10rpx;'}"></u-icon>
					<u-button slot="right-icon"  size="mini" shape="circle" type="default" @click="more('YouTube')">更多</u-button>
				</u-cell-item>
			</u-cell-group>
		   <view>
				<u-row gutter="16">
					<u-col span="4" v-for="item in rankData.YouTube.slice(0,3)">
						<u-image :src="item.preview" width="200rpx" height="250rpx" border-radius="20rpx"></u-image>
					</u-col>
				</u-row>
			</view>
		</view>	
		<!--YouTube 榜单 end -->
		
		<!--facebook 榜单 begin -->
		<view class="rank" v-if="rankData.facebook>0">
			<u-cell-group :border="false">
							<u-cell-item  title="facebook热榜" :arrow="false" :border-bottom="false">
								<u-icon slot="icon" name="../../../static/icon/facebook_icon.png" size="30" :custom-style="{'margin-right':'10rpx;'}"></u-icon>
								<u-button slot="right-icon"  size="mini" shape="circle" type="default" @click="more('facebook')">更多</u-button>
							</u-cell-item>
						</u-cell-group>
			<view>
				<u-row gutter="16">
						<u-row gutter="16">
							<u-col span="4" v-for="item in rankData.facebook.slice(0,3)">
								<u-image :src="item.preview" width="200rpx" height="250rpx" border-radius="20rpx"></u-image>
							</u-col>
						</u-row>
				</u-row>
			</view>
			</view>	
		<!--facebook 榜单 end -->
		
		
		<!--Twitter 榜单 begin -->
		
		<view class="rank" v-if="rankData.Twitter >0"> 
			<u-cell-group :border="false">
							<u-cell-item  title="Twitter热榜" :arrow="false" :border-bottom="false">
								<u-icon slot="icon" name="../../../static/icon/twitter_icon.png" size="30" :custom-style="{'margin-right':'10rpx;'}"></u-icon>
								<u-button slot="right-icon"  size="mini" shape="circle" type="default" @click="more('Twitter')">更多</u-button>
							</u-cell-item>
						</u-cell-group>
			<view>
			<u-row gutter="16">
				<u-row gutter="16">
					<u-col span="4" v-for="item in rankData.Twitter.slice(0,3)" :border-bottom="false">
						<u-image :src="item.preview" width="200rpx" height="250rpx" border-radius="20rpx"></u-image>
					</u-col>
				</u-row>
			</u-row>
			</view>
		</view>
		<!--Twitter 榜单 end -->
		
		<!--linkedin 榜单 begin -->
		<view class="rank" v-if="rankData.LinkedIn >0">
			<u-cell-group :border="false">
				<u-cell-item  title="LinkedIn热榜" :arrow="false" :border-bottom="false">
					<u-icon slot="icon" name="../../../static/icon/linkedin_icon.png" size="30" :custom-style="{'margin-right':'10rpx;'}"></u-icon>
					<u-button slot="right-icon"  size="mini" shape="circle" type="default" @click="more('LinkedIn')">更多</u-button>
				</u-cell-item>
			</u-cell-group>
			<view>
			<u-row gutter="16">
				<u-row gutter="16">
					<u-col span="4" v-for="item in rankData.LinkedIn.slice(0,3) ">
						<u-image :src="item.preview" width="200rpx" height="250rpx" border-radius="20rpx"></u-image>
					</u-col>
				</u-row>
			</u-row>
			</view>
		</view>
		<!--linkedin 榜单 end -->
		
		<!--pinterest 榜单 begin -->
		<view class="rank" v-if="rankData.Pinterest >0">
			<u-cell-group :border="false">
							<u-cell-item  title="Pinterest热榜" :arrow="false" :border-bottom="false">
								<u-icon slot="icon" name="../../../static/icon/pinterest_icon.png" size="30" :custom-style="{'margin-right':'10rpx;'}"></u-icon>
								<u-button slot="right-icon"  size="mini" shape="circle" type="default" @click="more('Pinterest')">更多</u-button>
							</u-cell-item>
						</u-cell-group>
			<view>
			<u-row gutter="16">
				<u-row gutter="16">
					<u-col span="4" v-for="item in rankData.Pinterest.slice(0,3)">
						<u-image :src="item.preview" width="200rpx" height="250rpx" border-radius="20rpx"></u-image>
					</u-col>
				</u-row>
			</u-row>
			</view>
		</view>
		<!--pinterest 榜单 end -->
		
		<!--tiktok 榜单 begin -->
		<view class="rank" v-if="rankData['Tik Tok'] >0">
			<u-cell-group :border="false">
							<u-cell-item  title="tiktok热榜" :arrow="false" :border-bottom="false">
								<u-icon slot="icon" name="../../../static/icon/tiktok_icon.png" size="30" :custom-style="{'margin-right':'10rpx;'}"></u-icon>
								<u-button slot="right-icon"  size="mini" shape="circle" type="default" @click="more('Tik Tok')">更多</u-button>
							</u-cell-item>
						</u-cell-group>
			<view>
			<u-row gutter="16">
				<u-row gutter="16">
					<u-col span="4" v-for="item in rankData['Tik Tok'].slice(0,3)">
						<u-image :src="item.preview" width="200rpx" height="250rpx" border-radius="20rpx"></u-image>
					</u-col>
				</u-row>
			</u-row>
			</view>
		</view>
		<!--tiktok 榜单 end -->
		
		<!--Instagram 榜单 begin -->
		<view class="rank" v-if="rankData.Instagram >0">
			<u-cell-group :border="false">
							<u-cell-item  title="Instagram热榜" :arrow="false" :border-bottom="false">
								<u-icon slot="icon" name="../../../static/icon/Instagram_icon.png" size="30" :custom-style="{'margin-right':'10rpx;'}"></u-icon>
								<u-button slot="right-icon"  size="mini" shape="circle" type="default" @click="more('Instagram')">更多</u-button>
							</u-cell-item>
						</u-cell-group>
			<view>
			<u-row gutter="16">
				<u-row gutter="16">
						<u-col span="4" v-for="item in rankData.Instagram.slice(0,3)">
							<u-image :src="item.preview" width="200rpx" height="250rpx" border-radius="20rpx"></u-image>
						</u-col>
				</u-row>
			</u-row>
			</view>
		</view>
		<!--Instagram 榜单 end -->
		
		<!--vimeo 榜单 begin -->
		<view class="rank" v-if="rankData.Vimeo >0">
			<u-cell-group :border="false">
							<u-cell-item  title="Vimeo热榜" :arrow="false" :border-bottom="false">
								<u-icon slot="icon" name="../../../static/icon/vimeo_icon.png" size="30" :custom-style="{'margin-right':'10rpx;'}"></u-icon>
								<u-button slot="right-icon"  size="mini" shape="circle" type="default" @click="more('Vimeo')">更多</u-button>
							</u-cell-item>
			</u-cell-group>
		<view>
			<u-row gutter="16">
				<u-row gutter="16">
					<u-col span="4" v-for="item in rankData.Vimeo.slice(0,3)">
						<u-image :src="item.preview" width="200rpx" height="250rpx" border-radius="20rpx"></u-image>
					</u-col>
				</u-row>
			</u-row>
		</view>
		</view>
		<!--Vimeo 榜单 end -->
		<u-toast ref="uToast" />
		
	</view>
	
</template>

<script>
	import demodata from '@/mockdata/demodata.json';
	export default {
		data() {
			return {
				list: [
					{
						name: '网站数据'
					},
					{
						name: '视频数据'
					}
				],
				time:[
					{
						name:'今日',
					},
					{
						name:'昨日'
					},
					{
						name:'近7日',
					},
					{
						name:'近30日'
					}
				],
				videoChart:true,
				levelTwo:[], //用户全部二级分类 
				current: 0, //第一个页面索引
				swiperCurrent:0, //这个值要与current一致
				current1:0, //第二个页面索引
				platformList:[
					{
						text:'Twitter'
					},
					{
						text:'YouTube'
					},
					{
						text:'Facebook'
					},
					{
						text:'LinkedIn'
					},
					{
						text:'Pinterest'
					},
					{
						text:'Tik Tok'
					},
					{
						text:'Instagram'
					},
					{
						text:'Vimeo'
					}
				], //平台列表
				show1:false,
				VideoList:[], //视频列表
				category_id:'',//分类id
				show2:false,
				platform:'',//平台名称
				file_id:'',//视频id
				file_name:'', //视频名称
				activeStyle:{
					background:"#3377FF",
					color:"#fff",
					fontSize:"28rpx",
					borderRadius:"24rpx",
					padding:"4rpx 20rpx"
				},
				
				tabsHeight: 0,
				opts1:{
					"xAxis": {
						"boundaryGap": "center",
						 "rotateLabel": true,
					}
				},
				opts2:{
					"fontSize": 8,
					 "legend": {
							"lineHeight":20,
					}
				},
				opts3:{
					"fontSize": 6,
					 "legend": {
							 "lineHeight":15,
					}
				},
				opts4:{
					"dataLabel": false,
					"dataPointShapeType": "hollow",
					"xAxis": {
						"boundaryGap": "center",
						 "rotateLabel": true,
					},
					 yAxis:{
						 data:[{position: 'left',title: ''},
								{position: 'right',title: '',textAlign: 'left'}]
					   },
					    "legend": {
					           "show": true,
					           "position": "top",
					           "float": "right",
						}
					 },
				chartData:{
					categories:[],
					series:{}
				},
				userData:{},
				fromData:{},
				otherData:{
				    categories:[],
					series:[ 
							{
								"name": "点赞",
								"index": 1,
								"color": "#39BD65",
								"data": [
									
								],
								"type": "column"
							},
							{
								"name": "播放",
								"data": [
									
								],
								"type": "line",
							
								"color": "#FFA033"
							}
				],
				},
				loginBtn:{
					width:'211rpx',
					height:'71rpx',
					padding:'22rpx 48rpx 22rpx 48rpx',
					background:'rgb(217,233,253)',
					fontSize:'26rpx',
					color:'#4293F4',
					marginTop:"110rpx"
				},
				rankData:{
					
				}
				
			}
		},
		onShow() {
			
		  this.init()
		  
		
		},
		methods: {
			init(){
				
				//获取热门视频
				this.$u.api.getHotVideo().then(res =>{
					if(res.code == 200){
						this.rankData = res.data
					}
				})
				if(this.vuex_hasLogin){ //只有登录状态，采取获取分析数据
				  //默认获取数据
				  this.showCharts(0,0,0)
				   
				   //获取用户全部二级
				   this.$u.api.getAllSeCategory().then(res =>{
				   			  if(res.code == 200){
				   				  this.levelTwo = res.data.category
				   				  this.category_id = this.levelTwo[0]['category_id']
				   			  }
				   })
				   
				  
				}
			
			},
			//渲染图表方法
			showCharts(type,start,end){
				//每次清空
				this.chartData = {
							  categories:[],
							  series:{}
				} 
				this.userData = {
							  categories:[],
							  series:{}
				}
				this.fromData = {
							  categories:[],
							  series:{}
				}
				this.$u.api.getUserView({
				   type:type,
				   start:start,
				   end:end
				}).then(res =>{
					console.log(res)
					if(res.code == 200){
						   //渲染chart1
						   let self = this
						   let uniq_visitors = []
						   let visits = []
						   res.data.curve.map(function(item){
							   self.chartData.categories.push(item.Xtime)
							   uniq_visitors.push(item.uniq_visitors)
							   visits.push(item.visits)
						   })
						   this.chartData.series = [
							   {
								   name:'新用户',
								   data:uniq_visitors
							   },
							   {
								   name:'访问人数',
								   data:visits
							   }
						   ]
						   
						   //渲染chart2
						   let temp = []
						   res.data.pie_chart_yesterday.map(function(item){
							   temp.push({
								  name:item.item,
								  value:Number(item.count)
							   })
						   })
						   this.userData.series = [{"data":temp}]
						   //渲染chart3
						   let temp2 = []
						   res.data.pie_chart_referrers.map(function(item,index){
													   temp2.push({
														  name:item.item.slice(5,item.item.length),
														  value:Number(item.count)
													   })
						   })
						   this.fromData.series = [{"data":temp2}]
						
					   }
									   
				})
				
			},
			login(){
				this.$u.route('/packageA/pages/login/login');
			},
			// 大tab栏切换
			change(index) {
				this.swiperCurrent = index;
			},
			//网站数据中tab
			changeTab(index){
				console.log(this.time[index]['name'])
				let timestamp = new Date(new Date().toLocaleDateString()).getTime()/1000
				switch(this.time[index]['name']){
					case '今日':
					this.showCharts(0,0,0)
					break;
					case '昨日':
					this.showCharts(1,(timestamp-60*60*24),timestamp)
					break;
					case '近7日':
					this.showCharts(1,(timestamp-60*60*24*7),timestamp)
					break;
					case '近30日':
					this.showCharts(1,(timestamp-60*60*24*30),timestamp)
					break;
				}
			},
			//视频数据中的change
			change1(index){
				this.current1 = index;
				this.category_id = this.levelTwo[index]['category_id'] //设置分类id
				//this.getVideos()
				//如果platform不为空，则可以更新调用接口
				if(this.platform){
					this.getVideos(this.category_id,this.platform)
				}
			},
			transition({ detail: { dx } }) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({ detail: { current } }) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			more(name){
				console.log(name)
				this.$u.route({
					url:'/packageC/pages/rank',
					params:{
						name:name
					}
				})
			},
			openShow1(){
				this.show1 = true
				this.videoChart = false
			},
			openShow2(){
				if(this.VideoList.length>0){
					this.show2 = true
					this.videoChart = false
				}else{
					this.$refs.uToast.show({
						position:'top',
						title:'该分类下没有视频,请重新选择分类或平台'
					})
				}
				
			},
			//调用视频接口
			getVideos(category_id,platform){
				let self = this
				//先重置VideoList
				this.VideoList = []
				//重置选择框的值
				this.file_id = ''
				this.file_name = ''
				this.$u.api.getVideoList({
					category_id:category_id,
					platform:platform
				}).then(res =>{
					if(res.code ==200){
						if(res.data.length == 0){
							this.$refs.uToast.show({
								position:'top',
								title:'该分类下没有视频,请重新选择分类或平台'
							})
						}else{
							res.data.map(function(item){
								self.VideoList.push({
									file_id:item.file_id,
									text:item.name
								})
							})
							
							
						}
						console.log(res.data)
					}
				})
			},
			actionSheetCallback1(index){
				let self = this
				this.videoChart = true
				this.platform = this.platformList[index].text
				//设置成功后，调用接口
				this.getVideos(this.category_id,this.platform)
				
			},
			actionSheetCallback2(index){
				this.videoChart = true
				console.log(index)
				this.file_name = this.VideoList[index]['text']
				this.file_id = this.VideoList[index]['file_id']
				this.otherData.categories = []
				this.otherData.series[0].data = []
				this.otherData.series[1].data = []
				//设置成功后，调用接口
				let self = this
				this.$u.api.getVideoData({
					file_id: this.file_id,
					platform:this.platform
				}).then(res =>{
					console.log(res)
					if(res.code ==200){
						//TODO 
						if(res.data.data.length>0){
							console.log(res.data)
							res.data.data.map(function(item){
								self.otherData.categories.push(item.date)
								self.otherData.series[0].data.push(item.like)
								self.otherData.series[1].data.push(item.watch)
								console.log(item)
							})
						}
						
						
					}
				})
			},
			cancelSheet(){
				this.videoChart = true
			}
		}
	}
</script>
<style>

</style>
<style scoped>
	.wrap{
		padding: 0 50rpx;
	}
	.login{
		
	}
	.tips{
		font-size: 26rpx;
		color: #393C4C;
		margin: 28rpx 0 102rpx 0;
		text-align: center;
	}
	.rank{
		margin-bottom: 58rpx;
	}

	.changeType{
		margin-bottom: 26rpx;

	}
	/* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
	.charts-box{
	  width: 100%;
	  height:370rpx;
	}
	.data {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.swiper-box {
		flex: 1;
		height: 870rpx;
	}
	.swiper-item {
		height: 100%; 
	}
	.page-box{
		background-color: #fff;
	}
	.charts-box1{
	  width: 100%;
	  height:370rpx;
	}
	.charts-box2{
	  width: 100%;
	  height:380rpx;
	}
	.charts{
	}
	.chart1{
		margin-bottom: 20rpx;
		background: #FFFFFF;
	}
	.chart2{
		margin-bottom: 20rpx;
		background: #FFFFFF;
	}
	.chart3{
		margin-bottom: 20rpx;
		background: #FFFFFF;
	}
	.labelTitle{
		font-size: 28rpx;
		color: #888888;
		margin: 24rpx 0; 
	}
</style>
