<template>
	<view>
		<template v-if="videoList.length>0">
		
		<u-row gutter="10">
			<u-radio-group v-model="current" @change="radioGroupChange">
					<u-col span="4" v-for="(item,index) in videoList">
						<view class="item" >
							<view class="cover">
								<view class="cover_img"><u-image width="239rpx" height="240rpx" :src="item.preview"></u-image></view>
								<view class="time">{{item.time ? item.time : ''}}</view>
							</view>
							<view class="title"><u-radio :name="index" ></u-radio>{{item.name}}</view>
						</view>
					</u-col>
			</u-radio-group>

				
			</u-row>
			</template>
			
			<teleport v-else>
				<u-empty
				margin-top="300"
				icon-size="400rpx"
				text="暂无视频"  
				src="../../../static/icon/emptyVideo_icon.png">
				<u-button slot="bottom" type="primary" size="mini" @click="uploadVideo()">上传视频</u-button>
				</u-empty>
			</teleport>
			
			<!-- 固定底部 -->
			<view class="bar">
				<u-cell-item bg-color="#ffffff" title="选择视频库中的视频" :arrow="false" @click="needs" :title-style="{'margin-left': '38rpx','font-size':'30rpx'}">
					<u-image width="48" height="48" slot="icon" src="/static/icon/info_icon.png"></u-image>
					<u-button slot="right-icon" type="primary" shape="circle" @click="spff">下一步</u-button>
				</u-cell-item>
			</view>
			
			<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default{
		data(){
			return{
				videoList:[],
				current:'',
				file_id:'',
				preview:' ',
				ip_id:''
			
				
			}
		},
		onLoad(data) {
			this.ip_id = data.ip_id
			this.init()
		},
		methods:{
			init(){
				this.$u.api.getVideosAll({
					parent_id:0,
					category_id:0,
					limit:50 //暂时拉去50条，不做下拉记载
				}).then(res =>{
					if(res.code == 200){
						if(res.data.length >0){
							this.videoList = res.data
							this.file_id  = this.videoList[0]['id']
							this.preview  = this.videoList[0]['preview']
						}
						
					}
				})
			},
			//上传本地视频
			uploadVideo(){
				console.log('上传本地视频')
				this.$u.route({
					url:'/packageB/pages/distribution/entry'
				})
			},
			radioGroupChange(index){
				console.log(index)
				this.file_id = this.videoList[index]['id']
				this.preview = this.videoList[index]['preview']
				console.log(this.file_id)
				console.log(this.preview)
				
			},
			spff(){
				if(!this.file_id){
					this.$refs.uToast.show({
						position:'top',
						title:'请选择分发的视频'
						})
						return
				}
				this.$u.route({
					url:'/packageB/pages/distribution/spff',
					params:{
						file_id:this.file_id, //视频id
						preview:this.preview, //视频封面
						ip_id:this.ip_id  //ip_id传递
					}
				})
			}
		}
	}
</script>

<style scoped>
	.cover{
		position: relative;
		width: 240rpx;
		height: 240rpx;
	}
	.cover_img{
		position: absolute;
		top: 0;
		left: 0;
		
	}
	.time{
		position: absolute;
		bottom: 0;
		right: 0;
		background: linear-gradient(0deg,rgba(0,0,0,.85),transparent);
		color: #FFFFFF;
	}
	.title{
		text-align: center;
		font-size: 20rpx;
		background: rgb(246,246,248);
		padding: 10rpx 0;
	}
	.item{
		margin:20rpx 0
	}
	.bar{
		position: fixed;
		width: 100%;
		bottom: 0;
	}
</style>
