<template>
	<view class="wrap">
		<u-form label-width="180rpx" label-position="top">
		<u-form-item label="视频信息">
		<u-input v-model="name" placeholder="输入视频标题"></u-input>
		</u-form-item>
		<u-form-item label="视频封面图">
		<u-cell-group>
			<u-upload :custom-btn="true" :action="action" :header="{'Access-Token':vuex_token}" max-count="1" @on-success="uploadSuccess">
			<u-cell-item  slot="addBtn" icon="../../../static/img/upload_icon.png" title="上传封面图" :arrow="false"></u-cell-item>
			</u-upload>
		</u-cell-group>
		</u-form-item>
		
		<u-form-item label="视频描述及视频上传">
		<u-row gutter="16">
					<u-col span="9">
						<view>
							<u-input v-model="desc" height="200" type="textarea" :clearable="false" placeholder="输入视频描述(....字内)" />
						</view>
					</u-col>
					<u-col span="3">
						<view v-if="isupload">
							<u-image width="126rpx" height="126rpx" src="../../../static/icon/isupload.png" @click="upload"></u-image>
						</view>
						<view v-else>
							<u-image width="126rpx" height="126rpx" src="../../../static/icon/upload.png" @click="upload"></u-image>
						</view>
					</u-col>
		</u-row>
		</u-form-item>
		</u-form>
		<view class="labelTitle">选择站点</view>
		<view>
			<u-form label-width="180rpx">
			<u-form-item label="选择站点">
				<u-input v-model="site_name" input-align="right" type="select" :select-open="actionSheetShow3" placeholder="选择站点" @click="showSites = true"></u-input>
			</u-form-item>
			</u-form>
		</view>
		<view class="labelTitle">选择视频分类</view>
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
		<view class="submit">
			<u-button type="primary" shape="circle" @click="submit">确定</u-button>
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
				showSites:false
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
				console.log('提交审批')
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
							title:'保存成功'
						})
					}
				})
				
			}
		}
	}
</script>

<style scoped>
	.wrap{
		margin: 50rpx 49rpx 0 49rpx;
	}
	.submit{
		margin: 152rpx 48rpx 0 48rpx;
	}
	.warp{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	
</style>
