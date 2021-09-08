<template>
	<view class="wrap">
		
		<template v-if="isupload">
		<view class="upload">
			 <!-- <image src="https://video-1303139325.cos.ap-hongkong.myqcloud.com/1630985542.9333.jpg" class="preview"></image> -->
			  <image :src="preview" class="preview"></image> 
		  <view class="main2">
			<image src="../../../static/icon/play_icon.png" class="play"></image>
		  </view>
		</view>	 
		</template>
		
	    <view class="upload"  v-else  @click="upload()">
		  <view class="main2">
		    <image src="../../../static/icon/upload_icon.png" class="img1"></image>
		    <text lines="1" class="info1">点击上传</text>
		  </view>
	    </view> 
		
		<view class="title">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item>
				<u-input type="textarea" v-model="name" :border="border" placeholder="请输入标题" />
			</u-form-item>
		</u-form>
		</view>
		
	    <view class="desc">
	      <view class="bd2">
	        <text lines="1" class="info3">视频简介</text>
	        <text lines="1" class="txt1">简介内容可以展示你视频的详细信息</text>
	        <view class="main3">
	          <u-form :rules="rules" ref="uForm" :errorType="errorType">
	          	<u-form-item>
	          		<u-input type="textarea"  v-model="desc" :border="border" placeholder="请填写简介" />
	          	</u-form-item>
	          </u-form>
	        </view>
	      </view>
	    </view>
		<view class="site">
		<view>
			<u-form label-width="200rpx">
			<u-form-item label="选择站点(必填)">
				<u-input v-model="site_name" input-align="right" type="select" :select-open="actionSheetShow3" placeholder="选择站点" @click="showSites = true"></u-input>
			</u-form-item>
			</u-form>
		</view>
		<view>
			<u-form label-width="180rpx">
			<u-form-item label="选择一级分类">
				<u-input v-model="parent_text" input-align="right" type="select" :select-open="actionSheetShow1" placeholder="选择一级分类" @click="show1 = true"></u-input>
			</u-form-item>
			<u-form-item label="选择二级分类">
				<u-input v-model="category_text" input-align="right" type="select" :select-open="actionSheetShow2" placeholder="选择二级分类" @click="openShow2"></u-input>
			</u-form-item>
			</u-form>
		</view>
	    
		</view>
		<view class="submit">
			<u-button type="primary" shape="circle" @click="submit">保存</u-button>
		</view>
		
		<u-action-sheet :list="list1" v-model="show1" @click="actionSheetCallback1"></u-action-sheet>
		<u-action-sheet :list="list2" v-model="show2" @click="actionSheetCallback2"></u-action-sheet>
		<u-action-sheet :list="list3" v-model="showSites" @click="actionSheetCallback3"></u-action-sheet>
		<u-toast ref="uToast" />
		
	  </view>

</template>

<script>
	export default{
		data (){
			return{
				action:'https://wechat.seabeek.cn/weapp/upFiles',
				name:'', //视频标题
				url:'',  //视频连接
				desc:'', //视频简介
				type:'video', //类型
				preview:'', //视频封面图
				sort:1,
				site_id:'', //站点id
				site_name:'', //站点名称
				parent_id:'',//一级分类id
				parent_text:'', //一级分类名称
				category_id:'',//二级分类id
				category_text:'', //二级分类名称
				size:0,
				length:0,
				show1:false,
				show2:false,
				list1:[],
				list2:[],
				list3:[],
				AllCategory:[],
				isupload:false,
				showSites:false,
				form:{}
			}
		},
		onLoad(){
			this.init()
		},
		methods:{
			init(){
				this.$u.api.getAllCategory().then(res =>{
					let self = this
					if(res.code == 200){
						this.AllCategory = res.data
						res.data.map(function(item){
							self.list1.push({
							    id:item.id,
								text:item.name,
								category_id:item.category_id
							})
						})	
					}
				})
				this.$u.api.getSites().then(res => {
					let self = this
					if(res.code == 200){
						res.data.map(function(item){
							self.list3.push({
								id:item.id,
								text:item.name
							})
						})
						
					}
				})
			},
			upload(){
				console.log('上传视频')
				let self = this
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function (res) {
						uni.showLoading({
						    title: '上传中',
							success:function(){
								uni.uploadFile({
								            url: 'https://wechat.seabeek.cn/weapp/upFiles', //仅为示例，非真实的接口地址
								            filePath: res.tempFilePath,
								            name: 'file',
											header:{
												'Access-Token':self.vuex_token
											},
								            formData: {
								                'type': 'video'
								            },
											fail(){
												uni.hideLoading();
											},
								            success: (res) => {
												
												self.isupload = true
												let jsonr = JSON.parse(res.data)
												self.url = jsonr.data.res.path
												self.preview = jsonr.data.res.preview
												self.$refs.uToast.show({
													position:'top',
													title:'视频上传成功'
													})
								            },
											complete() {
												uni.hideLoading();
											}
								    });
							}
						});
						
					}
				});
			},
			uploadPreview(){
				let self = this
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (chooseImageRes) {
						  const tempFilePaths = chooseImageRes.tempFilePaths[0];
						        uni.uploadFile({
						            url: 'https://wechat.seabeek.cn/weapp/upFiles', //仅为示例，非真实的接口地址
						            filePath: tempFilePaths,
						            name: 'file',
						            header:{
						            	'Access-Token':self.vuex_token
						            },
						            formData: {
						                'type': 'img'
						            },
						            success: (res) => {
						                let jsonr = JSON.parse(res.data)
						                self.preview = jsonr.data.res.path
						                self.$refs.uToast.show({
						                	position:'top',
						                	title:'封面图上传成功',
						                })
						            }
						        });
				    }
				});
			},
			uploadSuccess(){
				if(res.code == 200){
					this.preview = res.data.res.path
				}
			},
			openShow2(){
				if(!this.parent_id){
					this.$u.toast('请先选择一级分类')
					return
				}
				this.show2 = true
			},
			actionSheetCallback1(index){
				//设置一级分类选中
				this.parent_id = this.list1[index]['category_id']
				this.parent_text = this.list1[index]['text']
				//清除，原来二级分类的值，给list2赋值
				console.log('清空一级分类')
				this.category_id = ''
				this.category_text = ''
				this.list2 = []
				let self = this
				this.AllCategory[index]['two_level'].map(function(item){
					self.list2.push({
						id:item.id,
						text:item.name,
						category_id:item.category_id
					})
					
				})
			},
			actionSheetCallback2(index){
				this.category_id = this.list2[index]['category_id']
				this.category_text = this.list2[index]['text']
			},
			actionSheetCallback3(index){
				
				this.site_id = this.list3[index]['id']
				this.site_name = this.list3[index]['text']
				
				
			},
			submit(){
				if(!this.name){
					console.log('jinq')
					this.$refs.uToast.show({
						position:'top',
						title:'视频标题不能为空'
						})
					return
				}
				if(!this.desc){
					this.$refs.uToast.show({
						position:'top',
						title:'请填写视频简介'
						})
					return
				}
				if(!this.url){
					this.$refs.uToast.show({
						position:'top',
						title:'请上传视频'
						})
					return
				}
				if(!this.site_id){
					this.$refs.uToast.show({
						position:'top',
						title:'请选择站点'
						})
					return
				}
				if(!this.parent_id){
					this.$refs.uToast.show({
						position:'top',
						title:'请选择一级分类'
						})
					return
				}
				if(!this.category_id){
					this.$refs.uToast.show({
						position:'top',
						title:'请选择二级分类'
						})
					return
				}
				console.log(this.name)
				console.log(this.desc)
				console.log(this.type)
				console.log(this.url)
				console.log(this.preview)
				console.log(this.site_id)
				console.log(this.category_id)
				console.log(this.parent_id)
				let self = this
				this.$u.api.updateFile({
					name:this.name,
					desc:this.desc,
					type:this.type,
					url:this.url,
					preview:this.preview,
					site_id:this.site_id,
					category_id:this.category_id,
					parent_id:this.parent_id
				}).then(res =>{
					if(res.code == 200){
						self.$refs.uToast.show({
							position:'top',
							title:'保存成功',
							back :true
						})
					}
				})
				
			}
		}
	}
</script>

<style scoped>
	.wrap {
	  background: #F8F8F8;
	  display: flex;
	  flex-direction: column;
	}
	.info1 {
	  z-index: 44;
	  width: 116rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(255,255,255,1);
	  font-size: 28rpx;
	  letter-spacing: 1rpx;
	  font-family: PingFangSC-Medium;
	  white-space: nowrap;
	  line-height: 40rpx;
	  text-align: center;
	  margin-top: 12rpx;
	}
	.preview{
		position: absolute;
		width: 686rpx;
		height: 386rpx;
		border-radius: 16rpx;
	}
	.upload {
	  z-index: 43;
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
	.viedoBox{
	  position: absolute;
	  height: 386rpx;
	  width: 686rpx;
	  align-items: center;
	  display: flex;
	  border-radius: 16rpx;
	}
	
	.bd7 {
	  z-index: 46;
	  height: 24px;
	  border-radius: 12px;
	  background-color: rgba(0, 0, 0, 0.5);
	  width: 76px;
	  justify-content: center;
	  align-items: center;
	}
	.word3 {
	  z-index: 47;
	  width: 58px;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(204, 204, 204, 1);
	  font-size: 14px;
	  letter-spacing: 0.2800000011920929px;
	  font-family: PingFangSC-Medium;
	  white-space: nowrap;
	  line-height: 20px;
	  text-align: center;
	}
	.bd7 {
	  z-index: 46;
	  height: 24px;
	  border-radius: 12px;
	  background-color: rgba(0, 0, 0, 0.5);
	  width: 76px;
	  justify-content: center;
	  align-items: center;
	}
	.word3 {
	  z-index: 47;
	  width: 58px;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(204, 204, 204, 1);
	  font-size: 14px;
	  letter-spacing: 0.2800000011920929px;
	  font-family: PingFangSC-Medium;
	  white-space: nowrap;
	  line-height: 20px;
	  text-align: center;
	}
	.bd7 {
	  z-index: 46;
	  height: 48rpx;
	  border-radius: 24rpx;
	  background-color: rgba(0,0,0,0.5);
	  width: 152rpx;
	  justify-content: center;
	  align-items: center;
	  display: flex;
	  flex-direction: column;
	}
	.word3 {
	  z-index: 47;
	  width: 116rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(204,204,204,1);
	  font-size: 28rpx;
	  letter-spacing: 1rpx;
	  font-family: PingFangSC-Medium;
	  white-space: nowrap;
	  line-height: 40rpx;
	  text-align: center;
	}
	.bd7 {
	  z-index: 46;
	  height: 48rpx;
	  border-radius: 24rpx;
	  background-color: rgba(0,0,0,0.5);
	  width: 152rpx;
	  justify-content: right;
	  align-items: center;
	  display: flex;
	  flex-direction: column;
	}
	.word3 {
	  z-index: 47;
	  width: 116rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(204,204,204,1);
	  font-size: 28rpx;
	  letter-spacing: 1rpx;
	  font-family: PingFangSC-Medium;
	  white-space: nowrap;
	  line-height: 40rpx;
	  text-align: center;
	}
	.title{
		height: 172rpx;
		border-radius: 16rpx;
		background-color: rgba(255,255,255,1);
		align-self: center;
		margin-top: 20rpx;
		width: 686rpx;
		padding: 16rpx 0 0 22rpx;
	}
	.main2 {
	  z-index: 99;
	  width: 120rpx;
	  display: flex;
	  flex-direction: column;
	  padding-bottom: 108rpx;
	}
	.img1 {
	  z-index: 45;
	  width: 120rpx;
	  height: 92rpx;
	}
	.play {
	  width: 120rpx;
	  height: 120rpx;
	}
	.info1 {
	  width: 116rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(255,255,255,1);
	  font-size: 28rpx;
	  letter-spacing: 1rpx;
	  font-family: PingFangSC-Medium;
	  white-space: nowrap;
	  line-height: 40rpx;
	  text-align: center;
	  margin-top: 12rpx;
	}
	.info2 {
	  width: 258rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(204,204,204,1);
	  font-size: 28rpx;
	  letter-spacing: 1rpx;
	  font-family: PingFangSC-Medium;
	  white-space: nowrap;
	  line-height: 40rpx;
	  text-align: center;
	}
	.desc{
		z-index: 53;
		height: 300rpx;
		border-radius: 16rpx;
		background-color: rgba(255,255,255,1);
		align-self: center;
		margin-top: 20rpx;
		width: 686rpx;
		justify-content: center;
		align-items: center;
		display: flex;
		flex-direction: column;
	}
	.bd2 {
	  z-index: auto;
	  width: 644rpx;
	  height: 264rpx;
	  display: flex;
	  flex-direction: column;
	}
	.info3 {
	  z-index: 54;
	  width: 116rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(51,51,51,1);
	  font-size: 28rpx;
	  letter-spacing: 1rpx;
	  font-family: PingFangSC-Medium;
	  white-space: nowrap;
	  line-height: 40rpx;
	  text-align: left;
	  align-self: flex-start;
	}
	.txt1 {
	  width: 392rpx;
	  display: block;
	  overflow-wrap: break-word;
	  color: rgba(153,153,153,1);
	  font-size: 24rpx;
	  letter-spacing: 0rpx;
	  font-family: PingFangSC-Regular;
	  white-space: nowrap;
	  line-height: 34rpx;
	  text-align: left;
	  align-self: flex-start;
	  margin-top: 16rpx;
	}
	.main3 {
	  z-index: 56;
	  height: 158rpx;
	  border-radius: 8rpx;
	  background-color: rgba(248,248,248,1);
	  margin-top: 16rpx;
	  width: 644rpx;
	  padding: 10rpx 0 0 20rpx;
	}

	.site{
		border-radius: 16rpx;
		background-color: rgba(255,255,255,1);
		align-self: center;
		margin-top: 20rpx;
		width: 686rpx;
		justify-content: center;
		align-items: center;
		display: flex;
		flex-direction: column;
	}
	.submit{
		margin: 48rpx 48rpx 0 48rpx;
	}
</style>
