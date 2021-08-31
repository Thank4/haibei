<template>
	<view>
		<view class="wrap u-skeleton" >
			<view class="u-tabs-box u-skeleton-fillet">
				<u-tabs-swiper ref="tabs" :list="type" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				
				
				<swiper-item class="swiper-item" v-for="t in type">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
						
						<view class="item " v-for="item in list" >
							<view class="cover-img">
								<u-image :src="item.preview" width="626" height="482" mode="widthFix"></u-image>
							</view>
							<view class="item-content">
								<u-cell-group>
										<u-cell-item :title="item.name"  :arrow="false" bg-color="rgb(52,130,237)" hover-class="none" :title-style="{'color':'#fff'}">
											<view class="right-icon" @click="preview(item.preview)"><u-icon name="../../../static/icon/eye_icon.png" size="30" :custom-style="{'margin-right':'19rpx'}"></u-icon>预览</view>
										</u-cell-item>
									</u-cell-group>
							</view>
						</view>	
						
						</view>
					</scroll-view>
				</swiper-item>


			</swiper>
		</view>
		<!-- <u-skeleton :loading="loading" :animation="true" el-color="#ddd" bgColor="#FFF"></u-skeleton> -->
	</view>
</template>

<script>
	export default{
		data(){
			return{
				type: [],
				list:[],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				loading:true,
				templateList:[]
				

			}
		},
		onLoad(){
			this.init()
			this.getTemplate(0)
		},
		methods:{
			init(){
				this.$u.api.getTemplateTypeAll().then(res=>{
					let self = this
					if(res.code == 200){
						let temp = [{id:0,name:'全部'}]
						res.data.map(function(item,index){
							temp.push({
								id:item.id,
								name:item.name
							})
						})
						this.type = temp
					}
				})
				
			},
			// tab栏切换
			change(index) {
				console.log('tab切换')
				this.swiperCurrent = index;
				this.showList(index)
				//this.getTemplate(this.type[index].id)
			},
			transition({ detail: { dx } }) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({ detail: { current } }) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current
				
				//这边不根据ID，更新数据，第一次直接遍历好各种的
				this.showList(current)
				//this.getTemplate(this.type[current].id)
			},
			//根据索引获取对应的渲染数据
			showList(index){
				console.log(this.templateList)
				console.log(index)
				if(index==0){
					this.list = this.templateList
				}else{
					this.list = []
					let self = this
					this.templateList.map(function(item){
						if(item.template_type_id==self.type[index]['id']){
							self.list.push(item)
						}
					})
				}
				console.log(this.type[index]['id'])
			},
			//根据模板类型id获取模板列表
			getTemplate(type_id){
				this.$u.api.getTemplate({type_id:type_id}).then(res=>{
					console.log(res)
					let self = this
					if(res.code == 200){
						self.templateList = res.data
						self.list = res.data
					}
				})
			},
			preview(index){
			
				this.$u.route({
								url: '/packageD/pages/template/preview',
								params: {
									url: index
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
	.u-skeleton{
		height: calc(100vh - var(--window-top));
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
	}
	.cover-img{
		overflow: hidden;
	
	}
	.right-icon{
		color: #fff;
	}
	.item-content ::v-deep .u-cell{
		border-radius:0 0 10rpx 10rpx; 
		   /* 	border-radius: 50rpx !important; */
	}
</style>
