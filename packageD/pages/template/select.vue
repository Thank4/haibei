<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper ref="tabs" :list="type" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				
				
				<swiper-item class="swiper-item" v-for="t in type">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
						
						<view class="item" v-for="item in list">
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
	</view>
</template>

<script>
	export default{
		data(){
			return{
				type: [
					{
						id:'0',
						name: '全部'
					}
				],
				list:[],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				

			}
		},
		onLoad(){
			this.init()
			this.getTemplate({type_id:0})
		},
		methods:{
			init(){
				this.$u.api.getTemplateTypeAll().then(res=>{
					let self = this
					if(res.code == 200){
						res.data.map(function(item,index){
							self.type.push({
								id:item.id,
								name:item.name
							})
						})
					}
				})
				
			},
			// tab栏切换
			change(index) {
				console.log('tab切换')
				this.swiperCurrent = index;
				this.getTemplate(this.type[index].id)
			},
			transition({ detail: { dx } }) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({ detail: { current } }) {
				console.log(current)
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				this.getTemplate(this.type[current].id)
			},
			//根据模板类型id获取模板列表
			getTemplate(type_id){
				this.$u.api.getTemplate({type_id:type_id}).then(res=>{
					let self = this
					if(res.code == 200){
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
